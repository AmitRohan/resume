const dom = require("@juspay/mystique-backend").doms.android;
const Connector = require("@juspay/mystique-backend").connector;
const LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
const View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
const TextView = require("@juspay/mystique-backend").androidViews.TextView;

var LabelWithDescription = require("./Helper/LabelWithDescription.js");
var DateWithContent = require("./Helper/DateWithContent.js");

class EducationTile extends View {
  constructor(props, children) {
    super(props, children);
    this.setIds([
      "parentContainer",
      "titleHolder",
      "bodyHolder",
      "sectionDividerHolder",
    ]);


    window.EducationTile = this;


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
        date : "2014-2015",
        title : "Microsoft Technical Associate",
        subTitle : "Got certification in C# and .Net Framework",
        description :"Succesfully completed the 6 month course held in college campus"   
      } , {
        date : "2013-2017",
        title : "Bachelor of Technology",
        subTitle : "Manipal University Jaipur",
        description :"CGPA: 8.2"   
      } , {
        date : "2011-2013",
        title : "All India Senior School Certificate",
        subTitle : "Delhi Public School Gandhinagar",
        description :"Completed 12th with 83 percentile"   
      } , {
        date : "2009-2011",
        title : "Secondary School Certificate",
        subTitle : "Delhi Public School Gandhinagar",
        description :"Completed 10th with a GPA of 7.6"   
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
          text="EDUCATION"
          fontStyle={window.__Font.fontStyle.BOLD}
          color={this.props.toolbarTextPrimary}
          textSize="28"
          height="30"
          margin="0,0,0,10"/>
      )
  }


  getBody = () => {
    var dateWithContentList = this.content.map((content)=>{
      return (
        <DateWithContent
          date={content.date}  
          title={content.title}
          subTitle={content.subTitle}
          description={content.description}
          isNightMode={this.props.isNightMode}
          margin="0,10,0,0"
          width="match_parent"
        />
      )
    })
    return (
      <LinearLayout
        height="wrap_content"
        width="match_parent"
        orientation="vetical">
        {
          dateWithContentList
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
module.exports = EducationTile;
