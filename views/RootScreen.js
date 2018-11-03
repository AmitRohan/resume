var dom = require("@juspay/mystique-backend").doms.android;
var Connector = require("@juspay/mystique-backend").connector;
var View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
var RelativeLayout = require("@juspay/mystique-backend").androidViews.RelativeLayout;
var LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
var FrameLayout = require("@juspay/mystique-backend").androidViews.FrameLayout;
var TextView = require("@juspay/mystique-backend").androidViews.TextView;
var ImageView = require("@juspay/mystique-backend").androidViews.ImageView;

var TextStyle = require("../res/TextStyle").textStyle;
var Symbols = require("../res/Symbols").symbol;
var Colors = require("../res/Colors").color;
var Styles = require("../res/Styles");
var Font = require("../res/Font");

class RootScreen extends View {
  constructor(props, children) {
    super(props, children);

    this.setIds([
      'root',
      'editor',
      'loadingContainer'
    ]);

    window.__TextStyle = TextStyle;
    window.__Symbols = Symbols;
    window.__Colors = Colors;
    window.__Styles = Styles;
    window.__Font = Font;

    this.setStatusBarColor(window.__Colors.BLACK);
  }

  handleStateChange = () => {
    return true;
  }

  setStatusBarColor(color) {
    let _color = "set_color=android.graphics.Color->parseColor:s_" + color + ";";

    Android.runInUI(
      "set_win=ctx->getWindow;get_win->addFlags:i_-2147483648;" + _color + "get_win->setStatusBarColor:get_color",
      null
    );
  }

  onEditorValueChange = (e, value) => {
    // console.log("onEditorValueChange ",e,value);
  }

  onEditorRender = (editor) => {
    this.editor = editor;
  }

  afterRender = () => {
    __runDuiCallback({ action: "REPO" });
  }

  showEditor = () => {
    var cmd = this.set({
      id: this.idSet.editor,
      visibility: "visible"
    });
    Android.runInUI(cmd, null);
  }

  hideEditor = () => {
    var cmd = this.set({
      id: this.idSet.editor,
      visibility: "gone"
    });

    Android.runInUI(cmd, null);
  }

  afterRender = () => {
    __runDuiCallback({ action: "HOME" });
  }



  showLoading = () => {
    console.log("SHOW")
    var cmd = this.set({
      id: this.idSet.loadingContainer,
      visibility: "visible"
    })
    cmd += this.set({
      id: this.idSet.root,
      visibility: "gone"
    });
    Android.runInUI(cmd, null);

  }

  hideLoading = () => {
    var cmd = this.set({
      id: this.idSet.loadingContainer,
      visibility: "gone"
    })
    cmd += this.set({
      id: this.idSet.root,
      visibility: "visible"
    });
    Android.runInUI(cmd, null);
  }

  render() {
    this.layout = (
      <RelativeLayout
        width={"match_parent"}
        height={"match_parent"}
        afterRender={this.afterRender}
        root="true">

        <LinearLayout
          id={this.idSet.root}
          width={"match_parent"}
          height={"match_parent"} />


      </RelativeLayout>
    );

    return this.layout.render();
  }
}

module.exports = Connector(RootScreen);
