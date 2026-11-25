import { cues, slide } from '../../../workshop/slide.js'
import installQr from './assets/qr-installation.svg'
import deckQr from './assets/qr-presentation.svg'

const codes = [
  ['Installation guide', 'https://ieeetedu.vercel.app/workshops/web101-web-scraping', installQr],
  ['This presentation', 'https://web101-webscrape-ieee-workshop.vercel.app', deckQr],
]

export default slide('', `
  <p class="club-link"><a href="https://ieeetedu.vercel.app" target="_blank" rel="noopener">ieeetedu.vercel.app</a></p>
  <h2>Scan to get started</h2>
  <div class="qr-codes">
    ${codes.map(([name, url, image]) => `
      <figure>
        <img src="${image}" alt="QR code for ${name.toLowerCase()}">
        <figcaption><strong>${name}</strong><a href="${url}" target="_blank" rel="noopener">${url.replace('https://', '')}</a></figcaption>
      </figure>
    `).join('')}
  </div>
`, cues('0:02–0:03 · Scan', {
  Do: 'Leave this slide up while people scan. Ask everyone to open the presentation on a laptop, where typing works best.',
  Say: 'The left code is the installation guide for your own computer. The right code opens these slides.',
}), { id: 'scan' })
