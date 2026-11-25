import { cues, pythonLab, slide } from '../../../../workshop/slide.js'
import { parsePage, printBooks } from '../../python-and-beautifulsoup/page-code.js'

export default [
  slide('5. Repeat for more cards', pythonLab('py-loop', `${parsePage}

cards = soup.select(".product_pod")

# Repeat for the first three cards
for card in cards[:3]:
    title = card.select_one("h3 a")["title"]
    price = card.select_one(".price_color").get_text()
    print(title, price)`,
    'Change <code>3</code> to <code>5</code>. Then remove <code>[:3]</code>. How many books now?'),
  cues('1:27–1:33 · A loop', {
    Say: 'select returns every match. for repeats the indented lines once per card. [:3] means only the first three.',
    Demo: 'Run it. Point at the four spaces that put lines inside the loop.',
    Ask: 'Predict the number of rows before each run.',
    Expect: '3 rows, then 5, then 20 (8 on the saved copy).',
    'Common error': 'IndentationError means a line inside the loop lost its spaces.',
  })),

  slide('Your turn: books under £30', pythonLab('py-exercise', `${parsePage}

${printBooks}
    amount = float(price.replace("£", ""))
    # Add your if line here, then indent print under it.
    print(title, price)`,
    'Print only the books that cost less than <strong>£30</strong>.'),
  cues('1:33–1:43 · Exercise', {
    Say: 'amount is the price as a number, so Python can compare it. Replace the comment with a question that starts with if.',
    Demo: 'Show only the shape on the board: if amount < 100:',
    Pause: 'Give five minutes before showing an answer. Walk the room. The next slide has help.',
    Ask: 'Pairs: how many books did you get?',
    Expect: '7 books, from The Requiem Red £22.65 to Olio £23.88. On the saved copy: 2.',
    Answer: 'if amount &lt; 30: on its own line, then print indented four more spaces.',
  }), { id: 'exercise' }),
].join('')
