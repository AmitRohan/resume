const dom = require("@juspay/mystique-backend").doms.android;
const Connector = require("@juspay/mystique-backend").connector;
const LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
const View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
const TextView = require("@juspay/mystique-backend").androidViews.TextView;


class NameTile extends View {
  constructor(props, children) {
    super(props, children);
    this.setIds([
      "parentContainer",
      "headerHolder",
      "bottomDividerHolder",
      "searchEditText"
    ]);


    window.NameTile = this;


    this.init()
  }

  init = () => {
    this.props.id = (this.props.id===undefined) ? this.idSet.parentContainer:this.props.id;
    this.props.padding = (this.props.padding===undefined) ? "20,10,2,2" : this.props.padding;
    this.props.isNightMode = (this.props.isNightMode===undefined) ? false : this.props.isNightMode;
    this.props.toolbarBackground = this.props.isNightMode? window.__Colors.NIGHT_TOOLBAR : window.__Colors.LIGHT_TOOLBAR;
    this.props.toolbarTextPrimary = this.props.isNightMode? window.__Colors.NIGHT_TEXT : window.__Colors.LIGHT_TEXT;
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

  getToolBarHeader = () => {
    return (<LinearLayout
      id={this.idSet.headerHolder}
      height="117"
      width="424"
      orientation="vertical">
       <LinearLayout
        height="82"
        width="match_parent">
        <TextView
          text="AMIT"
          fontStyle={window.__Font.fontStyle.BOLD}
          color={this.props.toolbarTextPrimary}
          textSize="80"
          height="match_parent"
          margin="0,0,4,0"/>
        <TextView
          text="ROHAN"
          fontStyle={window.__Font.fontStyle.REGULAR}
          color={this.props.toolbarTextPrimary}
          textSize="80"
          height="match_parent"/>
       </LinearLayout>
        <TextView
          text="Computer Science Engineer"
          gravity="center"
          margin= "0,5,0,0"
          fontStyle={window.__Font.fontStyle.REGULAR}
          color={this.props.toolbarTextPrimary}
          textSize="28"
          height="30"
          width="match_parent"/>
    </LinearLayout>)
  }



  getBody = () => {
    return (
      <LinearLayout
        height="wrap_content"
        minHeight= { parseInt(this.props.height) >= 0 ? this.props.height+"px" :"112" }
        elevation="2"
        background={this.props.toolbarBackground}
        padding={this.props.padding}
        width="match_parent"
        gravity="center">

        {
          this.getToolBarHeader()
        }

        </LinearLayout> )
  }

  onRender = () => {
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
        {
          this.getBody()
        }
        <LinearLayout
          id={this.idSet.bottomDividerHolder}
          height="5"
          width="match_parent"
          background={window.__Colors.COLOR_ACCENT}/>
      </LinearLayout>
    )

    return this.layout.render();
  }
}
//  { this.getToolBarSubOptions() }
module.exports = NameTile;
