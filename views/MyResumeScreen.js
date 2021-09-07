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
const PoweredBy = require("../components/MyResume/PoweredBy.js");
const ReferenceTile = require("../components/MyResume/ReferenceTile.js");

class MyResumeScreen extends View {
  constructor(props, children, state) {
    super(props, children, state);
    this.state = state;
    this.setIds([
      "container",
      "leftColumn",
      "rightColumn"
    ]);
    // this.shouldCacheScreen =true;
    // this.clearData();
    this.setUpProps()
  }

  setUpProps = () => {
    var nightMode = localStorage.getItem('nightMode') == "true" ? true : false;
    this.props.isNightMode = nightMode
    this.props.mainBackground = nightMode? window.__Colors.NIGHT_TOOLBAR : window.__Colors.LIGHT_TOOLBAR;
  }

  onPop = () => {
    this.setUpProps()
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
    var isNightMode = localStorage.getItem('nightMode') == "true" ? true : false;
    var mainBackground = isNightMode? window.__Colors.NIGHT_TOOLBAR : window.__Colors.LIGHT_TOOLBAR;
    return (
      <LinearLayout
      root="true"
      background={mainBackground}
      height="wrap_content"
      width="match_parent"
      orientation="vertical"
    >
      <NameTile
        padding="20,10,20,10"
        height="160"
        isNightMode={isNightMode}
      />
      <LinearLayout>
        <LinearLayout
          id={this.idSet.leftColumn}
          orientation="vertical">
          <EducationTile
            padding="20,10,20,10"
            width="match_parent" 
            isNightMode={isNightMode}
          />
           <WorkExperienceTile
            padding="20,10,20,10"
            width="match_parent" 
            isNightMode={isNightMode}
          />
        </LinearLayout>
        <LinearLayout
          id={this.idSet.rightColumn}
          orientation="vertical">
          <AboutMeTile
            padding="20,10,20,10"
            width="match_parent" 
            isNightMode={isNightMode}
          />
          <ObjectiveTile
            padding="20,10,20,10"
            width="match_parent"
            isNightMode={isNightMode}
          />
          <PillsTile
            padding="20,10,20,10"
            width="match_parent"
            title="HANDS ON"
            pillList={["kruzr.co","Allie","CRED","FOODPANDA","OLA","DIKSHA","sRIG","Dextra"]}
            isNightMode={isNightMode}
          />
          <PillsTile
            padding="20,10,20,10"
            width="match_parent"
            title="SKILLS"
            pillList={["C++", "JAVA" , "SQL" , "HTML" , "CSS" , "JAVASCRIPT", "C#" , "PHP", "HASKELL" , "PURESCRIPT"]}
            isNightMode={isNightMode}
          />
          <PillsTile
            padding="20,10,20,10"
            width="match_parent"
            title="FRAMEWORKS"
            pillList={["Node.js",".Net","Mystique","Presto","BootStrap","Electon","AngularJS","React","Unity"]}
            isNightMode={isNightMode}
          />
          <PillsTile
            padding="20,10,20,10"
            width="match_parent"
            title="PLATFORMS"
            pillList={["Android","Web","iOS","Windows Mobile"]}
            isNightMode={isNightMode}
          />
          <PillsTile
            padding="20,10,20,10"
            width="match_parent"
            title="SOFTWARES USED"
            pillList={["Wordpress","Hubspot","Sketch","Flinto","Blender","Photoshop","Google Suite","Office 365","Android Studio","xCode","VS Code","Websotrm","Atom","SublimeText"]}
            isNightMode={isNightMode}
          />
          <ContactTile
            padding="20,10,20,10"
            width="match_parent"
            isNightMode={isNightMode}
          />
          <ReferenceTile
          padding="20,10,20,10"
          width="match_parent"
          isNightMode={isNightMode}
        />
        </LinearLayout>

      </LinearLayout>
      <LinearLayout
        height="20"
        width="match_parent"/>
      <PoweredBy
        padding="20,10,20,10"
        height="67"
        width="match_parent"
        isNightMode={isNightMode}
        toggleNightMode={this.toggleNightMode}
      />
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
