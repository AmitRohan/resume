const dom = require("@juspay/mystique-backend").doms.android;
const Connector = require("@juspay/mystique-backend").connector;
const View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
const LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
const ScrollView = require("@juspay/mystique-backend").androidViews.ScrollView;
const TextView = require("@juspay/mystique-backend").androidViews.TextView;
const ImageView = require("@juspay/mystique-backend").androidViews.ImageView;

const callbackMapper = require("@juspay/mystique-backend/").helpers.android.callbackMapper;

const NameTile = require("../components/MyResume/NameTile.js");
const ObjectiveTile = require("../components/MyResume/ObjectiveTile.js");
const AboutMeTile = require("../components/MyResume/AboutMeTile.js");
const EducationTile = require("../components/MyResume/EducationTile.js");
const PillsTile = require("../components/MyResume/PillsTile.js");
const WorkExperienceTile = require("../components/MyResume/WorkExperienceTile.js");
const ContactTile = require("../components/MyResume/ContactTile.js");

class MyResumeScreen extends View {
  constructor(props, children, state) {
    super(props, children, state);
    this.state = state;
    this.setIds([
      "container",
      "leftColumn",
      "rightColumn"
    ]);
    this.props.isNightMode = localStorage.getItem('nightMode') == "true" ? true : false
    // this.shouldCacheScreen =true;
    // this.clearData();
    window.toggleNightMode = this.toggleNightMode;
  }

  onPop = () => {
    this.props.isNightMode = localStorage.getItem('nightMode') == "true" ? true : false
    Android.runInUI(
      this.animateView(),
      0
    );
    //setTimeout(this.afterRender(),100);
  }

  clearData = () => {
    localStorage.setItem('nightMode',"__failed");
  }

  toggleNightMode = () => {
    var isNightMode = ! (localStorage.getItem('nightMode') == "true" ? true : false)
    localStorage.setItem('nightMode',isNightMode+"");
    this.props.isNightMode=isNightMode;
    this.replaceChild(this.idSet.container,this.getResumeContent().render(),0)
    setTimeout(this.afterRender(),100);
    // window.__runDuiCallback({ action: "NIGHT_MODE_TOGGLED" });
  }
  
  afterRender = () => {

    JBridge.setWidth(this.idSet.leftColumn,"70%")
    JBridge.setWidth(this.idSet.rightColumn,"30%")
    // var passwordField = document.getElementById(_this.idSet.password);
    // if (typeof passwordField != "undefined") {
    //   passwordField.addEventListener("keyup", function(event) {
    //     event.preventDefault();
    //     if (event.keyCode == 13) {
    //       document.getElementById(_this.idSet.submitButtonHolder).click();
    //     }
    //   });
    // }


  }

  getResumeContent = () => {
    return (
      <LinearLayout
      background={window.__Colors.NIGHT_BACKGROUND}
      height="wrap_content"
      width="match_parent"
      orientation="vertical"
    >
      <NameTile
        padding="20,10,20,10"
        height="160"
        isNightMode={this.props.isNightMode}
      />
      <LinearLayout>
        <LinearLayout
          id={this.idSet.leftColumn}
          orientation="vertical">
          <EducationTile
            padding="20,10,20,10"
            width="match_parent" 
            isNightMode={this.props.isNightMode}
          />
           <WorkExperienceTile
            padding="20,10,20,10"
            width="match_parent" 
            isNightMode={this.props.isNightMode}
          />
        </LinearLayout>
        <LinearLayout
          id={this.idSet.rightColumn}
          orientation="vertical">
          <AboutMeTile
            padding="20,10,20,10"
            width="match_parent" 
            isNightMode={this.props.isNightMode}
          />
          <ObjectiveTile
            padding="20,10,20,10"
            width="match_parent"
            isNightMode={this.props.isNightMode}
          />
          <PillsTile
            padding="20,10,20,10"
            width="match_parent"
            title="SKILLS"
            pillList={["C++", "JAVA" , "SQL" , "HTML" , "CSS" , "JAVASCRIPT", "C#" , "HASKELL" , "PURESCRIPT"]}
            isNightMode={this.props.isNightMode}
          />
          <PillsTile
            padding="20,10,20,10"
            width="match_parent"
            title="FRAMEWORKS"
            pillList={["Node.js",".Net","Mystique","Presto","BootStrap","Electon","AngularJS","Material-UI","React","Unity"]}
            isNightMode={this.props.isNightMode}
          />
          <PillsTile
            padding="20,10,20,10"
            width="match_parent"
            title="PLATFORMS"
            pillList={["Android","Windows Mobile","Web","IOS","GIT"]}
            isNightMode={this.props.isNightMode}
          />
          <PillsTile
            padding="20,10,20,10"
            width="match_parent"
            title="SOFTWARES USED"
            pillList={["Sketch","Flinto","Blender","Photoshop","Google Suite","Office 365"]}
            isNightMode={this.props.isNightMode}
          />
          <ContactTile
            padding="20,10,20,10"
            width="match_parent"
            isNightMode={this.props.isNightMode}
          />
        </LinearLayout>

      </LinearLayout>
     
    </LinearLayout>
    )
  }

render() {
    this.layout = (
      <ScrollView
        id={this.idSet.container}
        root="true"
        width="match_parent"
        height="match_parent">
        {
          this.getResumeContent()
        }
      </ScrollView>
    );

    return this.layout.render();
  }

}

module.exports = Connector(MyResumeScreen);
