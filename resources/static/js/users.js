document.addEventListener('DOMContentLoaded', async () => {
    const usersTableBody = document.querySelector('#usersTable tbody');

    try {
        const response = await fetch('http://localhost:8080/api/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const users = await response.json();

            users.forEach(user => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="viewUser(${user.id})">Detalhes</button>
                        <button onclick="editUser(${user.id})">Editar</button>
                        <button onclick="deleteUser(${user.id})">Excluir</button>
                    </td>
                `;

                usersTableBody.appendChild(row);
            });
        } else {
            console.error('Erro ao carregar usuários');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});

function viewUser(id) {
    window.location.href = `user-details.html?id=${id}`;
}

function editUser(id) {
    window.location.href = `edit-user.html?id=${id}`;
}

async function deleteUser(id) {
    const confirmed = confirm('Tem certeza que deseja excluir este usuário?');
    if (!confirmed) return;

    try {
        const response = await fetch(`http://localhost:8080/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Usuário excluído com sucesso!');
            window.location.reload();
        } else {
            alert('Erro ao excluir usuário.');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}
