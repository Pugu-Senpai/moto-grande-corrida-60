import { lerSom, guardarSom } from "./armazenamento.js";

const VOLUMES_INICIAIS = { musica: 0.5, efeitos: 0.8 };

function criarCanal(nome) {
    const controlo = document.querySelector(`.controlo-som[data-canal="${nome}"]`);
    return {
        volume: VOLUMES_INICIAIS[nome],
        silenciado: false,
        slider: controlo.querySelector('input[type="range"]'),
        texto: controlo.querySelector("output"),
        botao: controlo.querySelector(".btn-mute"),
        rotulo: controlo.querySelector("label").textContent.toLowerCase(),
    };
}

const canais = {
    musica: criarCanal("musica"),
    efeitos: criarCanal("efeitos"),
};

const sons = [];

function volumeAtual(nomeCanal) {
    const canal = canais[nomeCanal];
    return canal.silenciado ? 0 : canal.volume;
}

function atualizarSons() {
    sons.forEach((s) => {
        s.audio.volume = volumeAtual(s.canal) * s.base;
    });
}

function atualizarControlos(nomeCanal) {
    const canal = canais[nomeCanal];
    const percentagem = Math.round(canal.volume * 100);
    canal.slider.value = percentagem;
    canal.texto.textContent = `${percentagem}%`;
    canal.botao.setAttribute("aria-label",
        canal.silenciado ? `Ligar ${canal.rotulo}` : `Silenciar ${canal.rotulo}`);
    canal.botao.setAttribute("aria-pressed", canal.silenciado);
}

function guardar() {
    guardarSom({
        musica: { volume: canais.musica.volume, silenciado: canais.musica.silenciado },
        efeitos: { volume: canais.efeitos.volume, silenciado: canais.efeitos.silenciado },
    });
}

export function definirVolume(nomeCanal, percentagem) {
    const canal = canais[nomeCanal];
    canal.volume = percentagem / 100;
    if (canal.volume > 0) {
        canal.silenciado = false;
    }
    atualizarSons();
    atualizarControlos(nomeCanal);
    guardar();
}

export function alternarMute(nomeCanal) {
    const canal = canais[nomeCanal];
    canal.silenciado = !canal.silenciado;
    atualizarSons();
    atualizarControlos(nomeCanal);
    guardar();
}

export function aplicarSomGuardado() {
    const guardado = lerSom();
    Object.keys(canais).forEach((nome) => {
        if (guardado && guardado[nome]) {
            canais[nome].volume = guardado[nome].volume;
            canais[nome].silenciado = guardado[nome].silenciado;
        }
        atualizarControlos(nome);
    });
    atualizarSons();
}

export function criarSom(caminho, canal, repetir = false, base = 1) {
    const audio = new Audio(caminho);
    audio.loop = repetir;
    audio.volume = volumeAtual(canal) * base;
    sons.push({ audio, canal, base });
    return audio;
}

/* EFEITOS */
const EFEITOS = {
    acelaracao: criarSom("./assets/mp3/acelaracao.mp3", "efeitos"),
    publico: criarSom("./assets/mp3/publico_delirio.mp3", "efeitos"),
    travagem: criarSom("./assets/mp3/travagem.mp3", "efeitos"),
    dado: criarSom("./assets/mp3/rodar_dado.mp3", "efeitos"),
    papel: criarSom("./assets/mp3/papel.mp3", "efeitos", false, 0.7),
    clique: criarSom("./assets/mp3/click.mp3", "efeitos", false, 0.6),
    vitoria: criarSom("./assets/mp3/vitoria.mp3", "efeitos"),
    mover: criarSom("./assets/mp3/clack.mp3", "efeitos", false, 0.5),
    dale: criarSom("./assets/mp3/dale.mp3", "efeitos"),
    camara: criarSom("./assets/mp3/camara.mp3", "efeitos"),
};

export function tocarEfeito(nome) {
    const som = EFEITOS[nome];
    if (!som) {
        return;
    }
    som.currentTime = 0;
    som.play().catch(() => {});
}

/* MÚSICA DO MENU */
const musicaMenu = criarSom("./assets/mp3/soundtrack.mp3", "musica", true);
let musicaMenuAtiva = false;

export async function tocarMusicaMenu() {
    musicaMenuAtiva = true;
    if (!musicaMenu.paused) {
        return;
    }
    try {
        await musicaMenu.play();
    } catch (erro) {
        document.addEventListener("pointerdown", tentarOutraVez, { once: true });
        document.addEventListener("keydown", tentarOutraVez, { once: true });
    }
}

function tentarOutraVez() {
    if (musicaMenuAtiva) {
        tocarMusicaMenu();
    }
}

export function pararMusicaMenu() {
    musicaMenuAtiva = false;
    musicaMenu.pause();
    musicaMenu.currentTime = 0;
}