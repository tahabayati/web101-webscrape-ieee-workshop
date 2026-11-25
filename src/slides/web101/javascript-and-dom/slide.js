import { codeBlock, cues, frontEndLab, slide } from '../../../workshop/slide.js'
import calculatingCat from './assets/calculating-cat.jpeg'
import stairs from './assets/developer-stairs.jpeg'

const page = (...extra) => `<!doctype html>
<html>
  <body>
    <h1 id="title">Hello!</h1>
${extra.map((line) => `    ${line}`).join('\n')}
    <script src="script.js"></script>
  </body>
</html>`

export default [
  slide('What is JavaScript?', `
    <div class="split">
      <div>
        <ul class="tiles rows">
          <li><strong>HTML</strong> What is on the page</li>
          <li><strong>CSS</strong> How it looks</li>
          <li><strong>JavaScript</strong> What it does</li>
        </ul>
        <p class="big-text">JavaScript makes a page react: clicks, menus, messages.</p>
      </div>
      <img class="tall" src="${stairs}" alt="A meme titled New Developers be like: someone stretches from the HTML stair straight to the ChatGPT stair, skipping CSS, JavaScript and more">
    </div>
  `, cues('0:32–0:33 · One minute', {
    Say: 'JavaScript is code that runs in the browser. It can change a page after it has loaded, for example when you click.',
    Ask: 'Name something on a website that changes without a reload. Likes, menus and chat messages work.',
    Say2: 'The joke is skipping straight to the top step. AI helps more when you understand the steps below. Today we take three.',
  }), { id: 'javascript' }),

  slide('Code looks scarier than it is', `
    <div class="split">
      <div>
        <ol class="steps">
          <li><strong>Know</strong> what you want to happen.</li>
          <li><strong>Look up</strong> how to write it: docs, a search or AI.</li>
          <li><strong>Run it</strong> and check what happened.</li>
        </ol>
        <p class="callout">You don’t need to memorise code. You need to understand what it does.</p>
      </div>
      <img class="tall" src="${calculatingCat}" alt="A cat with a loading spinner, calculating, in front of a screen full of code">
    </div>
  `, cues('0:33–0:34 · Take the fear away', {
    Say: 'A screen full of code looks like this cat feels. Programmers read it one small line at a time, and they look things up every day.',
    Say2: 'The computer is still picky about spelling, so errors are normal. Reading the error is part of the job.',
    Ask: 'You already changed HTML and CSS today. Did you memorise it first?',
  }), { id: 'not-scary' }),

  slide('A tiny taste of JavaScript', frontEndLab('js-taste', {
    html: '<!doctype html>\n<script src="script.js"></script>',
    javascript: `// let gives a value a name
let name = "Mia";

// console.log shows it
console.log("Hello", name);
console.log(2 + 3);`,
  }, 'Just a taste, not a JavaScript course. <strong>Your turn:</strong> change <code>Mia</code>, then press <strong>Run JavaScript</strong>.',
  { tabs: ['script.js'], manual: true, runLabel: 'Run JavaScript', outputName: 'Console' }),
  cues('0:34–0:37 · Store it, show it', {
    Demo: 'Read it aloud: let name be Mia. Show Hello and the name. Show two plus three. Press Run JavaScript.',
    Say: 'Grey lines are comments: notes for people. Yellow is a value. That is enough syntax for today.',
    Ask: 'Change the name. Fast finishers: change the sum.',
    Pause: 'Two minutes. A red box means a typing slip, usually a missing quote or bracket.',
    Expect: 'Hello and the student’s name, then 5.',
  }), { id: 'js-first' }),

  slide('The browser builds a page tree', `
    <div class="dom-slide">
      ${codeBlock('html', `<body>
  <h1 id="title">Hello!</h1>
  <p>I like <b>cats</b>.</p>
</body>`)}
      <span class="big-arrow" aria-hidden="true">→</span>
      <ul class="tree">
        <li><span>body</span>
          <ul>
            <li><span>h1 #title</span> “Hello!”</li>
            <li><span>p</span>
              <ul><li><span>b</span> “cats”</li></ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <p>This tree is the <strong>DOM</strong>. JavaScript can read it and change it.</p>
  `, cues('0:37–0:38 · HTML becomes a tree', {
    Say: 'The browser reads the HTML text and builds this structure. Nesting in HTML becomes branches. (Text around the b element is left out to keep the picture small.)',
    Ask: 'Which element is inside p? Expected: b.',
  })),

  slide('Change one element', frontEndLab('dom-text', {
    html: page('<p>I like <b>cats</b>.</p>'),
    javascript: `// Find the heading
let title = document.querySelector("#title");

// Change its text
title.textContent = "Hi from JavaScript!";`,
  }, '<code>#title</code> is the same selector as in CSS. <strong>Your turn:</strong> change the message.', { open: 'script.js' }),
  cues('0:38–0:41 · Find, then change', {
    Demo: 'Open index.html: it says Hello! Open script.js and read the two comments, then the line under each. The preview shows the new text although the HTML file did not change.',
    Ask: 'Write your own message between the quotes.',
    Pause: 'Two minutes. A red box in the preview means a typing mistake. Compare with the original or press Reset.',
    Expect: 'The heading shows the student’s message.',
  })),

  slide('Wait for a click', frontEndLab('dom-click', {
    html: page('<button id="surprise">Click me</button>'),
    javascript: `// Find the heading and the button
let title = document.querySelector("#title");
let button = document.querySelector("#surprise");

// When the button is clicked...
button.addEventListener("click", () => {
  // ...change the heading
  title.textContent = "You clicked!";
});`,
  }, 'In English: <strong>when the button is clicked, change the heading.</strong> Click it, then change the message.', { open: 'script.js' }),
  cues('0:41–0:44 · Same change, on click', {
    Demo: 'Click Click me in the preview. Then read only the grey comments aloud: they tell the whole story.',
    Say: 'The change is the same one as before. addEventListener only says when. Nobody needs the brackets by heart.',
    Ask: 'Edit the message, then click again. Editing reloads the preview.',
    Expect: 'The heading changes only after the click.',
    Tip: 'After clicking inside the preview, click the white slide background before using arrow keys.',
  }), { id: 'dom-click-slide' }),
].join('')
