document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('userList');
            data.forEach(user => {
                const userElement = document.createElement('div');
                userElement.textContent = `Name: ${user.name}, Email: ${user.email}`;
                userList.appendChild(userElement);
            });
        })
        .catch(error => console.error('Error loading users:', error));
});
