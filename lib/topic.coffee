##
# Adapted from https://github.com/phaedryx/limechat-solarized-theme/blob/master/solarized-dark.coffee
#

bind 'reply', (line) ->
  re = /Topic: (.*)$/
  if line.lastChild.innerHTML.match re
    doc = document
    body = document.body
    topicDiv = doc.getElementById('topic')
    if topicDiv == null
      ctype = body.getAttribute('type')
      if ctype == 'channel' || ctype == 'talk'
        topicDiv = doc.createElement('div')
        topicDiv.id = 'topic'
        body.appendChild(topicDiv)
    topicDiv.innerHTML= line.innerHTML.match(/opic: (.*)$/)[1]
