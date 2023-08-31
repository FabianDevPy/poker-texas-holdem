

function criarJogador(nome, baralho, maoContainer) {
    const jogador = new Jogador(nome, baralho, maoContainer);
    return jogador;
}


function criarJogo(player, deck, hand, cont, repl, disc) {
    // Mostra a interface do jogo
    hand.parentElement.style.display = 'grid';
    // Atualiza a interface do jogador
    player.mostrarMao(hand);
    // Atualiza o contador de baralhos        
    deck.atualizarContadorBaralhos(cont);
    // Botão para repor a mão do jogador        
    player.reporMao(repl, cont, hand);
    deck.embaralhar()
    // Seletor do botão de descarte         
    player.descartar(disc, cont);


    function tratarCartaJogada(cartaValor) {
        console.log(`Carta jogada: ${cartaValor}`);

    }
}

function verificarCombinacoesPoker(score) {
    const activeCards = document.querySelectorAll('.hand-card.active');
    const handValues = Array.from(activeCards).map(card => card.style.getPropertyValue('--before-content'));
    const valueCounts = contarValores(handValues);

    const uniqueValues = Object.keys(valueCounts);

    valores = [];
    for (let i = 0; i < uniqueValues.length; i++) {
        values = uniqueValues[i].replace("'", '');
        
        naipe = values.split(' ')[2]
        valor = values.split(' ')[0]

        if (valor == 'As') {
            valor = 1
        }
        if (valor == 'Valete') {
            valor = 11
        }
        if (valor == 'Dama') {
            valor = 12
        }
        if (valor == 'Rei') {
            valor = 13
        }


        valores.push(new Carta(parseInt(valor), naipe));

    }

    const isFlush = verificarFlush(valores);
    const isStraight = verificarSequencia(valores);
    const isFullHouse = verificarFullHouse(valores);
    const isTrinca = verificarTrinca(valores);
    const isDoisPares = verificarDoisPares(valores);
    const isPar = verificarPar(valores);


    if (isFlush && isStraight) {
        return youWin("Straight Flush", score);

    } else if (isFlush) {
      return youWin("Flush", score);
    } else if (isStraight) {
      return youWin("Straight", score);
    }
    else if (isFullHouse) {
      return youWin("Full House", score);
    }
    else if (isTrinca) {
      return youWin("Trinca", score);
    }
    else if (isDoisPares) {
      return youWin("Dois Pares", score);
    }
    else if (isPar) {
      return youWin("Par", score);
    }
    else {
      return youWin("Nada", score);
    }

}

function verificarFlush(valores) {
    if (valores.length) {
        const naipes = valores.map(carta => carta.naipe);
        const naipe = naipes[0];
        return naipes.every(naipeAtual => naipeAtual === naipe);
    }


}

function verificarSequencia(valores) {
    const valoresNumeros = valores.map(carta => carta.valor);
    const valoresOrdenados = valoresNumeros.sort((a, b) => a - b);
    const menorValor = valoresOrdenados[0];
    const maiorValor = valoresOrdenados[valoresOrdenados.length - 1];
    return maiorValor - menorValor === 4;
}

function verificarFullHouse(cartas) {
    const valueCounts = contarValores(cartas.map(carta => carta.valor));

    const uniqueValues = Object.keys(valueCounts);
    if (uniqueValues.length === 2) {
        const value1 = parseInt(uniqueValues[0]);
        const value2 = parseInt(uniqueValues[1]);

        if ((valueCounts[value1] === 3 && valueCounts[value2] === 2) ||
            (valueCounts[value1] === 2 && valueCounts[value2] === 3)) {
            return true;
        }
    }
    return false;
}

function verificarTrinca(cartas) {
    const valueCounts = contarValores(cartas.map(carta => carta.valor));
    return Object.values(valueCounts).includes(3);
}

function verificarDoisPares(cartas) {
    const valueCounts = contarValores(cartas.map(carta => carta.valor));
    const pairs = Object.values(valueCounts).filter(count => count === 2);
    return pairs.length === 2;
}

function verificarPar(cartas) {
    const valueCounts = contarValores(cartas.map(carta => carta.valor));
    return Object.values(valueCounts).includes(2);
}

function contarValores(values) {
    const valueCounts = {};
    values.forEach(value => {
        //youWin(value);
        if (!valueCounts[value]) {
            valueCounts[value] = 1;
        } else {
            valueCounts[value]++;
        }
    });
    return valueCounts;
}

function atualizarScore(combinacao, score) {
    console.log("Combinacao: ", combinacao);
    if (combinacao === 'Royal Flush') {
        score += 1000;
    } else if (combinacao === 'Straight Flush') {
        score += 500;
    } else if (combinacao === 'Quadra') {
        score += 400;
    } else if (combinacao === 'FullHouse') {
        score += 300;
    } else if (combinacao === 'Flush') {
        score += 100;
    } else if (combinacao === 'Straight') {
        score += 50;
    } else if (combinacao === 'Trinca') {
        score += 30;
    } else if (combinacao === 'Dois Pares') {
        score += 20;
    } else if (combinacao === 'Par') {
        score += 10;
    } else if(combinacao === 'Nada') {
        score -= 100;
    }
    console.log("Score: ", score);
    
    return score;
}

function youWin(combinacao, score) {
    const win = document.querySelector('.win');
    

    win.style.display = 'block';
    win.textContent = combinacao;
    win.css = 'color: red';
    $('.pyro').show();
    $('body').addClass('black');
    setTimeout(() => {
        win.style.display = 'none';
        $('.pyro').hide();
        $('body').removeClass('black');

    }, 3000);

    return atualizarScore(combinacao, score)
}




