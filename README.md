# O Sonho — GitHub Pages Starter

Mini-site estático para um jogo digital inspirado em **O Sonho**.

## Estrutura

- `index.html` — conteúdo e estrutura das páginas
- `style.css` — visual, responsividade e ambiente de Gaia
- `script.js` — navegação por hash, enigmas e progresso local

## Como publicar no GitHub Pages

1. Criar um repositório no GitHub, por exemplo `o-sonho-game`.
2. Fazer upload destes três ficheiros para a raiz do repositório.
3. Ir a **Settings > Pages**.
4. Em **Build and deployment**, escolher **Deploy from a branch**.
5. Escolher a branch `main` e a pasta `/root`.
6. Guardar.
7. O site ficará disponível em algo como:
   `https://UTILIZADOR.github.io/o-sonho-game/`

## QR code para a primeira chave

Usa o URL direto com hash:

`https://UTILIZADOR.github.io/o-sonho-game/#chave1`

Ou, com domínio próprio:

`https://oteudominio.pt/#chave1`

## Onde editar

### Links

No `index.html`, procura:

- `Comprar o livro`
- `Instagram`
- `Entre Sonhos`

Substitui os URLs pelos definitivos.

### Texto da Chave I

No `index.html`, procura:

`Chave I — A Chave do Ar`

Podes alterar o texto diretamente.

### Respostas do enigma

No `script.js`, procura:

- `if (["4", "QUATRO", "IV"].includes(answer))`
- `if (["XXIV", "IVXX"].includes(answer))`

Podes adicionar outras respostas aceites dentro das listas.

## Privacidade

Este MVP não recolhe nomes, emails ou dados pessoais. O progresso fica guardado apenas no browser do jogador através de `localStorage`.
