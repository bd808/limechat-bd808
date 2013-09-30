##
# Links gerrit:<id> to gerrit
bind 'line', (line) ->
  html = line.innerHTML
  regex = /\b(?:gerrit):(\d+)\b/g
  replacement = "<a href='https://gerrit.wikimedia.org/r/#/c/$1'>$&</a>"
  html = html.replace regex, replacement
  line.innerHTML = html
