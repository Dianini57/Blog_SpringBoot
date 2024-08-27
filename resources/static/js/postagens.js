window.onload = async function () {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
        redirectToLogin();
        return;
    }

    if (isTokenExpired(token)) {
        handleExpiredToken();
        return;
    }

    try {
        await loadPosts();
    } catch (error) {
        console.error('Erro ao carregar as postagens:', error);
    }

    if (role === 'ADMIN' || role === 'USER') {
        document.getElementById('createPostLink').style.display = 'inline-block';
    }

    document.getElementById('logoutBtn').addEventListener('click', logout);

    setupPostagensLink();
};

function redirectToLogin() {
    window.location.href = '/login';
}


function isTokenExpired(token) {
    try {
        const tokenPayload = decodeTokenPayload(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return tokenPayload.exp < currentTime;
    } catch (error) {
        console.error('Erro ao verificar a expiração do token:', error);
        return true;
    }
}


function decodeTokenPayload(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(base64));
    } catch (error) {
        throw new Error('Falha ao decodificar o token.');
    }
}


function handleExpiredToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    redirectToLogin();
}


function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Remove o papel do usuário
    redirectToLogin();
}


async function loadPosts() {
    try {
        const response = await fetch('/api/posts');
        if (!response.ok) throw new Error('Erro ao buscar as postagens.');

        const posts = await response.json();
        const postContainer = document.getElementById('postContainer');
        postContainer.innerHTML = '';

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <small>Autor: ${post.author}</small>
                <hr>
            `;
            postContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Erro ao carregar postagens:', error);
        document.getElementById('postContainer').innerHTML = `<p>Erro ao carregar postagens.</p>`;
    }
}
const postsApiUrl = 'http://localhost:8080/api/posts';

function setupPostagensLink() {
    const postagensLink = document.querySelector('a[href="/postagens"]');

    if (postagensLink) {
        postagensLink.addEventListener('click', function (event) {
            event.preventDefault();
              window.location.href = postsApiUrl;
        });
    }
}
