import { setupEditor } from './editor.js'

let worker
let activeLab

const startWorker = () => {
  worker ??= new Worker(new URL('./python.worker.js', import.meta.url), { type: 'module' })
  return worker
}

// Download Python before the first Run, so a slow room waits during the break.
export function preloadPython() {
  try {
    startWorker().postMessage({ preload: true })
  } catch {}
}

export function setupPythonLabs() {
  for (const lab of document.querySelectorAll('[data-language="Python"]')) {
    const textarea = lab.querySelector('textarea')
    const output = lab.querySelector('.lab-output')
    const status = lab.querySelector('.lab-status')
    const run = lab.querySelector('[data-action="run"]')
    const reset = lab.querySelector('[data-action="reset"]')
    const download = lab.querySelector('[data-action="download"]')
    let timer

    const finish = (message, result = '', ok = false) => {
      clearTimeout(timer)
      output.textContent = result || '(No output)'
      // A traceback ends with the useful line, so show the bottom of an error.
      output.scrollTop = ok ? 0 : output.scrollHeight
      status.textContent = message
      activeLab = undefined
      run.disabled = false
      if (download) download.disabled = !ok || !result
    }

    const runPython = () => {
      if (activeLab) {
        status.textContent = 'Another Python example is running.'
        return
      }

      try {
        startWorker()
      } catch {
        status.textContent = 'This browser could not start the Python runner.'
        return
      }
      activeLab = lab
      run.disabled = true
      if (download) download.disabled = true
      output.textContent = ''
      status.textContent = 'Starting Python…'
      const stop = (message) => {
        worker?.terminate()
        worker = undefined
        finish(message, 'Try Run Python again.')
      }
      timer = setTimeout(() => stop('Python took too long to start.'), 90000)
      worker.onmessage = ({ data }) => {
        status.textContent = data.status
        if (data.running) {
          clearTimeout(timer)
          timer = setTimeout(() => stop('Stopped after 15 seconds. Is a loop running forever?'), 15000)
        }
        if ('output' in data) finish(data.status, data.output, data.ok)
      }
      worker.onerror = () => stop('Python could not start.')
      const { liveUrl, sampleUrl } = lab.dataset
      const absolute = (url) => new URL(url, document.baseURI).href
      // Labs without a page, such as the first Python taste, fetch nothing.
      const pages = liveUrl && { live: absolute(liveUrl), sample: absolute(sampleUrl) }
      worker.postMessage({ code: textarea.value, pages })
    }

    const editor = setupEditor(textarea, { key: `${lab.id}:python`, language: 'python', indent: 4, run: runPython })
    textarea.addEventListener('input', () => { if (download) download.disabled = true })

    run.addEventListener('click', runPython)
    reset.addEventListener('click', () => {
      editor.reset()
      if (activeLab === lab) {
        worker?.terminate()
        worker = undefined
        finish('Code reset.')
      } else {
        status.textContent = 'Code reset.'
      }
      output.textContent = ''
      if (download) download.disabled = true
    })
    download?.addEventListener('click', () => {
      const link = document.createElement('a')
      // The byte-order mark makes Excel read £ correctly.
      link.href = URL.createObjectURL(new Blob(['﻿', output.textContent], { type: 'text/csv;charset=utf-8' }))
      link.download = download.dataset.filename
      link.click()
      setTimeout(() => URL.revokeObjectURL(link.href), 1000)
    })
  }
}
