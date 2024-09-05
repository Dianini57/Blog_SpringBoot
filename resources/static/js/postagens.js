document.addEventListener('DOMContentLoaded', function () {
    const postagensContainer = document.querySelector('.postagens-section');

    function criarPostagem(post) {
        const postagemElement = document.createElement('div');
        const tituloElement = document.createElement('h3');
        const conteudoElement = document.createElement('p');

        tituloElement.textContent = post.title;
        conteudoElement.textContent = post.content;

        postagemElement.appendChild(tituloElement);
        postagemElement.appendChild(conteudoElement);

        return postagemElement;
    }

    function carregarPostagens() {
        fetch('http://localhost:8080/api/posts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar as postagens.');
                }
                return response.json();
            })
            .then(posts => {
                postagensContainer.innerHTML = ''; // Limpa o container de postagens

                const fragment = document.createDocumentFragment(); // Cria um fragmento para melhorar o desempenho

                posts.forEach(post => {
                    const postagemElement = criarPostagem(post);
                    fragment.appendChild(postagemElement); // Adiciona ao fragmento
                });

                postagensContainer.appendChild(fragment); // Adiciona todas as postagens de uma vez ao DOM
            })
            .catch(error => {
                console.error('Erro:', error);
                postagensContainer.innerHTML = '<p>Erro ao carregar as postagens. Tente novamente mais tarde.</p>';
            });
    }

    carregarPostagens();
});
