/**
 * Vanilla JS
 */

console.log('%cWelcome to Quick Dev Template!', 'color: green');

var displayVersion = function(name, version, installed) {
    console.log(name + ': %c' + version, 'color: ' + (installed ? 'green' : 'red'));
};

displayVersion('jQuery', (typeof jQuery != 'undefined' ? ('v' + jQuery.fn.jquery) : 'not installed!'), typeof jQuery != 'undefined');
displayVersion('Angular', (typeof angular != 'undefined' ? ('v' + angular.version.full) : 'not installed!'), typeof angular != 'undefined');
displayVersion('Angular2', (typeof ng != 'undefined' ? 'v2.1.0' : 'not installed!'), typeof ng != 'undefined');