// Função principal executada ao carregar a página
window.onload = function () {
    verificarAcessoAdmin();
    configurarLogout();
};
function verificarAcessoAdmin() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'ADMIN') {
        alert('Acesso negado! Apenas administradores podem acessar esta página.');
        window.location.href = 'index.html';
        return;
    }

    carregarInformacoesAdmin();
}


async function carregarInformacoesAdmin() {
    try {
        const data = await fetchProtectedData('http://localhost:8080/api/admin/info');

        if (!data) {
            throw new Error('Erro ao carregar informações do administrador.');
        }


        renderizarInformacoesAdmin(data);
    } catch (error) {
        console.error('Erro ao carregar informações do administrador:', error);
        document.getElementById('adminInfo').innerHTML = '<p>Erro ao carregar as informações. Tente novamente mais tarde.</p>';
    }
}


async function fetchProtectedData(endpoint) {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Token não encontrado no Local Storage.');
        return null;
    }

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar dados protegidos:', error);
        return null;
    }
}

function renderizarInformacoesAdmin(data) {
    const adminInfoContainer = document.getElementById('adminInfo');


    adminInfoContainer.innerHTML = `
        <h2>Bem-vindo, ${data.name}!</h2>
        <p>Email: ${data.email}</p>
        <p>Papel: ${data.role}</p>
        <p>Data de criação da conta: ${new Date(data.createdAt).toLocaleDateString()}</p>
    `;
}

function configurarLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', realizarLogout);
    }
}

function realizarLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = 'login.html';
}
