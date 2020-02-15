// References:
// 1. https://github.com/vpulim/node-soap#soaplistenserver-path-services-wsdl-callback---create-a-new-soap-server-that-listens-on-path-and-provides-services
// 2. https://gitter.im/vpulim/node-soap/archives/2017/09/04
const soap = require('soap');
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
var xml = require('fs').readFileSync('./BaseCalorieService.wsdl', 'utf8');
var app = express();

var myService = {
  BaseCalorie_Service: {
    Hello_Port: {
      getCalories: function(args) {
        console.log('getCalories called');
        let bmr = 10*args.weight_lbs/2.205 + 6.25*2.54*args.height_in - 5*args.age_yrs;
        if (sex === "f") {
          bmr -= 161;
        } else {
          bmr += 5;
        }
        return { calories: bmr };
      },
    }
  }
};

//body parser middleware are supported (optional)
const port = 8001;
app.use(cors());
app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
app.listen(port, function(){
  //Note: /wsdl route will be handled by soap module
  //and all other routes & middleware will continue to work
  soap.listen(app, '/wsdl', myService, xml, function(){
    console.log('server initialized');
    console.log(`Listening on port ${port}`);
  });
});

// const port = 3000;
// const server = app.listen(port, () => console.log(`Listening on port ${port}`));
// module.exports = app;
