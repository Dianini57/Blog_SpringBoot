window.onload = function () {
    carregarDadosPerfil();

    document.getElementById('logoutBtn').addEventListener('click', realizarLogout);

    // Função de edição de perfil ainda não implementada
    document.getElementById('editProfileBtn').addEventListener('click', function () {
        alert('Função de edição de perfil ainda não implementada.');
    });
};

async function carregarDadosPerfil() {
    try {
        const userData = await fetchDadosUsuario();

        if (!userData) {
            throw new Error('Erro ao carregar dados do perfil.');
        }

        preencherDadosUsuario(userData);
        preencherPostsUsuario(userData.posts || []);

    } catch (error) {
        console.error('Erro ao carregar dados do perfil:', error);
        exibirMensagemErro('Erro ao carregar os dados do perfil. Tente novamente mais tarde.');
    }
}

async function fetchDadosUsuario() {
    return {
        name: 'Kamily Souza',
        email: 'kamily@example.com',
        posts: [
            { title: 'Postagem 1', content: 'Resumo do post 1' },
            { title: 'Postagem 2', content: 'Resumo do post 2' },
            { title: 'Postagem 3', content: 'Resumo do post 3' }
        ]
    };
}

function preencherDadosUsuario(userData) {
    document.getElementById('userName').innerText = userData.name;
    document.getElementById('userEmail').innerText = userData.email;
}

function preencherPostsUsuario(posts) {
    const userPosts = document.getElementById('userPosts');
    userPosts.innerHTML = ''; // Limpa o conteúdo antes de exibir os posts

    if (posts.length === 0) {
        userPosts.innerHTML = '<li>Nenhuma postagem encontrada.</li>';
        return;
    }

    posts.forEach(post => {
        const postItem = document.createElement('li');
        postItem.innerHTML = `<strong>${post.title}</strong><p>${post.content}</p>`;
        userPosts.appendChild(postItem);
    });
}

function realizarLogout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}


function exibirMensagemErro(message) {
    const errorContainer = document.getElementById('errorContainer');
    if (errorContainer) {
        errorContainer.innerText = message;
        errorContainer.style.display = 'block';
    } else {
        alert(message);
    }
}
