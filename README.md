# Msg91
Msg91 API V5 for node.js


# Msg91 Installation

```javascript 
npm install msg91-api --save
```

# Msg91 Integration


### Send SMS

```javascript
var msg91 = require("msg91")("API_KEY");

// Mobile No can be a single (XXXXXXXXXX) number or csv string (XXXXXXXXXX, XXXXXXXXXX)
// Variables with the same name defind in SMS template

var postData = {
  "flow_id": "EnterflowID",
  "sender": "EnterSenderID",
  "mobiles": "Enter Mobile Number", 
  "VAR1": "VALUE1",
  "VAR2": "VALUE2"
};

msg91.sendSMS(postData, function(err, response){
    console.log(err);
    console.log(response);
});
```
### Send OTP

```javascript

var mobileNo = "XXXXXXXXXX";

// OTP Template id of MSG91
var templateId = "******************"; 

// List of variable with the same name defind in OTP template
var postData = {
  "Value1": "Param1",
  "Value2": "Param2",
  "Value3": "Param3"
};

msg91.sendOTP(mobileNo, templateId, postData, function(err, response){
    console.log(err);
    console.log(response);
});
```

### Verify OTP

```javascript

var mobileNo = "XXXXXXXXXX";

msg91.verifyOTP(mobileNo, function(err, response){
    console.log(err);
    console.log(response);
});
```

### Resend OTP

```javascript

var mobileNo = "XXXXXXXXXX";

msg91.resendOTP(mobileNo, function(err, response){
    console.log(err);
    console.log(response);
});

// Resend specific type of OTP.
msg91.resendOTP(mobileNo, "OTP_TYPE", function(err, response){
    console.log(err);
    console.log(response);
});
```


### Get Balance

```javascript

msg91.getBalance(function(err, msgCount){
    console.log(err);
    console.log(msgCount);
});

// Get Balance for given Route.
msg91.getBalance("ROUTE_NO", function(err, msgCount){
    console.log(err);
    console.log(msgCount);
});
```



# Msg91 Constants

### ROUTE_NO
```javascript
1 - Promotional Route
4 - Transactional Route
```

### OTP_TYPE
```javascript
voice - default
text
```

