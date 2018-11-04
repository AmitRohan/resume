const dom = require("@juspay/mystique-backend").doms.android;
const Connector = require("@juspay/mystique-backend").connector;
const LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
const RelativeLayout = require("@juspay/mystique-backend").androidViews.RelativeLayout;
const View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
const ViewWidget = require("@juspay/mystique-backend").androidViews.ViewWidget;
const TextView = require("@juspay/mystique-backend").androidViews.TextView;


class DateWithContent extends View {
  constructor(props, children) {
    super(props, children);
    this.setIds([
      "parentContainer",
      "dateHolder",
      "seperatorHolder",
      "seperatorLineHolder",
      "seperatorLine",
      "descriptionHolder",
      "contentHolder",
      "titleHolder",
      "subTitleHolder"
    ]);


    this.displayName = "DateWithContent";


    this.init()
  }

  init = () => {
    this.props.id = (this.props.id===undefined) ? this.idSet.parentContainer:this.props.id;
    this.props.margin = (this.props.margin===undefined) ? "0,0,0,0" : this.props.margin;
    this.props.isNightMode = (this.props.isNightMode===undefined) ? false : this.props.isNightMode;
    this.props.toolbarBackground = this.props.isNightMode? window.__Colors.NIGHT_TOOLBAR : window.__Colors.LIGHT_TOOLBAR;
    this.props.seperatorBackground = this.props.isNightMode? window.__Colors.LIGHT_BACKGROUND : window.__Colors.NIGHT_BACKGROUND;
    this.props.toolbarTextPrimary = this.props.isNightMode? window.__Colors.NIGHT_TEXT : window.__Colors.LIGHT_TEXT;
    this.props.toolbarTextSecondary = this.props.isNightMode? window.__Colors.NIGHT_TEXT_2 : window.__Colors.LIGHT_TEXT_2;
    this.props.textSize = (this.props.textSize===undefined) ? "18" : this.props.textSize
    
    this.props.date = (this.props.date===undefined) ? "" : this.props.date
    this.props.title = (this.props.title===undefined) ? "" : this.props.title
    this.props.subTitle = (this.props.subTitle===undefined) ? "" : this.props.subTitle
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

  isUrlValid = (userInput) => {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null)
        return false;
    else
        return true;
  }
  extraceUrl = (text) => {
    var startPos = text.indexOf("(") + 1;
    var endPos = text.indexOf(")");
    return "https://" + text.substring(startPos,endPos)
  }

  onRender = () => {
    JBridge.setWidth(this.idSet.dateHolder,"15%")
    JBridge.setWidth(this.idSet.contentHolder,"70%")
    if(this.isUrlValid(this.props.title)){
      var extractedUrl = this.extraceUrl(this.props.title);
      JBridge.setOnClick(this.idSet.titleHolder,()=>{window.open(extractedUrl)})
    }
    setTimeout(() => {
      var height = JBridge.getHeight(this.idSet.contentHolder)
      JBridge.setHeight(this.idSet.seperatorHolder,height)

      var titleHeight = JBridge.getHeight(this.idSet.titleHolder)
      JBridge.setHeight(this.idSet.seperatorLineHolder,titleHeight)

      var lineHeight = parseInt(height) - (titleHeight + 2);
      JBridge.setHeight(this.idSet.seperatorLine,lineHeight)
      JBridge.setMarginLeft(this.idSet.seperatorLine,"auto")
      JBridge.setMarginRight(this.idSet.seperatorLine,"auto")

      
    }, 100);
  }

  getSeperator = () =>{
    var lineDimension = this.props.textSize;
    return (
      <LinearLayout
        id={this.idSet.seperatorHolder}
        orientation="vertical">
        <RelativeLayout
          id={this.idSet.seperatorLineHolder }
          height={lineDimension}
          width={lineDimension}
          gravity="center"
          margin="auto,0,auto,2">
          <ViewWidget
              width="1"
              height={lineDimension}
              background={this.props.seperatorBackground} />
          <ViewWidget
            width={lineDimension}
            height="1"
            background={this.props.seperatorBackground} />
        </RelativeLayout>
        
           <ViewWidget
            id={this.idSet.seperatorLine}
            width="1"
            background={this.props.seperatorBackground} />

      </LinearLayout>

    )
  }

  getContent = () =>{
    return (
      <LinearLayout
        id={this.idSet.contentHolder}
        margin="5,0,0,0"
        orientation="vertical">
        <TextView
          id={this.idSet.titleHolder}
          text={this.props.title}
          fontStyle={window.__Font.fontStyle.BOLD}
          color={this.props.toolbarTextPrimary}
          textSize={this.props.textSize}/>
         <TextView
          id={this.idSet.subTitleHolder}
          text={this.props.subTitle}
          margin="0,8,0,0"
          fontStyle={window.__Font.fontStyle.REGULAR}
          color={window.__Colors.COLOR_ACCENT}
          textSize={this.props.textSize}/>
        <TextView
          id={this.idSet.descriptionHolder}
          text={this.props.description}
          margin="0,4,0,0"
          fontStyle={window.__Font.fontStyle.REGULAR}
          color={this.props.toolbarTextSecondary}
          textSize={this.props.textSize}/>
      </LinearLayout>

    )
  }

  render() {


    this.layout = (
      <LinearLayout
        afterRender={this.onRender}
        id={this.props.id}
        width= {this.props.width || "match_parent" }
        background={this.props.toolbarBackground}
        margin={this.props.margin}
        height="wrap_content">
        <TextView
          id={this.idSet.dateHolder}
          text={this.props.date}
          gravity="center"
          fontStyle={window.__Font.fontStyle.BOLD}
          color={this.props.toolbarTextPrimary}
          textSize={this.props.textSize}
          margin="0,0,5,0"/>
        {
          this.getSeperator()
        }
        {
          this.getContent()
        }
      </LinearLayout>
    )

    return this.layout.render();
  }
}
//  { this.getToolBarSubOptions() }
module.exports = DateWithContent;
