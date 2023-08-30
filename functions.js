function criarJogador(nome, baralho, maoContainer) {
    const jogador = new Jogador(nome, baralho, maoContainer);
    return jogador;
}


function criarJogo(player, deck, hand, cont, repl, disc) {
    // Mostra a interface do jogo
    hand.parentElement.style.display = 'grid';
    // Atualiza a interface do jogador
    player.mostrarMao(maoContainer);
    // Atualiza o contador de baralhos        
    baralho.atualizarContadorBaralhos(contadorElement);
    // Botão para repor a mão do jogador        
    player.reporMao(replenishButton, contadorElement, maoContainer);
    baralho.embaralhar()
    // Seletor do botão de descarte         
    player.descartar(discardButton, contadorElement);


    function tratarCartaJogada(cartaValor) {
        console.log(`Carta jogada: ${cartaValor}`);

    }
}

