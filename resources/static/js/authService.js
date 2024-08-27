
export function setToken(token) {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        console.error('Token inválido. Não foi possível armazená-lo.');
    }
}


export function getToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token não encontrado no Local Storage.');
    }
    return token;
}

export function isTokenExpired(token) {
    if (!token) return true;

    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const tokenPayload = JSON.parse(atob(base64));

        const currentTime = Math.floor(Date.now() / 1000);
        return tokenPayload.exp < currentTime;  // Retorna true se o token estiver expirado
    } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return true;
    }
}


export async function fetchProtectedData(endpoint, options = {}) {
    const token = getToken();

    if (!token || isTokenExpired(token)) {
        console.error('Token ausente ou expirado.');
        return null;
    }

    try {
        const response = await fetch(endpoint, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar dados protegidos:', error);
        throw error;
    }
}

export function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}
