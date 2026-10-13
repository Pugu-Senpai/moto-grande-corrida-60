import { trocarEcras } from "./ecras.js";
import { abrirJanela, mostrarAviso } from "./janelas.js";
import { criarListaJogadores, lerJogadores, validarJogadores } from "./configuracao.js";
import { carregarDados } from "./dados.js";
import { iniciarCorrida, obterPilotos, obterPilotoDaVez, passarTurno, 
    avancarPilotoDaVez, TOTAL_VOLTAS, pilotoDaVezVenceu, obterEstado, 
    restaurarCorrida, recuarPilotoDaVez } from "./jogo.js";
import { desenharPista, desenharPecas } from "./pista.js";
import { lancarDado, esperar, precarregarImagem } from "./utils.js";
import { desenharPosicoes } from "./painel.js";
import { lerVitorias, guardarVitorias, lerCorrida, guardarCorrida, 
    apagarCorrida, apagarVitorias } from "./armazenamento.js";
import { desenharClassificacao } from "./classificacao.js";
import { tirarCarta } from "./cartas.js";
import { alternarTema, aplicarTemaGuardado } from "./tema.js";
import { definirVolume, alternarMute, aplicarSomGuardado, tocarMusicaMenu, pararMusicaMenu, tocarEfeito } from "./som.js";
import { mostrarVitoria } from "./vitoria.js";

aplicarTemaGuardado();
aplicarSomGuardado();

const CASA_DESPISTE = 2;
const RECUAR = 1;
const PAUSA_ANTES_AVISO = 800;
const PAUSA_MOVIMENTO = 300;
const PAUSA_DADO = 900;
const VEZES_DADO = 10;
const PAUSA_INICIAL_DADO = 30;
const AUMENTO_PAUSA = 10;
const ANGULO_LADO = 12;
const TROCAR_LADO = -1;
const MOVIMENTO_REDUZIDO = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const TEMPO_MINIMO_LOADING = 1500;
const IMAGENS_JOGO = [
    "./assets/img/pista.svg",
    "./assets/img/fundo_pista.jpg",
    "./assets/img/moto/moto_base.png",
    "./assets/img/moto/moto_cor.svg",
    "./assets/img/moto/moto_numero_cor.svg",
    "./assets/img/trofeu.png",
];

const btnIniciar = document.getElementById("btn-iniciar-jogo");
const btnsJanela = document.querySelectorAll("[data-janela]");
const btnVoltar = document.getElementById("btn-voltar");
const btnDado = document.getElementById("btn-dado");
const btnSair = document.getElementById("btn-sair");
const btnLimparClassificacao = document.getElementById("btn-limpar-classificacao");
const btnTema = document.getElementById("btn-tema");

const radioJogadores = document.querySelectorAll('input[name="num-jogadores"]');
const paragrafoErro = document.getElementById("erro-formulario");
const formulario = document.getElementById("dados-jogador");
const numDado = document.getElementById("numero-dado");
const vezJogador = document.getElementById("vez-jogador");
const textoVolta = document.getElementById("volta");
const janelaVitoria = document.getElementById("vitoria");
const janelaOpcoes = document.getElementById("opcoes");
const mensagem = document.getElementById("mensagem");
const mensagemOpcoes = document.getElementById("mensagem-opcoes");
const janelaDadoCurva = document.getElementById("janela-dado-curva");
const caixaDadoCurva = document.getElementById("dado-curva");
const ecraLoading = document.getElementById("ecra-loading");

const [dados] = await Promise.all([
    carregarDados(),
    esperar(TEMPO_MINIMO_LOADING),
    ...IMAGENS_JOGO.map(precarregarImagem),
]);
if (!dados) {
    ecraLoading.querySelector(".loading-texto").textContent = "Erro ao carregar o jogo. Recarrega a página.";
    throw new Error("Não foi possível carregar o dados.json");
}

ecraLoading.classList.add("a-sair");
ecraLoading.addEventListener("transitionend", () => ecraLoading.remove(), { once: true });

function mostrarVez() {
    const piloto = obterPilotoDaVez();
    vezJogador.innerHTML = `
        <span class="mota" style="--cor-mota: ${piloto.cor}; --cor-placa: ${piloto.placa};"></span>
        <span>Vez de <strong></strong></span>
    `;
    vezJogador.querySelector("strong").textContent = piloto.nome;
}

function mostrarMensagem(texto) {
    mensagem.textContent = texto;
}

function mostrarVolta() {
    textoVolta.textContent = `Volta ${obterPilotoDaVez().volta} de ${TOTAL_VOLTAS}`;
}

function mostrarCorrida() {
    pararMusicaMenu();
    btnDado.disabled = false;
    btnSair.disabled = false;
    numDado.textContent = "-";
    mostrarVez();
    mostrarVolta();
    desenharPista(dados.casas);
    desenharPecas(obterPilotos(), dados.casas);
    desenharPosicoes(obterPilotos(), dados.casas.length); 
    mostrarMensagem("");
    trocarEcras("ecra-jogo");   
}

function casaAtual() {
    const piloto = obterPilotoDaVez();
    return dados.casas[piloto.posicao];
}

async function recuarCasas(casas) {
    for (let i = 0; i < casas; i++) {
        recuarPilotoDaVez(RECUAR, dados.casas.length);
        desenharPecas(obterPilotos(), dados.casas);
        tocarEfeito("mover");
        await esperar(PAUSA_MOVIMENTO);        
    }
}

async function animarDado(elementoDado, resultadoFinalDado) {
    tocarEfeito("dado");
    let pausa = PAUSA_INICIAL_DADO;
    let lado = 1;
    const angulo = MOVIMENTO_REDUZIDO ? 0 : ANGULO_LADO;
    for (let i = 0; i < VEZES_DADO; i++) {
        const aleatorioDado = lancarDado();
        elementoDado.textContent = aleatorioDado;
        elementoDado.style.transition = `transform ${pausa}ms`;
        elementoDado.style.transform = `rotate(${angulo * lado}deg)`;
        lado = lado * TROCAR_LADO;
        await esperar(pausa);
        pausa += AUMENTO_PAUSA;
    }
    elementoDado.style.transform = "rotate(0deg)";
    elementoDado.textContent = resultadoFinalDado;
}

async function lancarDadoCurva() {
    const resultadoDadoCurva = lancarDado();
    caixaDadoCurva.textContent = "-";
    abrirJanela("janela-dado-curva");
    await esperar(PAUSA_DADO);
    await animarDado(caixaDadoCurva, resultadoDadoCurva);
    await esperar(PAUSA_DADO);
    janelaDadoCurva.close();
    return resultadoDadoCurva;
}

btnIniciar.addEventListener("click", () => {
    trocarEcras("ecra-configuracao");
    const radioSelecionado = document.querySelector('input[name="num-jogadores"]:checked');
    criarListaJogadores(Number(radioSelecionado.value), dados.motas);
});

btnsJanela.forEach((b) => {
    b.addEventListener("click", () => {
        if (b.dataset.janela === "classificacao") {
            desenharClassificacao(lerVitorias());
        }
        abrirJanela(b.dataset.janela);
    });
});

btnVoltar.addEventListener("click", () => {
    trocarEcras("ecra-inicial");
});

radioJogadores.forEach((n) => {
    n.addEventListener("change", () => {
        criarListaJogadores(Number(n.value), dados.motas);
    });
});

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const jogadores = lerJogadores();
    const erro = validarJogadores(jogadores);
    paragrafoErro.textContent = erro;
    if (erro) {
        return;
    }
    iniciarCorrida(jogadores, dados.motas);
    guardarCorrida(obterEstado());
    mostrarCorrida();
});

btnDado.addEventListener("click", async () => {
    btnDado.disabled = true;
    btnSair.disabled = true;
    mostrarMensagem("");
    const resultadoDado = lancarDado();
    let curvaPerfeita = false;
    await animarDado(numDado, resultadoDado);
    await esperar(PAUSA_DADO);
    for (let i = 1; i <= resultadoDado; i++) {
        avancarPilotoDaVez(dados.casas.length);
        desenharPecas(obterPilotos(), dados.casas);
        tocarEfeito("mover");
        if (pilotoDaVezVenceu()) {
            break;
        }
        //CURVA EVENTO
        if (casaAtual().tipo === "C" && !curvaPerfeita) {
            await esperar(PAUSA_ANTES_AVISO);
            const dadoCurva = await lancarDadoCurva();
            //DESPISTE
            if (dadoCurva === 1) {
                mostrarMensagem(`${obterPilotoDaVez().nome} teve um DESPISTE!`);
                await mostrarAviso(dados.curvas.despiste);
                await recuarCasas(CASA_DESPISTE);
                break;
            //SUCESSO
            } else if (dadoCurva === 6) {
                mostrarMensagem(`${obterPilotoDaVez().nome} fez CURVA PERFEITA!`);
                await mostrarAviso(dados.curvas.perfeito); 
                curvaPerfeita = true; 
            } else {
                mostrarMensagem(`${obterPilotoDaVez().nome} fez a CURVA!`);
                await mostrarAviso(dados.curvas.normal);
            }
        }
        await esperar(PAUSA_MOVIMENTO);
    }
    //CASA EVENTO
    if (casaAtual().tipo === "E") {
        await esperar(PAUSA_ANTES_AVISO);
        const carta = tirarCarta(dados.eventos);
        mostrarMensagem(`${carta.nome} | ${carta.descricao}`);
        await mostrarAviso(carta);
        if (carta.casas > 0) {
            for (let i = 0; i < carta.casas; i++) {
                avancarPilotoDaVez(dados.casas.length);
                desenharPecas(obterPilotos(), dados.casas);
                tocarEfeito("mover");
                if (pilotoDaVezVenceu()) {
                    break;
                }
                await esperar(PAUSA_MOVIMENTO);
            }    
        } else {
            await recuarCasas(Math.abs(carta.casas));
        }
    }  
    desenharPosicoes(obterPilotos(), dados.casas.length);

    //VENCER CORRIDA
    if (pilotoDaVezVenceu()) {
        const vencedor = obterPilotoDaVez();
        const infoVitoria = {
            nome: vencedor.nome,
            mota: vencedor.mota,
            data: new Date().toLocaleDateString("pt-PT"),
        };
        guardarVitorias(infoVitoria);
        mostrarVitoria(vencedor);
        apagarCorrida();
        abrirJanela("vitoria");
        tocarEfeito("vitoria");
        return;
    }
    passarTurno();
    guardarCorrida(obterEstado());
    mostrarVez();
    mostrarVolta();
    btnDado.disabled = false;
    btnSair.disabled = false;
});

janelaVitoria.addEventListener("close", () => {
    trocarEcras("ecra-inicial");
    tocarMusicaMenu();
});

btnSair.addEventListener("click", () => {
    if (confirm("Queres sair da corrida?")) {
        apagarCorrida();
        trocarEcras("ecra-inicial");
        tocarMusicaMenu();
    }
});

btnLimparClassificacao.addEventListener("click", () => {
    if (confirm("Pretende eliminar a classificação existente?")) {
        apagarVitorias();
        mensagemOpcoes.textContent = "Lista classificações eliminada!";
    }
});

btnTema.addEventListener("click", () => {
    alternarTema();
});

janelaOpcoes.addEventListener("close", () => {
    mensagemOpcoes.textContent = "";
});

document.querySelectorAll(".controlo-som").forEach((controlo) => {
    const canal = controlo.dataset.canal;
    const slider = controlo.querySelector('input[type="range"]');
    const botao = controlo.querySelector(".btn-mute");

    slider.addEventListener("input", () => {
        definirVolume(canal, Number(slider.value));
    });
    botao.addEventListener("click", () => {
        alternarMute(canal);
    });
});

document.addEventListener("click", (evento) => {
    if (evento.target.closest("button")) {
        tocarEfeito("clique");
    }
});

const corridaGuardada = lerCorrida();
if (corridaGuardada) {
    restaurarCorrida(corridaGuardada);
    mostrarCorrida();
} else {
    tocarMusicaMenu();
}