const dom = require("@juspay/mystique-backend").doms.android;
const Connector = require("@juspay/mystique-backend").connector;
const LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
const View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
const ViewWidget = require("@juspay/mystique-backend").androidViews.ViewWidget;
const TextView = require("@juspay/mystique-backend").androidViews.TextView;


class Pills extends View {
  constructor(props, children) {
    super(props, children);
    this.setIds([
      "parentContainer",
      "labelHolder"
    ]);


    this.displayName = "Pills";


    this.init()
  }

  init = () => {
    this.props.id = (this.props.id===undefined) ? this.idSet.parentContainer:this.props.id;
    this.props.margin = (this.props.margin===undefined) ? "4,4,4,4" : this.props.margin;
    this.props.padding = (this.props.padding===undefined) ? "10,5,10,5" : this.props.padding;
    this.props.height = (this.props.height===undefined) ? "30" : this.props.height;
    this.props.width = (this.props.width===undefined) ? "wrap_content" : this.props.width;
    this.props.cornerRadius = (this.props.cornerRadius===undefined) ? "30" : this.props.cornerRadius;
    this.props.isNightMode = (this.props.isNightMode===undefined) ? false : this.props.isNightMode;
    this.props.toolbarBackground = this.props.isNightMode? window.__Colors.LIGHT_TOOLBAR : window.__Colors.NIGHT_TOOLBAR;
    this.props.toolbarTextPrimary = this.props.isNightMode? window.__Colors.LIGHT_TEXT : window.__Colors.NIGHT_TEXT;
    this.props.toolbarTextSecondary = this.props.isNightMode? window.__Colors.LIGHT_TEXT_2 : window.__Colors.NIGHT_TEXT_2;
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
    // JBridge.setWidth(this.props.id,"20%")
    JBridge.setWidth(this.idSet.labelHolder,"100%")
  }

  render() {


    this.layout = (
      <LinearLayout
        afterRender={this.onRender}
        id={this.props.id}
        height={this.props.height}
        width= "wrap_content"
        background={this.props.toolbarBackground}
        margin={this.props.margin}
        padding={this.props.padding}
        cornerRadius={this.props.cornerRadius}>
        <TextView
          id={this.idSet.labelHolder}
          gravity="center"
          text={this.props.labelText}
          fontStyle={window.__Font.fontStyle.BOLD}
          color={this.props.toolbarTextPrimary}
          textSize={this.props.textSize}/>
      </LinearLayout>
    )

    return this.layout.render();
  }
}
//  { this.getToolBarSubOptions() }
module.exports = Pills;
