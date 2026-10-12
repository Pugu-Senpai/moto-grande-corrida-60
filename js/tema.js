import { lerTema, guardarTema } from "./armazenamento.js";

const root = document.documentElement;
const btnTema = document.getElementById("btn-tema");

function atualizarBotao(modoEscuro) {
    btnTema.textContent = modoEscuro ? "Modo claro" : "Modo escuro";
    btnTema.setAttribute("aria-pressed", modoEscuro);
}

export function alternarTema() {
    const modoEscuro = root.classList.toggle("modo-escuro");
    atualizarBotao(modoEscuro);
    guardarTema(modoEscuro ? "escuro" : "claro");
}

export function aplicarTemaGuardado() {
    if (lerTema() === "escuro") {
        root.classList.add("modo-escuro");
        atualizarBotao(true);
    }
}