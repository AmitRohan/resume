const dummyList = {
    title: "Main",
    children: [{
        title: "splashScreenFlow",
        screenName: "SplashScreenFlow",
        screenActions: [{ "event": "BACK_SplashScreenFlow", "targetFunction": "handleBackPress" }]
    }]
};


const myScreenList = [{ "screenName": "DummyScreen", "actions": ["DummyAction"] }, { "screenName": "SplashScreen", "actions": ["OP_SplashScreen"] }];
// var myScreenList = [{
//     screenName: "DummyScreen",
//     actions: ["DummyAction"]
// }]

function getFlowList() {

    return this.dummyList.children || [];


    var dummyList = {
        title: "Main",
        children: [{
            title: "splashScreenFlow",
            screenName: "SplashScreenFlow",
            screenActions: []
        }]
    };
    return dummyList.children || []
}

function clickInsideElement(e, className) {
    var el = e.srcElement || e.target;

    if (el.classList.contains(className)) {
        console.log("EDITOR FOR ", el.textContent || el.innerText)
        return el;
    } else {
        while (el = el.parentNode) {
            if (el.classList && el.classList.contains(className)) {
                return el;
            }
        }
    }

    return false;
}

/**
 * Get's exact position of event.
 * 
 * @param {Object} e The event passed in
 * @return {Object} Returns the x and y position
 */
function getPosition(e) {
    var posx = 0;
    var posy = 0;

    if (!e) var e = window.event;

    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {
        x: posx,
        y: posy
    }
}

module.exports.startEventListner = function storeCoords() {
    document.addEventListener( "click", function(e) {
        window.__mouseClickedAt=getPosition(e);
    });
}


module.exports.dummyList = dummyList;
module.exports.myScreenList = myScreenList;
module.exports.getFlowList = getFlowList;


module.exports.getMyScreenList = function getMyScreenList(flowName) {


    var myScreenList = [];

    findFlowByName(this.dummyList, flowName).children.map((item) => {
        myScreenList = updateScreenList(myScreenList, item)
    })



    return this.myScreenList;
}

module.exports.getSampleFlowItem = function() {
    return {
        title: "SampleFlow",
        screenName: "SampleScreen",
        screenActions: [{
            event: "BACK_SampleFlow",
            targetFunction: "handleBackFlow"
        }]
    }
}
//helper function
function getFirstCharLoweCase(data) {
    return data.substring(0, 1).toLowerCase() + data.substring(1, data.length);
}


//core
function getUi(items) {
    var tmpCode = "";

    tmpCode += "<ul>"
    tmpCode += "<li>"
    tmpCode += "<i>";

    tmpCode += "<button type=\"button\" class=\"btn btn-default toggleContext\" id=" + items.title + ">";

    // tmpCode += "<div class=\"toggleContext\">"
    tmpCode += items.title;
    // tmpCode += "</div>";

    tmpCode += "</button>"
    tmpCode += "</i>"

    if (items.children != undefined) {

        tmpCode += "<ul>";
        items.children.map((data) => {
            // console.log("Sending >", data)
            tmpCode += getUi(data);
        })

        tmpCode += "</ul>";
    }

    tmpCode += "</li></ul>";

    return tmpCode;

}


//get Flow based on flowName
module.exports.getFlowItem = function getFlowItem(flowName) {
    return findFlowByName(this.dummyList, flowName);
}

//context menu option 1
module.exports.getSampleFlow = function generateSampleFlow(flowName) {

    var flowItem = findFlowByName(this.dummyList, flowName);
    console.log(flowItem)
    var fileContent = getFlowStructure(flowItem);
    console.log(fileContent)
    //logToOutput(fileContent)
}

function findFlowByName(items, searchFor) {
    console.log(items.title, " vs ", searchFor)
    if (items.title === searchFor) {
        return items;

    }
    if (items.children != undefined) {
        for (var i = 0; i < items.children.length; i++) {
            var dummy = findFlowByName(items.children[i], searchFor)
            if (dummy != undefined) {
                return dummy
            }
        }
    }
}


module.exports.modifyFlow = function modifyFlow(oldFlowName, modifiedFlowItem) {
    this.dummyList = findAndModify(this.dummyList, oldFlowName, modifiedFlowItem)
    return this.dummyList;
}




function findAndModify(items, searchFor, newFlowItem) {
    if (items.title === searchFor) {
        return newFlowItem
    }

    var tmp = items
    if (tmp.children == undefined) {
        tmp.children = [];
    }
    for (var i = 0; i < tmp.children.length; i++) {
        tmp.children[i] = findAndModify(tmp.children[i], searchFor, newFlowItem)
    }
    return tmp;
}




function addToFlow(items, search, newFlow) {
    if (items.title === search) {

        if (items.children === undefined) {
            items.children = [];
        }
        items.children.push(newFlow);
        console.log("FOUND AND ADDING", newFlow)
        return items;
    }

    if (items.children != undefined) {

        for (var i = 0; i < items.children.length; i++) {
            items.children[i] = addToFlow(items.children[i], search, newFlow);
        }

    }

    return items

}


function mergeAction(list1, list2) {

    if (list1 == undefined) {
        list1 = []
    }

    if (list2 == undefined) {
        list2 = []
    }

    //helper to get unique
    Array.prototype.unique = function() {
        var a = this.concat();
        for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
                if (a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    };

    return list1.concat(list2).unique();

}

function updateScreenList(oldList, flowData) {

    var notFound = true;
    var tmpList = [];


    oldList.map((item) => {
        if (item.screenName === flowData.screenName) {
            tmpList.push({
                screenName: flowData.screenName,
                actions: mergeAction(flowData.screenActions, item.actions)
            })
            notFound = false;
        } else {
            tmpList.push(item)
        }
    })
    if (notFound) {
        tmpList.push({
            screenName: flowData.screenName,
            actions: flowData.screenActions
        })

    }



    return tmpList;

}

//pass flow item to add to main
module.exports.addFlow = function addFlow(flowToAdd) {
    var newFlow = {
        title: flowToAdd.title,
        screenName: flowToAdd.screenName || "DummyScreen",
        screenActions: flowToAdd.screenActions || [],
        children: []
    }
    this.dummyList = addToFlow(this.dummyList, "Main", newFlow)
}


function findAndRemove(items, whatToRemove) {
    var tmp = undefined;
    if (items.title === whatToRemove) {
        return tmp;
    }
    tmp = {
        title: items.title
    }

    if (items.children != undefined) {
        tmp.children = [];
        items.children.map((data) => {
            var t = findAndRemove(data, whatToRemove)
            if (t != undefined) {
                tmp.children.push(t)
            }
        })
    }
    return tmp;
}


module.exports.removeFlow = function removeFlow(flowToRemove) {
    this.dummyList = findAndRemove(this.dummyList, flowToRemove.title)
    //renderList();
}

function getAction(item) {
    var actions = [];
    var actionName = document.getElementsByName('actionNa[]');
    var targetFunction = document.getElementsByName('actionTf[]');
    for (var i = 0; i < actionName.length - 1; i++) {
        var tmp = {
            event: item.actionName,
            targetFunction: item.targetFunction[i].value
        }
        actions.push(tmp)
    }
    return actions;
}

function getFlowStructure(item) {
    var flowName = item.title;
    flowName = getFirstCharLoweCase(flowName)

    var flow = ""
    flow += flowName + " state = do" + "\n"
    flow += "\tevent <- ui $ " + item.screenName + " {extras : state}" + "\n"
    flow += "\tcase event of" + "\n"
    if (item.screenActions != undefined)
        item.screenActions.map((items) => {
            if (items.event.indexOf("API_") == -1) {
                flow += "\t\t" + items.event + " { state: newState }  -> " + items.targetFunction + " newState " + "\n";
            } else {
                flow += "\t\t" + items.event + " { state: newState }  -> do\n";
                flow += "\t\t\tresponseData <- " + items.targetFunction + " newState " + "\n";
                flow += "\t\t\t_ <- sendUpdatedState {response : responseData, responseFor : \"" + items.event + "\", screen:\"" + item.title + "\"}"
                flow += "\t\t\tpure $ \"Api Call Done\""
            }
        })

    flow += "\t\t_ -> " + flowName + " state " + "\n\n";


    return flow
}

module.exports.getMainPurs = function generateFlow(moduleName) {

    var flowItem = findFlowByName(this.dummyList, moduleName);
    //this.dummyList;

    console.log(flowItem)

    var fileContent = "";
    fileContent += "module " + flowItem.title + " where\n\n"
    fileContent += "import Prelude \n"
    fileContent += "import Control.Monad.Except.Trans (runExceptT)\n"
    fileContent += "import Control.Monad.Aff (launchAff)\n"
    fileContent += "import Control.Monad.Eff.Console\n"
    fileContent += "import Control.Monad.Eff.Class(liftEff)\n"
    fileContent += "import Control.Monad.Eff (Eff)\n"
    fileContent += "import Control.Monad.Eff.Exception (EXCEPTION)\n"
    fileContent += "import Utils\n"
    fileContent += "import Types.UITypes\n"
    fileContent += "import Types.APITypes\n"
    fileContent += "import UI\n\n"
    fileContent += "main :: Eff (exception::EXCEPTION, ui::UI, console::CONSOLE) Unit\n"
    fileContent += "main = void $ launchAff $ splashScreenFlow \"\"\n\n"



    if (flowItem.children != undefined)

        flowItem.children.map((item) => {

            fileContent += getFlowStructure(item);
        })

    console.log(fileContent);

    return fileContent;


    //logToOutput(fileContent)

    //downloadFile(flowItem.title + ".purs", fileContent)



}




function getScreenStructure(screen) {
    var screenName = screen.screenName;
    var fileContent = "";
    fileContent += "data " + screenName + " = " + screenName + " {extras::String}\n";
    fileContent += "data " + screenName + "Action = DUMMY_" + screenName + "Action | BACK_" + screenName + " {state :: String}";
    //addActions
    screen.actions.map((item) => {
        fileContent += " | " + item + " {state :: String}"
    })
    fileContent += "\n"
    //instance
    fileContent += "instance " + getFirstCharLoweCase(screenName) + " :: UIScreen " + screenName + " " + screenName + "Action where\n";
    fileContent += "\tgenerateMockEvents _ = [DUMMY_" + screenName + "Action ]\n";
    fileContent += "\tui x = genericUI x (generateMockEvents x :: Array " + screenName + "Action)\n\n";
    //mock
    fileContent += "derive instance generic" + screenName + "Action  :: Generic " + screenName + "Action _\n";
    fileContent += "instance decode" + screenName + "Action :: Decode " + screenName + "Action where decode = defaultDecode\n";
    fileContent += "instance encode" + screenName + "Action :: Encode " + screenName + "Action where encode = defaultEncode\n\n";

    return fileContent;
}


module.exports.getUITypes = function generateUITypes() {

    var fileContent = "";

    fileContent += "module Types.UITypes where\n";
    fileContent += "import Control.Monad.Aff\n";
    fileContent += "import Prelude (bind, ($), (<>), pure, discard)\n";
    fileContent += "import Control.Monad.Except.Trans (runExceptT)\n";
    fileContent += "import Utils\n";
    fileContent += "import Data.Argonaut.Core\n";
    fileContent += "import Control.Monad.Eff (Eff)\n";
    fileContent += "import Control.Monad.Aff (launchAff)\n";
    fileContent += "import Control.Monad.Eff.Console\n";
    fileContent += "import Control.Monad.Eff.Class(liftEff)\n";
    fileContent += "import Data.Foreign.Class (class Decode, class Encode, encode)\n";
    fileContent += "import Data.Generic.Rep (class Generic)\n";
    fileContent += "import Data.Functor (void)\n";
    fileContent += "import Control.Monad.Eff.Exception (EXCEPTION)\n";
    fileContent += "import UI\n\n";

    this.myScreenList.map((item) => {
        fileContent += getScreenStructure(item);
    })

    console.log(fileContent)

    return fileContent;
}






module.exports.getDUICode = function generateDuiCode(screen) {
    if (screen == undefined) {
        screen = { screenName: "DummyScreen", actions: ["OP_1", "OP_2"] }
    }
    var uiCode = "";
    uiCode += "var dom = require(\"@juspay/mystique-backend\").doms.android;\n"
    uiCode += "var Connector = require(\"@juspay/mystique-backend\").connector;\n"
    uiCode += "\n"
    uiCode += "//BASIC VIEWS\n"
    uiCode += "var View = require(\"@juspay/mystique-backend\").baseViews.AndroidBaseView;\n"
    uiCode += "var LinearLayout = require(\"@juspay/mystique-backend\").androidViews.LinearLayout;\n"
    uiCode += "var TextView = require(\"@juspay/mystique-backend\").androidViews.TextView;\n"
    uiCode += "\n\n"
    uiCode += "//GLOBAL VARIDABLE\n"
    uiCode += "var _this;\n"
    uiCode += "\n"
    uiCode += "class " + screen.screenName + " extends View {\n"
    uiCode += "\n"
    uiCode += "\tconstructor(props, children, state) {\n"
    uiCode += "\t\tsuper(props, children, state);\n"
    uiCode += "\t\tthis.state = state;\n"
    uiCode += "\n"
    uiCode += "\t\t//Used to identify screen\n"
    uiCode += "\t\tthis.displayName = \"" + screen.screenName + "\"\n"
    uiCode += "\n\n"
    uiCode += "\t\t_this = this;\n"
    uiCode += "\n"
    uiCode += "\t\t//Declaring Id's for screen\n"
    uiCode += "\t\tthis.setIds([\n"
    uiCode += "\t\t\t\"" + getFirstCharLoweCase(screen.screenName) + "Container\",\n"
    uiCode += "\t\t\t\"sampleID1\",\n"
    uiCode += "\t\t\t\"sampleID2\"\n"
    uiCode += "\t\t]);\n"
    uiCode += "\t\t\n"
    uiCode += "\t\t\n"
    uiCode += "\t\t\n"
    uiCode += "\t\tsetTimeout(() => {\n"
    uiCode += "\t\t\tAndroid.runInUI(\n"
    uiCode += "\t\t\t\t_this.animateView(),\n"
    uiCode += "\t\t\t\tnull\n"
    uiCode += "\t\t\t);\n"
    uiCode += "\t\t});\n"
    uiCode += "\t\t\n"
    uiCode += "\t}\n"
    uiCode += "\t\t\n"
    uiCode += "\t//Called when screen is cached and called again\n"
    uiCode += "\tonPop = (type) => {\n"
    uiCode += "\t\n"
    uiCode += "\t\tAndroid.runInUI(\n"
    uiCode += "\t\t\t_this.animateView(),\n"
    uiCode += "\t\t\tnull\n"
    uiCode += "\t\t);\n"
    uiCode += "\n"
    uiCode += "\t}\n"
    uiCode += "\tgetActionButtons = () => {\n"
    uiCode += "\t\treturn (<LinearLayout\n"
    uiCode += "\t\t\theight=\"wrap_content\"\n"
    uiCode += "\t\t\torientation=\"vertical\"\n"
    uiCode += "\t\t\twidth=\"match_parent\">\n"

    screen.actions.map((item) => {
        var tmpCode = ""
        tmpCode += "\t\t\t\t<LinearLayout\n"
        tmpCode += "\t\t\t\t\theight=\"wrap_content\"\n"
        tmpCode += "\t\t\t\t\tbackground=\"#CCCCCC\"\n"
        tmpCode += "\t\t\t\t\tmargin=\"5,5,5,5\"\n"
        tmpCode += "\t\t\t\t\twidth=\"match_parent\">\n"
        tmpCode += "\t\t\t\t\t\t<TextView\n"
        tmpCode += "\t\t\t\t\t\t\theight=\"50\"\n";
        tmpCode += "\t\t\t\t\t\t\twidth=\"match_parent\"\n"
        tmpCode += "\t\t\t\t\t\t\ttext=\"" + item + "\"\n"
        tmpCode += "\t\t\t\t\t\t\tonClick={()=>{window.triggerEvent(_this,\"" + item + "\",\"\");}}/>\n"
        tmpCode += "\t\t\t\t</LinearLayout>\n"
        console.log(tmpCode)
        uiCode += tmpCode;
    })

    uiCode += "\t\t</LinearLayout>)\n"

    uiCode += "\t}\n"
    uiCode += "\t\t\n"
    uiCode += "\t//BACK CLICK \n"
    uiCode += "\tonBackPressed = () => {\n"
    uiCode += "\t\tvar whatToSend = []\n"
    uiCode += "\t\tvar event = { \"tag\": \"BACK_" + screen.screenName + "\", contents: whatToSend };\n"
    uiCode += "\t\twindow.__runDuiCallback(event);\n"
    uiCode += "\t}\n"
    uiCode += "\n"
    uiCode += "\t//BODY OF SCREEN\n"
    uiCode += "\trender() {\n"
    uiCode += "\t\tthis.layout = (\n"
    uiCode += "\t\t\t<LinearLayout\n"
    uiCode += "\t\t\t\theight=\"match_parent\"\n"
    uiCode += "\t\t\t\twidth=\"match_parent\"\n"
    uiCode += "\t\t\t\tid={this.idSet." + getFirstCharLoweCase(screen.screenName) + "Container}\n"
    uiCode += "\t\t\t\troot=\"true\"\n"
    uiCode += "\t\t\t\tclikable=\"true\"\n"
    uiCode += "\t\t\t\tbackground=\"#ffff00\"\n"
    uiCode += "\t\t\t\torientation=\"vertical\"\n"
    uiCode += "\t\t\t\tgravity=\"center\">\n"
    uiCode += "\n"
    uiCode += "\t\t\t<TextView\n"
    uiCode += "\t\t\t\theight=\"wrap_content\"\n"
    uiCode += "\t\t\t\twidth=\"wrap_content\"\n"
    uiCode += "\t\t\t\ttext={\"CURR SCREEN\" + this.screenName}/>\n"
    uiCode += "\t\t\n"
    uiCode += "\t\t\t{this.getActionButtons()}\n"
    uiCode += "\t\t\n"
    uiCode += "\t\t\t</LinearLayout>\n"
    uiCode += "\t\t);\n"
    uiCode += "\n"
    uiCode += "\t\treturn this.layout.render();\n"
    uiCode += "\t}\n"
    uiCode += "}\n"
    uiCode += "\n\n"
    uiCode += "module.exports = Connector(" + screen.screenName + ");\n"

    return uiCode;

}

//Screen.js
module.exports.getStateMachineCode = function generateStateMachineCode() {
    var stateMachineCode = "";
    stateMachineCode += "\nvar objectAssign = require('object-assign');"
    stateMachineCode += "\n"
    stateMachineCode += "\nvar localState = {"
    stateMachineCode += "\n\tisInit: false,"
    stateMachineCode += "\n\tcurrScreen: null"
    stateMachineCode += "\n};"
    stateMachineCode += "\n"
    stateMachineCode += "\nmodule.exports = function(action, payload, state) {"
    stateMachineCode += "\n\tlocalState = payload;"
    stateMachineCode += "\n"
    stateMachineCode += "\n\tswitch (action) {"
    stateMachineCode += "\n\t\tcase \"InitScreen\":"
    stateMachineCode += "\n\t\t\tlocalState.isInit = true;"
    stateMachineCode += "\n\t\t\tlocalState.currScreen = \"SplashScreen\";"
    stateMachineCode += "\n\t\t\tbreak;"

    this.myScreenList.map((item) => {
        stateMachineCode += "\n\n\t\tcase \"" + item.screenName + "\":"
        stateMachineCode += "\n\t\t\tlocalState.isInit = false"
        stateMachineCode += "\n\t\t\tlocalState.currScreen = \"" + item.screenName + "\";"
        stateMachineCode += "\n\t\t\tbreak; "
    })


    stateMachineCode += "\n\n\t\tdefault:"
    stateMachineCode += "\n\t\t\tthrow new Error(\"Invalid action Passed : action name\" + action);"
    stateMachineCode += "\n\t}"
    stateMachineCode += "\n"
    stateMachineCode += "\n\treturn objectAssign({}, state, localState);"
    stateMachineCode += "\n};"

    return stateMachineCode

}

module.exports.getContainercode = function generateContainerCode() {
    var containerCode = "";

    containerCode += "\nconst uiHandler = require(\"@juspay/mystique-backend\").uiHandlers.android;"
    containerCode += "\nvar dispatcher;"
    containerCode += "\nconst R = require('ramda');"
    containerCode += "\n"
    containerCode += "\n//Reducer"
    containerCode += "\nconst ScreenReducer = require(\"../state_machines/Screens\");"
    containerCode += "\n"
    containerCode += "\nconst reducer = require(\"@juspay/mystique-backend\").stateManagers.reducer({"
    containerCode += "\n\t\"SCREEN\": ScreenReducer"
    containerCode += "\n});"
    containerCode += "\n"
    containerCode += "\n// Screens"
    containerCode += "\nconst RootScreen = require(\"../views/RootScreen\");"




    this.myScreenList.map((item) => {
        containerCode += "\nconst " + item.screenName + " = require(\"../views/" + item.screenName + "\");"
    })

    containerCode += "\n// ScreenActions"
    containerCode += "\nconst RootScreenActions = require(\".. / actions / RootScreenActions \");"
    containerCode += "\n"
    containerCode += "\nvar determineScreen = (screenName, state) => {"
    containerCode += "\n\tvar screen;"
    containerCode += "\n"
    containerCode += "\n\tswitch (state.currScreen) {"

    this.myScreenList.map((item) => {
        containerCode += "\n\t\tcase \"" + item.screenName + "\" :"
        containerCode += "\n\t\t\tscreen = new(" + item.screenName + "(dispatcher, RootScreenActions))(null, null, state);"
        containerCode += "\n\t\t\tbreak;"
    })
    containerCode += "\n\t\tcase \"RootScreen\":"
    containerCode += "\n\t\t\tscreen = new(RootScreen(dispatcher, RootScreenActions))(null, null, state);"
    containerCode += "\n\t\t\tbreak;"
    containerCode += "\n\t\t}"
    containerCode += "\n"
    containerCode += "\n\treturn screen;"
    containerCode += "\n}"
    containerCode += "\n"
    containerCode += "\nvar returnIfCached = function(screenName) {"
    containerCode += "\n\treturn window.__CACHED_SCREENS[screenName];"
    containerCode += "\n}"
    containerCode += "\n"
    containerCode += "\nvar renderRootScreen = (state, dispatcher) => {"
    containerCode += "\n\twindow.__ROOTSCREEN = new(RootScreen(dispatcher, RootScreenActions))({}, null, state);"
    containerCode += "\n\treturn window.__ROOTSCREEN;"
    containerCode += "\n}"
    containerCode += "\n"
    containerCode += "\nvar updateNode = function(data) {"
    containerCode += "\n\tvar oldScreenId = window.__CACHED_SCREENS[data.action].screen.layout.idSet.id;"
    containerCode += "\n\twindow.__MODE = (new Date()).getTime() + \" mode\";"
    containerCode += "\n\twindow.__CACHED_SCREENS[data.action].screen = determineScreen(data.action, data.state);"
    containerCode += "\n\t// delete old id"
    containerCode += "\n}"
    containerCode += "\n"
    containerCode += "\nwindow.__CLEAR_STACK = function(screenName) {"
    containerCode += "\n\twindow.__SCREEN_STACK = [screenName];"
    containerCode += "\n}"
    containerCode += "\n"
    containerCode += "\nvar addToStack = function(screenName, screenData) {"
    containerCode += "\n\tif (typeof screenData.screen.shouldStackScreen !== \"undefined\" && !screenData.screen.shouldStackScreen)"
    containerCode += "\n\t\t   return;"
    containerCode += "\n"
    containerCode += "\n\tvar stackLen = window.__SCREEN_STACK.length;"
    containerCode += "\n"
    containerCode += "\n\tif (!stackLen)"
    containerCode += "\n\t\twindow.__SCREEN_STACK.push(screenName);"
    containerCode += "\n\telse if (window.__SCREEN_STACK[stackLen - 1] !== screenName)"
    containerCode += "\n\t\twindow.__SCREEN_STACK.push(screenName);"
    containerCode += "\n}"
    containerCode += "\n"
    containerCode += "\nvar renderScreen = function(data) {"
    containerCode += "\n\tJBridge.hideKeyboard();"
    containerCode += "\n"
    containerCode += "\n\tvar screen;"
    containerCode += "\n\tvar isCached = false;"
    containerCode += "\n\tvar takeFromCache = true;"
    containerCode += "\n\tvar screenData = window.__CACHED_SCREENS[data.action];"
    containerCode += "\n"
    containerCode += "\n\tif (screenData) {"
    containerCode += "\n\t\tisCached = true;"
    containerCode += "\n"
    containerCode += "\n\tscreen = screenData.screen;"
    containerCode += "\n"
    containerCode += "\n\t\tif (typeof screen.shouldCacheScreen !== \"undefined\" && !screen.shouldCacheScreen) {"
    containerCode += "\n\t\t\tconsole.info(\"updating screen \", data.action);"
    containerCode += "\n\t\t\tupdateNode(data);"
    containerCode += "\n\t\t\ttakeFromCache = false;"
    containerCode += "\n\t\t\tconsole.log(\"data.action\", screen);"
    containerCode += "\n\t\t}"
    containerCode += "\n\t} else {"
    containerCode += "\n\t\twindow.__ANIMATE_DIR = 1;"
    containerCode += "\n\t\tscreen = determineScreen(data.action, data.state);"
    containerCode += "\n\t\twindow.__CACHED_SCREENS[data.action] = {"
    containerCode += "\n\t\tindex: window.__SCREEN_COUNT,"
    containerCode += "\n\t\tscreen: screen,"
    containerCode += "\n\t\ttimeStamp: (new Date()).getTime(),"
    containerCode += "\n\t}"
    containerCode += "\n"
    containerCode += "\n\twindow.__SCREEN_COUNT++;"
    containerCode += "\n\tscreenData = window.__CACHED_SCREENS[data.action];"
    containerCode += "\n}"
    containerCode += "\n"
    containerCode += "\naddToStack(data.action, window.__CACHED_SCREENS[data.action]);"
    containerCode += "\nreturn { screen: screenData.screen, isCached: isCached, takeFromCache: takeFromCache }"
    containerCode += "\n}"
    containerCode += "\n"
    containerCode += "\nvar appendToRoot = function(screen) {"
    containerCode += "\n\twindow.__SCREEN_INDEX++;"
    containerCode += "\n\twindow.__ROOTSCREEN.appendChild(window.__ROOTSCREEN.idSet.root, screen.render(), window.__SCREEN_INDEX, screen.afterRender);"
    containerCode += "\n}"
    containerCode += "\n"
    containerCode += "\nvar getDirection = function() {"
    containerCode += "\n\tif (window.__CACHED_SCREENS[window.__CURR_SCREEN].timeStamp >= window.__CACHED_SCREENS[window.__PREV_SCREEN].timeStamp)"
    containerCode += "\n\t\treturn 1;"
    containerCode += "\n"
    containerCode += "\n\treturn -1;"
    containerCode += "\n}"
    containerCode += "\n"
    containerCode += "var handleGoBack = function(data) {"
    containerCode += "\nJBridge.hideKeyboard();"
    containerCode += "\n"
    containerCode += "\nvar stackLen = window.__SCREEN_STACK.length;"
    containerCode += "\nvar cmd = \"\";"
    containerCode += "\nif (stackLen == 1) {"
    containerCode += "\n\t__ROOTSCREEN.minimizeApp();"
    containerCode += "\n\treturn;"
    containerCode += "\n}"
    containerCode += "\n"
    containerCode += "\nvar screenData = window.__CACHED_SCREENS[window.__CURR_SCREEN];"
    containerCode += "\n\tif (screenData.screen.onBackPress) {"
    containerCode += "\n\t\tif (!screenData.screen.onBackPress()) {"
    containerCode += "\n\t\tconsole.log(\"failed\");"
    containerCode += "\n\t\treturn;"
    containerCode += "\n\t}"
    containerCode += "\n}"
    containerCode += "\n"
    containerCode += "\nwindow.__PREV_SCREEN = window.__SCREEN_STACK[stackLen - 1];"
    containerCode += "\nwindow.__CURR_SCREEN = window.__SCREEN_STACK[stackLen - 2];"
    containerCode += "\nwindow.__SCREEN_STACK.pop();"
    containerCode += "\n"
    containerCode += "\nvar screen = window.__CACHED_SCREENS[window.__CURR_SCREEN].screen;"
    containerCode += "\nvar state = R.merge(data.state, { currScreen: window.__CURR_SCREEN });"
    containerCode += "\n"
    containerCode += "\ndata = R.merge(data, { action: window.__CURR_SCREEN, state: state });"
    containerCode += "\n"
    containerCode += "\nif (typeof screen.shouldCacheScreen !== \"undefined\" && !screen.shouldCacheScreen) {"
    containerCode += "\n\tconsole.info(\"updating screen \", window.__CURR_SCREEN);"
    containerCode += "\n\tupdateNode(data);"
    containerCode += "\n\twindow.__ANIMATE_DIR = getDirection();"
    containerCode += "\n\tappendToRoot(window.__CACHED_SCREENS[window.__CURR_SCREEN].screen);"
    containerCode += "\n} else {"
    containerCode += "\n\twindow.__ANIMATE_DIR = -1;"
    containerCode += "\n\tscreen.onPop(data.state, \"backPress\");"
    containerCode += "\n}"
    containerCode += "\n}"
    containerCode += "\n"
    containerCode += "\nvar handleScreenActions = function(data) {"
    containerCode += "\nvar currView;"
    containerCode += "\nvar res;"
    containerCode += "\n"
    containerCode += "\nconsole.log(\"action\", data.action)"
    containerCode += "\nconsole.log(\"screen\", data.state.currScreen)"
    containerCode += "\n"
    containerCode += "\n\tif (data.action == \"GO_BACK\") {"
    containerCode += "\n\t\tconsole.log(\"going back \");"
    containerCode += "\n\t\thandleGoBack(data);"
    containerCode += "\n\t\treturn {};"
    containerCode += "\n\t}"
    containerCode += "\n"
    containerCode += "\n\tif (data.state.isInit) {"
    containerCode += "\n\t\tconsole.info(\"App Start\");"
    containerCode += "\n\t\tcurrView = renderRootScreen(data.state, dispatcher);"
    containerCode += "\n\t\tdispatcher('SCREEN', data.state.currScreen, {});"
    containerCode += "\n\t\treturn { render: currView.render() };"
    containerCode += "\n\t}"
    containerCode += "\n"
    containerCode += "\n\tif (window.__CURR_SCREEN == data.action) {"
    containerCode += "\n\t\tconsole.warn(\"Screen already rendered \", window.__CURR_SCREEN);"
    containerCode += "\n\t\treturn {};"
    containerCode += "\n\t}"
    containerCode += "\n"
    containerCode += "\n\tif (!window.__CURR_SCREEN && !window.__PREV_SCREEN) {"
    containerCode += "\n\t\tconsole.info(\"First Screen Append\");"
    containerCode += "\n\t\twindow.__CURR_SCREEN = data.action;"
    containerCode += "\n\t\tappendToRoot(renderScreen(data).screen);"
    containerCode += "\n\t\treturn {};"
    containerCode += "\n\t}"
    containerCode += "\n"
    containerCode += "\n\twindow.__PREV_SCREEN = window.__CURR_SCREEN;"
    containerCode += "\n\twindow.__CURR_SCREEN = data.action;"
    containerCode += "\n"
    containerCode += "\nres = renderScreen(data);"
    containerCode += "\n"
    containerCode += "\n\tconsole.log(res);"
    containerCode += "\n\tif (!res.isCached) {"
    containerCode += "\n\t\tappendToRoot(res.screen);"
    containerCode += "\n\t\treturn {};"
    containerCode += "\n\t} else if (res.takeFromCache) {"
    containerCode += "\n\t\twindow.__ANIMATE_DIR = getDirection();"
    containerCode += "\n"
    containerCode += "\n\t\t\tif (res.screen.onPop)"
    containerCode += "\n\t\t\tres.screen.onPop(data.state);"
    containerCode += "\n\t} else {"
    containerCode += "\n\t\tconsole.log(\"appendToRoot\");"
    containerCode += "\n\t\twindow.__ANIMATE_DIR = getDirection();"
    containerCode += "\n\t\tappendToRoot(res.screen);"
    containerCode += "\n}"
    containerCode += "\n"
    containerCode += "\n\treturn {};"
    containerCode += "}"
    containerCode += "\n"
    containerCode += "\nvar Containers = {"
    containerCode += "\n\thandleStateChange: (data) => {"
    containerCode += "\n\t\tvar currView;"
    containerCode += "\n\n"
    containerCode += "\n\t\tif (data.stateHandler == \"SCREEN \")"
    containerCode += "\n\t\t\treturn handleScreenActions(data);"
    containerCode += "\n\n"
    containerCode += "\n\t\tcurrView = window.__CACHED_SCREENS[stateHandler].screen;"
    containerCode += "\n\t\treturn currView.handleStateChange(data) || {};"
    containerCode += "\n\t}"
    containerCode += "\n}"
    containerCode += "\n"
    containerCode += "\ndispatcher = require(\"@juspay/mystique-backend\").stateManagers.dispatcher(Containers, uiHandler, reducer);"
    containerCode += "\n"
    containerCode += "\nmodule.exports = {"
    containerCode += "\n\tinit: () => {"
    containerCode += "\n\tvar initialState = {};"
    containerCode += "\n\tdispatcher(\"SCREEN\", \"INIT_UI\", initialState);"
    containerCode += "\n\t},"
    containerCode += "\n\tchangeScreen: (screen, state) => {"
    containerCode += "\n\t\tconsole.log(\"container\", state)"
    containerCode += "\n\t\tdispatcher(\"SCREEN\", screen, state);"
    containerCode += "\n\t}"
    containerCode += "\n}"




    //console.log(containerCode)

    return containerCode;
    //logToOutput(containerCode)

}


function downloadFile(fileName, content) {
    return;
    var element = document.createElement('a');

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', fileName);
    element.style.display = 'none';

    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}