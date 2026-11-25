import { cues, frontEndLab, slide } from '../../../workshop/slide.js'
import { fullPage, heading } from '../page-example.js'
import logo from './assets/html5-logo.svg'
import codePhoto from './assets/html-code.jpg'

export default [
  slide('What is HTML?', `
    <div class="html-intro">
      <div>
        <img class="html-logo" src="${logo}" alt="The HTML5 logo">
        <p><strong>HyperText Markup Language</strong></p>
        <p>It tells the browser what is on a page: headings, text, pictures and links.</p>
      </div>
      <img class="html-photo" src="${codePhoto}" alt="Rows of colourful web code on a computer screen">
    </div>
    <p class="credit">HTML5 logo: <a href="https://commons.wikimedia.org/wiki/File:HTML5_logo_and_wordmark.svg" target="_blank" rel="noopener">W3C</a>,
      <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener">CC BY 3.0</a>.
      Photo: <a href="https://commons.wikimedia.org/wiki/File:Html_php_java_source_code_(38891650224).jpg" target="_blank" rel="noopener">Markus Spiske</a>, CC0.</p>
  `, cues('0:08–0:09 · What is HTML', {
    Say: 'HTML is how we label the parts of a page. Markup means labels around content. Hypertext means text that can link to other text.',
    Ask: 'Point at the photo: does this look scary? Most of it is JavaScript. The HTML you write next is one short line.',
  }), { id: 'what-is-html' }),

  slide('Your first line of HTML', frontEndLab('html-hello', { html: heading },
    '<strong>Your turn:</strong> change <code>Hello!</code> to your name. Watch the preview.'),
  cues('0:09–0:11 · Type and see', {
    Demo: 'Change Hello! to your own name, slowly. Point at the preview as it updates.',
    Ask: 'Everyone change it to anything you like.',
    Pause: 'Give one minute. Helpers: look for a missing &lt; or &gt;. Reset fixes it.',
    Expect: 'A large heading with the student’s text.',
  }), { id: 'html' }),

  slide('One element, three parts', `
    <div class="anatomy" role="img" aria-label="Opening tag h1, content Hello!, closing tag slash h1">
      <div><code>&lt;h1&gt;</code><span>opening tag</span></div>
      <div><code>Hello!</code><span>content</span></div>
      <div><code>&lt;/h1&gt;</code><span>closing tag</span></div>
    </div>
    <p class="big-text">Together they make one <strong>element</strong>. <code>h1</code> means “main heading”.</p>
  `, cues('0:11–0:12 · Name the parts', {
    Demo: 'Point at each part. Circle the slash in the closing tag.',
    Ask: 'Which part did you change? Expected: the content.',
  })),

  slide('Add a paragraph', frontEndLab('html-paragraph', { html: `${heading}
<p>I like cats.</p>` },
    '<code>&lt;p&gt;</code> is a paragraph. <strong>Your turn:</strong> add a second paragraph on a new line.'),
  cues('0:12–0:15 · One new element', {
    Demo: 'Compare the two lines. Both open, hold content and close.',
    Ask: 'Type your own paragraph under mine.',
    Pause: 'Two minutes. Common mistake: forgetting the slash in &lt;/p&gt;.',
    Expect: 'Two separate paragraphs under the heading.',
  })),

  slide('Elements can sit inside elements', frontEndLab('html-nesting', { html: `${heading}
<p>I like <b>cats</b>.</p>` },
    '<code>&lt;b&gt;</code> makes text bold. <strong>Your turn:</strong> make one more word bold.'),
  cues('0:15–0:18 · Nesting', {
    Say: 'The b element is inside the p element. That is nesting. Like a box in a box, close the inner one first.',
    Demo: 'Move &lt;/b&gt; to the end of the line, ask what will happen, then undo.',
    Ask: 'Wrap any other word in &lt;b&gt; and &lt;/b&gt;.',
    Expect: 'Two bold words in the paragraph.',
  })),

  slide('The whole file', frontEndLab('html-page', { html: fullPage },
    '<code>head</code> holds information about the page. <code>body</code> holds what you see. <strong>Your turn:</strong> change the <code>title</code>.'),
  cues('0:18–0:21 · A complete page', {
    Say: 'You already wrote the lines inside body. The rest is the frame around them. doctype says this is modern HTML.',
    Demo: 'Change the title and point at “tab name” above the preview. Then change the heading to show that body content appears in the page.',
    Ask: 'Where would a new paragraph go? Expected: inside body.',
    'If behind': 'Show it without the student edit.',
  }), { id: 'html-page-slide' }),
].join('')
