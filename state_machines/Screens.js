var objectAssign = require('object-assign');

var localState = {
  isInit: false,
  currScreen: null
};

module.exports = function(action, payload, state) {
  localState = payload;

  switch (action) {
    case "INIT_UI":
      localState.isInit = true;
      localState.currScreen = "MyResumeScreen";
      break;
    case "MyResumeScreen":
      localState.isInit = false;
      localState.currScreen = "MyResumeScreen";
      break;
    case "GO_BACK":
      break;

    default:
      throw new Error("Invalid action Passed : action name" + action);
  }

  return objectAssign({}, state, localState);
};
