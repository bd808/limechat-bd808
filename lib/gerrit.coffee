##
# Links gerrit:<id> to gerrit
bind 'line', (line) ->
  RE = /\b(?:gerrit):(\d+)\b/ig
  if RE.test line.innerHTML
    replacement = '<a href="https://gerrit.wikimedia.org/r/#/c/$1">$&</a>'
    line.innerHTML = line.innerHTML.replace RE, replacement
