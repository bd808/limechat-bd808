##
# - Set timestamp from znc buffer playback
# - Add buffer class
# Inspired by: https://github.com/canadaduane/limescripts/blob/master/lib/bip_backlog.coffee

bind 'line', ( line ) ->
  RE_TIME = /\s\[(\d\d):(\d\d):(\d\d)\]/
  msg = line.lastChild.innerHTML
  if RE_TIME.test msg
    $line = $ line
    parts = RE_TIME.exec msg
    hours = parts[1]
    minutes = parts[2]
    $line.find('.time').html $("<span>#{hours}:#{minutes}</span>")
    $line.html $line.html().replace(RE_TIME, '')
    $line.addClass 'buffer'
