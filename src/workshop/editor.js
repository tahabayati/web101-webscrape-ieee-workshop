import Highlight from 'reveal.js/plugin/highlight'

// The highlighter already ships with the slide plugin.
const { hljs } = Highlight()

// A textarea has one text colour, so a see-through one sits on a coloured copy of its text.
function colourEditor(editor, language) {
  const area = document.createElement('div')
  const copy = document.createElement('div')
  const text = document.createElement('div')
  area.className = 'code-area'
  copy.className = 'code-copy'
  copy.setAttribute('aria-hidden', 'true')
  editor.before(area)
  copy.append(text)
  area.append(copy, editor)

  const scroll = () => {
    text.style.transform = `translate(${-editor.scrollLeft}px, ${-editor.scrollTop}px)`
  }
  const render = () => {
    // The extra space keeps the height of an empty last line. highlight() escapes the code.
    text.innerHTML = hljs.highlight(`${editor.value} `, { language, ignoreIllegals: true }).value
    scroll()
  }
  editor.addEventListener('input', render)
  editor.addEventListener('scroll', scroll)
  render()
  return render
}

// What every lab editor shares: colours, saved edits, beginner-friendly keys and Ctrl/Cmd+Enter.
export function setupEditor(editor, { key, language, indent, run }) {
  // Saved in this browser only. The path keeps two decks on one host apart.
  const storageKey = `web101:${location.pathname}:${key}`
  const starter = editor.defaultValue

  // Storage can be blocked or full. The lab must keep working without it.
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey))
    // Drop saved edits when the deck ships new starter code.
    if (saved?.starter === starter) editor.value = saved.code
  } catch {}

  const render = colourEditor(editor, language)

  const save = () => {
    try {
      if (editor.value === starter) localStorage.removeItem(storageKey)
      else localStorage.setItem(storageKey, JSON.stringify({ starter, code: editor.value }))
    } catch {}
  }
  editor.addEventListener('input', save)

  // execCommand is the one way to insert text and keep the browser's undo history.
  const insert = (text) => document.execCommand('insertText', false, text)
  let leaving = false

  editor.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      leaving = true
      return
    }
    const modified = event.ctrlKey || event.metaKey || event.altKey

    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault()
      run()
    } else if (event.key === 'Tab' && !event.shiftKey && !modified && !leaving) {
      event.preventDefault()
      insert(' '.repeat(indent))
    } else if (event.key === 'Enter' && !modified && !event.shiftKey && !event.isComposing) {
      // Keep the current indentation, and go one level deeper after a Python colon.
      const before = editor.value.slice(0, editor.selectionStart)
      const line = before.slice(before.lastIndexOf('\n') + 1)
      const spaces = line.match(/^ */)[0]
      const deeper = indent === 4 && line.trimEnd().endsWith(':') ? ' '.repeat(indent) : ''
      if (spaces || deeper) {
        event.preventDefault()
        insert(`\n${spaces}${deeper}`)
      }
    }
    if (event.key !== 'Shift') leaving = false
  })
  editor.addEventListener('blur', () => { leaving = false })

  return {
    reset() {
      editor.value = starter
      // Setting the value from code fires no input event.
      render()
      save()
    },
  }
}
