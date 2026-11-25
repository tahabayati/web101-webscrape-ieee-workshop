const runtimeUrl = 'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/'
let loading
let livePage

async function loadRuntime() {
  const { loadPyodide } = await import(/* @vite-ignore */ `${runtimeUrl}pyodide.mjs`)
  const python = await loadPyodide({ indexURL: runtimeUrl })
  await python.loadPackage('beautifulsoup4')
  return python
}

// One shared load, so a preload and a Run click never download Python twice.
function getRuntime() {
  loading ??= loadRuntime().catch((error) => {
    loading = undefined
    throw error
  })
  return loading
}

// Beginners need their own line and the error, without Pyodide's internal frames.
function readableError(message) {
  const start = message.indexOf('File "<exec>"')
  return start === -1 ? message : `Python error:\n  ${message.slice(start)}`
}

async function fetchText(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(8000) })
  if (!response.ok) throw new Error(`The book page answered HTTP ${response.status}.`)
  return response.text()
}

// A browser may not read books.toscrape.com directly, so this website passes the page on.
// That needs Vercel at the site root (or Vite). Elsewhere the saved 8-book copy is used.
async function getBooks({ live, sample }) {
  // Kept once it works, so each laptop asks the shop only once.
  if (livePage) return livePage
  try {
    const html = await fetchText(live)
    // Some hosts answer 200 with their own page for unknown paths, so look for book cards.
    if (html.includes('product_pod')) return (livePage = { html })
  } catch {}
  return { html: await fetchText(sample), saved: true }
}

self.onmessage = async ({ data: { code, pages, preload } }) => {
  if (preload) {
    // A failed preload is silent; the next Run reports it.
    getRuntime().catch(() => {})
    return
  }

  let globals
  try {
    self.postMessage({ status: 'Loading Python and BeautifulSoup…' })
    const runtime = await getRuntime()
    const books = pages && await getBooks(pages)

    self.postMessage({ status: 'Running Python…', running: true })
    let output = ''
    const append = (line) => {
      output = (output + line + '\n').slice(-16000)
    }
    runtime.setStdout({ batched: append })
    runtime.setStderr({ batched: append })

    const dict = runtime.globals.get('dict')
    try {
      globals = dict()
    } finally {
      dict.destroy()
    }
    globals.set('__name__', '__main__')
    if (books) globals.set('html', books.html)
    try {
      const result = await runtime.runPythonAsync(code, { globals })
      result?.destroy?.()
      // Emit a final line that was printed with end="".
      runtime.runPython('import os, sys; sys.stdout.flush(); os.fsync(1)')
      // Say nothing when all went well. Do say when the numbers come from the saved copy.
      const status = books?.saved ? 'Live site unreachable: using a saved copy of 8 books.' : ''
      self.postMessage({ output, status, ok: true })
    } catch (error) {
      self.postMessage({ output: output + readableError(error.message), status: 'Python found a problem. Read the last line.' })
    }
  } catch (error) {
    self.postMessage({
      output: `Could not load Python or the book page. Check your connection and try again.\n\n${error.message}`,
      status: 'Python unavailable.',
    })
  } finally {
    globals?.destroy()
  }
}
