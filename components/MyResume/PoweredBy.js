const dom = require("@juspay/mystique-backend").doms.android;
const Connector = require("@juspay/mystique-backend").connector;
const LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
const View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
const ViewWidget = require("@juspay/mystique-backend").androidViews.ViewWidget;
const TextView = require("@juspay/mystique-backend").androidViews.TextView;


class PoweredBy extends View {
  constructor(props, children) {
    super(props, children);
    this.setIds([
      "parentContainer",
      "headerHolder",
      "titleHolder",
      "nightModeToggleHolder",
      "bottomDividerHolder",
      "midHolder"
    ]);


    window.PoweredBy = this;


    this.init()
  }

  init = () => {
    this.props.id = (this.props.id===undefined) ? this.idSet.parentContainer:this.props.id;
    this.props.padding = (this.props.padding===undefined) ? "20,10,2,2" : this.props.padding;
    this.props.isNightMode = (this.props.isNightMode===undefined) ? false : this.props.isNightMode;
    this.props.toolbarBackground = this.props.isNightMode? window.__Colors.NIGHT_TOOLBAR : window.__Colors.LIGHT_TOOLBAR;
    this.props.toolbarTextPrimary = this.props.isNightMode? window.__Colors.NIGHT_TEXT : window.__Colors.LIGHT_TEXT;
    this.props.toggleNightMode = this.props.toggleNightMode===undefined?()=>{} :this.props.toggleNightMode;
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

  showDivider = () => {
    // Android.runInUI(this.set({
    //   id : this.idSet.bottomDividerHolder,
    //   visibility : "visible"
    // }),0);
    JBridge.setTransformation(this.idSet.bottomDividerHolder,"scale(1,1)","1s");
  }

  hideDivider = () => {
      JBridge.setTransformation(this.idSet.bottomDividerHolder,"scale(0,1)","1s");
      // Android.runInUI(this.set({
      //   id : this.idSet.bottomDividerHolder,
      //   visibility : "gone"
      // }),0);
  }
  getTitle = () => {
    return (
      <LinearLayout
        id={this.idSet.titleHolder}
        height="match_parent"
        padding={this.props.padding}
        margin="0,0,24,0">
          <TextView
            text="Powered By"
            fontStyle={window.__Font.fontStyle.REGULAR}
            color={this.props.toolbarTextPrimary}
            textSize="40"
            height="match_parent"
            margin="0,0,4,0"/>
          <TextView
            onClick = {()=>{window.open("https://www.npmjs.com/package/@juspay/mystique")}}
            text="MYSTIQUE"
            fontStyle={window.__Font.fontStyle.BOLD}
            color={window.__Colors.COLOR_ACCENT}
            textSize="40"
            height="match_parent"/>
      </LinearLayout>
    )
  }

  getSourceCode = () => {
    return (
      <LinearLayout
          id={this.idSet.midHolder}
          height="match_parent"
          padding={this.props.padding}>
         <TextView
            onClick = {()=>{window.open("https://github.com/AmitRohan/resume")}}
            text="View Source </>"
            fontStyle={window.__Font.fontStyle.BOLD}
            color={this.props.toolbarTextPrimary}
            textSize="40"
            width="match_parent"
            gravity="center"/>
      </LinearLayout>
    )
  }

  getContent = () => {
    var nightModeMessage = "Turn " 
      + (this.props.isNightMode?"off":"on")
      + " night mode"
    return (<LinearLayout
      id={this.idSet.headerHolder}
      height="42"
      width="match_parent">
        {
          this.getTitle()
        }
        <LinearLayout
          height={ parseInt(this.props.height) >= 0 ? this.props.height:"42" }
          width="2"
          background={window.__Colors.COLOR_ACCENT}/>
        {
          this.getSourceCode()
        }
        <LinearLayout
          height={ parseInt(this.props.height) >= 0 ? this.props.height :"42" }
          width="2"
          background={window.__Colors.COLOR_ACCENT}/>
        <TextView
          id={this.idSet.nightModeToggleHolder}
          padding={this.props.padding}
          onClick={this.props.toggleNightMode}
          text={nightModeMessage}
          fontStyle={window.__Font.fontStyle.BOLD}
          color={this.props.toolbarTextPrimary}
          textSize="40"
          height="match_parent"/>
    </LinearLayout>)
  }



  getBody = () => {
    return (
      <LinearLayout
        height="wrap_content"
        minHeight= { parseInt(this.props.height) >= 0 ? this.props.height+"px" :"42" }
        elevation="2"
        background={this.props.toolbarBackground}
        width="match_parent">

        {
          this.getContent()
        }

        </LinearLayout> )
  }

  onRender = () => {
    JBridge.setWidth(this.idSet.titleHolder,"30%")
    JBridge.setWidth(this.idSet.midHolder,"36%")
    JBridge.setWidth(this.idSet.nightModeToggleHolder,"30%")
    this.hideDivider();
    var _this = this;
    setTimeout(() => {
      _this.showDivider()
    }, 1000);
  }

  render() {


    this.layout = (
      <LinearLayout
        afterRender={this.onRender}
        id={this.props.id}
        width= {this.props.width || "match_parent" }
        height="wrap_content"
        orientation="vertical">
        <LinearLayout
          id={this.idSet.bottomDividerHolder}
          height="5"
          width="match_parent"
          background={window.__Colors.COLOR_ACCENT}/>
        {
          this.getBody()
        }
      </LinearLayout>
    )

    return this.layout.render();
  }
}
//  { this.getToolBarSubOptions() }
module.exports = PoweredBy;
