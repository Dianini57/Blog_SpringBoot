document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');


    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previne o reload da página


        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();


        if (!username || !password) {
            displayError('Por favor, preencha todos os campos.');
            return;
        }

        try {

            const data = await loginRequest(username, password);


            localStorage.setItem('token', data.jwt);
            localStorage.setItem('role', data.role || 'USER');

            displaySuccess('Login bem-sucedido! Redirecionando...');

            setTimeout(() => {

                if (data.role === 'ROLE_ADMIN') {
                    window.location.href = 'dashboard-admin.html';
                } else {
                    window.location.href = 'dashboard.html';
                }
            }, 1000);

        } catch (error) {
            displayError(error.message);
        }
    });


    async function loginRequest(username, password) {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Falha no login. Verifique suas credenciais.');
        }

        return await response.json();
    }

    function displayError(message) {
        errorMessage.innerText = message;
        successMessage.textContent = '';
    }

    function displaySuccess(message) {
        successMessage.textContent = message;
        errorMessage.innerText = ''; // Limpa a mensagem de erro
    }

    async function fetchProtectedResource() {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('Token não encontrado no localStorage');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/protected-endpoint', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao acessar o recurso protegido.');
            }

            const data = await response.json();
            console.log('Dados protegidos:', data);

        } catch (error) {
            console.error('Erro ao acessar o recurso protegido:', error);
        }
    }


});
