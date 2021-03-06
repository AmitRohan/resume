const uiHandler = require("@juspay/mystique-backend").uiHandlers.android;
var dispatcher;

//Reducer
const ScreenReducer = require("../state_machines/Screens");

const reducer = require("@juspay/mystique-backend").stateManagers.reducer({
  "SCREEN": ScreenReducer
});

// Screens
const RootScreen = require("../views/RootScreen");
const MyResumeScreen = require("../views/MyResumeScreen");

// ScreenActions
const RootScreenActions = require("../actions/RootScreenActions");

var determineScreen = (screenName, state) => {
  var screen;


  // Space has been added for dir strucuture
  // add accordingly
  switch (state.currScreen) {
    case "MyResumeScreen":
      screen = new(MyResumeScreen(dispatcher, RootScreenActions))(null, null, state);
      break;
    default:
      break;
  }

  return screen;
}

var returnIfCached = function(screenName) {
  return window.__CACHED_SCREENS[screenName];
}

var renderRootScreen = (state, dispatcher) => {
  window.__ROOTSCREEN = new(RootScreen(dispatcher, RootScreenActions))({}, null, state);
  return window.__ROOTSCREEN;
}

var updateNode = function(data) {
  var oldScreenId = window.__CACHED_SCREENS[data.action].screen.layout.idSet.id;
  window.__MODE = (new Date()).getTime() + " mode";
  window.__CACHED_SCREENS[data.action].screen = determineScreen(data.action, data.state);
  // delete old id
}

window.__CLEAR_STACK = function(screenName) {
  window.__SCREEN_STACK = [screenName];
}

var addToStack = function(screenName, screenData) {
  if (typeof screenData.screen.shouldStackScreen !== "undefined" && !screenData.screen.shouldStackScreen)
    return;

  var stackLen = window.__SCREEN_STACK.length;

  if (!stackLen)
    window.__SCREEN_STACK.push(screenName);
  else if (window.__SCREEN_STACK[stackLen - 1] !== screenName)
    window.__SCREEN_STACK.push(screenName);
}

var renderScreen = function(data) {
  JBridge.hideKeyboard();
  console.log("IN RENDER SCREEN");
  var screen;
  var isCached = false;
  var takeFromCache = true;
  var screenData = window.__CACHED_SCREENS[data.action];

  if (screenData) {
    isCached = true;

    screen = screenData.screen;
    if (typeof screen.shouldCacheScreen !== "undefined" && !screen.shouldCacheScreen) {
      console.log("updating screen ", data.action);
      updateNode(data);
      takeFromCache = false;
    }
  } else {
    window.__ANIMATE_DIR = 1;
    screen = determineScreen(data.action, data.state);
    window.__CACHED_SCREENS[data.action] = {
      index: window.__SCREEN_COUNT,
      screen: screen,
      timeStamp: (new Date()).getTime(),
    }

    window.__SCREEN_COUNT++;
    screenData = window.__CACHED_SCREENS[data.action];
  }

  addToStack(data.action, window.__CACHED_SCREENS[data.action]);
  return { screen: screenData.screen, isCached: isCached, takeFromCache: takeFromCache }
}

var appendToRoot = function(screen) {
  window.__SCREEN_INDEX++;
  window.__ROOTSCREEN.appendChild(window.__ROOTSCREEN.idSet.root, screen.render(), window.__SCREEN_INDEX, screen.afterRender);
}

var getDirection = function() {
  if (window.__CACHED_SCREENS[window.__CURR_SCREEN].timeStamp >= window.__CACHED_SCREENS[window.__PREV_SCREEN].timeStamp)
    return 1;

  return -1;
}

var handleGoBack = function(data) {
  JBridge.hideKeyboard();

  var stackLen = window.__SCREEN_STACK.length;
  var cmd = "";
  if (stackLen == 1) {
    __ROOTSCREEN.minimizeApp();
    return;
  }

  var screenData = window.__CACHED_SCREENS[window.__CURR_SCREEN];
  if (screenData.screen.onBackPress) {
    if (!screenData.screen.onBackPress()) {
      console.log("failed");
      return;
    }
  }

  window.__PREV_SCREEN = window.__SCREEN_STACK[stackLen - 1];
  window.__CURR_SCREEN = window.__SCREEN_STACK[stackLen - 2];
  window.__ANIMATE_DIR = -1;
  window.__SCREEN_STACK.pop();
  window.__CACHED_SCREENS[window.__CURR_SCREEN].screen.onPop(data.state, "backPress");
}

var handleScreenActions = function(data) {
  var currView;
  var res;

  if (data.action == "GO_BACK") {
    console.log("going back");
    handleGoBack(data);
    return {};
  }

  if (data.state.isInit) {
    console.info("App Start");
    currView = renderRootScreen(data.state, dispatcher);

    // dispatcher('SCREEN', data.state.currScreen, {});
    return { render: currView.render() };
  }

  if (window.__CURR_SCREEN == data.action) {
    console.warn("Screen already rendered ", window.__CURR_SCREEN);
    return {};
  }

  if (!window.__CURR_SCREEN && !window.__PREV_SCREEN) {
    console.info("First Screen Append");
    window.__CURR_SCREEN = data.action;
    appendToRoot(renderScreen(data).screen);
    return {};
  }

  window.__PREV_SCREEN = window.__CURR_SCREEN;
  window.__CURR_SCREEN = data.action;

  res = renderScreen(data);
  if (!res.isCached) {
    appendToRoot(res.screen);
    return {};
  } else if (res.takeFromCache) {
    window.__ANIMATE_DIR = getDirection();

    if (res.screen.onPop)
      res.screen.onPop(data.state);
  } else {
    window.__ANIMATE_DIR = getDirection();
    appendToRoot(res.screen);
  }

  return {};
}

var Containers = {
  handleStateChange: (data) => {
    var currView;

    if (data.stateHandler == "SCREEN")
      return handleScreenActions(data);

    currView = window.__CACHED_SCREENS[stateHandler].screen;
    return currView.handleStateChange(data) || {};
  }
}

dispatcher = require("@juspay/mystique-backend").stateManagers.dispatcher(Containers, uiHandler, reducer);

module.exports = {
  init: () => {
    var initialState = {};
    dispatcher("SCREEN", "INIT_UI", initialState);
  },
  changeScreen: (screen, state) => {
    dispatcher("SCREEN", screen, state);
  }
}
