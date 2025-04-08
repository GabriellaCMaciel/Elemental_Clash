function jogar() {
    let idade = prompt("Quantos anos você tem?");
    if (idade < 18) {
        alert("Você NÃO pode jogar Elemental Clash")
    }

    if (idade >= 18) {
        escolhaJogador = prompt("Digite 1-Electro, 2-Hydro ou 3-Pyro?")

        escolhaComputador = Math.floor(Math.random() * 3) + 1;

        // Jogador Electro, Computador Electro --> empate!!
        // Jogador Hydro, Computador Hydro --> empate!!
        // Jogador Pyro, Computador Pyro --> empate!!
        if (escolhaJogador == escolhaComputador)
            alert("🤝 Empate!! \n O computador escolheu o mesmo que você :/")

        // Jogador Electro, Computador Hydro --> Jogador vence
        if (escolhaJogador == 1 && escolhaComputador == 2)
            alert("✅ Você ganhou! \n O computador escolheu Hydro")

        // Jogador Electro, Computador Pyro --> Computador vence
        if (escolhaJogador == 1 && escolhaComputador == 3)
            alert("❌ Você perdeu :( \n O computador escolheu Pyro")

        // Jogador Hydro, Computador Pyro --> Jogador vence
        if (escolhaJogador == 2 && escolhaComputador == 3)
            alert("✅ Você ganhou! \n O computador escolheu Pyro")

        // Jogador Hydro, Computador Electro --> Computador vence
        if (escolhaJogador == 2 && escolhaComputador == 1)
            alert("❌ Você perdeu :( \n O computador escolheu Electro")

        // Jogador Pyro, Computador Electro --> Jogador vence
        if (escolhaJogador == 3 && escolhaComputador == 1)
            alert("✅ Você ganhou! \n O computador escolheu Electro")

        // Jogador Pyro, Computador Hydro --> Computador vence
        if (escolhaJogador == 3 && escolhaComputador == 2)
            alert("❌ Você perdeu :( \n O computador escolheu Hydro")
    }

}










