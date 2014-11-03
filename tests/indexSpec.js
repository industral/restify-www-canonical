var wwwCanonical = require('../');

describe('Restify WWW Canonical', function() {

  var request,
      response,
      next;

  beforeEach(function() {
    request = {
      headers: {
        host: 'www.example.com'
      }
    };

    response = {
      writeHead: function(code, headers) {
        console.log(code);
      },

      end: function() {
      }
    };

    next = function() {
    }
  });

  it('should work without params passing redirect from www.example.com => example.com', function() {
    response.writeHead = function(code, headers) {
      expect(code).toBe(301);
      expect(headers.Location).toBe('http://example.com');
    };

    wwwCanonical()(request, response, next);
  });

  it('should work with params passing redirect from www.example.com => example.com', function() {
    response.writeHead = function(code, headers) {
      expect(code).toBe(301);
      expect(headers.Location).toBe('http://example.com');
    };

    wwwCanonical({
      from: 'www.'
    })(request, response, next);
  });

  it('should work with params passing redirect from www.example.com => example.org', function() {
    response.writeHead = function(code, headers) {
      expect(code).toBe(301);
      expect(headers.Location).toBe('http://example.org');
    };

    wwwCanonical({
      from: 'www.',
      to: 'example.org'
    })(request, response, next);
  });

  it('should work with params passing redirect from www.example.com => example.org:3000', function() {
    response.writeHead = function(code, headers) {
      expect(code).toBe(301);
      expect(headers.Location).toBe('http://example.org:3000');
    };

    wwwCanonical({
      from: 'www.',
      to: 'example.org:3000'
    })(request, response, next);
  });

  it('should work with params passing redirect from example.com => www.example.com', function() {
    response.writeHead = function(code, headers) {
      expect(code).toBe(302);
      expect(headers.Location).toBe('http://example.org:3000');
    };

    wwwCanonical({
      from: /^example\.com/,
      to: 'www.example.com',
      code: 302
    })(request, response, next);
  });

});
