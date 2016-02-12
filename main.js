'use strict'

var query = require('./query')
var q = query.parse()

var message = document.getElementById('message')

var msg = q.m || q.msg || q.message
if (msg) {
  message.innerHTML = msg
}

var script = q.s || q.script
if (script) {
  var el = document.createElement( 'script' )
  el.type = 'text/javascript';
  el.innerText = script
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(el, s);
}

var nextLocation = q.l || q.loc || q.location
function onNextLocation() {
  window.location = nextLocation
}

if (nextLocation) {
  var delay = q.d || q.delay || 10000
  setTimeout(onNextLocation, delay)
}

if (!msg && !script && !nextLocation) message.innerHTML = 'Do what you want!'
