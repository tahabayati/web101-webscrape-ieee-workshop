import { cues, slide } from '../../../../workshop/slide.js'
import how from './assets/how.jpeg'
import internet from './assets/internet.png'
import cables from './assets/internet-cables.jpg'
import chrome from './assets/chrome.png'
import www from './assets/www.svg'
import servers from './assets/servers.png'

export default [
  slide('What is the web?', `
    <img class="web-intro-image" src="${how}" alt="A stick figure shrugs with both hands up">
  `, cues('0:04–0:05 · Guess first', {
    Ask: 'Is the Internet the same thing as the web? Take two guesses and do not correct them yet.',
  }), { background: '#352065', id: 'what-is-the-web' }),

  slide('Internet', `
    <div class="analogy-images internet-images">
      <img src="${internet}" alt="Diagram of phones, computers, a printer, and a server connected to the internet">
      <img src="${cables}" alt="A photo of the physical cables that carry data">
    </div>
  `, cues('0:05–0:06 · Internet', {
    Say: 'Roughly, the Internet is the hardware side: cables, radio links and connected devices that pass data to each other in small pieces called packets.',
    Demo: 'Point at the cables, then at the devices.',
    Note: 'It is a rough analogy. The Internet also needs software rules to move the data.',
  }), { id: 'internet' }),

  slide('World Wide Web', `
    <div class="analogy-images web-images">
      <img src="${chrome}" alt="Google Chrome, the browser">
      <span aria-hidden="true">↔</span>
      <img src="${www}" alt="WWW, the World Wide Web">
      <span aria-hidden="true">↔</span>
      <img src="${servers}" alt="Server racks that can host websites">
    </div>
  `, cues('0:06–0:07 · Web', {
    Say: 'Roughly, the web is the software side: linked pages that travel over the Internet. Chrome asks for them. Computers like these racks run server software and send them.',
    Ask: 'Name something that uses the Internet but is not a web page. Calls and online games are good answers.',
  }), { id: 'web' }),
].join('')
