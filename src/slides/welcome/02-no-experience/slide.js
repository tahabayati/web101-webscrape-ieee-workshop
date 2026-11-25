import githubGraph from './assets/github-contributions.png'
import thinkingCat from './assets/thinking-cat.jpeg'
import detectiveGlungus from './assets/detective-glungus.jpeg'
import './style.css'

export default `
  <section class="no-experience-slide">
    <h2>No experience needed.</h2>

    <figure class="experience-graph">
      <img src="${githubGraph}" alt="A busy GitHub contribution graph. This is not required for the workshop." />
      <svg class="experience-cross" viewBox="0 0 600 160" aria-hidden="true" focusable="false">
        <path d="M 30 15 L 570 145 M 570 15 L 30 145" />
      </svg>
    </figure>

    <p class="curiosity-message">Just bring curiosity.</p>

    <div class="curiosity-cats">
      <figure>
        <img src="${thinkingCat}" alt="A thinking cat resting its chin on its paw" />
        <figcaption>“But why?”</figcaption>
      </figure>
      <figure>
        <img src="${detectiveGlungus}" alt="Detective Glungus, a cat wearing a detective hat with a magnifying glass" />
        <figcaption>“Let's investigate.”</figcaption>
      </figure>
    </div>

    <aside class="notes">
      <p><strong>0:01–0:02 · No experience needed</strong></p>
      <ul>
        <li><strong>Say:</strong> You do not need a GitHub streak or any coding experience. Typing mistakes are expected today, and Reset fixes them.</li>
        <li><strong>Ask:</strong> Who has never written HTML? Tell them the workshop is built for them.</li>
      </ul>
    </aside>
  </section>
`
