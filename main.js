'use strict';

var query = require('./query');
var q = query.parse();

console.dir(q);
var message = document.getElementById('message');
message.innerHTML = q.m || q.msg || q.message || 'Do whatever you want!';
