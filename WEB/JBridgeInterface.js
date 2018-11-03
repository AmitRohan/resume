var axios = require("axios");
var ViewPageAdapter = require("./ViewPageAdapter");

module.exports = {
    getSymbol: function() {

    },

    hideKeyboard: function() {

    },

    getFromSharedPrefs: function(key) {
      return localStorage.getItem(key) || "__failed";
    },

    setInSharedPrefs: function(key, value) {
      localStorage.setItem(key, value);
    },

    getDeviceDetails: () => {
      return JSON.stringify({"deviceId":"TEST","packageName":"in.juspay.dui_android","os":"Android","model":"2014818","version":22,"manufacturer":"Xiaomi"});
    },

    viewPagerAdapter: function(id, jsx, tabJsx, cb) {
      ViewPageAdapter.createTabs(id, jsx, tabJsx, cb);
    },

    setClickFeedback: function() {

    },

    switchToViewPagerIndex: function(index) {
      ViewPageAdapter.toggleView(index);
    },

    callAPI: function(method, url, body, headers, callback) {
      axios({
        method: method,
        url: url,
        data: JSON.parse(atob(body)),
        headers: JSON.parse(atob(headers)),
        timeout: 1000000,
        maxContentLength: 5 * 1024 * 1024 // 5 MB
      }).then(function(data) {
        try {
          __PROXY_FN[callback](data.statusText, data.data, data.status);
        } catch(err) {
          console.error(err);
          return;
        }
      }).catch(function(error) {
        console.error(error);
        var statusText;
        var status;
        var data;
        if (error.response) {
          data = (error.response.data);
          status = (error.response.status);
          statusText = (error.response.status);
        } else {
          data = null;
          status = 500;
          statusText = error.message;
        }
        __PROXY_FN[callback](statusText, data, status);
      });
    },

    toast: function(msg) {
      alert(msg);
    },

    getPosition: function(e) {
       var posx = 0;
       var posy = 0;

       if (!e) var e = window.event;

       if (e.pageX || e.pageY) {
         posx = e.pageX;
         posy = e.pageY;
       } else if (e.clientX || e.clientY) {
         posx = e.clientX + document.body.scrollLeft +
                            document.documentElement.scrollLeft;
         posy = e.clientY + document.body.scrollTop +
                            document.documentElement.scrollTop;
       }

       return {
         x: posx,
         y: posy
       }

    },
    setOnClick : function(id,fn) {
      var element = document.getElementById(id);
      element.style.cursor="hand"
      element.addEventListener('click', function(ev) {
          ev.preventDefault();
          if(typeof fn !== "undefined")
            fn(ev);
          return false;
      }, false);
    },

    setOnRightClick : function(id,fn) {
      var element = document.getElementById(id);
      element.addEventListener('contextmenu', function(ev) {
          ev.preventDefault();
          if(typeof fn !== "undefined")
            fn(ev);
          return false;
      }, false);
    },
    makeHoverable: function(_id,noBorder) {
      if(noBorder)
        document.getElementById(_id).className += " e_up_i";
      else
        document.getElementById(_id).className += " e_up";
    },
    setElevation: function(_id,elevation) {
      var newClass=[];
      document.getElementById(_id).className.split(" ").map((item)=>{
        if(item.indexOf("elevation") == -1 ){
          newClass.push(item)
        }
      })
      if(parseInt(elevation)>0)
        newClass.push("elevation"+(parseInt(elevation)%5))
      document.getElementById(_id).className = newClass.join(" ");
    },
    setMouseIO : function(_id,_mEnter,_mExit) {
      var element=document.getElementById(_id);
      element.addEventListener( "mouseenter", function(e) {
          if(_mEnter) _mEnter(e);
      });
      element.addEventListener( "mouseleave", function(e) {
          if(_mExit) _mExit(e);
      });
    },
    setFocuseIO : function(_id,_focus,_blue) {
      var element=document.getElementById(_id);
      element.addEventListener( "focus", function(e) {
          if(_focus) _focus(e);
      });
      element.addEventListener( "blur", function(e) {
          if(_blue) _blue(e);
      });
    },
    setHeight : function(_id,_height) {
      var element=document.getElementById(_id);
      element.style.height=_height;
    },
    setTransformation : function(_id,_transformation,_duration) {
      var element=document.getElementById(_id);
      element.style.transitionDuration=_duration;
      element.style.transform=_transformation;
    },
    setWidth : function(_id,_width) {
      var element=document.getElementById(_id);
      element.style.width=_width;
    },
    getHeight : function(_id,_height) {
      var element=document.getElementById(_id);
      return element.clientHeight;
    },
    getWidth : function(_id,_width) {
      var element=document.getElementById(_id);
      return element.clientWidth;
    },
    setMaxWidth : function(_id,_width) {
      var element=document.getElementById(_id);
      element.style["max-width"]=_width;
    },
    setMargin : function(_id,_value) {
      var element=document.getElementById(_id);
      element.style["margin"]=_value;
    },
    setMarginLeft : function(_id,_value) {
      var element=document.getElementById(_id);
      element.style["margin-left"]=_value;
    },
    setMarginTop : function(_id,_value) {
      var element=document.getElementById(_id);
      element.style["margin-top"]=_value;
    },
    setMarginRight : function(_id,_value) {
      var element=document.getElementById(_id);
      element.style["margin-right"]=_value;
    },
    setMarginBottom: function(_id,_value) {
      var element=document.getElementById(_id);
      element.style["margin-bottom"]=_value;
    },
    bringToFocus: function(_id) {
      document.getElementById(_id).focus();
    },
    restartApp: function() {
      location.reload();
    }
}
