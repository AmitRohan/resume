const dom = require("@juspay/mystique-backend").doms.android;
const Connector = require("@juspay/mystique-backend").connector;
const LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
const RelativeLayout = require("@juspay/mystique-backend").androidViews.RelativeLayout;
const ImageView = require("@juspay/mystique-backend").androidViews.ImageView;
const View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
const ViewWidget = require("@juspay/mystique-backend").androidViews.ViewWidget;
const TextView = require("@juspay/mystique-backend").androidViews.TextView;


class IconWithLabel extends View {
  constructor(props, children) {
    super(props, children);
    this.setIds([
      "parentContainer",
      "labelHolder",
      "seperatorHolder",
      "imageHolder",
    ]);


    this.displayName = "IconWithLabel";


    this.init()
  }

  init = () => {
    this.props.id = (this.props.id===undefined) ? this.idSet.parentContainer:this.props.id;
    this.props.margin = (this.props.margin===undefined) ? "0,0,0,0" : this.props.margin;
    this.props.padding = (this.props.padding===undefined) ? "0,0,0,0" : this.props.padding;
    this.props.isNightMode = (this.props.isNightMode===undefined) ? false : this.props.isNightMode;
    this.props.iconBackground = window.__Colors.COLOR_ACCENT
    this.props.toolbarTextPrimary = this.props.isNightMode? window.__Colors.NIGHT_TEXT : window.__Colors.LIGHT_TEXT;
    this.props.toolbarTextSecondary = this.props.isNightMode? window.__Colors.NIGHT_TEXT_2 : window.__Colors.LIGHT_TEXT_2;
    this.props.textSize = (this.props.textSize===undefined) ? "18" : this.props.textSize
    this.props.labelText = (this.props.labelText===undefined) ? "" : this.props.labelText
    this.props.imageUrl = (this.props.imageUrl===undefined) ? "" : this.props.imageUrl
    var toAppend = this.props.isNightMode?"-night":"-light"
    this.props.imageUrl="images/" + this.props.imageUrl + toAppend
  }

  show = () => {
    Android.runInUI(this.set({
      id : this.props.id,
      visibility : "visible"
    }),null);
  }

  hide = () => {
    Android.runInUI(this.set({
      id : this.props.id,
      visibility : "gone"
    }),null);
  }

openHyperLink = () => {
  if(this.props.hyperLink)
    window.open(this.props.hyperLink);
}

  onRender = () => {
    JBridge.setWidth(this.idSet.seperatorHolder,"5%")
    JBridge.setMaxWidth(this.idSet.labelHolder,"60%")
    JBridge.setMargin(this.idSet.labelHolder,"0,auto,auto,auto")
    if(this.props.hyperLink)
      JBridge.setOnClick(this.idSet.labelHolder,this.openHyperLink);
  }

  render() {


    this.layout = (
      <LinearLayout
        afterRender={this.onRender}
        id={this.props.id}
        width= {this.props.width || "match_parent" }
        margin={this.props.margin}
        padding={this.props.padding}
        height="wrap_content">
        <RelativeLayout
          id={this.idSet.imageHolder}
          height="48"
          width="48"
          cornerRadius="48"
          background={this.props.iconBackground}
          gravity="center">
          <ImageView
            height="24"
            width="24"
            imageUrl={this.props.imageUrl}/>
        </RelativeLayout>
        <ViewWidget
          id={this.idSet.seperatorHolder}/>
        <RelativeLayout
          id={this.idSet.labelHolder}
          gravity="center"
          height="48">
          <TextView
            text={this.props.labelText}
            fontStyle={window.__Font.fontStyle.REGULAR}
            color={this.props.toolbarTextPrimary}
            textSize={this.props.textSize}
            width="match_parent"
            height={"" + (2 + parseInt(this.props.textSize))}/>
        </RelativeLayout>
      </LinearLayout>
    )

    return this.layout.render();
  }
}

module.exports = IconWithLabel;
