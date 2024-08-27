document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Registro bem-sucedido! Agora você pode fazer login.');
            window.location.href = '/login';
        } else {
            alert('Falha no registro. Tente novamente.');
        }
    })
    .catch(error => console.error('Erro:', error));
});
