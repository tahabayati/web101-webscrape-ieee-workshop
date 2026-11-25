import { codeBlock, cues, pythonLab, slide } from '../../../../workshop/slide.js'
import { parsePage } from '../page-code.js'

// The scraper as sentences, each beside the line that does it.
const recipe = [
  ['Get the page', 'html = requests.get(url).content'],
  ['Make the page searchable', 'soup = BeautifulSoup(html, "html.parser")'],
  ['For every book card', 'for card in soup.select(".product_pod"):'],
  ['take its title', 'title = card.select_one("h3 a")["title"]'],
  ['take its price', 'price = card.select_one(".price_color").get_text()'],
  ['and show both', 'print(title, price)'],
]

export default [
  slide('A tiny taste of Python', pythonLab('py-taste', `# A name for a value
name = "Mia"

# print shows it
print("Hello", name)
print(2 + 3)`,
    'The same idea as the JavaScript, spelled a little differently. <strong>Your turn:</strong> change <code>Mia</code> and run it.',
    { books: false }),
  cues('1:07–1:10 · First Python', {
    Demo: 'Press Run Python. The first run downloads Python, so it may take a while.',
    Ask: 'What differs from the JavaScript? Expected: no let, no semicolon, print instead of console.log, # for comments.',
    Say: 'The idea is identical: name a value, show it.',
    Pause: 'Wait until most screens show output. Pair anyone whose download fails with a neighbour.',
    Expect: 'Hello and the student’s name, then 5.',
  }), { id: 'first-python-lab' }),

  slide('The whole scraper, in English', `
    <div class="recipe">
      ${recipe.map(([english, code]) => `<span>${english}</span>${codeBlock('python', code)}`).join('')}
    </div>
    <p class="callout">Understand the left side. Look up the right side when you need it.</p>
  `, cues('1:10–1:11 · Read before typing', {
    Demo: 'Read only the left column aloud. That is the scraper. The deck runs the first line for you; on your own computer you type it.',
    Say: 'BeautifulSoup is a tool someone else wrote. Nobody expects you to know it by heart: use its documentation or ask an AI.',
    Say2: 'You still have to check the answer. If a suggestion looks for .price, DevTools told you the class here is .price_color.',
    Next: 'Now we build it one line at a time.',
  }), { id: 'recipe' }),

  slide('1. Parse the HTML', pythonLab('py-parse', `from bs4 import BeautifulSoup

# Turn the page text into something we can search
soup = BeautifulSoup(html, "html.parser")

print(soup.h1.get_text(strip=True))`,
    'Press <strong>Run Python</strong>. Then change <code>h1</code> to <code>title</code> and run again.'),
  cues('1:11–1:15 · First Python', {
    Say: 'Python runs from top to bottom. Line 1 borrows a tool called BeautifulSoup. It turns HTML text into soup, which we can search.',
    Demo: 'The deck puts the shop home page into html. Run the code and point at the status line: it says live site or saved copy.',
    Ask: 'Everyone press Run Python, then try title.',
    Expect: 'All products, then All products | Books to Scrape - Sandbox. On the saved copy the second line names the sample.',
  }), { id: 'parse' }),

  slide('2. Find one book card', pythonLab('py-card', `${parsePage}

# The first book card on the page
card = soup.select_one(".product_pod")
print(card.prettify())`,
    'Run it. Do you recognise the output? Then change <code>.product_pod</code> to <code>.price_color</code>.'),
  cues('1:15–1:19 · select_one', {
    Say: 'select_one takes a CSS selector and returns the first match. card is just a name we chose.',
    Demo: 'Scroll the output and find the title and price inside it, as in Elements.',
    Ask: 'What will .price_color return? Let them guess before running.',
    Expect: 'The whole first article, then only the p element with £51.77.',
    'Common error': 'A misspelled selector finds nothing, so the error mentions NoneType.',
  })),

  slide('3. Get one title', pythonLab('py-title', `${parsePage}

# Inside that card, find the title link
card = soup.select_one(".product_pod")
link = card.select_one("h3 a")

print(link["title"])`,
    'Run it. Then replace <code>link["title"]</code> with <code>link.get_text()</code>. What changed?'),
  cues('1:19–1:23 · Attribute or text', {
    Say: 'We search inside the card now. Square brackets read an attribute. get_text() reads what is shown between the tags.',
    Ask: 'Which version would you keep, and why?',
    Expect: 'A Light in the Attic, then the cut-off A Light in the ...',
  })),

  slide('4. Add its price', pythonLab('py-price', `${parsePage}

# Both searches start at the same card
card = soup.select_one(".product_pod")
title = card.select_one("h3 a")["title"]
price = card.select_one(".price_color").get_text()

print(title, price)`,
    '<strong>Your turn:</strong> change the last line so the price prints first.'),
  cues('1:23–1:27 · Two fields, one card', {
    Say: 'Both searches start at card, so the title and price belong to the same book.',
    Ask: 'Swap the two names inside print. Fast finishers: print card.select_one(".instock").get_text(strip=True) on a new line.',
    Expect: 'A Light in the Attic £51.77, then £51.77 A Light in the Attic.',
  })),
].join('')
