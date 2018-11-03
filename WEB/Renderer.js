var Reconciler = require("./Reconciler");

function createTextElement(elem, config) {
    var children = elem.childNodes;
    var span = elem.childNodes.length ? elem.childNodes[0] : document.createElement('span');

    elem.style.whiteSpace = "initial";
    span.innerText = config.text;
    elem.appendChild(span);
}

function createGhostElement(gravity, config, elem) {
    if (isNaN(config.style.height * 1))
        return;

    var div = document.createElement('div');

    if (gravity == "center_vertical") {
        div.style.height = "100%";
        div.style.display = "inline-block";
        div.style.verticalAlign = "middle";
    }
    elem.appendChild(div);
}


function setAttributes(type, elem, props) {
    var key;
    var innerKey;

    typeof elem.setAttribute == "function" && elem.setAttribute("class", type);

    try {
        for (key in props) {
            if (key == "gravity") {
                if (props.gravity == "center_vertical") {
                    createGhostElement(props.gravity, props, elem);
                } else if (props.gravity == "right") {
                    elem.style.float = "right";
                } else if (props.gravity == "left") {
                    elem.style.float = "left";
                }
            }

            if (key == "text") {
                createTextElement(elem, props);
            } else if (key == "style") {
                for (innerKey in props.style) {
                    if (innerKey == "className")
                        elem.className += props.style[innerKey];
                    else
                        elem.style[innerKey] = props.style[innerKey];
                }
            } else if (key == "attributes") {
                for (innerKey in props.attributes)
                    elem.setAttribute(innerKey, props.attributes[innerKey]);
            } else if (key == "hint") {
                elem.placeholder = props[key];
            } else if (key == "type") {
                elem.type = props[key];
            } else if (key == "src") {
                elem.src = props[key];
            } else if (key == "onChange") {
                elem.oninput = props[key];
            } else if (key == "fontFamily") {
                var values = props[key].split(",");
                elem.style["font-weight"] = values[0];
                elem.style["font-family"] = values[1];
            } else if (props[key] && typeof props[key] == "function") {
                elem.addEventListener(key.substring(2, key.length).toLowerCase(), props[key]);
            } else if (key == "rotation") {
                elem.style["transform"] = "rotate(" + props[key] + "deg)";
            } else if (key == "textColor") {
                elem.style.color = props[key];
            } else if (key == "maxHeight") {
                elem.style["max-height"] = props[key];
            } else if (key == "minHeight") {
                elem.style["min-height"] = props[key];
            } else if (key == "maxWidth") {
                elem.style["max-width"] = props[key];
            } else if (key == "minWidth") {
                elem.style["min-width"] = props[key];
            } else if (key == "caretColor") {
                elem.style["caret-color"] = props[key];
            } else if (key == "backgroundColor") {
                elem.style["background-color"] = props[key];
            } else if (key == "backgroundRepeat") {
                elem.style["background-repeat"] = props[key];
            } else if (key == "backgroundPosition") {
                elem.style["background-position"] = props[key];
            } else if (key == "elevateUp") {
                if (props[key] == "true" || props[key] == true ){
                    elem.className += " e_up";
                }else if (props[key] == "noBorder" || props[key] == "noborder" ){
                    elem.className += " e_up_i";
                }
            } else if (key == "elevation") {
                if(props[key] !=0 ){
                  switch (props[key]) {
                    case "1":
                        elem.className += " elevation1"
                      break;
                    case "2":
                        elem.className += " elevation2"
                      break;
                    case "3":
                        elem.className += " elevation4"
                      break;
                    case "4":
                        elem.className += " elevation5"
                      break;
                    case "5":
                        elem.className += " elevation5"
                      break;
                    default:
                  }
                }
            } else if (key == "shadow") {
                elem.className += " shadow1"
            }
        }
    } catch (err) {
        console.error("Wrong usage for the syntax");
    }
}

var isHorizontalScrollView = function(elem) {
    return elem && elem.classList[0] == "horizontalScrollView";
}

var isScrollView = function(elem) {
    return elem && elem.classList[0] == "scrollView";
}
    
var createPreviewFrame = function() {
    var elem = document.createElement("iframe");
    elem.id = "preview";
    return elem;
}


function setupPreview(elem, view) {
    window.preview = window.preview || {}
    window.preview.props = view.props
    // elem.onload = function() {
    //     elem.contentWindow.props = view.props
    // }
}

var inflateView = function(view, parentElement) {
    var elem;

    if (view.type == "imageView")
        elem = document.createElement("img");
    else if (view.type == "checkBox"){
        // elem = document.createElement("checkBox");
        elem = document.createElement("input");
        elem.innerHTML = view.props.text || "";
        elem.value = view.props.text || "";
        elem.type = "checkbox" ;
    } else if (view.type == "switch"){
        // boilerPlate
        view.props.isChecked = view.props.isChecked == undefined ? false : view.props.isChecked
        //switch
        var elem=document.createElement("input");
        elem.min = "0"
        elem.max = "1"
        elem.step = "1"
        elem.value = view.props.isChecked ? "1":"0";
        elem.type = "range" ;
    } else if (view.type == "editText"){
        elem = document.createElement("input");
        elem.value = view.props.text || "";
        elem.placeholder = view.props.hint || "";
        elem.type = view.props.inputType || "text" ;
        elem.onkeydown = view.props.onChangeText;
        elem.onkeyup = view.props.onEditText;
      }
    else if (view.type == "preview")
        elem = createPreviewFrame();
    else if (view.type == "terminal") {
        elem = document.createElement("div");
        elem.id = "terminal"
    }
    else
        elem = document.createElement("div");

    if (parentElement)
        parentElement.appendChild(elem);

    if (view.type == "preview") {
        setupPreview(elem, view);
    }

    //Setting this for children of horizontalScrollView
    if (isHorizontalScrollView(parentElement)) {
        elem.style.overflowX = "scroll";
        elem.style.overflowY = "hidden";
        elem.style.whiteSpace = "noWrap";
    }

    if (isScrollView(parentElement)) {
        elem.style.overflowY = "scroll";
    }

    setAttributes(view.type, elem, view.props);

    var childElems = [];
    for (var i = 0; i < view.children.length; i++) {
        var child = view.children[i];
        if (child) {
            var childElem = inflateView(child, elem);
            childElems.push({ elem: childElem, props: child.props });
            Reconciler.run(childElem, child.props, child.type, view.props, view.type);
        }
    }

    Reconciler.recomputeParentProps(childElems, view, elem);

    if (view.props.afterRender && typeof view.props.afterRender == "function") {
        view.props.afterRender();
    }

    if (view.props.feedback && typeof view.props.feedback == "function") {
        view.props.feedback();
    }

    return elem;
};

var getChildNodes = function(elementId, condition) {
    var children = "";
    if (typeof condition != "undefined") {
        children = document.querySelectorAll('div[id="' + elementId + '"]>' + condition);
    } else {
        var element = document.getElementById(elementId);
        children = element.children;
    }
    return children;
}

var runInUI = function(cmd) {
    if (!(cmd instanceof Array))
        cmd = [cmd];

    cmd.forEach(function(each) {
        var elem = document.getElementById(each.id);
        setAttributes("", elem, each);
    });
};

module.exports = {
    inflateView: inflateView,
    runInUI: runInUI,
    getChildNodes: getChildNodes
};
