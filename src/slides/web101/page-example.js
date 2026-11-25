// The one small page that grows through the HTML, CSS and JavaScript sections.
export const heading = '<h1>Hello!</h1>'

export const fullPage = `<!doctype html>
<html>
  <head>
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello!</h1>
    <p>I like <b>cats</b>.</p>
  </body>
</html>`

export const styledPage = (...lines) => `<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
${lines.map((line) => `    ${line}`).join('\n')}
  </body>
</html>`
