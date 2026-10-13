# Moto Grande Corrida '60



Jogo de tabuleiro de corrida de motas clássicas, inspirado nas corridas dos anos 60. Joga-se no browser, em modo hot seat: 2 a 6 jogadores partilham o mesmo computador e jogam à vez.



Jogar online: https://pugu-senpai.github.io/moto-grande-corrida-60/





\---



## Como se joga



1\. No menu inicial, carrega em **Iniciar Jogo**.

2\. Escolhe o número de jogadores (2 a 6), escreve os nomes e escolhe uma mota para cada um.

3\. Na tua vez, carrega em **Lançar dado**. A mota avança o número de casas que saiu.

4\. Ganha quem completar primeiro as **2 voltas** e cruzar a meta.



### Casas do circuito



|**CASA**|**O QUE ACONTECE**|
|-|-|
|Cinzenta - Casa Normal|Não acontece nada|
|Amarela - Casa Evento|Sai uma carta de evento aleatória, que pode ajudar ou atrapalhar|
|Vermelha - Casa Curva|Ao passar ou parar numa curva, lanças o dado curva|
|Meta|Início e fim de cada volta|





### Dado da curva



| Resultado | Efeito |

|---|---|

| 1 | \*\*Despiste\*\*: paras e recuas 2 casas |

| 2 a 5 | \*\*Curva normal\*\*: continuas o movimento |

| 6 | \*\*Curva perfeita\*\*: não precisas de lançar nas próximas curvas desse turno |



|**RESULTADO**|**EFEITO**|
|-|-|
|1|**Despiste:** Paras e recuas 2 casas|
|2 a 5|**Curva Normal:** Continuas o movimento|
|6|**Curva Perfeita:** Não precisas de lançar dado nas próximas curvas desse turno.|





\---



## Funcionalidades



\- 2 a 6 jogadores, cada um com uma mota de cor diferente

\- Circuito com 21 casas, curvas e 7 cartas de evento

\- Janelas com imagem para cada evento e curva

\- Painel de posições atualizado em tempo real

\- Classificação geral com as vitórias de todos os jogadores (ouro, prata e bronze)

\- Janela de vitória com confetis

\- Corrida guardada: se a página for recarregada, a corrida continua onde estava

\- Modo claro e modo escuro

\- Música e efeitos sonoros com volume e silêncio separados

\- Ecrã de carregamento

\- Adaptado a telemóvel na horizontal

\- Respeita a preferência de movimento reduzido do sistema



\---



## Tecnologias



\- HTML5 semântico (`dialog`, `fieldset`, `output`)

\- CSS3 (Grid, Flexbox, variáveis, container queries, media queries, animações)

\- JavaScript (ES Modules)

\- JSON local como base de dados (`data/dados.json`)

\- `localStorage` e `sessionStorage`



Sem bibliotecas externas. Fontes do Google Fonts: Bebas Neue, Oswald e Kaushan Script.



\---



## Estrutura de pastas



```

moto-grande-corrida-60/

├── index.html

├── css/

│   └── style.css

├── js/

│   ├── main.js            ponto de entrada, liga tudo

│   ├── jogo.js            regras e estado da corrida

│   ├── dados.js           carrega o dados.json com fetch

│   ├── ecras.js           troca entre ecrãs

│   ├── cartas.js          tira uma carta de evento ao acaso

│   ├── utils.js           dado, pausas, imagens e escaparHTML

│   ├── configuracao.js    formulário de jogadores

│   ├── pista.js           desenho da pista e das peças

│   ├── painel.js          lista de posições

│   ├── janelas.js         abertura das janelas e avisos

│   ├── vitoria.js         janela de vitória e confetis

│   ├── classificacao.js   classificação geral

│   ├── armazenamento.js   localStorage e sessionStorage

│   ├── tema.js            modo claro e escuro

│   └── som.js             música e efeitos sonoros

├── data/

│   └── dados.json         casas, eventos e curvas

└── assets/

         ├── img/

         └── mp3/

```



\---



## Requisitos do projeto





|**REQUESITOS**|**ONDE ESTÁ**|
|-|-|
|"if/else", "switch", "ternário"|"if/else" no dado da curva;<br />"switch" no tipo de casa ("pista.js");<br />Ternários nas voltas ("jogo.js") e no plural de vitórias ("classificacao.js").|
|"for", "map", "filter", "reduce"|"for" no movimento das motas ("main.js");<br />"map" nos pilotos e posições ("jogo.js", "painel.js");<br />"filter" nas vitórias do vencedor ("vitoria.js");<br />"reduce" na contagem de vitórias ("classificacao").|
|String, números e booleanos|Validação dos nomes com "trim", "include" e "toLowerCase":<br />- Nomes vazios, repetidos ou com "<" e ">" ("configuracoes.js")<br />- Volume em percentagem ("som.js")<br />- Modo escuro e silêncio|
|Dados imutáveis|Pilotos atualizados com "map" e "spread" ("jogo.js");<br />Ordenação de cópias com "\\\[...pilotos].sort()" ("painel.js").|
|DOM dinâmico|"createElement", "append", "innerHTML" e template strings em "painel.js", "classificacao" e "pista.js".|
|Eventos|Clique, submissão do formulário, sliders de volume, fecho da janela.|
|Scope e closures|Estado privado dos módulos:<br />- "listaPilotos" e "turno" em "jogo.js";<br />- "canais" em "som.js";<br />- Promise que fecha sobre o temporizador em "janelas.js".|
|Assincronismo|"fetch" com "async/await" e "try/catch" para o "dados.json", com mensagem de erro no ecrã de carregamento;<br />"Promise2 e "Promise.all" no carregamento, nas animações e nos avisos.|
|Módulos|Código dividido em vários ficheiros com "import" e "export".|
|Persistência|"localStorage": vitórias, tema e som;<br />"sessionStorage": corrida em curso.|





### Chaves guardadas no browser





|CHAVE|ONDE|O QUE GUARDA|
|-|-|-|
|mgc60-vitorias|localStorage|Vitórias de todos os jogadores|
|mgc60-tema|localStorage|Modo claro ou escuro|
|mgc60-som|localStorage|Volume e silêncio da música e dos efeitos|
|mgc60-corrida|sessionStorage|Estado da corrida em curso|





\---



## Correr localmente



O jogo usa ES Modules e "fetch", por isso não funciona a abrir o "index.html" diretamente. É preciso um servidor local:



1\. Abre a pasta no VS Code.

2\. Instala a extensão **Live Server**.

3\. Clica com o botão direito no "index.html" e escolhe **Open with Live Server**.



\---



## Créditos



\- **Código e design:** Bruno Morais

\- **Imagens** (cartas, pódio, título, fundos): geradas com IA e editadas pelo autor

\- **Sons:** bibliotecas de sons royalty free, sem obrigação de atribuição

\- **Fontes:** Google Fonts



\---



## Melhorias futuras



\- Cartas de suporte na mão do jogador

\- Pitstop

\- Multijogador online

