var Renderer = require("./Renderer");
var Reconciler = require("./Reconciler");

module.exports = {
    getScreenDimensions: function() {
      return JSON.stringify({width: window.innerWidth, height: window.innerHeight});
    },

    runInUI: function(cmd) {
      if (typeof cmd == "string")
      return;

      Renderer.runInUI(cmd);
    },

    Render: function(view, cb) {
      var parentElement = document.querySelector("body");
      var elem = Renderer.inflateView(view, parentElement);

      Reconciler.run(elem, view.props, view.type, {}, "linearLayout");

      if (cb)
      window.callUICallback(cb);
    },

    addViewToParent: function(id, view, index, cb, replace) {
      var parent = document.getElementById(id);
      var props = window.__VIEWS[id].style;
      var type = parent.className;
      var iterableChildNodes = Array.prototype.slice.call(parent.children);

      if (replace) {
        iterableChildNodes.forEach((each) => {
          each.remove();
        });
      }

      var elem = Renderer.inflateView(view, parent);

      Reconciler.run(elem, view.props, view.type, {}, type);

      if(cb)
      window.callUICallback(cb);
    },

    getChildNodes: function(elementId, condition) {
      var childNodes = Renderer.getChildNodes(elementId, condition);
      return childNodes;
    }
};
