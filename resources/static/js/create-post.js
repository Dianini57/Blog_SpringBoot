document.getElementById('postForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const title = document.getElementById('title').value.trim();
    const summary = document.getElementById('summary').value.trim();
    const content = document.getElementById('content').value.trim();
    const messageElement = document.getElementById('message');


    messageElement.innerText = '';

    if (!title || !summary || !content) {
        messageElement.innerText = 'Todos os campos são obrigatórios.';
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        messageElement.innerText = 'Você precisa estar logado para criar um post.';
        return;
    }
    try {
        const response = await fetch('http://localhost:8080/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, summary, content })
        });

        if (!response.ok) {
            throw new Error('Erro ao criar post. Verifique suas credenciais.');
        }

        const data = await response.json();
        messageElement.innerText = 'Post criado com sucesso!';
        document.getElementById('postForm').reset();  // Limpa o formulário após criar o post

    } catch (error) {
         console.error('Erro ao criar post:', error);
        messageElement.innerText = 'Erro ao criar post. Tente novamente mais tarde.';
    }
});
