import { cues, frontEndLab, slide } from '../../../workshop/slide.js'
import { fullPage, styledPage } from '../page-example.js'
import parrots from './assets/html-vs-css.jpeg'

const linkedPage = fullPage.replace('</head>', '  <link rel="stylesheet" href="style.css">\n  </head>')

const named = styledPage(
  '<h1>Hello!</h1>',
  '<p id="name">My name is Mia.</p>',
  '<p>I like <b>cats</b>.</p>',
)

const pets = styledPage(
  '<h1>Hello!</h1>',
  '<p id="name">My name is Mia.</p>',
  '<p class="pet">Luna the cat</p>',
  '<p class="pet">Max the dog</p>',
  '<p>My homework</p>',
)

export default [
  slide('What is CSS?', `
    <div class="split">
      <div>
        <p><strong>Cascading Style Sheets</strong></p>
        <p class="big-text">It tells the browser how the page <em>looks</em>: colours, sizes and spacing.</p>
        <p>Same content. Better feathers.</p>
      </div>
      <img src="${parrots}" alt="A meme: a featherless bird labelled HTML next to a bright red and blue parrot labelled CSS">
    </div>
  `, cues('0:21–0:22 · What is CSS', {
    Say: 'HTML put the words on the page. CSS decides how they look. It is the same bird, now dressed.',
    Ask: 'What would you change first on the page you just wrote?',
  }), { id: 'what-is-css' }),

  slide('CSS changes how it looks', frontEndLab('css-rule', {
    html: linkedPage,
    css: `h1 {
  color: purple;
}`,
  }, '<strong>Your turn:</strong> change <code>purple</code> to <code>green</code>, <code>tomato</code> or <code>deeppink</code>.', { tabs: ['style.css'] }),
  cues('0:22–0:24 · One rule, one property', {
    Say: 'h1 picks what to style. color is the property. purple is the value.',
    Demo: 'Change the value and watch the heading.',
    Ask: 'Pick your own color. What happens if you misspell it? Expected: the color falls back to black.',
    Pause: 'About a minute. Keep the colon and the semicolon.',
  }), { id: 'css' }),

  slide('Two files, one link', frontEndLab('css-link', {
    html: linkedPage,
    css: `h1 {
  color: purple;
}`,
  }, 'Find the <code>&lt;link&gt;</code> line. <strong>Your turn:</strong> delete it, look, then press Reset.', { open: 'index.html' }),
  cues('0:24–0:26 · The stylesheet link', {
    Say: 'HTML lives in index.html and CSS lives in style.css. This line in head connects them.',
    Demo: 'Switch between the two tabs. Remove the link line and show that the color disappears, then Reset.',
    Expect: 'Without the link the heading is black.',
  })),

  slide('#id picks one named element', frontEndLab('css-id', {
    html: named,
    css: `#name {
  color: tomato;
}`,
  }, '<strong>Your turn:</strong> move <code>id="name"</code> to the other paragraph. What changes?', { open: 'index.html' }),
  cues('0:26–0:28 · ID', {
    Say: 'An id is a name tag for one element. In HTML write id="name". In CSS add a hash: #name.',
    Demo: 'Show both tabs and match the spelling.',
    Ask: 'Predict which line turns red after the id moves, then try it.',
    Expect: 'Only the paragraph that holds the id is colored.',
  })),

  slide('.class styles several', frontEndLab('css-class', {
    html: pets,
    css: `#name {
  color: tomato;
}

.pet {
  color: green;
}`,
  }, '<strong>Your turn:</strong> make the homework line a pet too.', { open: 'index.html' }),
  cues('0:28–0:30 · Class', {
    Say: 'A class is a group label. Many elements can share it. In CSS it starts with a dot: .pet.',
    Ask: 'How many green lines now? Expected: 2. Add class="pet" to the homework line.',
    Pause: 'Two minutes. Check the quotes, and that there is no dot inside the HTML.',
    Expect: 'Three green lines.',
  })),

  slide('Predict, then look', frontEndLab('css-predict', {
    html: pets,
    css: `.pet {
  color: green;
}`,
  }, 'Change <code>.pet</code> to <code>p</code>. <strong>How many lines will be green?</strong> Guess, then press Show result.',
  { open: 'style.css', manual: true }),
  cues('0:30–0:32 · Prediction', {
    Ask: 'Hands up for 2, 3 or 4 lines before anyone presses Show result.',
    Expect: 'p turns 4 lines green. The heading stays black.',
    Next: 'Try #name (1 line), then .pet again (2 lines).',
    'If behind': 'Do only the first prediction.',
  }), { id: 'css-predict-slide' }),
].join('')
