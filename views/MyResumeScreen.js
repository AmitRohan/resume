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
    this.shouldCacheScreen =true;
    // this.checkPrevLogin();
    window.clearUser=this.clearUser
  }

  onPop = () => {
    this.username = "";
    this.password = "";
    Android.runInUI(
      this.animateView(),
      0
    );
    window.__hook=this;
    //setTimeout(this.afterRender(),100);
  }

  clearUser = () => {
    localStorage.setItem('username',"__failed");
    localStorage.setItem('password',"__failed");
  }

  checkPrevLogin = () => {
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');
    if (username && username!="__failed" && password && password!="__failed") {
      // window.__LoadingPopUp.showLoading();
      // window.__runDuiCallback({ action: "VALIDATE", username: username, password: password });
      return;
    }
  }

  handleSocialMedia = (ev) => {
    var url = "https://bitbucket.org/account/password/reset/"
    window.open(url,'popUpWindow','height=400,width=600,left=10,top=10,,scrollbars=yes,menubar=no');
  }

  
  afterRender = () => {

    var _this = this;
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

render() {
    this.layout = (
      <ScrollView
        root="true"
        width="match_parent"
        height="match_parent">

        <LinearLayout
          background={window.__Colors.NIGHT_BACKGROUND}
          height="wrap_content"
          width="match_parent"
          orientation="vertical"
        >
          <NameTile
            padding="20,10,20,10"
            height="160"
            isNightMode={false}
          />
          <LinearLayout>
            <LinearLayout
              id={this.idSet.leftColumn}
              orientation="vertical">
              <EducationTile
                padding="20,10,20,10"
                width="match_parent" 
                isNightMode={false}
              />
               <WorkExperienceTile
                padding="20,10,20,10"
                width="match_parent" 
                isNightMode={false}
              />
            </LinearLayout>
            <LinearLayout
              id={this.idSet.rightColumn}
              orientation="vertical">
              <AboutMeTile
                padding="20,10,20,10"
                width="match_parent" 
                isNightMode={false}
              />
              <ObjectiveTile
                padding="20,10,20,10"
                width="match_parent"
                isNightMode={false}
              />
              <PillsTile
                padding="20,10,20,10"
                width="match_parent"
                title="SKILLS"
                pillList={["C++", "JAVA" , "SQL" , "HTML" , "CSS" , "JAVASCRIPT", "C#" , "HASKELL" , "PURESCRIPT"]}
                isNightMode={false}
              />
              <PillsTile
                padding="20,10,20,10"
                width="match_parent"
                title="FRAMEWORKS"
                pillList={["Node.js",".Net","Mystique","Presto","BootStrap","Electon","AngularJS","Material-UI","React","Unity"]}
                isNightMode={false}
              />
              <PillsTile
                padding="20,10,20,10"
                width="match_parent"
                title="PLATFORMS"
                pillList={["Android","Windows Mobile","Web","IOS"]}
                isNightMode={false}
              />
              <PillsTile
                padding="20,10,20,10"
                width="match_parent"
                title="SOFTWARES USED"
                pillList={["Sketch","Flinto","Blender","Photoshop","Google Suite","Office 365"]}
                isNightMode={false}
              />
              <ContactTile
                padding="20,10,20,10"
                width="match_parent"
                isNightMode={false}
              />
            </LinearLayout>

          </LinearLayout>
         
        </LinearLayout>
      </ScrollView>
    );

    return this.layout.render();
  }

}

module.exports = Connector(MyResumeScreen);
