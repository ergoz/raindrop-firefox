var self = require("sdk/self");
var tabs = require("tabs");
var injectJS;

//Consts
const popupWidth=460, popupHeight=264;

var popup = require("sdk/panel").Panel({
  width: popupWidth,
  height: popupHeight,
  contentURL: self.data.url("popup.html"),
  contentScriptFile: [
      self.data.url("libs/angular.js"),
      self.data.url("libs/angular-animate.min.js"),
      self.data.url("libs/angular-cookies.min.js"),
      self.data.url("libs/angular-contenteditable.js"),
      self.data.url("libs/jquery.js"),
      self.data.url("browsers/popup.js"),
      self.data.url("popup.js")
  ]
});


function fetchDivs() {
  injectJS = tabs.activeTab.attach({
    contentScriptFile: [self.data.url("libs/jquery.js"), self.data.url("browsers/inject.js"), self.data.url("inject.js")]
  });
  
  injectJS.port.on("sendRequest", function(item) {
    popup.port.emit("sendRequestFinal", item);
  });
}
 


/*var popupButton = require("sdk/widget").Widget({
  label: "Сохранить страницу в Raindrop.io",
  id: "popupButton",
  contentScriptWhen: 'ready',
  contentURL: self.data.url("icons/16.png"),
  panel: popup,
  onClick: fetchDivs
});*/
 



popup.on("show", function() {
    popup.port.emit("currentUrl", tabs.activeTab.url);
    injectJS.port.emit("getHTML", true);
});
 
//Popup events
popup.port.on("hidePopup", function () {
  popup.hide();
});

popup.port.on("resize", function(height) {
    popup.resize(popupWidth, height+3);
});

popup.port.on("startCaptureScreen", function() {
    popup.port.emit("captureScreenFinal", tabs.activeTab.getThumbnail());
});







var toolbarbutton = require("toolbarbutton");
exports.main = function(options) {
    var btn = toolbarbutton.ToolbarButton({
        id: 'popupButton',
        label: 'Сохранить страницу в Raindrop.io',
        image: self.data.url("icons/firefox_icon_16.png"),
        panel: popup,
        onCommand: fetchDivs
    });

    if (options.loadReason === "install") {
    btn.moveTo({
      toolbarID: "nav-bar",
      forceMove: false // only move from palette
    });
  }
};