function propsHasAlignParentBottom(props) {
  return props.alignParentBottom;
}

function hasNoDimenPropValue (prop,elem) {
  return typeof(elem["client"+prop])=="undefined" || elem["client"+prop]==0;
}

function parseIntLocal (arg) {
  var ret = parseInt(arg);

  if (isNaN(ret)) {
    return 0;
  }

  return ret;
}

function isWrapContent (elem) {
  return elem.props && elem.props.height && elem.props.height == "wrap_content";
};

function propsHasGravity(props) {
  return props.gravity;
}

function gravityCenter(props) {
  return props.gravity == "center" ? true: false;
}

function gravityCenterVertical(props) {
  return props.gravity == "center_vertical" ? true: false;
}

function orientationIsHorizontal(props) {
  return props.orientation == "horizontal" ? true: false;
}

function propsHasCenterInParent(props) {
  return props.centerInParent;
}

function setDisplay(elem, props, type, parentProps, parentType) {
  if (props.visibility == "gone")
  return elem.style.display = "none";

  if ((parentType == "linearLayout" && orientationIsHorizontal(parentProps)) ||
    (propsHasGravity(parentProps) && gravityCenterVertical(parentProps))) {
    elem.style.display = "inline-block";
  }
}

function setPosition(elem, props, type, parentProps, parentType) {
  if (propsHasGravity(parentProps) && gravityCenter(parentProps) ||
      (parentType == "relativeLayout")) {
    return elem.style.position = "absolute";
  }

  if (type == "relativeLayout" || (propsHasGravity(props) && gravityCenter(props)))
  return elem.style.position = "relative";
}

function setMargin(elem, props, type, parentProps, parentType) {
  if ((propsHasGravity(parentProps) && gravityCenter(parentProps)) ||
      (propsHasCenterInParent(props))) {

    elem.style.marginLeft =  ("-" +  (Math.floor(props.width / 2)));
    elem.style.marginTop =  ("-" +  (Math.floor(props.height / 2)));
  } else {
    elem.style.margin = props.margin;
  }
}

function setAlignMent(elem, props, type, parentProps, parentType) {
  if (propsHasGravity(parentProps) && gravityCenterVertical(parentProps)) {
    elem.style.verticalAlign = "middle";
    return;
  }

  if (parentType == "linearLayout" && orientationIsHorizontal(parentProps)) {
    elem.style.verticalAlign = "top";
    return;
  }
}

function setLeftAndRight(elem, props, type, parentProps, parentType) {
  if (parentType == "relativeLayout" && propsHasAlignParentBottom(props)) {
    elem.style.left = 0;
    return;
  }

  if ((propsHasGravity(parentProps) && gravityCenter(parentProps)) ||
      (propsHasCenterInParent(props))) {
    elem.style.top = "50%";
    elem.style.left = "50%";
      return;
  }
}

function getMaxHeight (children) {
  var max = 0;
  for(var i=0;i<children.length;i++){
    max = Math.max(max,children[i].elem.clientHeight);
  }
  return max;
};

function setRelativeLayoutHeight(children,view,elem) {
  if ("relativeLayout" == view.type && isWrapContent(view)) {
    var maxHeight = getMaxHeight(children);
    elem.style.height = maxHeight+"px";
  }

  return elem;
}

function isWeightedLinearLayout (view) {
  if(view.type!="linearLayout") {
    return false;
  }
  for(var i=0;i<view.children.length;i++) {
    var child = view.children[i];
    if(child.props && child.props.weight) {
      return true;
    }
  }
  return false;
}


function handleLinearLayoutWeightedChildren (childElems, elem, orientation) {
  var prop = "Height";
  var margin = ["Top", "Bottom"];

  if(orientation=="horizontal") {
    prop = "Width";
    margin=["Left", "Right"];
  }

  var total = 0;
  var weight = 0;

  for(var i=0;i<childElems.length;i++) {
    if(childElems[i].props.weight) {
      weight+= parseFloat(childElems[i].props.weight);
    } else {
      if(!hasNoDimenPropValue(prop,childElems[i].elem)) {
        total += childElems[i].elem["client"+prop] +
          parseIntLocal(childElems[i].elem.style["margin" + margin[0]]) +
          parseIntLocal(childElems[i].elem.style["margin" + margin[1]]);
      }
    }
  }

  var paddingTop = elem.style.paddingTop;
  var paddingLeft = elem.style.paddingLeft;
  var paddingBottom = elem.style.paddingBottom;
  var paddingRight = elem.style.paddingRight;
  var verticalParentPadding = (paddingTop ? parseInt(paddingTop) : 0) + (paddingBottom ? parseInt(paddingBottom) : 0);
  var horizontalParentPadding = (paddingLeft ? parseInt(paddingLeft) : 0) + (paddingRight ? parseInt(paddingRight) : 0);
  var padding = prop == "Height" ? verticalParentPadding : horizontalParentPadding;
  var remaining = elem["client"+prop] - total - 1 - padding;

  window.__EL = elem;

  if(remaining>0){
    for(var i = 0;i<childElems.length;i++) {
      if(childElems[i].props.weight) {
        childElems[i].elem.style[prop.toLowerCase()] = Math.floor((parseFloat(childElems[i].props.weight)*remaining)/weight);
      }
    }
  }

  return childElems;
}

function setWeight(childElems,view,elem) {
  if(isWeightedLinearLayout(view)) {
    childElems = handleLinearLayoutWeightedChildren(childElems ,elem,view.props.orientation);
  }
}

module .exports.run = function(elem, props, type, parentProps, parentType) {
  setDisplay(elem, props, type, parentProps, parentType);
  setPosition(elem, props, type, parentProps, parentType);
  setMargin(elem, props, type, parentProps, parentType);
  setAlignMent(elem, props, type, parentProps, parentType);
  setLeftAndRight(elem, props, type, parentProps, parentType);
}

module.exports.recomputeParentProps = function(childElems,view,elem){
  setRelativeLayoutHeight(childElems,view,elem);
  setWeight(childElems,view,elem);
};
