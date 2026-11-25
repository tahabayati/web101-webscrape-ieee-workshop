import { codeBlock, cues, slide } from '../../../../workshop/slide.js'
import loadingCat from './assets/loading-cat.jpeg'

export default slide('Stuck? Read the last line', `
  <div class="meme-layout">
    <div>
      <table class="map-table">
        <tbody>
          <tr><td><code>IndentationError</code></td><td>Give <code>print</code> 4 more spaces than <code>if</code>.</td></tr>
          <tr><td><code>SyntaxError</code></td><td>Is there a <code>:</code> at the end of <code>if</code>?</td></tr>
          <tr><td><code>NameError</code></td><td>Check the spelling of <code>amount</code>.</td></tr>
          <tr><td>Every book</td><td>Is <code>print</code> inside the <code>if</code>?</td></tr>
        </tbody>
      </table>
      <details data-prevent-swipe>
        <summary>Show an answer</summary>
        ${codeBlock('python', `    if amount < 30:
        print(title, price)`).replace(' data-trim', '')}
      </details>
    </div>
    <img class="meme-image" src="${loadingCat}" alt="A cat with a loading spinner over its head">
  </div>
`, cues('During the exercise · Help', {
  Do: 'Show this after about five minutes, then return to the exercise with the left arrow. Edits are kept.',
  Ask: 'What does the last line of your error say?',
  Say: 'Errors are normal. Reset restores the starting code.',
}), { id: 'stuck' })
