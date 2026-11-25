import { cues, pythonLab, slide } from '../../../../workshop/slide.js'
import { parsePage, printBooks } from '../../python-and-beautifulsoup/page-code.js'

export default slide('Take your data with you', pythonLab('py-csv', `import csv
import sys
${parsePage}

writer = csv.writer(sys.stdout)
writer.writerow(["title", "price"])

${printBooks}
    writer.writerow([title, price])`,
  'Run it, press <strong>Download CSV</strong>, and open the file in a spreadsheet.', { download: 'books.csv' }),
cues('1:43–1:48 · A useful result', {
  Say: 'CSV is a simple table: one row per line, with commas between columns. csv.writer adds quotes when a title contains a comma.',
  Demo: 'Run, then find the quoted Coming Woman title. Download the file and open it in Excel, Numbers or Google Sheets.',
  Expect: 'A header row and 20 books (8 if the status says saved copy).',
  'If behind': 'Skip this slide and go to the API and ethics slides.',
}), { id: 'csv' })
