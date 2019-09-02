# sms-mgt-api
An SMS management API


## Description
The SMS Managememnt API is an API built to enable users send and receive messages

## Table of Contents

 * [Technologies](#technologies)
 * [Features](#features)
 * [Installation](#installation)

### Technologies
* Nodejs Express framework
* PostgreSQL Database 

### Application API Documentation
The API Documentation is hosted at (https://documenter.getpostman.com/view/4214152/SVYxqGZ5)

### Persistent API Enpoint
Persistent API Endpoints is hosted at (https://sms-mgt.herokuapp.com/api/v1)

### Features
* Signup and Login
* Send Message
* View Inbox(Received Messages)
* View Outbox(Sent Messages)



## API Endpoints

###

<table>

<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>TASK</th></tr>

<tr><td>POST</td> <td>/auth/signup</td> <td>SignUp A User</td></tr>

<tr><td>POST</td> <td>/auth/login</td> <td>Login A User</td></tr>

<tr><td>POST</td> <td>/message/send</td> <td>Send A Message</td></tr>

<tr><td>GET</td> <td>/message/inbox</td> <td>View Inbox</td></tr>

<tr><td>GET</td> <td>/message/outbox</td> <td>View Outbox</td></tr>

<tr><td>POST</td> <td>/message/send</td> <td>Send A Message</td></tr>

<tr><td>POST</td> <td>/auth/delete/:phoneNumber</td> <td>Delete A Contact</td></tr>


</table>

## Getting Started

### Installation 

* Create a folder on your computer and navigate to the folder using your terminal
* git clone https://github.com/yomigeek/sms-mgt-api.git
* Run `npm install` to install packages and dependencies
* Run `npm run start` to start the server
* Navigate to http://localhost:5000/ on your browser to have access to the SMS API

#### Prerequisites

* To try out the endpoints, use the POSTMAN API Toolchain, visit https://getpostman.com

#### Testing with Postman

* After successful installation as stated above
* Navigate to http://localhost:5000/ on the Postman App
* Try out any of the API endpoints
* Enjoy! 

#### API Documentation
API is documented here https://documenter.getpostman.com/view/4214152/SVYxqGZ5


### Author 
Abayomi Olaoye
