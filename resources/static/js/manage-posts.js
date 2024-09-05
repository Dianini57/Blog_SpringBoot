document.addEventListener('DOMContentLoaded', function() {
    loadPosts();

    document.getElementById('postForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create post');
                }
                return response.json();
            })
            .then(newPost => {
                const postList = document.getElementById('postList');
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                <h3>${newPost.title}</h3>
                <p>${newPost.content}</p>
                ${newPost.imageUrl ? `<img src="/${newPost.imageUrl}" alt="Imagem do Post">` : ''}
                <small>Autor: ${newPost.author}</small>
                <hr>
            `;
                postList.prepend(postElement); // Adiciona o novo post no topo da lista
                document.getElementById('postForm').reset(); // Limpa o formulário após o envio
            })
            .catch(error => console.error('Erro ao criar post:', error));
    });
});

async function loadPosts() {
    const response = await fetch('/api/posts', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    const posts = await response.json();

    const postList = document.getElementById('postList');
    postList.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            ${post.imageUrl ? `<img src="/${post.imageUrl}" alt="Imagem do Post">` : ''}
            <small>Autor: ${post.author}</small>
            <hr>
            <button onclick="deletePost(${post.id})">Delete</button>
        `;
        postList.appendChild(postElement);
    });
}

function deletePost(postId) {
    fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            loadPosts();  // Reload posts after deleting one
        })
        .catch(error => console.error('Error deleting post:', error));
}
