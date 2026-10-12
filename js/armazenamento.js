const CHAVE_VITORIA = "mgc60-vitorias";
const CHAVE_CORRIDA = "mgc60-corrida";
const CHAVE_TEMA = "mgc60-tema";
const CHAVE_SOM = "mgc60-som";

//VITORIA
export function lerVitorias() {
    const vitoria = localStorage.getItem(CHAVE_VITORIA);
    if (!vitoria) {
        return [];
    }    
    return JSON.parse(vitoria);
}

export function guardarVitorias(vitoria) {
    const vitorias = lerVitorias();
    const novaVitorias = [...vitorias, vitoria];
    localStorage.setItem(CHAVE_VITORIA, JSON.stringify(novaVitorias));
}

//CORRIDA
export function lerCorrida() {
    const corrida = sessionStorage.getItem(CHAVE_CORRIDA);
    if (!corrida) {
        return null;
    }
    return JSON.parse(corrida);
}

export function guardarCorrida(estado) {
    sessionStorage.setItem(CHAVE_CORRIDA, JSON.stringify(estado));
}

export function apagarCorrida() {
    sessionStorage.removeItem(CHAVE_CORRIDA);
}

export function apagarVitorias() {
    localStorage.removeItem(CHAVE_VITORIA);
}

//TEMA
export function guardarTema(tema) {
    localStorage.setItem(CHAVE_TEMA, JSON.stringify(tema));
}

export function lerTema() {
    const tema = localStorage.getItem(CHAVE_TEMA);
    if (!tema) {
        return null;
    }
    return JSON.parse(tema);
}

//SOM
export function guardarSom(configuracao) {
    localStorage.setItem(CHAVE_SOM, JSON.stringify(configuracao));
}

export function lerSom() {
    const som = localStorage.getItem(CHAVE_SOM);
    if (!som) {
        return null;
    }
    return JSON.parse(som);
}