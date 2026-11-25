import { booksLink, codeBlock, cues, slide } from '../../../../workshop/slide.js'
import questionCat from './assets/question-cat.jpeg'
import hackerDog from './assets/hacker-dog.jpeg'
import hackerCat from './assets/hacker-cat.jpeg'

export default [
  slide('Where does this price come from?', `
    <div class="meme-layout">
      <div>
        <div class="book-card" role="img" aria-label="A book card: A Light in the Attic, 51 pounds 77">
          <span>A Light in the ...</span><strong>£51.77</strong>
        </div>
        <p class="big-text">${booksLink}</p>
        <p>Right-click a price → <strong>Inspect</strong></p>
      </div>
      <img class="meme-image" src="${questionCat}" alt="A cat with question marks and a thinking-face hand">
    </div>
  `, cues('0:44–0:46 · Open the practice site', {
    Say: 'This shop is a practice site made for scraping. Its prices are random.',
    Demo: 'Open the link in a new tab, right-click the first price and choose Inspect. Zoom DevTools with Ctrl/Cmd and + so the room can read it.',
    Pause: 'Wait until everyone sees DevTools. Other keys: F12, or Cmd+Option+I on a Mac. In Safari, ask them to use Chrome or Edge.',
    Tip: 'Keep this tab open for the next four slides.',
  }), { id: 'devtools' }),

  slide('Elements: find the price', `
    <div class="split">
      <div>
        <ol>
          <li>In <strong>Elements</strong>, find the highlighted line.</li>
          <li>Double-click <code>£51.77</code>, type <code>£0.01</code>, press Enter.</li>
          <li>Reload the page. What happens to your bargain?</li>
        </ol>
        ${codeBlock('html', '<p class="price_color">£51.77</p>')}
      </div>
      <img class="square" src="${hackerDog}" alt="A grinning dog typing on a keyboard in front of falling green code">
    </div>
  `, cues('0:46–0:48 · The DOM, live', {
    Demo: 'Name the parts they know: p element, class price_color, content £51.77.',
    Ask: 'Did we change the shop? Expected: no. We changed our browser’s copy, the DOM, and reload brought the server’s price back.',
    Pause: 'Give everyone a minute to make their own bargain.',
    Say: 'Feeling like a hacker? You only changed your own copy.',
  })),

  slide('How do we find all the book cards?', `
    ${codeBlock('html', `<article class="product_pod">
  …
  <h3><a title="A Light in the Attic" …>A Light in the ...</a></h3>
  <div class="product_price">
    <p class="price_color">£51.77</p>
  </div>
</article>`)}
    <p>Move up in <strong>Elements</strong> until the whole card lights up. Then ask the <strong>Console</strong> how many there are:</p>
    ${codeBlock('javascript', 'document.querySelectorAll(".product_pod").length')}
  `, cues('0:48–0:51 · Find the repeating box', {
    Demo: 'Hover the lines above the price until article.product_pod highlights one whole card. Open another card to show the same shape. Point at the title attribute: the visible text is cut off.',
    Ask: 'Which class repeats? Then type the Console line together. querySelectorAll means “every match”, and the dot means class, as in CSS.',
    Expect: '20',
    Tip: 'Chrome may block pasting into the Console. Typing the line works.',
  }), { id: 'cards' }),

  slide('Did the server send the price?', `
    <div class="split">
      <div>
        <ol>
          <li>Open <strong>Network</strong> and reload.</li>
          <li>Click the first row, <code>books.toscrape.com</code>.</li>
          <li>Open <strong>Response</strong> and search for <code>51.77</code>.</li>
        </ol>
        <p class="callout">Search with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>F</kbd>.</p>
      </div>
      <img class="small" src="${hackerCat}" alt="A black cat typing on a laptop surrounded by many open windows">
    </div>
  `, cues('0:51–0:53 · The response', {
    Say: 'Network looks busy, like the cat’s screen. We only need one row. Elements shows the page now; Network → Response shows what the server sent.',
    Demo: 'Do the three steps. Show the matching line.',
    Ask: 'Is the price in the response? Expected: yes, so a scraper can read it from the HTML.',
    Note: 'On some sites JavaScript adds data later, so it appears in Elements but not in this response.',
    'If stuck': 'The Network list is empty until the page reloads.',
  })),

  slide('This is what our scraper will read', `
    <table class="map-table">
      <thead><tr><th>We want</th><th>We look for</th></tr></thead>
      <tbody>
        <tr><td>Each book</td><td><code>.product_pod</code></td></tr>
        <tr><td>Its title</td><td><code>h3 a</code>, the <code>title</code> attribute</td></tr>
        <tr><td>Its price</td><td><code>.price_color</code></td></tr>
      </tbody>
    </table>
  `, cues('0:53–0:54 · Hand-off', {
    Ask: 'Cover the right column and let students say each selector from what they saw. h3 a means “a link inside an h3”.',
    Say: 'After the break, Python reads exactly these.',
  }), { id: 'selectors' }),
].join('')
