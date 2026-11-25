import { booksLink, codeBlock, cues, slide } from '../../workshop/slide.js'
import detectiveGlungus from '../welcome/02-no-experience/assets/detective-glungus.jpeg'

export default slide('Case closed, Detective Glungus.', `
  <div class="meme-layout">
    <div>
      <p class="big-text">You wrote a page, took one apart, and turned it into rows.</p>
      <p>On your own computer, this gets the page:</p>
      ${codeBlock('python', `import requests

url = "https://books.toscrape.com/"
html = requests.get(url, timeout=10).content`)}
      <p>${booksLink}</p>
      <p class="exercise">Questions?</p>
    </div>
    <img class="meme-image" src="${detectiveGlungus}" alt="Detective Glungus, a cat wearing a detective hat with a magnifying glass">
  </div>
`, cues('1:52–2:00 · Recap and questions', {
  Ask: 'Who can explain the three steps? Expected: get the HTML, find the pieces, keep the rows.',
  Say2: 'You do not need to remember every line. Remember what happens, then look up how to write it.',
  Say: 'To run this at home, install Python, then pip install requests beautifulsoup4. Use that html line and the same BeautifulSoup lines.',
  Do: 'Invite everyone to bookmark the deck. Their edits stay in that browser until they press Reset or clear site data.',
}), { id: 'closing' })
