const dom = require("@juspay/mystique-backend").doms.android;
const Connector = require("@juspay/mystique-backend").connector;
const LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
const View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
const ViewWidget = require("@juspay/mystique-backend").androidViews.ViewWidget;
const TextView = require("@juspay/mystique-backend").androidViews.TextView;


class LabelWithDescription extends View {
  constructor(props, children) {
    super(props, children);
    this.setIds([
      "parentContainer",
      "labelHolder",
      "seperatorHolder",
      "descriptionHolder",
    ]);


    this.displayName = "LabelWithDescription";


    this.init()
  }

  init = () => {
    this.props.id = (this.props.id===undefined) ? this.idSet.parentContainer:this.props.id;
    this.props.margin = (this.props.margin===undefined) ? "0,0,0,0" : this.props.margin;
    this.props.isNightMode = (this.props.isNightMode===undefined) ? false : this.props.isNightMode;
    this.props.toolbarBackground = this.props.isNightMode? window.__Colors.NIGHT_TOOLBAR : window.__Colors.LIGHT_TOOLBAR;
    this.props.toolbarTextPrimary = this.props.isNightMode? window.__Colors.NIGHT_TEXT : window.__Colors.LIGHT_TEXT;
    this.props.toolbarTextSecondary = this.props.isNightMode? window.__Colors.NIGHT_TEXT_2 : window.__Colors.LIGHT_TEXT_2;
    this.props.textSize = (this.props.textSize===undefined) ? "18" : this.props.textSize
    this.props.labelText = (this.props.labelText===undefined) ? "" : this.props.labelText
    this.props.description = (this.props.description===undefined) ? "" : this.props.description
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

  onRender = () => {
    JBridge.setWidth(this.idSet.labelHolder,"35%")
    JBridge.setWidth(this.idSet.seperatorHolder,"5%")
    JBridge.setWidth(this.idSet.descriptionHolder,"60%")
  }

  render() {


    this.layout = (
      <LinearLayout
        afterRender={this.onRender}
        id={this.props.id}
        width= {this.props.width || "match_parent" }
        background={this.props.toolbarBackground}
        margin={this.props.margin}
        height="wrap_content">
        <TextView
          id={this.idSet.labelHolder}
          text={this.props.labelText + ":"}
          fontStyle={window.__Font.fontStyle.BOLD}
          color={this.props.toolbarTextPrimary}
          textSize={this.props.textSize}/>
        <ViewWidget
          id={this.idSet.seperatorHolder}/>
        <TextView
          id={this.idSet.descriptionHolder}
          text={this.props.description}
          fontStyle={window.__Font.fontStyle.REGULAR}
          color={this.props.toolbarTextSecondary}
          textSize={this.props.textSize}/>
      </LinearLayout>
    )

    return this.layout.render();
  }
}
//  { this.getToolBarSubOptions() }
module.exports = LabelWithDescription;
