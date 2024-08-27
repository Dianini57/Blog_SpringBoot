function fetchPosts() {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '<p>Carregando posts...</p>'; // Mostra uma mensagem de carregamento

    fetch('http://localhost:8080/api/posts', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        postsContainer.innerHTML = ''; // Limpa a mensagem de carregamento

        if (data.length === 0) {
            postsContainer.innerHTML = '<p>Nenhum post encontrado.</p>'; // Exibe uma mensagem se não houver posts
        } else {
            data.forEach(post => {
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
    })
    .catch(error => {
        console.error('Erro ao carregar os posts:', error);
        postsContainer.innerHTML = '<p>Erro ao carregar posts. Tente novamente mais tarde.</p>'; // Mostra uma mensagem de erro
    });
}


fetchPosts();
