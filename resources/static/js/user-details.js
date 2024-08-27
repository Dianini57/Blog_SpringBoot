document.addEventListener('DOMContentLoaded', async () => {
    const userId = new URLSearchParams(window.location.search).get('id');

    try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const user = await response.json();
            document.getElementById('userId').innerText = user.id;
            document.getElementById('userName').innerText = user.name;
            document.getElementById('userEmail').innerText = user.email;
        } else {
            console.error('Erro ao carregar usuário');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});
