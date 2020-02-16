// References:
// 1. https://github.com/vpulim/node-soap#soaplistenserver-path-services-wsdl-callback---create-a-new-soap-server-that-listens-on-path-and-provides-services
// 2. https://gitter.im/vpulim/node-soap/archives/2017/09/04
// 3. https://stackoverflow.com/questions/8655252/node-js-how-to-consume-soap-xml-web-service
const soap = require('soap');
const express = require('express');
const cors = require('cors');
var xml = require('fs').readFileSync('./BaseCalorieService.wsdl', 'utf8');
var app = express();

var myService = {
  BaseCalorie_Service: {
    BaseCalorie_Port: {
      getCalories: function(args) {
        console.log('getCalories called');
        console.log(args.weight_lbs['$value']);
        let bmr = 10*Number(args.weight_lbs['$value'])/2.205 + 6.25*2.54*Number(args.height_in['$value']) - 5*Number(args.age_yrs['$value']);
        if (args.sex === "f") {
          bmr -= 161;
        } else {
          bmr += 5;
        }
        return { calories: bmr };
      }
    }
  }
};

const port = process.env.PORT || 8001;
app.use(cors());
app.listen(port, function(){
  console.log('server initialized');
  console.log(`Listening on port ${port}`);
});
soap.listen(app, '/basecalorieservice', myService, xml);
