/**
 *
 * @param authKey
 * 
**/
module.exports = function (authKey) {

    if (authKey == null || authKey == "") {
        throw new Error("MSG91 Authorization Key not provided.");
    }

    this.sendSMS = function (mobileNos, postData, callback) {

        callback = modifyCallbackIfNull(callback);

        mobileNos = validateMobileNos(mobileNos);

        postData = isData(postData);

        var options = {
            method: 'POST',
            hostname: 'api.msg91.com',
            port: null,
            path: '/api/v5/flow/',
            headers: {
                'Content-Type': 'application/JSON',
                'authkey': authKey
            }
        };

        makeHttpRequest(options, postData, function(err, data){
            callback(err, data);
        });
    };    

    this.sendOtp = function (mobileNos, templateId, postData, callback) {

        callback = modifyCallbackIfNull(callback);

        mobileNos = validateMobileNos(mobileNos);

        templateId = validateTemplate(templateId);

        postData = isData(postData);

        var apiAuth = "template_id=" + templateId + "&mobile=" + mobileNos + "&authkey=" + authKey;

        var options = {
            method: 'GET',
            hostname: 'api.msg91.com',
            port: null,
            path: '/api/v5/otp?' + apiAuth,
            headers: {
                'Content-Type': 'application/JSON',
            }
        };

        makeHttpRequest(options, postData, function(err, data){
            callback(err, data);
        });
    };   

    this.verifyOtp = function (mobileNos, callback) {

        callback = modifyCallbackIfNull(callback);

        mobileNos = validateMobileNos(mobileNos);

        var apiAuth = "mobile=" + mobileNos + "&authkey=" + authKey;
        
        var options = {
            method: 'GET',
            hostname: 'api.msg91.com',
            port: null,
            path: '/api/v5/otp/verify?' + apiAuth,
            headers: {}
        };

        makeHttpRequest(options, function(err, data){
            callback(err, data);
        });
    };

    this.resendOtp = function (mobileNos, type, callback) {

        if(arguments.length == 2) {
            callback = type;
            type = null;
        }

        callback = modifyCallbackIfNull(callback);

        mobileNos = validateMobileNos(mobileNos);

        var apiAuth = "authkey=" + authKey + "&mobile=" + mobileNos;
        if (type) apiAuth += "&retrytype=" + type;
        
        var options = {
            method: 'GET',
            hostname: 'api.msg91.com',
            port: null,
            path: '/api/v5/otp/retry?' + apiAuth,
            headers: {}
        };

        makeHttpRequest(options, function(err, data){
            callback(err, data);
        });
    };

    this.getBalance = function(customRoute, callback) {

        if(arguments.length == 1) {
            callback = customRoute;
            customRoute = null;
        }

        callback = modifyCallbackIfNull(callback);

        var currentRoute = customRoute || 1;
        
        var apiAuth = 'authkey=' + authKey + '&type=' + currentRoute;
        
        var options = {
            method: 'GET',
            port: null,
            hostname: 'api.msg91.com',
            path: '/api/balance.php?' + apiAuth,
            headers: {}
        };

        makeHttpRequest(options, null, function(err, data){
            callback(err, data);
        });
    };

    return this;
};

function validateMobileNos(mobileNos){

    if (mobileNos == null || mobileNos == "") {
        throw new Error("MSG91 : Mobile No is not provided.");
    }

    if(mobileNos instanceof Array){
        mobileNos = mobileNos.join(",");
    }

    return mobileNos
}

function validateTemplate(template){

    if (template == null || template == "") {
        throw new Error("MSG91 : template id is not provided.");
    }

    return template;
}

function modifyCallbackIfNull(callback){
    return callback || function(){};
}

function isData(payload) {
    if (payload) return payload;
    return null;
}

function makeHttpRequest(options, postData, callback) {
    var http = require("https");
    var data = "";
    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            callback(null, data);
        });
    });

    req.on('error', function (e) {
        callback(e);
    });

    if(postData!=null){
        req.write(postData);
    }

    req.end();

}
