import { lerVitorias } from "./armazenamento.js";

const textoVitoria = document.getElementById("texto-vitoria");
const vitoriaMota = document.getElementById("vitoria-mota");
const vitoriaDetalhe = document.getElementById("vitoria-detalhe");
const confetis = document.getElementById("confetis");

const NUMERO_CONFETIS = 30;
const CORES_CONFETIS = ["#CC513B", "#D4A23A", "#829670", "#F4E7C3"];

function contarVitorias(nome) {
    return lerVitorias().filter((v) => v.nome === nome).length;
}

function lancarConfetis() {
    confetis.replaceChildren();
    for (let i = 0; i < NUMERO_CONFETIS; i++) {
        const confeti = document.createElement("span");
        confeti.style.left = `${Math.random() * 100}%`;
        confeti.style.backgroundColor = CORES_CONFETIS[i % CORES_CONFETIS.length];
        confeti.style.animationDelay = `${Math.random() * 1.5}s`;
        confeti.style.animationDuration = `${2 + Math.random() * 2}s`;
        confetis.append(confeti);
    }
}

export function mostrarVitoria(vencedor) {
    textoVitoria.textContent = vencedor.nome;
    vitoriaMota.style.setProperty("--cor-mota", vencedor.cor);
    vitoriaMota.style.setProperty("--cor-placa", vencedor.placa);

    const total = contarVitorias(vencedor.nome);
    vitoriaDetalhe.textContent = total === 1
        ? "Primeira vitória!"
        : `${total}.ª vitória na classificação`;

    lancarConfetis();
}