export function lancarDado() {
    return Math.floor(Math.random() * 6) + 1;
}

export function esperar(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function precarregarImagem(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = src;
    });
}