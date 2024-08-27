document.addEventListener('DOMContentLoaded', () => {

    async function loadStats() {
        try {
            const response = await fetch('http://localhost:8080/api/admin/stats', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar estatísticas.');
            }

            const stats = await response.json();


            document.getElementById('totalPosts').innerText = stats.totalPosts;
            document.getElementById('totalComments').innerText = stats.totalComments;
            document.getElementById('totalUsers').innerText = stats.totalUsers;
        } catch (error) {
            console.error('Erro ao carregar as estatísticas:', error);
        }
    }

    //
    loadStats();
});
