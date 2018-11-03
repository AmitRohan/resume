var Android = require("./IOS/AndroidInterface");
var JBridge = require("./IOS/JBridgeInterface");

module.exports = function() {
  window.Android = Android;
  window.JBridge = JBridge;
}
