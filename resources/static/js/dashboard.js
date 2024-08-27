window.onload = function () {
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

    if (role === 'USER') {
        window.location.href = 'manage-user.html';
        return;
    } else if (role === 'ADMIN') {
        window.location.href = 'dashboard-admin.html';
        return;
    }

    // Exibe o papel do usuário
    document.getElementById('userRole').innerText = role;

    if (role === 'ADMIN' || role === 'USER') {
        document.getElementById('createPostLink').style.display = 'inline-block';
    }

    document.getElementById('logoutBtn').addEventListener('click', logout);
};

function redirectToLogin() {
    window.location.href = 'login.html';
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
