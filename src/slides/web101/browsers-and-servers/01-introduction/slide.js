import { cues, slide } from '../../../../workshop/slide.js'
import chrome from '../../how-the-web-works/01-introduction/assets/chrome.png'
import servers from '../../how-the-web-works/01-introduction/assets/servers.png'

export default slide('One request, one response', `
  <p class="url-bar">books.toscrape.com</p>
  <div class="exchange">
    <figure><img src="${chrome}" alt=""><figcaption>Your browser</figcaption></figure>
    <div class="messages">
      <p><strong>1. Request</strong>“Can I have this page?” →</p>
      <p><strong>2. Response</strong>← “Here it is.” (HTML)</p>
    </div>
    <figure><img src="${servers}" alt=""><figcaption>A server</figcaption></figure>
  </div>
`, cues('0:07–0:08 · One exchange', {
  Say: 'You type an address and press Enter. Your browser asks a server for the page. The server answers with a text file written in HTML, and the browser draws it.',
  Note: 'A page usually needs more requests for pictures and styles. Skip DNS and status codes unless someone asks.',
  Next: 'What is inside that HTML? Let us write some.',
}), { id: 'request' })
