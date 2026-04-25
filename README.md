# O Sonho — Experiência Interativa

Repositório estático para GitHub Pages.

## Estrutura

- `index.html` — entrada
- `chave-ar.html` — Chave I
- `chave-fogo.html` — Chave II
- `chave-terra.html` — Chave III
- `chave-metal.html` — Chave IV
- `chave-agua.html` — Chave V
- `chave-madeira.html` — Chave VI
- `chave-vazio.html` — Chave VII
- `livro-origem.html` — decisão final
- `final-destruicao.html` — final alternativo
- `final-salvacao.html` — final alternativo
- `style.css` — identidade visual e orbes
- `script.js` — lógica dos enigmas e som

## Como publicar no GitHub Pages

1. Cria um repositório no GitHub.
2. Faz upload destes ficheiros para a raiz do repositório.
3. Vai a `Settings > Pages`.
4. Escolhe `Deploy from a branch`.
5. Seleciona `main` e `/root`.
6. Guarda.

## Como editar os enigmas

Em cada página de chave, procura:

```html
<section class="panel panel--main puzzle-card" data-puzzle data-answer="FOGO" data-next="chave-terra.html">
```

Altera `data-answer` para a resposta correta.

Edita também o texto dentro dos blocos:

```html
<div class="puzzle-step is-visible" data-step="question">
```

e

```html
<div class="puzzle-step" data-step="success">
```

## Som por página

Coloca os ficheiros de som em `assets/audio/`.

Nomes esperados:

- `ar.mp3`
- `fogo.mp3`
- `terra.mp3`
- `metal.mp3`
- `agua.mp3`
- `madeira.mp3`
- `vazio.mp3`
- `origem.mp3`
- `destruicao.mp3`
- `salvacao.mp3`

O som só toca após o utilizador clicar no botão de som, porque os browsers bloqueiam autoplay.

## Links externos

Na landing page, procura:

```html
<a href="#" data-editable-link="comprar">Comprar o livro</a>
<a href="#" data-editable-link="instagram">Instagram</a>
<a href="#" data-editable-link="entre-sonhos">Entre Sonhos</a>
```

Substitui `#` pelos teus links reais.

## Imagens

A versão atual usa orbes e fundos em CSS. Podes adicionar imagens reais em `assets/img/` e depois referenciá-las no CSS.
