## VoteApp Demo


### Installation/Setup backend

Please use backend from MeApp Demo.  
In the same place, you will find documentation on backend installation and configuration.

### Compile phonegap application

Read more about phonegap and **WebView** mobile applications here https://phonegap.com/.

**Prerequisites**  


Gulp, Phonegap and Cordova.
```
$ sudo npm install gulp -g  
$ sudo npm install phonegap -g  
$ sudo npm install cordova@7.1 -g
```

Open ``./demo/dev`` and run:
```
$ npm i
$ gulp init
```
Then adjust ``qdt-env.js`` file.  
Change ``apiUrl`` variable to match your backend url.  

**Ex:**
```
const apiUrl = "http://demo-backend.test/api/";
```

Then run
```
$ gulp compile
```

Now you are ready to build the application.
```
$ cd ../phonegap
$ phonegap platform add ios  
$ phonegap platform add android  
```
There is now a .xcodeworkspace in ``phonegap/platforms/ios/``  
And Android Studio project in ``phonegap/platforms/android/``

You can build application using Android Studio or Xcode, but also from terminal.  
To run android or iso application on device through USB cable run:
```
$ cordova run android
$ cordova run ios
```
For ios you probably will have to open project in Xcode and set developer team.  
For android you only need to allow debugging on phone.  

To build android android .apk run: 
```
$ cordova build android
```