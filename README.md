# Restify WWW Canonicalization


Restify middleware helps with SEO canonicalization, e.g. redirect from one domain to another, e.i. from `www.example.com` => `example.com`.
That's need to have only one entry point.


# Installation


```
npm install restify-www-canonical
```


## How to use


```
var wwwCanonicalization = required('restify-www-canonical');

server.use(wwwCanonical({
    // your params goes here
}));
```


You can also specify `from`, `where` and `code`. You can also use regexp.


```
server.use(wwwCanonical({
   from: /www\.|127\.0\.0\.1/, // will redirect from `www.example.com` and `127.0.0.1` => `example.com`
   to: 'example.com',
   code: 302 // it just example. Better to use 301 which is the default value
}));
```

Please see tests for all cases. To run test `npm run-script test`
