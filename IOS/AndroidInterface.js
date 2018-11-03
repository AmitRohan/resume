module.exports = {
    getScreenDimensions: function() {
      return JSON.stringify({width: window.__DEVICE_DETAILS.screen_width, height: window.__DEVICE_DETAILS.screen_height});
    },

    runInUI: function(cmd) {
      // console.log(cmd);
    },

    Render: function(view, cb) {
      window.webkit.messageHandlers.IOS.postMessage(
        JSON.stringify({ 
          methodName : "render",
          parameters : { 
            view : view 
          }}));

      return;
    },

    addViewToParent: function(id, view, index, cb, replace) {
      return;

      if (cb)
      window.callUICallback(cb);
    },
}


