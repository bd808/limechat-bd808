load.language = 'coffee'

load 'bugzilla'
load 'gerrit'
load 'topic'
load 'znc'

console.log 'loaded main.coffee'

###
# load JS like this
load 'whatever.js'

# or set the language
load.language = 'js'
load 'whatever' # js file
load 'twitter.coffee' # coffee file
###

