##
# - Set timestamp from znc buffer playback
# - Add buffer class
# Inspired by: https://github.com/canadaduane/limescripts/blob/master/lib/bip_backlog.coffee

RE_TIME = /\[(\d\d:\d\d):\d\d\]/

bind 'line', ( line ) ->
  m = RE_TIME.exec line.lastChild.innerHTML
  if m
    line.firstChild.innerHTML = m[1]
    line.lastChild.innerHTML = line.lastChild.innerHTML.replace RE_TIME, ''
    line.className = line.className + ' buffer'
