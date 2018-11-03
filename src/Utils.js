"use strict";
var objectAssign = require('object-assign');
const R          = require('ramda');

var callbackMapper = {
  map: function(fn) {
    if (typeof window.__FN_INDEX !== 'undefined' && window.__FN_INDEX !== null) {
      var proxyFnName = 'F' + window.__FN_INDEX;
      window.__PROXY_FN[proxyFnName] = fn;
      window.__FN_INDEX++;
      return proxyFnName;
    } else {
      throw new Error("Please initialise window.__FN_INDEX = 0 in index.js of your project.");
    }
  },
  callJSCallback: function() {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    var fName = params[0];
    var functionArgs = params.slice(1);
    window.__PROXY_FN[fName].call(null, functionArgs);
  }
}

exports["_showUI"] = function(callback) {
  return function(errCallback) {
    return function(state) {
      return function(noAction) {
        return function() {
          window.__duiShowScreen(callback, state);

          if (noAction) {
            setTimeout(function() {
              callback(state)();
            }, 1000);
          } else {
            window.handleBackPress = function() {
              state.event = 'goBack';
              callback(state)();
            };
          }
        };
      };
    };
  };
};

exports["_callAPI"] = function(success) {
  return function(err) {
    return function(method) {
      return function(url) {
        return function(data) {
          return function(headers) {
            return function() {
              try {
                console.log("Headers are ", headers);
                method = method.constructor.name;
                var callback = callbackMapper.map(function() {
                  try {
                    console.log("Response: ", arguments);
                    if (arguments && arguments.length >= 3) {
                      success({
                        status: arguments[0],
                        response: arguments[1],
                        statusCode: arguments[2]
                      })();
                    } else {
                      console.log("Invalid Response: ", arguments);
                      success({
                        status: "failed",
                        response: {},
                        statusCode: "500"
                      })();
                    }
                  } catch(err) {
                    console.log(err)
                  }
                });
                JBridge.callAPI(method, url, btoa(JSON.stringify(data)), btoa(JSON.stringify(headers)), callback);
              }
              catch(err) {
                console.log(err);
                return;
              };
            };
          };
        };
      };
    };
  };
};


exports["sendUpdatedState"] = function(state) {
  console.log('sendupdatedstate', state);
  var currentScreen = window.__CACHED_SCREENS[window.__CURR_SCREEN];
  currentScreen = currentScreen.hasOwnProperty('screen') ? currentScreen.screen : {};
  if (currentScreen.hasOwnProperty('handleStateChange')) {
    currentScreen.handleStateChange(state);
  } else {
    console.error('Current screen can not handle state changes');
  }
  return "Done";
};

exports["showToast"] = function(msg) {
  JBridge.toast(msg);
}

exports["_updateState"] = function(current) {
  return function(newState) {
    return R.merge(current, newState);
  }
}

exports["toJson"] = function(json) {
  try {
    return JSON.parse(JSON.stringify(json));
  } catch(err) {
    console.error(err)
    return {}
  }
}

exports["logAny"] = function(object) {
  console.log(object);
}

exports.getRecord = function(x){
    return x;
};

exports.setTimeout = function(time){
  return function(fn){
    return function(){
      return setTimeout(fn, time);
    };
  };
};

exports.getSavedState = (JSON.parse(localStorage.getItem("resume_state")) || {action: "INIT_UI", screen: "INIT"})

exports.getGuestLogin = function() {
  return (JSON.parse(localStorage.getItem("resume_state")) || {action: "INIT_UI", screen: "INIT"})
}

exports.setSavedState = function(state) {
  localStorage.setItem("resume_state", JSON.stringify(state));
}
