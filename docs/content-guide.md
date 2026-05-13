# Guia de conteudo e configuracao

Este projeto tem duas paginas principais:

- `v1.html`: versao principal do site.
- `v2.html`: versao alternativa do site.

Os dois arquivos usam os mesmos estilos e scripts:

- `style.css`: visual geral, loader, grids, mapa, cards e responsivo principal.
- `responsive-fixes.css`: ajustes extras de tablet/mobile.
- `script.js`: interacoes, loader, plantas, mapa, animacoes e menu.

Quando uma alteracao visual ou de script nao aparecer no navegador, atualize o numero em `?v=` nos links de `style.css` e `script.js` dentro de `v1.html` e `v2.html`.

## Plantas e ambientes

As informacoes que alimentam as abas de plantas ficam no inicio do `script.js`.

Use `PLAN_DATA` para a area de produto da `v2`:

```js
const PLAN_DATA = [
  {
    id: 0,
    name: 'Sala & Varanda',
    area: '68',
    suites: '0',
    floor: 'Social',
    parking: 'Integrado',
    image: 'img/planta-tipo.jpg',
    specs: 'Integrados · 68m²',
    badgeLabel: 'ambiente'
  }
];
```

Use `PLAN_LAYOUT_DATA` para a area de plantas da `v1`:

```js
const PLAN_LAYOUT_DATA = [
  {
    id: 0,
    name: 'Tipo',
    area: '274',
    suites: '4',
    floor: 'Pavimento inteiro',
    parking: '3 vagas + verde',
    specs: '4 suites · 274m²',
    badgeLabel: 'planta',
    rail: [
      {
        key: '— Esquadrias',
        value: 'piso',
        suffix: '–teto',
        desc: 'Salas e suite master com vistas amplas e luz natural integral.'
      }
    ]
  }
];
```

Campos usados:

- `id`: numero da aba. Deve bater com `data-plan`.
- `name`: nome exibido da planta ou ambiente.
- `area`: metragem exibida na badge e nos cards.
- `suites`: quantidade de suites.
- `floor`: andar, pavimento ou tipo da planta.
- `parking`: vaga, uso ou informacao complementar.
- `image`: caminho da imagem, quando a imagem tambem for controlada via dados.
- `specs`: texto curto de apoio, se for usado no HTML.
- `badgeLabel`: palavra exibida antes do nome na badge, como `planta` ou `ambiente`.
- `rail`: lista de especificacoes detalhadas usada na `specs-rail` da `v1`.

Para criar uma nova aba, repita o mesmo indice em tres lugares:

```html
<div class="plan-tab" data-plan="0">...</div>
<img class="plan-img" data-plan="0" src="img/planta-tipo.jpg" alt="">
```

Se existir uma grade de informacoes, os valores sao atualizados automaticamente por estes atributos:

```html
<div class="spec-cell" data-plan-stat="area"><span class="v"></span></div>
<div class="spec-cell" data-plan-stat="suites"><span class="v"></span></div>
<div class="spec-cell" data-plan-stat="floor"><span class="v"></span></div>
<div class="spec-cell" data-plan-stat="parking"><span class="v"></span></div>
```

Na `v1`, a grade `specs-rail fade-in` usa especificacoes livres por planta. Cada card deve receber um indice `data-plan-spec` que aponta para a posicao dentro de `rail`:

```html
<div class="spec-cell" data-plan-spec="0">
  <span class="k"></span>
  <span class="v"></span>
  <span class="d"></span>
</div>
```

Formato de cada item em `rail`:

```js
{
  key: '— Esquadrias',
  value: 'piso',
  suffix: '–teto',
  desc: 'Salas e suite master com vistas amplas e luz natural integral.'
}
```

## Mapa da localizacao

O mapa interativo usa Leaflet. As bibliotecas entram no HTML:

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

O container do mapa deve ter o atributo `data-location-map`:

```html
<div class="location-leaflet" data-location-map></div>
```

Os pontos do mapa ficam em `script.js`, dentro da funcao `initLocationMaps()`, no objeto `points`:

```js
const points = {
  home: {
    coords: [-16.70492, -49.25963],
    title: 'Casa Conceito Marista',
    kicker: 'Endereco',
    desc: 'Rua 1.145, Qd. 262, Lotes 02/03, St. Marista, Goiania/GO.',
    popupOffset: [0, -18]
  },
  park: {
    coords: [-16.7086, -49.25705],
    title: 'Parque Areiao',
    kicker: 'Natureza',
    desc: 'Refugio verde a poucos minutos do endereco.',
    image: 'img/p09.jpg',
    popupOffset: [0, -18]
  }
};
```

Formato dos pontos:

- `coords`: coordenadas em `[latitude, longitude]`.
- `title`: titulo do card que abre no clique.
- `kicker`: etiqueta pequena acima do titulo.
- `desc`: descricao curta.
- `image`: imagem opcional do card.
- `popupOffset`: ajuste fino da posicao do card em pixels.

Para mover um card do popup, ajuste `popupOffset`. Exemplo: `[-20, -18]` move 20px para a esquerda.

## Cards sobre o mapa

Na secao de localizacao, a estrutura atual e:

```html
<div class="location-grid location-grid-map">
  <div class="location-leaflet" data-location-map></div>
  <div class="location-map fade-in">...</div>
  <div class="location-cats stagger">...</div>
</div>
```

O `.location-leaflet` ocupa o fundo da area. As divs `.location-map` e `.location-cats` ficam sobrepostas nos cantos esquerdo e direito. O comportamento e definido no `style.css`.

## Tela de loading

A tela que aparece ao abrir o site e configurada no inicio do `script.js`, em `LOADER_CONFIG`:

```js
const LOADER_CONFIG = {
  duration: 3000,
  order: ['label', 'secondaryLabel', 'line', 'brandRow'],
  label: 'TERRAL CONCEITO',
  secondaryLabel: 'apresenta:',
  brandLabel: 'CASA CONCEITO MARISTA',
  backgroundImage: 'img/loader-bg.jpg',
  logo: 'assets/logo-casa-conceito.png',
  backgroundOpacity: '.55',
  logoHeight: '42px',
  labelSpacing: '.42em',
  secondaryLabelSpacing: '.18em',
  brandLabelSpacing: '.24em'
};
```

Campos do loader:

- `duration`: tempo total do loading em milissegundos. `3000` equivale a 3 segundos.
- `order`: ordem dos elementos dentro do centro do loader.
- `label`: primeira label.
- `secondaryLabel`: segunda label.
- `brandLabel`: terceira label, usada junto da logo.
- `backgroundImage`: imagem de fundo da tela de loading.
- `logo`: imagem da marca.
- `backgroundOpacity`: opacidade da imagem de fundo.
- `logoHeight`: altura da logo.
- `labelSpacing`: espacamento entre letras da primeira label.
- `secondaryLabelSpacing`: espacamento entre letras da segunda label.
- `brandLabelSpacing`: espacamento entre letras da terceira label.

Os nomes aceitos em `order` sao:

- `label`: primeira label.
- `secondaryLabel`: segunda label.
- `brandLabel`: terceira label isolada.
- `logo`: imagem da logo.
- `line`: linha vertical animada.
- `brandRow`: terceira label e logo na mesma linha.

Exemplos de ordem:

```js
// Formato atual
order: ['label', 'secondaryLabel', 'line', 'brandRow']

// Logo primeiro
order: ['logo', 'label', 'secondaryLabel', 'line']

// Linha entre a label e a logo
order: ['label', 'line', 'secondaryLabel', 'brandRow']
```

Para quebrar linha em uma label, use `\n` ou `<br>`:

```js
label: 'TERRAL CONCEITO\nApresenta:'
```

O visual base do loader fica em `style.css`, na secao `LOADER`. Tambem da para ajustar pelas variaveis CSS do `#loader`:

```css
#loader{
  --loader-duration:3s;
  --loader-bg-opacity:.55;
  --loader-logo-height:42px;
  --loader-label-spacing:.42em;
  --loader-secondary-label-spacing:.18em;
  --loader-brand-label-spacing:.24em;
}
```

Para trocar so a imagem, coloque o arquivo em `img/` ou `assets/` e atualize o caminho em `LOADER_CONFIG`.

## Imagens

Use caminhos relativos ao projeto:

```html
<img src="img/nome-da-imagem.jpg" alt="Descricao curta">
```

Arquivos de imagem normalmente ficam em:

- `img/`: fotos de ambientes, mapa, plantas e pontos de interesse.
- `assets/`: logos e elementos institucionais.

Prefira nomes sem espacos, por exemplo `planta-tipo.jpg` ou `fachada-marista.webp`.

## Rodando localmente

Para abrir o projeto localmente:

```bash
npm install
npm run dev
```

Tambem funciona como site estatico. Se for usar um servidor simples:

```bash
python -m http.server 4180 --bind 127.0.0.1
```

Depois acesse `http://127.0.0.1:4180/v1.html` ou `http://127.0.0.1:4180/v2.html`.
