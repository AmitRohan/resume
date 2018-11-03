const dom = require("@juspay/mystique-backend").doms.android;
const Connector = require("@juspay/mystique-backend").connector;
const LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
const View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
const TextView = require("@juspay/mystique-backend").androidViews.TextView;

var IconWithLabel = require("./Helper/IconWithLabel.js");

class AboutMeTile extends View {
  constructor(props, children) {
    super(props, children);
    this.setIds([
      "parentContainer",
      "titleHolder",
      "bodyHolder",
      "sectionDividerHolder",
    ]);


    window.AboutMeTile = this;


    this.init()
  }

  init = () => {
    this.props.id = (this.props.id===undefined) ? this.idSet.parentContainer:this.props.id;
    this.props.padding = (this.props.padding===undefined) ? "20,10,2,2" : this.props.padding;
    this.props.isNightMode = (this.props.isNightMode===undefined) ? false : this.props.isNightMode;
    this.props.toolbarBackground = this.props.isNightMode? window.__Colors.NIGHT_TOOLBAR : window.__Colors.LIGHT_TOOLBAR;
    this.props.toolbarTextPrimary = this.props.isNightMode? window.__Colors.NIGHT_TEXT : window.__Colors.LIGHT_TEXT;
    this.props.toolbarTextSecondary = this.props.isNightMode? window.__Colors.NIGHT_TEXT_2 : window.__Colors.LIGHT_TEXT_2;
  
    this.content = [
      {
        label : "7568268430",
        imageUrl : "social-whatsapp",
        hyperLink : undefined
      } , {
        label : "a17rohan@gmail",
        imageUrl : "social-mail",
        hyperLink : undefined
      }, {
        label : "www.facebook.com/amitrohan",
        imageUrl : "social-facebook",
        hyperLink : "https://www.facebook.com/amitrohan"
      }, {
        label : "www.twitter.com/AmitRohan17",
        imageUrl : "social-twitter",
        hyperLink : "https://twitter.com/AmitRohan17"
      }, {
        label : "www.instagram.com/amitrohan",
        imageUrl : "social-instagram",
        hyperLink : "https://www.instagram.com/amitrohan/"
      }

    ]
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
    //   id : this.idSet.sectionDividerHolder,
    //   visibility : "visible"
    // }),0);
    JBridge.setTransformation(this.idSet.sectionDividerHolder,"scale(1,1)","1s");
  }

  hideDivider = () => {
      JBridge.setTransformation(this.idSet.sectionDividerHolder,"scale(0,1)","1s");
      // Android.runInUI(this.set({
      //   id : this.idSet.sectionDividerHolder,
      //   visibility : "gone"
      // }),0);
  }

  getTitle = () => {
    return (
      <TextView
          id={this.idSet.titleHolder}
          text="CONTACT"
          fontStyle={window.__Font.fontStyle.BOLD}
          color={this.props.toolbarTextPrimary}
          textSize="28"
          height="30"
          margin="0,0,0,10"/>
      )
  }


  getBody = () => {
    
    var iconLabelList = this.content.map((content)=>{
      return (
        <IconWithLabel
          labelText={content.label}
          imageUrl={content.imageUrl}
          hyperLink={content.hyperLink}
          isNightMode={this.props.isNightMode}
          margin="0,8,0,0"
          width="match_parent"/>
      )
    })
    return (
      <LinearLayout
        height="wrap_content"
        width="match_parent"
        orientation="vetical">
        {
          iconLabelList
        }
      </LinearLayout>
         )
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
        background={this.props.toolbarBackground}
        padding={this.props.padding}
        height="wrap_content"
        orientation="vertical">
        {
          this.getTitle()
        }
        <LinearLayout
          id={this.idSet.sectionDividerHolder}
          height="2"
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
module.exports = AboutMeTile;
