# mocha-runnable-generators
Makes mocha runables take geneartors, so you can do it( function *() )

## Usage

File tree:

- tests/
  - index.js
  - tests.js

index.js

```javascript
require( 'mocha-runnable-generators' );
```

tests.js

```javascript
var q = require( 'q' );

it( 'should wait', function *() {
  yield q.Promise( function( resolve ) { // NOTE: This doens't test anything, just an example promise
    setTimeout( resolve, 100 );
  } );
} );
```

Command:

```
node --harmony ./node_modules/.bin/_mocha tests/
```
