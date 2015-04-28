/**
 * Authors:
 *     - Mike Lyons (m@mkone.co)
 */

(function() {
    'use strict';

    var q = require( 'q' ),
        path = require( 'path' ),
        isGeneratorFn = require( 'is-generator' ).fn,
        assert = require( 'chai' ).assert;

    /**
     * Replaces run in mocha object
     * @param mocha Mocha require result
     */
    var replaceRun = function( mocha ) {
        assert.isDefined( mocha );
        assert.property( mocha, Runnable );
        assert.property( mocha.Runnable, prototype );

        var run = mocha.Runnable.prototype.run;
        assert.isDefined( run );

        mocha.Runnable.prototype.run = function( fn ) {
            if( isGeneratorFn( this.fn ) ) {
                this.fn = q.async( this.fn );
            }

            run.apply( this, arguments );
        };
    };

    var findNodeJSMocha = function() {
        var suffix = path.sep + path.join( '', 'mocha', 'index.js' );
        var children = require.cache || {};

        return Object
            .keys( children )
            .filter( function( child ) {
                return child.slice( suffix.length * -1 ) === suffix;
            } )
            .map( function( child ) {
                return children[ child ].exports;
            } );
    };

    try {
        var modules = [];

        if( typeof require === 'function' && typeof exports === 'object' ) {
            modules = findNodeJSMocha();
        }

        modules
            .forEach( replaceRun );
    } catch( e ) {
        throw e;
    }

})();