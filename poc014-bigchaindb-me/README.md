# POC-014

## Developer Manual for the Verification of
Welfare Transactions on the Blockchain

Written by the 2019 Computer Science Capstone
at Southwestern University:
Adanna Court, Alexander Hoffman, Daniel Maldonado, Devon Fulcher, and Bobby
Garza

Instructor: Dr. Barbara Anthony, Southwestern University
Math and Computer Science Department
Last Modified: May 1st, 2019

Copyright © 2019 by Southwestern University Computer Science 2019 Capstone
All rights reserved 

### Preface:
Decentralized technologies, such as Bitcoin, are secure, transparent, and
nascent technologies for the storage and transfer of information and assets. With their
potential for use as a new way to distribute funds such as welfare,they can be used to
mitigate inequality by offering governmental assistance to those individuals who qualify.
For our Computer Science Capstone Project, we partnered with a Netherlands-based
startup company, Forus, to develop upon their welfare-distribution mobile application,
the Me app. We are building upon Forus’s pre-existing codebase by employing
decentralized technologies such as blockchain in conjunction with our own Android
mobile application. By increasing the democratization of the Me app, we offer the
welfare recipients of the Netherlands a greater sense of security and privacy by
replacing centralized, vulnerable databases with personally-stored security. Blockchain
technologies verify transactions by consensus, meaning everyone on the application
platform has access to every transaction that has been made, where identity is masked
by a unique string of characters. Using blockchain technology will provide a reliable way
to distribute welfare while reducing fraud in the system.

### About Forus
The Forus nonprofit organization develops software for the disbursement and usage of
welfare. They have modeled their software to incorporate the needs of the various
parties who are affected by welfare systems. They have delineated these parties into 4
user types: validators, requesters, providers, and sponsors. Each user type possess
varying roles, responsibilities, and privileges and individuals can be a part of numerous
user types at the same time. Sponsors are those who provide funds for a certain
segment of the population. Requesters are those who are in need of financial
assistance from the welfare system. Providers provide goods and services for
requesters in exchange for their welfare provided funds. Finally, validators are users
who validate the consistency of the network. The Me app provides a simple way for
requesters to transfer the funds that they have received from sponsors to providers.
This process is only available to the providers and requesters that have been given
access to the system by the validators.

## Google Cloud
Using Google Cloud Platform allows users to easily create an easy to manage Linux
distribution. For this project Ubuntu needs to be used to install BigChainDB,
Tendermint, and NGINX. To start a VM instance go to cloud.google.com and click
console on the top right. The dashboard will be brought up and at this point the user will
have to start a project and setup a payment plan. The dropdown at the top of the page
can be used to create a new project. Here is a link from Google to create a project if
more instruction is needed
( ​https://cloud.google.com/resource-manager/docs/creating-managing-projects ​). To start
a VM instance click the navigation menu on the top left of the website. Under “compute”
click “compute engine”. Click “create instance” and give your VM a name, select Ubuntu
18.04, allow http and https traffic, allow full access to all cloud APIs, and also set up an
external IP address. To setup the external address select “ ​Management, security, disks,
networking, sole tenancy ​” and click the networking tab. Scroll down to external IP and
select create IP address. Give the external IP address a name and select standard to
avoid extra billing charges. After this you are now ready to finish the VM setup, just click
create to finish the process. In order to start the VM select the created VM and click
start at the top of the page. To open the Google Cloud Shell click the SSH button and a
Ubuntu Bash shell will open.

## Me App
This project requires Android Studio, Java, and BigChainDB. The following are the
specifications of the original development server:

Android Studio Java Google Cloud BigChainDB Gradle
3.3 1.8 Ubuntu 18.04 1.2 4.10.1

There are numerous, detailed guides on how to install Android Studio. A reasonable
guide can be found ​ ​here ​. In Android Studio, the developer is able to drag and drop
buttons, text boxes, and images into the app to apply the cosmetics of the app. The
developer will still have to write code for the functionality of the buttons, text boxes,
images, etc. to work.
The Java classes of our Android application include:
These classes correspond to activities or app pages that are launched when a user
interacts with the UI. XML is used to handle the creation of the apps visual elements.
This includes color schemes, buttons, text input, etc. Most classes have a
corresponding XML resource file that was used to style the app.


Also, to include external libraries the build.gradle file needs to be accessed. This
allowed us to use the bigchainDB java drivers and many other APIs.

Just as important as the gradle build file there is the Android Manifest File that allows
developers to do things like allow internet access, camera, etc.

Utilizing these android files is an important part of maintaining the application and
making the programming experience seamless with new libraries and android features.

In order to run the code in a virtual environment, look for the “Tools” drop down menu
and select “AVD Manager”. In Android Studio version 3.3, this item is at the top of the
drop down list. Once the AVD Manager window opens up, you will see a list of
previously established virtual devices if you have previously created one.

In order to add a virtual device, click the “Create Virtual Device..” button located at the
bottom left of the window.

Now, you will be able to select a category, model and version type for your Virtual
Device. In this case, we would select “Phone”, “Nexus 5X” and then click Next. Select
the latest release and then click Next. Now you should be on a screen where you can 
rename your device, and manipulate settings. For the New Me app, it will be essential to
access a webcam attached to the machine running the virtual device. Because of this,
we will need to click on “Show Advanced Settings”. A picture of the advanced settings
page is shown below.

Once on the advanced settings page, look for the section labeled “Camera”. Under
“Back” (which stands for back facing camera) select “Webcam0”. If you have more than
one webcam connected, you may have to do some testing to find out which webcam is
the one you want to use. Once done with this, select “Finish” located on the bottom right
corner of the window and Android Studio will begin creating the virtual device. This may
involve downloading an API if you don’t have to correct one installed already. This
process will take a few minutes, but once done, you will be able to select your new
virtual device when prompted after running the code. In this case, “Nexus 5X API 28 2”
was added to the list of virtual devices.

### BigChainDB
MANUAL SETUP:
Creating a personal node for BigchainDB can be found at this ​site ​. After setting up Linux
on Google Cloud Platform then follow the steps on the “Simple Deployment Template”
page. Under the Network Security Group option it is not necessary to worry about TCP
in Google Cloud Platform. Updating Ubuntu is a good step to take, and users do not
have to worry about setting up a DNS, however setting up an external IP address will be
needed for remote connections. This will be covered in the Google Cloud Platform
section. The page for setting up NGINX is straightforward and copy pasting the
commands should work just fine. The next step for setting up BigChainDB is installing
the correct version of Python and pip. This step also requires copying and pasting
commands into the Google Cloud Platform bash shell. The commands for installing
Tendermint are all listed on the same bash command, but they are separate
commands. If users decide to run the node locally then just copy the commands into a
local Ubuntu Shell. The next section of the tutorial is vague for many of the commands
about sharing your node with the rest of the nodes in the network. However, it is likely
that only one node will be run for a student project so these steps can be skipped.
However, changing the suggested lines in the config.toml file is necessary, so make
those changes. The rest of the information on the page will instruct the user on how to
9install monit and Tendermint and how to start MongoDB. After carefully following and
reading those instructions the node is ready!

### DOCKER SETUP:
The BigChainDB website advertises that the manual setup is the easy way to setup a
node, however, this was not our experience. Dan Ascritinii from Kryha.io had an easy
walkthrough for creating a BigChainDB node using Docker. All the steps for setting up a
VM instance are the same except for OS type and a setting for using two CPU cores
and more memory. After selecting to start a new VM instance navigate to “machine
type” and click “2 vCPUs” as the cpu type. This will allow bigchain to run efficiently.
Now navigate to boot disk and select the option below, which is Container-Optimized
OS 73:
Change the memory to about 30GB which is located at the bottom of the page and will
have a default of 10 GB. After this step all that is left to do is click allow http traffic and
setup an external IP address, which was covered in the Manual Setup portion of this
guide and in the Google Cloud Platform section.
Now SSH into your new SHELL and enter these commands:
- vi docker-compose.yml
- Now copy the code below and paste it into the document you have
opened
```sh
# docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD:$PWD"
```
```yml
-w="$PWD" docker/compose:1.24.0 up -d
version: '2.1'
services:
10mongodb:
image: mongo:3.6
ports:
- "27017:27017"
command: mongod
restart: always
bigchaindb:
image: bigchaindb/bigchaindb:2.0.0-beta9
depends_on:
- mongodb
- tendermint
environment:
BIGCHAINDB_DATABASE_BACKEND: localmongodb
BIGCHAINDB_DATABASE_HOST: mongodb
BIGCHAINDB_DATABASE_PORT: 27017
BIGCHAINDB_SERVER_BIND: 0.0.0.0:9984
BIGCHAINDB_WSSERVER_HOST: 0.0.0.0
BIGCHAINDB_WSSERVER_ADVERTISED_HOST: bigchaindb
BIGCHAINDB_TENDERMINT_HOST: tendermint
BIGCHAINDB_TENDERMINT_PORT: 26657
ports:
- "80:9984"
- "9985:9985"
- "26658"
command: 'start'
restart: always
tendermint:
image: tendermint/tendermint:0.22.8
entrypoint: ''
ports:
- "26656:26656"
- "26657:26657"
command: sh -c "tendermint init && tendermint node
--consensus.create_empty_blocks=false --proxy_app=tcp://bigchaindb:26658"
restart: always
```

- Once this is copied into the folder copy the commented out line of code at the top
of the folder: docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v
"$PWD:$PWD"
- Now hit the esc key and enter the command “wq!”
- Paste the copied command and hit enter
- MongoDB, Tendermint, and BigchainDb will all install
- Enter the command “docker ps” and hit enter
- Enter the command “docker logs
YourUserNameBeingUsedForGoogleCloudPlatform_bigchaindb_1”
- Now BigChainDB should be running!
From here you can follow the external IP address created for this instance and you will
be greeted by a page like this (Firefox highlights text, Chrome does not).
To see transactions enter the same address but with these extensions:
http://104.154.25.17/api/v1/transactions/TRANSACTIONNUMBERHERE

This will allow developers to see the generated JSON for parsing etc.

### MongoDB
Large disadvantages of decentralized systems are that they do not scale well and that
they are slow under high usage. MongoDB is a component of the BigChainDB system
as a way of counteracting these qualities. MongoDB is a nonrelational, NoSQL
database that produces high availability from its replication mechanism, sharding. Given
these features, MongoDB is able to accommodate high levels of scaling. MongoDB
records are called documents which are data structures that are similar to JSON
objects. A document is composed of field and value pairs. Accessing the Mongo
database is fairly straightforward. This article
( ​http://docs.bigchaindb.com/en/latest/query.html ​) is written by one of the BigChainDB
developers and includes useful queries to check transactions, assets, etc.
13In order to query a mongo database from a Linux command line enter the command
“mongo” and press enter in the shell. To access your database type in “use
NAMEOFDATABASE”. This will allow developers to check what is stored in the
database. Accessing the database from within the app is necessary in order to display
users transaction history which was something that was not implemented, but could be
done. MongoDB docs are available here:
http://mongodb.github.io/mongo-java-driver/3.10/javadoc/overview-summary.html
The repository has to be added to dependencies with the statement:
'org.mongodb:mongo-java-driver:3.10.2'
This needs to be done inside of the app.build.gradle file with all the other dependencies
used in the project.

### Further Development
- Implement new features into our app - the list of stores where vouchers can be
used, a Venmo like function that can send money between friends and family,
recent transactions scroll view, etc.
- Implement blockchain backend to the Forus’ Me App
- Implement new features that are in our app to Forus’ Me App
- Use MongoDb Java queries to display and manage user funds.
