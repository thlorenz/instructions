/* global document location */

const API_KEY = 'AIzaSyA2LZbzpowavq0euPXmNhrSW6Q-R4-HnZA'
const { shortenURL } = require('gapi-url')

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
  <div id="toolbar" class="toolbar"></div>
</div
`
  document.body.innerHTML = html
}

render()

function renderEdits(editor) {
  const html = editor.getValue()
  const content = document.getElementById('content')
  content.innerHTML = html
}

function setupEditor() {
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
  editor.on('change', debounce(() => renderEdits(editor), 1000))
  return editor
}

function addShareButtons() {
  const buttonsHtml = `
<button id="share-long-link" name="shareLongLink">Share Long Link</button>
<button id="share-short-link" name="shareShortenedLink">Share Shortened Link</button>
<input id="shared-url" type="text"> 
`
  const toolbar = document.getElementById('toolbar')
  toolbar.innerHTML = buttonsHtml

  const shareLongButton = document.getElementById('share-long-link')
  const shareShortButton = document.getElementById('share-short-link')
  const sharedURLInput = document.getElementById('shared-url')
  return { shareLongButton, shareShortButton, sharedURLInput }
}

const appRoot = `${location.origin}/instructions`

const editor = setupEditor()
renderEdits(editor)

const { shareLongButton, shareShortButton, sharedURLInput } = addShareButtons()

function getLongLink(text) {
  const encoded = encodeURI(text)
  return `${appRoot}/?m=${encoded}`
}

function shareLongLink() {
  const text = editor.getValue()
  const link = getLongLink(text)
  sharedURLInput.value = link
  sharedURLInput.select()
}

function shareShortLink() {
  const text = editor.getValue()
  const link = getLongLink(text)
  shortenURL(API_KEY, link, (err, shortened) => {
    if (err) return console.error(err)
    sharedURLInput.value = shortened
    sharedURLInput.select()
  })
}

shareLongButton.onclick = shareLongLink
shareShortButton.onclick = shareShortLink
