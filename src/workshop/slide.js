export function slide(title, content, notes = '', { background, id } = {}) {
  return `
    <section class="workshop-slide${background ? ' chapter' : ''}"${id ? ` id="${id}"` : ''}${background ? ` data-background-color="${background}"` : ''}>
      ${title ? `<h2>${title}</h2>` : ''}
      ${content}
      ${notes ? `<aside class="notes">${notes}</aside>` : ''}
    </section>
  `
}

// Presenter notes: a time range followed by short cues such as Demo, Ask, Pause and Expect.
export function cues(time, items) {
  return `<p><strong>${time}</strong></p><ul>${Object.entries(items)
    // A second line with the same cue is keyed Say2.
    .map(([cue, text]) => `<li><strong>${cue.replace(/\d$/, '')}:</strong> ${text}</li>`).join('')}</ul>`
}

export function escapeHtml(source) {
  return source.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

// A highlighted, read-only code sample.
export function codeBlock(language, source) {
  return `<pre><code class="language-${language}" data-trim>${escapeHtml(source)}</code></pre>`
}

// Beginners get a plain text box: no spelling or grammar tools painting over code.
const codeInput = 'spellcheck="false" autocapitalize="off" autocomplete="off" data-gramm="false" data-enable-grammarly="false"'

export const booksUrl = 'https://books.toscrape.com/'
export const booksLink = `<a href="${booksUrl}" target="_blank" rel="noopener">Open Books to Scrape ↗</a>`
const sampleUrl = `${import.meta.env.BASE_URL}books-sample.html`
// The live home page, passed on by this website (see vercel.json).
const liveUrl = `${import.meta.env.BASE_URL}live/books.html`

export function pythonLab(id, source, task, { download, books = true } = {}) {
  return `
    <p class="lab-task">${task}</p>
    <div class="code-lab python-lab" id="${id}" data-language="Python"${books ? ` data-live-url="${liveUrl}" data-sample-url="${sampleUrl}"` : ''} data-prevent-swipe data-ui>
      ${books ? `<p class="source-label"><code>html</code> holds the Books to Scrape home page.
        <a href="${booksUrl}" target="_blank" rel="noopener">Open the site ↗</a></p>` : ''}
      <div class="lab-body">
        <div class="lab-pane">
          <span>main.py</span>
          <textarea aria-label="Edit main.py. Press Escape, then Tab, to leave." ${codeInput}>${escapeHtml(source)}</textarea>
        </div>
        <div class="lab-pane">
          <span>Output</span>
          <pre class="lab-output" aria-label="Python output" tabindex="0"></pre>
        </div>
      </div>
      <div class="lab-actions">
        <button type="button" data-action="run">Run Python</button>
        <button type="button" data-action="reset">Reset</button>
        ${download ? `<button type="button" data-action="download" data-filename="${download}" disabled>Download CSV</button>` : ''}
        <span class="lab-status" role="status">Ready to run.</span>
        <span class="lab-keys">Tab indents · Click outside to use ← →</span>
      </div>
    </div>
  `
}

// `tabs` lists the files a student sees. Other files still reach the preview.
export function frontEndLab(id, { html, css, javascript }, task,
  { tabs, open, manual, runLabel = manual ? 'Show result' : 'Run', outputName = 'Preview' } = {}) {
  const files = [
    ['index.html', html],
    ['style.css', css],
    ['script.js', javascript],
  ].filter(([, source]) => source !== undefined)
  const visible = tabs ?? files.map(([file]) => file)
  const selected = open ?? visible[0]

  return `
    <p class="lab-task">${task}</p>
    <div class="code-lab front-end-lab" id="${id}"${manual ? ' data-manual' : ''} data-prevent-swipe data-ui>
      <div class="lab-body">
        <div class="lab-pane">
          <div class="file-tabs" role="tablist" aria-label="Example files">
            ${files.map(([file], index) => visible.includes(file) ? `
              <button type="button" role="tab" id="${id}-tab-${index}"
                aria-controls="${id}-panel-${index}" aria-selected="${file === selected}"
                tabindex="${file === selected ? '0' : '-1'}">${file}</button>
            ` : '').join('')}
          </div>
          ${files.map(([file, source], index) => `
            <div role="tabpanel" id="${id}-panel-${index}"
              aria-labelledby="${id}-tab-${index}"${file === selected ? '' : ' hidden'}>
              <textarea data-file="${file}" aria-label="Edit ${file}. Press Escape, then Tab, to leave."
                ${codeInput}>${escapeHtml(source)}</textarea>
            </div>
          `).join('')}
        </div>
        <div class="lab-pane">
          <span class="preview-label">${outputName}</span>
          <iframe title="Live preview" sandbox="allow-scripts"></iframe>
        </div>
      </div>
      <div class="lab-actions">
        <button type="button" data-action="run">${runLabel}</button>
        <button type="button" data-action="reset">Reset</button>
        <span class="lab-keys">${manual ? `The ${outputName.toLowerCase()} waits for you.` : 'The preview updates as you type.'}</span>
      </div>
    </div>
  `
}
