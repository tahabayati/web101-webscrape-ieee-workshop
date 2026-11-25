import { cues, slide } from '../../../workshop/slide.js'

export default slide('This page is your workspace', `
  <ul class="tiles">
    <li><span class="tile-icon"><kbd>←</kbd> <kbd>→</kbd></span>Move between slides</li>
    <li><span class="tile-icon"><kbd>Click</kbd></span>Type in the dark boxes</li>
    <li><span class="tile-icon"><kbd>Reset</kbd></span>Get the starting code back</li>
  </ul>
  <p class="big-text">Nothing to install. Your edits stay in your own browser.</p>
`, cues('0:02–0:04 · Setup', {
  Demo: 'Press the right and left arrow keys. Click inside a box on a later slide, then click the white background to give the arrow keys back to the slides.',
  Say: 'Everyone has their own copy. Nobody else sees your edits, and they are still there if you reload.',
  Pause: 'Wait until every laptop shows this slide. The slide number is in the bottom corner.',
  Tip: 'Press S for these notes and a timer. If you rehearsed on this laptop, use Reset on edited slides or present in a private window.',
}), { id: 'workspace' })
