(function() {

  /**
   * Returns a plugin that will redirect by passing rules, e.g. from www.example.com => example.com.
   *
   * @return {Function} restify handler.
   */
  function wwwCanonical(options) {
    options = options || {};
    options = extend(defaultOptions, options);

    return function canonicalization(request, response, next) {
      if (request.headers.host.match(options.from)) {
        response.writeHead(options.code, {
          Location: options.protocol + '://' + (options.to || request.headers.host.replace(options.from, ''))
        });

        response.end('');
      } else {
        return next();
      }
    }
  }

  var extend = require('util')._extend;

  const defaultOptions = {
    from: 'www.',
    code: 301,
    protocol: 'http'
  };

  module.exports = wwwCanonical;

})();
