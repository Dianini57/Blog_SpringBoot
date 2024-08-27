async function fetchComments(postId) {
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = '<p>Carregando comentários...</p>';

    try {
        const response = await fetch(`http://localhost:8080/api/posts/${postId}/comments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar os comentários. Tente novamente mais tarde.');
        }

        const data = await response.json();
        renderComments(data);
    } catch (error) {
        console.error('Erro ao carregar os comentários:', error);
        commentsContainer.innerHTML = '<p>Erro ao carregar comentários. Tente novamente mais tarde.</p>';
    }
}

function renderComments(comments) {
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = ''; // Limpa o conteúdo antes de exibir os comentários

    if (!comments || comments.length === 0) {
        commentsContainer.innerHTML = '<p>Nenhum comentário encontrado.</p>';
        return;
    }

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <p><strong>${comment.author || 'Anônimo'}:</strong> ${comment.content}</p>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

async function createComment(postId, content) {
    const token = localStorage.getItem('token');
    const messageElement = document.getElementById('commentMessage');

    if (!token) {
        messageElement.innerText = 'Você precisa estar logado para comentar.';
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ content })
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar o comentário.');
        }

        messageElement.innerText = 'Comentário adicionado com sucesso!';
        document.getElementById('commentForm').reset();  // Limpa o formulário após enviar
        await fetchComments(postId);  // Recarrega os comentários após a criação

    } catch (error) {
        console.error('Erro ao adicionar o comentário:', error);
        messageElement.innerText = 'Erro ao adicionar comentário. Tente novamente mais tarde.';
    }
}
