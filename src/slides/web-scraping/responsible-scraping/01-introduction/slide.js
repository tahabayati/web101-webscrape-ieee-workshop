import { cues, slide } from '../../../../workshop/slide.js'
import apisAndScrapers from './assets/apis-vs-scrapers.jpeg'
import kantBook from './assets/kant-book.jpeg'

export default [
  slide('First, look for an API', `
    <div class="split">
      <div>
        <p class="big-text">An <strong>API</strong> is a door a site builds for programs.</p>
        <p>If there is one, or a download button, use that before scraping.</p>
      </div>
      <img class="tall" src="${apisAndScrapers}" alt="A meme: APIs shown as friendly waiters, web scrapers shown as a pirate crew">
    </div>
  `, cues('1:48–1:49 · The polite way in', {
    Say: 'An API hands you data on purpose, already tidy. Scraping is reading a page that was made for people.',
    Ask: 'Which crew would you rather be served by?',
  }), { id: 'api-first' }),

  slide('Ethical scraping', `
    <div class="split">
      <div>
        <ul class="tiles two">
          <li><span class="tile-icon">Check</span>Read the terms and <code>robots.txt</code>.</li>
          <li><span class="tile-icon">Go slowly</span>Pause between requests. Stop if asked.</li>
          <li><span class="tile-icon">Respect people</span>Leave personal data and locked areas alone.</li>
          <li><span class="tile-icon">Practise safely</span>Use sites made for it, like Books to Scrape.</li>
        </ul>
        <p class="callout">Being able to read a page does not mean you may reuse its data.</p>
      </div>
      <img class="tall" src="${kantBook}" alt="A meme: a copy of Immanuel Kant’s Critique of Pure Reason with a corner torn and chewed away">
    </div>
  `, cues('1:49–1:52 · Ethics', {
    Say: 'Someone already scraped this copy of Kant. His test for right and wrong is useful here: what if everyone did what you are about to do?',
    Ask: 'What if everyone in this room requested a small site 100 times a second? Would you scrape classmates’ social media profiles? Why not?',
    Say2: 'robots.txt tells automated visitors what the owner asks of them. It does not grant permission to reuse data.',
    Note: 'Books to Scrape says “We love being scraped!” in its header. The book in the photo is about knowledge; Kant’s ethics are in other works.',
  }), { id: 'ethics' }),
].join('')
