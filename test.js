/**
 * Created by pravartan on 20/04/21.
 */

var msg91 = require("./index")("API");

var mobileNo = "XXXXXXXXXX";

msg91.sendSMS("mobileNo", "POST_DATA", function (err, response) {
    console.log(err);
    console.log(response);
});


var mobileList = [ "XXXXXXXXXX", "XXXXXXXXXX", "XXXXXXXXXX" ];

msg91.sendSMS(mobileList, "POST_DATA", function (err, response) {
    console.log(err);
    console.log(response);
});

var mobileNoCSV =  "XXXXXXXXXX,XXXXXXXXXX,XXXXXXXXXX";

msg91.sendSMS(mobileNoCSV, "POST_DATA", function (err, response) {
    console.log(err);
    console.log(response);
});


var mobileNo =  "XXXXXXXXXX";

msg91.sendOTP(mobileNo, "TEMPLATE_ID", "POST_DATA", function (err, response) {
    console.log(err);
    console.log(response);
});

var mobileNo =  "XXXXXXXXXX";

msg91.verifyOTP(mobileNo, function (err, response) {
    console.log(err);
    console.log(response);
});

var mobileNo =  "XXXXXXXXXX";

msg91.resendOTP(mobileNo, function (err, response) {
    console.log(err);
    console.log(response);
});

var mobileNo =  "XXXXXXXXXX";

msg91.resendOTP(mobileNo, "OTP_TYPE", function (err, response) {
    console.log(err);
    console.log(response);
});

msg91.getBalance(function(err, response){
    console.log(err);
    console.log(response);
})

msg91.getBalance("ROUTE", function(err, response){
    console.log(err);
    console.log("Custom Router : " + response);
})
