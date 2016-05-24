## Universal Contact Center
### Frontend

User Interface / Frontend for a fully functional contact center which can handle phone calls, SMS messages, or e-mails.

Demoed at [SIGNAL 2016](https://www.twilio.com/signal/schedule/6hw4T5PinKeYaEOUoWoAKS/building-a-universal-call-center-with-task-router-and-aws-lambda)

Backend code lives in [its own repository](https://github.com/droberts84/universal-contact-center-be)

To run:

`npm start`  and visit "localhost:3000"

This code uses:

- [React.js](https://facebook.github.io/react/) for the UI
- [Webpack](http://webpack.github.io/) to compile JS
- [Babel](http://babeljs.io/) for ES2015 support
- [taskrouter.js](https://www.twilio.com/docs/api/taskrouter/worker-js) to connect with [Twilio Task Router](https://www.twilio.com/taskrouter)
- [Twilio Client](https://www.twilio.com/client) to make/receive calls through the browser
and many other tools.
