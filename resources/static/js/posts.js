async function fetchPosts() {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '<p>Carregando posts...</p>'; // Exibe uma mensagem de carregamento

    const token = localStorage.getItem('token'); // Pega o token do localStorage
    if (!token) {
        postsContainer.innerHTML = '<p>Erro: Usuário não autenticado.</p>';
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/posts', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Adiciona o token no header
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar os posts. Tente novamente mais tarde.');
        }

        const data = await response.json();
        renderPosts(data);
    } catch (error) {
        console.error('Erro ao carregar os posts:', error);
        postsContainer.innerHTML = '<p>Erro ao carregar posts. Tente novamente mais tarde.</p>';
    }
}

function renderPosts(posts) {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = ''; // Limpa o conteúdo antes de exibir os posts

    if (!posts || posts.length === 0) {
        postsContainer.innerHTML = '<p>Nenhum post encontrado.</p>';
        return;
    }

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.summary}</p>
            <p><strong>Autor:</strong> ${post.author || 'Anônimo'}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

document.addEventListener('DOMContentLoaded', fetchPosts);
