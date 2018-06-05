## MeApp Demo


### Installation/Setup backend

**Requirements:**
 - php >= 7.0.0
 - mysql-server
 - composer

**Required PHP extensions:**
 - OpenSSL PHP Extension  
 - PDO PHP Extension  
 - Mbstring PHP Extension  
 - Tokenizer PHP Extension  
 - XML PHP Extension  

Open path ``./demo/php`` in terminal and run 
``` 
$ composer install
$ cp .env.example .env
$ php artisan key:generate
```
Then set database user, password and name in ``.env`` file, and run:
```
$ php artisan migrate:refresh --seed
```

Make sure ``./storage`` and ``./bootstrap/cache`` paths are writable by web server or you may receive 500 error response.

Now you can run backend in terminal:
```
$ php artisan serve --host 0.0.0.0 --port 8000
``` 

Or use apache2 server by adding this to server configuration:
```
<VirtualHost 0.0.0.0:80>
    DocumentRoot "[demo-path]/php/public"
    ServerName demo-backend.test
    ServerAlias www.demo-backend.test
    <directory "[demo-path]/php/public">
        AllowOverride All
        Order allow,deny
        Allow from all
    </directory>
</virtualhost>
```

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