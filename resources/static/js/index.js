document.addEventListener('DOMContentLoaded', () => {

    async function loadHomePageContent() {
        try {

            const response = await fetch('http://localhost:8080/api/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar conteúdo da página inicial.');
            }

            const posts = await response.json();
            renderPosts(posts);

        } catch (error) {
            console.error('Erro ao carregar a página inicial:', error);
            document.getElementById('errorMessage').textContent = 'Erro ao carregar o conteúdo. Tente novamente mais tarde.';
        }
    }

    function renderPosts(posts) {
        const postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = ''; // Limpa o conteúdo anterior

        if (posts.length === 0) {
            postsContainer.innerHTML = '<p>Nenhum post encontrado.</p>';
            return;
        }

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.summary}</p>
                <p><strong>Autor:</strong> ${post.author}</p>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    loadHomePageContent();
});
