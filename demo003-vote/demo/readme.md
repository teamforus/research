# iOS Build instructions:

## Prerequisites:  
**gulp:** $ sudo npm install gulp -g  
**phonegap:** $ sudo npm install phonegap -g  
**cordova:** $ sudo npm install cordova@7.1 -g

## Instalation:
cd into /dev  
$ npm i  
$ gulp init  
$ gulp compile  
$ cd ../phonegap  
$ npm i
$ phonegap platform add ios  
$ cordova build

there is now a .xcodeworkspace in phonegap/platforms/ios/

## Problems/Solutions
If you encounter Error: spawn EACCES  

$ sudo chmod -R a+rwx ./hooks/after_prepare/update_platform_config.js
