import { setupEditor } from './editor.js'

// zoom keeps the preview readable on a projector.
const previewHead = `<meta http-equiv="Content-Security-Policy"
  content="default-src 'none'; script-src data: 'unsafe-inline'; style-src data: 'unsafe-inline'; img-src data:; form-action 'none'; base-uri 'none'">
<style>:root { zoom: 1.4 }</style>
<script>
  // Show script mistakes in the preview, where a beginner is looking.
  // console.log writes into the preview, so students see it without opening DevTools.
  const show = (value) => {
    if (value instanceof Element) return value.outerHTML
    try {
      if (value && typeof value === 'object') return JSON.stringify(value)
    } catch {}
    return String(value)
  }
  console.log = (...values) => {
    const line = document.createElement('div')
    line.style.cssText = 'font:15px monospace;padding:6px 0;border-bottom:1px solid #ddd'
    line.textContent = values.map(show).join(' ')
    ;(document.body || document.documentElement).append(line)
  }
  addEventListener('error', (event) => {
    const box = document.createElement('p')
    box.style.cssText = 'background:#ffe3e3;color:#8a0f1c;border:2px solid #8a0f1c;padding:6px;font:13px monospace'
    box.textContent = 'script.js problem: ' + event.message + ' (check spelling, quotes and brackets)'
    ;(document.body || document.documentElement).append(box)
  })
</script>`

// Resolve the two files provided by the editor inside the preview iframe.
function previewDocument(html, css, javascript) {
  const styles = `data:text/css;charset=utf-8,${encodeURIComponent(css)}`
  // An inline module runs after the page is parsed, like defer, and reports readable errors.
  const script = `<script type="module">\n${javascript.replace(/<\/script/gi, '<\\/script')}\n</script>`
  const page = html
    .replace(/(<link\b[^>]*?\s)href\s*=\s*(?:"(?:\.\/)?style\.css"|'(?:\.\/)?style\.css'|(?:\.\/)?style\.css(?=[\s>]))/gi,
      (_, tag) => `${tag}href="${styles}"`)
    .replace(/<script\b[^>]*?\ssrc\s*=\s*["']?(?:\.\/)?script\.js(?=["'\s>])[^>]*>\s*<\/script>/gi,
      () => script)

  if (/^\s*<!doctype html>/i.test(page)) {
    return page.replace(/^\s*<!doctype html>/i, () => `<!doctype html>${previewHead}`)
  }
  return `<!doctype html>${previewHead}${page}`
}

export function setupFrontEndLabs() {
  for (const lab of document.querySelectorAll('.front-end-lab')) {
    const textareas = Array.from(lab.querySelectorAll('textarea'))
    const tabs = Array.from(lab.querySelectorAll('[role="tab"]'))
    const preview = lab.querySelector('iframe')
    const label = lab.querySelector('.preview-label')
    const run = lab.querySelector('[data-action="run"]')
    const reset = lab.querySelector('[data-action="reset"]')
    // Some labs wait for the button, for example so students can guess first.
    const manual = lab.dataset.manual !== undefined
    const outputName = label.textContent
    let timer

    const update = () => {
      clearTimeout(timer)
      const files = Object.fromEntries(textareas.map(({ dataset, value }) => [dataset.file, value]))
      preview.srcdoc = previewDocument(files['index.html'], files['style.css'] ?? '', files['script.js'] ?? '')
      const title = new DOMParser().parseFromString(files['index.html'], 'text/html').title
      label.textContent = title ? `${outputName} · tab name: ${title}` : outputName
    }

    const selectTab = (selected) => {
      for (const tab of tabs) {
        const active = tab === selected
        tab.setAttribute('aria-selected', String(active))
        tab.tabIndex = active ? 0 : -1
        lab.querySelector(`#${tab.getAttribute('aria-controls')}`).hidden = !active
      }
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectTab(tab))
      tab.addEventListener('keydown', (event) => {
        const nextIndex = {
          ArrowLeft: (index + tabs.length - 1) % tabs.length,
          ArrowRight: (index + 1) % tabs.length,
          Home: 0,
          End: tabs.length - 1,
        }[event.key]
        if (nextIndex === undefined) return
        event.preventDefault()
        event.stopPropagation()
        selectTab(tabs[nextIndex])
        tabs[nextIndex].focus()
      })
    })

    const editors = textareas.map((textarea) => {
      textarea.addEventListener('input', () => {
        clearTimeout(timer)
        if (manual) label.textContent = `${outputName} · press ${run.textContent} to update`
        else timer = setTimeout(update, 350)
      })
      const { file } = textarea.dataset
      const language = { html: 'xml', css: 'css', js: 'javascript' }[file.split('.').pop()]
      return setupEditor(textarea, { key: `${lab.id}:${file}`, language, indent: 2, run: update })
    })

    run.addEventListener('click', update)
    reset.addEventListener('click', () => {
      for (const editor of editors) editor.reset()
      update()
    })
    update()
  }
}
