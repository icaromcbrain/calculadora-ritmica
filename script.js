document.addEventListener('DOMContentLoaded', () => {
    const compassoNumeradorInput = document.getElementById('compasso-numerador');
    const compassoDenominadorInput = document.getElementById('compasso-denominador');
    const listaFiguras = document.getElementById('lista-figuras');
    const totalAtualSpan = document.getElementById('total-atual');
    const mensagemStatusParagraph = document.getElementById('mensagem-status');
    const limparCalculadoraButton = document.getElementById('limpar-calculadora');

    let totalAtualFiguras = 0;
    let figuras = [];

    const mapaFiguras = {
        '4': 'Semibreve',
        '2': 'Mínima',
        '1': 'Semínima',
        '0.5': 'Colcheia',
        '0.25': 'Semicolcheia',
        '0.125': 'Fusa',
        '0.0625': 'Semifusa'
    };

    const denominadorParaValorAbsoluto = {
        '1': 4,
        '2': 2,
        '4': 1,
        '8': 0.5,
        '16': 0.25,
        '32': 0.125,
        '64': 0.0625
    };

    function atualizarStatus() {
        const numerador = parseFloat(compassoNumeradorInput.value);
        const denominador = parseFloat(compassoDenominadorInput.value);

        const valorUnidadeTempo = denominadorParaValorAbsoluto[denominador.toString()];

        if (isNaN(numerador) || isNaN(denominador) || !valorUnidadeTempo) {
            mensagemStatusParagraph.textContent = 'Por favor, insira um compasso válido.';
            mensagemStatusParagraph.className = '';
            return;
        }

        const valorTotalCompasso = numerador * valorUnidadeTempo;
        totalAtualSpan.textContent = totalAtualFiguras.toFixed(4);

        if (totalAtualFiguras === valorTotalCompasso) {
            mensagemStatusParagraph.textContent = 'Compasso Completo!';
            mensagemStatusParagraph.className = 'status-completo';
        } else if (totalAtualFiguras < valorTotalCompasso) {
            mensagemStatusParagraph.textContent = `Faltam ${(valorTotalCompasso - totalAtualFiguras).toFixed(4)} para completar o compasso.`;
            mensagemStatusParagraph.className = 'status-incompleto';
        } else {
            mensagemStatusParagraph.textContent = `Compasso Excedido em ${(totalAtualFiguras - valorTotalCompasso).toFixed(4)}.`;
            mensagemStatusParagraph.className = 'status-excedido';
        }
    }

    function limparCalculadora() {
        totalAtualFiguras = 0;
        figuras = [];
        listaFiguras.innerHTML = '';
        atualizarStatus();
    }

    limparCalculadoraButton.addEventListener('click', limparCalculadora);
    compassoNumeradorInput.addEventListener('input', atualizarStatus);
    compassoDenominadorInput.addEventListener('input', atualizarStatus);

    document.querySelectorAll('.img-texto-butao').forEach(botao => {
        botao.addEventListener('click', function() {
            const valorSelecionado = parseFloat(this.value);
            const textoSelecionado = mapaFiguras[valorSelecionado.toString()] || this.textContent.trim();

            if (isNaN(valorSelecionado)) return;

            figuras.push({ valor: valorSelecionado, nome: textoSelecionado });
            totalAtualFiguras += valorSelecionado;

            const itemLista = document.createElement('li');
            itemLista.textContent = textoSelecionado;
            const botaoRemover = document.createElement('button');
            botaoRemover.textContent = 'Remover';
            botaoRemover.onclick = () => {
                totalAtualFiguras -= valorSelecionado;
                const index = Array.from(listaFiguras.children).indexOf(itemLista);
                if (index > -1) {
                    figuras.splice(index, 1);
                }
                itemLista.remove();
                atualizarStatus();
            };
            itemLista.appendChild(botaoRemover);
            listaFiguras.appendChild(itemLista);

            atualizarStatus();
        });
    });

    atualizarStatus();
});


