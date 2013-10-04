##
# Links gerrit:<id> to gerrit

RE_GERRIT = /\b(?:gerrit):(\d+)\b/ig
HTML_GERRIT = '<a href="https://gerrit.wikimedia.org/r/#/c/$1">$&</a>'

bind 'line', (line) ->
  if RE_GERRIT.test line.innerHTML
    line.innerHTML = line.innerHTML.replace RE_GERRIT, HTML_GERRIT
