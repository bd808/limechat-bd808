/*!
 * limescripts.js (c) Ryan Florence
 * https://github.com/rpflorence/limescripts
 * MIT License <http://www.opensource.org/licenses/mit-license.php>
 */

(function () {

  /*
   * Main API into limescript, pretty much all you need. The whole system is
   * built around binding to global events that trigger when a message is
   * added. There are static events, and dynamic events (like fired for
   * elements with certain classNames, etc). To get a feel for the types of
   * events available, uncomment the first line of `function trigger` later
   * in this file while you use lime chat.
   *
   * @param {String}   event   - the name of the event you want to bind to
   * @param {Function} handler - the function to call
   *
   * Static events
   * -------------
   *
   * @event 'line'
   *   @signature - function(line)
   *   @context - line
   *
   * @event 'link' - when a message contains a link
   *   @signature - function(href, line)
   *   @context - the link anchor element
   *
   * @event 'line:highlight' - when a message is highlighted
   *   @signature - function(line)
   *   @context - line
   *
   * Dynamic Events
   * --------------
   *
   * @event "#{type}" - when a line of `type` is added
   *   @signature - function(line)
   *   @context - line
   *
   * @event "message:#{type}" - when a message of `type` is added
   *   @signature - function(line)
   *   @context - message element
   *
   * @event "#{className}" - when an element with `className` is added
   *   @signature - function(line)
   *   @context - the element matching `className`
   *
   */
  this.bind = function (event, handler) {
    if (events[event] == null) events[event] = [];
    events[event].push(handler);
  };


  /*
   * Load a JavaScript or CoffeeScript file. If you specify `load.language`
   * to either `js` or `coffee` then you can omit the extension.
   *
   * @param {String} src - file name relative to `lib` directory
   * @param {Function} callback - callback on load of script
   */
  this.load = function (src, callback) {
    if (load.language) src += '.' + load.language;
    var loader = src.match(/\.js$/) ? loadJS : loadCS;
    loader('lib/' + src, callback);
  };

  /*
   * Load a JavaScript file
   *
   * @param {String} src
   * @param {Function} callback
   */
  this.loadJS = function (src, callback) {
    // console.log('loading ' + src);
    var script = document.createElement('script');
    if (src.indexOf('?') === -1) src += '?';
    // web view caches like crazy
    script.src = src + '&bust=' + Date.now();
    script.type = 'text/javascript';
    if (callback) script.onload = callback;
    document.head.appendChild(script);
  };

  /*
   * Load a CoffeeScript file
   *
   * @param {String} src
   * @param {Function} calback
   */
  this.loadCS = function (src, callback) {
    // console.log('loading ' + src);
    CoffeeScript.load(src, callback);
  };

  /*
   * Really terrible debugging, thinking about getting firebug lite
   * but haven't looked at it yet
   */
  this.console = {};

  /*
   * Logs arguments as strings to the screen
   */
  this.console.log = function () {
    var args = [].slice.call(arguments, 0);
    args.unshift('log');
    log.apply(null, args);
  };

  /*
   * same as console.log but adds `js-console-error` class for styling
   */
  this.console.error = function () {
    var args = [].slice.call(arguments, 0);
    args.unshift('error');
    log.apply(null, args);
  };

  // Override window.onerror so we actually get some error reporting
  this.onerror = function (error, url, line) {
    console.error('ERROR ('+url+')['+line+']:', error);
  };

  // its all pretty much non-api private stuff from here

  function log (type) {
    var msgs = [].slice.call(arguments, 1)
      , node = document.createElement('div')
      , now = new Date()
      , dfmt = function (d) {
          var h = d.getHours() + '', m = d.getMinutes() + '';
          if (h.length == 1) h = '0' + h;
          if (m.length == 1) m = '0' + m;
          return h + ':' + m;
      };
    node.className = 'line event js';
    node.setAttribute('type', 'js-' + type);
    node.innerHTML = '<span class="time">' + dfmt(now) + '</span>' +
        '<span class="sender">&lt;' + type + '&gt;</span>' +
        '<span class="message">' + msgs.join('  ') + '</span>';
    document.body.appendChild(node);
  }

  // triggers all the events
  function triggerEvents (line) {
    var type = line.getAttribute('type');

    // line event
    trigger('line', line, [line]);

    // line type event
    trigger(type, line, [line]);

    // highlight event
    if (line.getAttribute('highlight') === 'true') {
      trigger('line:highlight', line, [line]);
    }

    // fire events for all elements in the line
    var els = line.querySelectorAll('*');
    for (var i = 0, l = els.length; i < l; i++) {
      triggerElementEvents(els[i], line);
    }
  }

  function triggerElementEvents (el, line) {
    // link event
    if (el.tagName === 'A') {
      trigger('link', el, [el.getAttribute('href'), line]);
    }

    // message:#{type} event
    if (el.className === 'message') {
      trigger('message:' + line.getAttribute('type'), el, [line]);
    }

    // className event
    trigger(el.className, el, [line]);
  }

  // event storage object used in `this.bind`
  var events = {};

  // triggers an event
  function trigger (name, context, args) {
    // console.log(name) // <-- do this to discover events
    var err, handlers = events[name];

    if (!handlers) return;
    for (var i = 0, l = handlers.length; i < l; i++) {
      try {
        handlers[i].apply(context, args);
      } catch (err) {
        console.error('Trigger[' + name + '][' + i + ']:' + err);
      }
    }
  }


  // the handler called whenever a dom node is inserted, ensures that we don't
  // trigger events unless it's the top level element of a new message
  function processMessage (event) {
    if (typeof event == 'undefined') return;
    var node = event.target;
    if (typeof node == 'undefined') return;
    var parent = node.parentNode;
    var isLine = (node.className)? node.className.match(/line/): false;
    if (parent !== document.body || !isLine) return;
    triggerEvents(node);
  }

  // attach the main handler
  document.addEventListener('DOMNodeInserted', processMessage, false);

  // load in coffeesscript (for the hipsters) and jQuery (for the wussies)
  // and the helpers file
  (function() {
    var scriptsLoaded = 0;
    // console.log('initializing javascript');
    loadJS('lib/vendor/coffee-script.js', finish);
    loadJS('lib/vendor/jquery.min.js', finish);

    function finish() {
      scriptsLoaded++;
      if (scriptsLoaded !== 2) return;
      load('main.coffee');
      // console.log('javascript initialized');
    }
  })();

}).call(this);
