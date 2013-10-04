##
# Links bug:<id> to gerrit


RE_BUG = /\b(?:bug|bugzilla|bz)[: ]#?(\d+)\b/ig
HTML_BUG = '<a href="https://bugzilla.wikimedia.org/$1">$&</a>'

bind 'line', (line) ->
  if RE_BUG.test line.innerHTML
    line.innerHTML = line.innerHTML.replace RE_BUG, HTML_BUG
