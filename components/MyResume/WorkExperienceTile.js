const dom = require("@juspay/mystique-backend").doms.android;
const LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
const View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
const TextView = require("@juspay/mystique-backend").androidViews.TextView;

var DateWithContent = require("./Helper/DateWithContent.js");

class WorkExperienceTile extends View {
  constructor(props, children) {
    super(props, children);
    this.setIds([
      "parentContainer",
      "titleHolder",
      "bodyHolder",
      "sectionDividerHolder",
    ]);


    window.WorkExperienceTile = this;


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
        date : "August 2019 - Current",
        title : "Kruzr (www.kruzr.co)",
        subTitle : "Growth Enginner (Full Stack)",
        description :"Working as a Full Stack developer and helping the company scale wherever possible. Have been providing my techinical expertise at all ends."
                      + "\nFew of the areas where I am involved are:"
                      + "\n\t· Managing company webiste (kruzr.co)."
                      + "\n\t· Managing company blog (blog.kruzr.co)."
                      + "\n\t· Android/iOS app (Allie)"
                      + "\n\t· Managing product dashboard."
                      
      }, {
        date : "June 2017 - July 2019",
        title : "Juspay (www.juspay.in)",
        subTitle : "Technical Analyst",
        description :"Worked as a UI/UX & Cross Platform Software Development Framework developer at the client side. Was working as one of the lead developers in various projects.\n Few of my client side projects are :\n·MYSTIQUE/DUI \n·PRESTO \n· BHIMUPI \n· Diksha Android App\n· Payment SDK for FoodPanda, OLA, BigBasket and Cred"   
      } , {
        date : "Jan - June of 2017",
        title : "Abyeti Technologies (www.abyeti.com)",
        subTitle : "Intern Software Developer",
        description :"Worked for their client Juspay Technologies. Worked as the UI developer for BHIM and other internal projects."   
      } , {
        date : "July 2016",
        title : "ONGC Ahemedabad",
        subTitle : "Intern Developer.",
        description :"Built sRIG (android application) for them. The app helped them to locate the position of their rigs.  Also it had some added functionality to help them get updated details of the RIG systems/readings.\nResponsibility & Skills acquired : \n· Product Manager \n· Research for identifying the key issue faced by the employees of ONGC. (Tracking Rigs)\n· Backend : Used PHP to create restfull API's\n· JSON structure to parse data\n· Android APP as a fully functional Frontend Client"   
      } , {
        date : "May - June of 2016",
        title : "Dextra Arts (www.dextra.com)",
        subTitle : "Intern Android Developer",
        description :"Established the core architecture for UI/UX. Also quickly added features like youtube player and animations."   
      } , {
        date : "2016",
        title : "Webloom Solutions (www.webloomsolutions.com)",
        subTitle : "Freelanced as Web & Android developer",
        description :"Webloom Solutions is a startup started by the students of Manipal Institute of Technology. I was also part of there sub-branch in our campus. During my time as freelancer, I built CMS and Ecommerce website for a local store client in their college campus.\nResponsibility & Skills acquired : \n· Product Manager \n· HTML5\n· CSS (BootStrap)\n· Javascript"   
      } , {
        date : "Jan 2016",
        title : "Member of Organizing Comitee",
        subTitle : "Web & App Devlopment",
        description :"I was the head of the team developing the android mobile app for Techideate (College technical fest).\nResponsibility & Skills acquired : \n· Product & Team Manager \n· Setting up the basic architecture for complex and heavy UI/UX\n· Reviewing Code and UI changes"   
      } , {
        date : "2015-2016",
        title : "Member of Core Comitee",
        subTitle : "Web & App Devlopment",
        description :"Headed the WEB & APP development team for the ONEIROS (College cultutal fest).\nResponsibility & Skills acquired : \n· Product Manager\n· Twitter API \n· REST API\n· In depth knowledge of Android Lifecycle"   
      } , {
        date : "2013-2014",
        title : "Launched EYCL on Android & Windows",
        subTitle : "An APP to help students in everyday life ",
        description :"The app helped students to login automatically to college WIFI networks, AMS Portal and My Campus Days. AMS portal was used to check the marks as well as attendance and My Campus days was used to lodge complains regarding hostel.\nSkills acquired : \n· Basics of Android App making (Java) \n· Basics of Windows Mobile App making (C#.Net)\n· Javascript for javascript injection in login pages"
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
          text="WORK EXPERIENCE"
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
module.exports = WorkExperienceTile;
