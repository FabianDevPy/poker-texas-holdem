class Carta {
    constructor(valor, naipe) {
        this.valor = valor;
        this.naipe = naipe;
    }

    toString() {
        return `${this.valor} de ${this.naipe}`;
    }
}

class Baralho {
    constructor() {
        this.cartas = [];
        const naipes = ['Espadas', 'Copas', 'Ouros', 'Paus'];
        const valores = ['Ás', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Valete', 'Dama', 'Rei'];

        for (const naipe of naipes) {
            for (const valor of valores) {
                this.cartas.push(new Carta(valor, naipe));
            }
        }
    }

    embaralhar() {
        for (let i = this.cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]];
        }
    }
    distribuirCarta() {
        return this.cartas.pop();
    }
    atualizarContadorBaralhos(contadorElement) {
        const numBaralhos = Math.floor(baralho.cartas.length); // Cada baralho tem 52 cartas
        contadorElement.textContent = numBaralhos;
        console.log(numBaralhos);
    }
}

class Jogador {
    constructor(nome, baralho, maoContainer) {
        this.nome = nome;
        this.mao = [];
        this.baralho = baralho;
        this.maoContainer = maoContainer;
        this.score = 0;
        
        for (let i = 0; i < 5; i++) {
            this.mao.push(baralho.distribuirCarta());
        }

        // Atualiza a interface
        this.mostrarMao(maoContainer);

    }

    

    mostrarMao(maoContainer) {

        maoContainer.innerHTML = ''; // Limpa o conteúdo anterior

        this.mao.forEach((carta, index) => {
            // Cria um elemento HTML para cada carta
            const cartaHtml = document.createElement('li');
            cartaHtml.style.setProperty("--before-content", `'${carta.toString()}'`);
            cartaHtml.classList.add('hand-card'); // Classe para estilização
            cartaHtml.addEventListener('click', function () {
                cartaHtml.classList.toggle('active');
            });
            maoContainer.appendChild(cartaHtml);

        });
    }
    removeCartaJogada(cardValue, maoContainer) {
        // Remove a carta da mão do jogador
        const cardIndex = this.mao.findIndex(carta => carta.toString() === cardValue);
        if (cardIndex !== -1) {
            this.mao.splice(cardIndex, 1);
            this.mostrarMao(maoContainer); // Atualiza a exibição das cartas

        }
    }
    removeCartaDoBaralho(cardValue, maoContainer) {
        // Remove a carta do baralho
        const cartaRemovida = baralho.cartas.find(carta => carta.toString() === cardValue);
        if (cartaRemovida) {
            const cartaIndex = baralho.cartas.indexOf(cartaRemovida);
            if (cartaIndex !== -1) {
                baralho.cartas.splice(cartaIndex, 1);
            }
        }
    }
    reabastecer() { // Reabastece a mão do jogador com as próximas cartas do baralho
        this.mao = [];
        for (let i = 0; i < 5; i++) {
            if (baralho.cartas.length > 0) {
                this.mao.push(baralho.distribuirCarta());
            } else {
                break; // Sai do loop se o baralho estiver vazio
            }
        }
    }
    descartar(discardButton, contadorElement) {
        // Evento de clique no botão de descarte
        discardButton.addEventListener('click', () => {
            const activeCard = document.querySelector('.hand-card.active');

            if (activeCard) {
                // Obtém o valor da carta da propriedade --before-content
                const cardValue = activeCard.style.getPropertyValue('--before-content');
                this.removeCartaJogada(cardValue, maoContainer);
                // Remove a carta do DOM
                activeCard.remove();
                this.removeCartaDoBaralho(cardValue);
                baralho.atualizarContadorBaralhos(contadorElement);
            }
        });
    }
    reporMao(replenishButton, contadorElement, maoContainer) {
        replenishButton.addEventListener('click', () => {
            // Verifica se há cartas restantes no baralho
            if (baralho.cartas.length === 0) {
                alert("O baralho está vazio!");
                return; // Sai da função se o baralho estiver vazio
            }
            baralho.embaralhar();
            this.reabastecer();
            this.mostrarMao(maoContainer);
            baralho.atualizarContadorBaralhos(contadorElement);
        });
    }
}


