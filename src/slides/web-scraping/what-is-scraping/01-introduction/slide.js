import { cues, slide } from '../../../../workshop/slide.js'
import lockedIn from './assets/locked-in.jpeg'
import laptopMeltdown from './assets/laptop-meltdown.jpeg'
import scraperTool from './assets/scraper-tool.png'

export default [
  slide('Take a break', `
    <div class="meme-layout break-layout">
      <p class="big-text">10 minutes. Look away from your screen for a bit.</p>
      <img class="meme-image" src="${laptopMeltdown}" alt="A blue doodle of someone melting into a puddle over their laptop">
    </div>
  `, cues('0:54–1:04 · Break', {
    Do: 'Leave this slide open. Showing it downloads Python in the background. Press Run Python on step 1 to check that the status says live site.',
    Ask: 'Invite anyone stuck on DevTools to get help now.',
  }), { id: 'break' }),

  slide('Not this kind of scraper', `
    <div class="meme-layout break-layout">
      <p class="big-text"><strong>Web scraping</strong> means collecting information from web pages with code.</p>
      <img class="meme-image" src="${scraperTool}" alt="Two gloved hands holding a wide metal scraping tool">
    </div>
  `, cues('1:04–1:05 · The idea', {
    Ask: 'How long would copying 1,000 book prices by hand take?',
    Say: 'We write the steps once and the computer repeats them.',
  }), { id: 'scraping' }),

  slide('From a card to a row', `
    <div class="goal">
      <div class="book-card" role="img" aria-label="A book card: A Light in the Attic, 51 pounds 77">
        <span>A Light in the ...</span><strong>£51.77</strong>
      </div>
      <span class="big-arrow" aria-hidden="true">→</span>
      <table class="map-table">
        <thead><tr><th>title</th><th>price</th></tr></thead>
        <tbody>
          <tr><td>A Light in the Attic</td><td>£51.77</td></tr>
          <tr><td>Tipping the Velvet</td><td>£53.74</td></tr>
          <tr><td>Soumission</td><td>£50.10</td></tr>
        </tbody>
      </table>
    </div>
    <ol class="flow"><li>Get the HTML</li><li>Find the pieces</li><li>Keep the rows</li></ol>
    <img class="meme-corner" src="${lockedIn}" alt="A cat at a desktop computer under the words Locked In">
  `, cues('1:05–1:07 · Show the target', {
    Say: 'This table is what we will make. Your browser may not read another website directly, so this site passes the shop page to the editor.',
    Demo: 'Match the first card to the first row.',
    Note: 'If the live page cannot be reached, the editor uses a saved copy of 8 books and says so under the code.',
  }), { id: 'goal' }),
].join('')
