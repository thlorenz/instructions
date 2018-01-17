/* global document */

const ace = require('brace')
require('brace/mode/html')
require('brace/theme/monokai')

const debounce = require('debounce')

function render() {
  const existing = document.getElementById('editor')
  if (existing != null) return

  const html = `
<div id="wrapper">
  <div id="editor" class="editor"></div>
  <div id="content" class="content"></div>
</div
`
  document.body.innerHTML = html
}

render()

const startingContent = `
<h4>Edit Instructions</h4>
<div>
  Add any html or text here and see it <i>pre</i>rendered
  on the right.
  Then click the share button to obtain the URL to share
  the instructions with others.
</div>
`

const editor = ace.edit('editor')
editor.getSession().setMode('ace/mode/html')
editor.setTheme('ace/theme/monokai')
editor.setValue(startingContent)

function renderEdits() {
  const html = editor.getValue()
  const content = document.getElementById('content')
  content.innerHTML = html
}

renderEdits()
editor.on('change', debounce(renderEdits, 1000))
