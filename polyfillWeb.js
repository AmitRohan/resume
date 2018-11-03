var Android = require("./WEB/AndroidInterface");
var JBridge = require("./WEB/JBridgeInterface");

module.exports = function() {
  window.Android = Android;
  window.JBridge = JBridge;
}
