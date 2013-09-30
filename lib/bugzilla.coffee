##
# Links bug:<id> to gerrit
bind 'line', (line) ->
  html = line.innerHTML
  regex = /\b(?:bug|bugzilla)[: ]#?(\d+)\b/ig
  replacement = "<a href='https://bugzilla.wikimedia.org/$1'>$&</a>"
  html = html.replace regex, replacement
  line.innerHTML = html
