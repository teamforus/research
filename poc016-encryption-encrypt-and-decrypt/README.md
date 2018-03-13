## poc016-encryption-encrypt-and-decrypt

### Background / Context
**Goal:** Encrypt and decrypt data using both symmetric and asymmetric cyphers.


**Target platforms:**
* iOS
* Android
* Browser

### Assignee: Jasper Tamminga

### Method ###
Typically this process involves the following steps:
1. Using a client application a user encrypts some local data using either the private key of the receiving user or a symmetric (shared) key
2. The encrypted data is transferred to another user who is using another instance of the client application
3. The receiving user uses his private key or the symmetric key to decrypt the received data

This POC focuses on steps 1 and 3.

### Result

#### iOS

TBD

#### Android

TBD

#### Browser

##### Native browser support
Native browser support for cryptographic operations is provided by the W3C Web Cryptography API.

Advantages
* Key data is hidden from JavaScript code. Although the objects holding de private keys are accessible, the key itself can be kept hidden.

Disadvantages
* Features. Compared to third party libraries the Crypto API provides less features.
* Browser support. Browser vendors can independently determine which (future) features of the API they will implement. On modern browsers support is good, with ie/edge lagging behind a bit.

#### Third party JavaScript libraries

An actively maintained and pretty complete list of JavaScript crypto libraries can be found at: https://gist.github.com/jo/8619441.

Advantages
* Features. Functionality varies between different libraries with each having its own focus, but generally they provide a richer feature set than the native crypto API.
* Browser support. Because they are a pure JavaScript implementation, libraries are less dependent on the browser the application runs in.

Disadvantages
* Security. Implementation of cryptographic functions in JavaScript is considered insecure. Basically it is as secure as the JavaScript application can be made in the browser. If for example a JavaScript injection attack is possible, the users private key could easily be found by an attacker.

#### Recommendation

#### iOS

TBD

#### Android

TBD

#### Browser
Because of the security implications of pure JavaScript implementations of cryptographic functions I would advise using the native Crypto API instead of libraries. Only when features are needed that are not provided by de API third party libraries should be further investigated.
