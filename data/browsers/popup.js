var currentURL=function(callback){
    callback(foxCurrentTabUrl);
}, 

oblako=function(){},

makeScreenshot=function(){
    self.port.emit("startCaptureScreen", true);
}, 

oblakoClose=function(){
    self.port.emit("hidePopup", true);
},

postOblako=function(){
    self.port.emit("resize", $('body').height());
},

openLink=function(){
    oblakoClose();
    return true; 
};


// Events to main.js
self.port.on("sendRequestFinal", function(item) {
    angular.element(document.getElementById('stepsController')).scope().actions.setFormData(item);
});

var foxCurrentTabUrl='';
self.port.on("currentUrl", function(url) {
    raindropId = 0;
    foxCurrentTabUrl=url;

    angular.element(document.getElementById('stepsController')).scope().actions.checkUrlDublicates();
});

self.port.on("captureScreenFinal", function(dataURI) {
    angular.element(document.getElementById('stepsController')).scope().actions.setCapturedPage(dataURI);
});
