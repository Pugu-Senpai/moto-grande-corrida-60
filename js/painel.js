const listaPosicoes = document.getElementById("lista-posicoes");

function calcularProgresso(piloto, totalCasas) {
    return (piloto.volta - 1) * totalCasas + piloto.posicao;
}

function ordenarPorProgresso(pilotos, totalCasas) {
    return [...pilotos].sort((a, b) => calcularProgresso(b, totalCasas) - calcularProgresso(a, totalCasas));
}

export function desenharPosicoes(pilotos, totalCasas) {
    const porProgresso = ordenarPorProgresso(pilotos, totalCasas);
    listaPosicoes.innerHTML = porProgresso.map((p, i) => `<li>
    <span class="posicao">${i + 1}.</span>
    <span class="mota" style="--cor-mota: ${p.cor}; --cor-placa: ${p.placa};"></span>
    <span class="nome">${p.nome}</span>
    <span class="volta">V${p.volta}</span>
    </li>`).join("");
}