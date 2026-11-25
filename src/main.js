import Reveal from 'reveal.js'
import Highlight from 'reveal.js/plugin/highlight'
import Notes from 'reveal.js/plugin/notes'
import 'reveal.js/reveal.css'
import 'reveal.js/theme/white.css'
import './fonts.css'
import './style.css'
import './workshop/workshop.css'
import './workshop/code-colours.css'
import { preloadPython, setupPythonLabs } from './workshop/python-labs.js'
import { setupFrontEndLabs } from './workshop/front-end-labs.js'
import welcome from './slides/welcome/slide.js'
import noExperience from './slides/welcome/02-no-experience/slide.js'
import workspace from './slides/welcome/03-your-workspace/slide.js'
import scanToStart from './slides/welcome/04-scan-to-start/slide.js'
import howTheWebWorks from './slides/web101/how-the-web-works/01-introduction/slide.js'
import browsersAndServers from './slides/web101/browsers-and-servers/01-introduction/slide.js'
import htmlBasics from './slides/web101/html-basics/slide.js'
import cssBasics from './slides/web101/css-basics/slide.js'
import javascriptAndDom from './slides/web101/javascript-and-dom/slide.js'
import devTools from './slides/web101/dev-tools/01-introduction/slide.js'
import whatIsScraping from './slides/web-scraping/what-is-scraping/01-introduction/slide.js'
import pythonAndBeautifulsoup from './slides/web-scraping/python-and-beautifulsoup/01-introduction/slide.js'
import buildingAScraper from './slides/web-scraping/building-a-scraper/01-introduction/slide.js'
import stuck from './slides/web-scraping/building-a-scraper/02-stuck/slide.js'
import csvResult from './slides/web-scraping/building-a-scraper/03-csv/slide.js'
import responsibleScraping from './slides/web-scraping/responsible-scraping/01-introduction/slide.js'
import closing from './slides/closing/slide.js'

// Change this list to change the slide order.
const slides = [
  welcome,
  noExperience,
  scanToStart,
  workspace,
  howTheWebWorks,
  browsersAndServers,
  htmlBasics,
  cssBasics,
  javascriptAndDom,
  devTools,
  whatIsScraping,
  pythonAndBeautifulsoup,
  buildingAScraper,
  stuck,
  csvResult,
  responsibleScraping,
  closing,
]

document.querySelector('.slides').innerHTML = slides.join('')

const deck = new Reveal(document.querySelector('.reveal'), {
  // A wide canvas keeps code and preview side by side on a projector.
  width: 1200,
  height: 700,
  hash: true,
  slideNumber: true,
  transition: 'none',
  // The B and . keys would black out a beginner's screen.
  pause: false,
  keyboardCondition: (event) => {
    if (event.target.closest?.('pre[tabindex]') && event.key !== 'Escape') return false
    return event.key !== ' ' || !event.target.closest?.('button, a, summary')
  },
  plugins: [Highlight, Notes],
})

// Start the Python download from the break onwards.
const preloadNear = ({ currentSlide }) => {
  if (currentSlide.matches('#break, #scraping, #goal') || currentSlide.querySelector('.python-lab')) preloadPython()
}
deck.on('slidechanged', preloadNear)

deck.initialize().then(() => {
  setupFrontEndLabs()
  setupPythonLabs()
  preloadNear({ currentSlide: deck.getCurrentSlide() })
})
