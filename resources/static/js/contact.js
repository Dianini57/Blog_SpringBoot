document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simulando uma chamada de API para envio de dados de contato
    const contactData = {
        name: name,
        email: email,
        message: message
    };

    fetch('http://localhost:8080/api/contact', {  // Ajuste o URL para o endpoint da sua API
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('responseMessage').innerText = 'Obrigado por entrar em contato! Em breve responderemos sua mensagem.';
            document.getElementById('contactForm').reset();
        } else {
            document.getElementById('responseMessage').innerText = 'Erro ao enviar a mensagem. Tente novamente mais tarde.';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('responseMessage').innerText = 'Erro ao enviar a mensagem. Tente novamente mais tarde.';
    });
});
