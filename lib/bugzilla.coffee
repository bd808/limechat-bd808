##
# Links bug:<id> to gerrit
bind 'line', (line) ->
  RE = /\b(?:bug|bugzilla)[: ]#?(\d+)\b/ig
  if RE.test line.innerHTML
    replacement = '<a href="https://bugzilla.wikimedia.org/$1">$&</a>'
    line.innerHTML = line.innerHTML.replace RE, replacement
