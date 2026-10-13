import { escaparHTML } from "./utils.js";

const listaClassificacao = document.getElementById("lista-classificacao");

const LUGARES = ["ouro", "prata", "bronze"];
const IMAGEM_TROFEU = "./assets/img/trofeu.png";

function contarVitoriasDe(nome, listaVitorias) {
    const totalVitorias = listaVitorias.reduce((total, v) => {
        return v.nome === nome ? total + 1 : total;
    }, 0);
    return totalVitorias;
}

function criarClassificacao(vitorias) {
    const nomes = vitorias.map((v) => v.nome);
    const nomesUnico = [...new Set(nomes)];
    const classificacao = nomesUnico.map((nome) => {
        return { nome: nome, vitorias: contarVitoriasDe(nome, vitorias) };
    });
    return classificacao.sort((a, b) => b.vitorias - a.vitorias);
}

function criarLinha(jogador, i) {
    const lugar = LUGARES[i];
    const classe = lugar ? `lugar-${lugar}` : "";
    const marca = lugar
        ? `<img class="trofeu" src="${IMAGEM_TROFEU}" alt="${i + 1}.º lugar">`
        : `<span class="posicao">${i + 1}</span>`;
    const palavra = jogador.vitorias === 1 ? "vitória" : "vitórias";

    return `<li class="${classe}">
        ${marca}
        <span class="nome">${escaparHTML(jogador.nome)}</span>
        <span class="vitorias">${jogador.vitorias} <small>${palavra}</small></span>
    </li>`;
}

export function desenharClassificacao(vitorias) {
    if (vitorias.length === 0) {
        listaClassificacao.innerHTML = `<li class="vazia">Ainda não há vencedores.</li>`;
        return;
    }
    const classificacao = criarClassificacao(vitorias);
    listaClassificacao.innerHTML = classificacao.map(criarLinha).join("");
}