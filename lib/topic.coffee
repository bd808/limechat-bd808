##
# Adapted from https://github.com/phaedryx/limechat-solarized-theme/blob/master/solarized-dark.coffee
#

TOPIC_RE = /Topic: (.*)/

makeTopicBanner = ->
  doc = document
  body = document.body
  topicDiv = doc.getElementById 'topic'
  if topicDiv == null
    ctype = body.getAttribute 'type'
    if ctype == 'channel' || ctype == 'talk'
      topicDiv = doc.createElement 'div'
      topicDiv.id = 'topic'
      body.appendChild topicDiv
  topicDiv

topicBanner = makeTopicBanner()

bind 'reply', (line) ->
  m = line.lastChild.innerHTML.match TOPIC_RE
  if m
    topicBanner.innerHTML= m[1]
    topicBanner.style.visibility = 'visible'
  #if line.lastChild.innerHTML.match TOPIC_RE
  # topicBanner.innerHTML= line.innerHTML.match(TOPIC_RE)[1]

# scan current dom for matches too
$( "div:contains('Topic: ')" ).each (idx, elm) =>
  m = elm.lastChild.innerHTML.match TOPIC_RE
  if m
    topicBanner.innerHTML = m[1]
    topicBanner.style.visibility = 'visible'
