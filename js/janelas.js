import { tocarEfeito } from "./som.js";

const dialogs = document.querySelectorAll("dialog");
const aviso = document.getElementById("aviso");
const avisoTitulo = document.getElementById("aviso-titulo");
const avisoImagem = document.getElementById("aviso-imagem");
const avisoTexto = document.getElementById("aviso-texto");

const TEMPO_AVISO = 2500;

export function abrirJanela(id) {
    const elemento = document.getElementById(id);
    if (elemento) {
        tocarEfeito("papel");
        elemento.showModal();
        elemento.scrollTop = 0;
    } else {
        console.warn(`O ID "${id}" não existe!`);
    } 
}

dialogs.forEach((d) => {
    d.addEventListener("click", (evento) => {
        if (evento.target === d) {
            d.close();
        }
    });
    d.addEventListener("close", () => {
        tocarEfeito("papel");
    });
});

export function mostrarAviso(info) {
    avisoImagem.src = info.imagem;
    avisoTitulo.textContent = info.nome;
    avisoTexto.textContent = info.descricao;
    aviso.showModal();
    tocarEfeito("papel");
    if (info.som) {
        tocarEfeito(info.som);
    }
    return new Promise((resolve) => {
        const temporizador = setTimeout(() => aviso.close(), TEMPO_AVISO);
        aviso.addEventListener("close", () => {
            clearTimeout(temporizador);
            resolve();
        }, {once: true});
    });
}