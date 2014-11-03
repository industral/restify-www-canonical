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
      },

      end: function() {
      }
    };

    next = function() {
    }
  });

  it('should work without params passing redirect from www.example.com => example.com', function(done) {
    response.writeHead = function(code, headers) {
      expect(code).toEqual(301);
      expect(headers.Location).toEqual('http://example.com');

      done();
    };

    wwwCanonical()(request, response, next);
  });

  it('should work with params passing redirect from www.example.com => example.com', function(done) {
    response.writeHead = function(code, headers) {
      expect(code).toEqual(301);
      expect(headers.Location).toEqual('http://example.com');

      done();
    };

    wwwCanonical({
      from: 'www.'
    })(request, response, next);
  });

  it('should work with params passing redirect from www.example.com => example.org', function(done) {
    response.writeHead = function(code, headers) {
      expect(code).toEqual(301);
      expect(headers.Location).toEqual('http://example.org');

      done();
    };

    wwwCanonical({
      from: 'www.',
      to: 'example.org'
    })(request, response, next);
  });

  it('should work with params passing redirect from www.example.com => example.org:3000', function(done) {
    response.writeHead = function(code, headers) {
      expect(code).toEqual(301);
      expect(headers.Location).toEqual('http://example.org:3000');

      done();
    };

    wwwCanonical({
      from: 'www.',
      to: 'example.org:3000'
    })(request, response, next);
  });

  it('should work with regex redirect from example.com => www.example.com', function(done) {
    response.writeHead = function(code, headers) {
      expect(code).toEqual(302);
      expect(headers.Location).toEqual('http://www.example.com');

      done();
    };

    request = {
      headers: {
        host: 'example.com'
      }
    };

    wwwCanonical({
      from: /^example\.com/,
      to: 'www.example.com',
      code: 302
    })(request, response, next);
  });

  it('should work with regex redirect from www.example.com => example.com', function(done) {
    response.writeHead = function(code, headers) {
      expect(headers.Location).toEqual('http://example.com');

      done();
    };

    wwwCanonical({
      from: /www\.|127\.0\.0\.1/,
      to: 'example.com'
    })(request, response, next);
  });

  it('should work with regex redirect from 127.0.0.1 => example.com', function(done) {
    response.writeHead = function(code, headers) {
      expect(headers.Location).toEqual('http://example.com');

      done();
    };

    request = {
      headers: {
        host: '127.0.0.1'
      }
    };

    wwwCanonical({
      from: /www\.|127\.0\.0\.1/,
      to: 'example.com'
    })(request, response, next);
  });

});
