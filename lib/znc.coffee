##
# - Set timestamp from znc buffer playback
# - Add buffer class
# Inspired by: https://github.com/canadaduane/limescripts/blob/master/lib/bip_backlog.coffee

bind 'privmsg', ( line ) ->
  time_re = /\[(\d\d):(\d\d):(\d\d)\]\s*$/
  msg = line.lastChild.innerHTML
  if time_re.test msg
    $line = $ line
    parts = time_re.exec msg
    hours = parts[1]
    minutes = parts[2]
    $line.find('.time').html $("<span>#{hours}:#{minutes}</span>")
    $line.html $line.html().replace(time_re, '')
    $line.addClass 'buffer'
