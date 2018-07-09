# poc011-validator-generic-ui
### v0.1

## Asignee: [jamalv](https://github.com/jamalv)

## Background / Context
**Goal:** To create a concept for an app that is used for identity/value and user property (validations) management.

## Method
The designs will go trough phases, each with their own focus. 

1. Technical: The first focus of the UI POCs is to align the engineering efforts. Based on the designs we can make a prototype combining the technical POCs with the user interface POCs. 

2. User experience: When we made a technical prototype we will start focussing on improving the user experience.

## Result
The result of this POC is a an app that has 3 distinct parts. Described by the tree buttons at the bottom. While the scope of the app is limited to working together well with the webshop-ui poc, this app is meant to be extensable to work with any DAPP.

### Value management

Here are the things that hold economic value and are exchangable by the user. In the current scope this means the vouchers that a user will recieve trough the webshop. In the future this area will hold your tokens but could also hold your house or car.

### Property management

Properties in this context are mean things that say something about a person, but that hold no direct economic value and are not exchangable. E.g. your marks at school / your blood type / who are your parents.

### Identity

The qr code button at the bottom will open a scanner that can be used to:  

* Log in to DAPPs / expose your identitiy (public key)
* Exchange value: image 1.1 is an example of the screen after scanning a voucher  
* validate information (properties) image 1.2 is an example of the screen after scanning a validation request as in image 2.1  

## Recommendation
To keep the scope limited and focus on the technical aspects of the app. We will learn a lot from interacting with the first prototypes and will make changes. Spending time on design and more advanced features in this stage would be inneficient.
