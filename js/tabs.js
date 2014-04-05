/* Tab Script */
/* Example of How to use tabs

Required Assets:
  Travel/assets/js/onload.js
  Travel/assets/css/tabs.css

  In the head of your document: 
  
    <script language="javascript" type="text/javascript"> 
      addLoadEvent(function() {
        var ObjName = new tabs(document.getElementById("IDofTabWrapper"));  
      }); 
    </script>

  In the Body:
  
    <div id="IDofTabWrapper" class="TabWrapper">
      <div class="TabContent">
        <div id="Tab Label One">
          Tab One Content (more HTML) Here
        </div>
        <div id="Tab Label Two">
          Tab Two Content (more HTML) Here
        </div>
      </div>
    </div>

*/    
    
tabs = function(obj) {
  var oThis = this;
  this.obj = obj; 
  this.tabbed = this.obj.children[0].childNodes;
  this.aTabs = new Array();
  for (var a=1; a < this.tabbed.length; a = a + 2) {
    this.aTabs.push(this.tabbed[a].id);
  }
  this.drawTabs();
  this.tabSwitch(this.aTabs[0]);
  window.onbeforeprint = function () {
    oThis.drawHeadings();
  }
}

tabs.prototype.drawTabs = function () {
  var oThis = this;
  this.Content = this.obj.children[0];
  var tabs = document.createElement("div");
  tabs.className = "Tabs";
  this.obj.insertBefore(tabs,this.Content); 
  for(var a=0;a < this.aTabs.length;a++) {
    var tab = document.createElement("div");
    tab.id = "tab_"+ this.aTabs[a];
    tab.ref = this.aTabs[a];
    tab.innerHTML = this.aTabs[a];
    tab.style.pixelHeight = 27;
    tab.className = "Tab";
    if(this.Content.childNodes[1 + (2*a)].className == "disabled") {  
      this.tabDisable(tab);
    }
    else { 
      this.tabEnable(tab);
    }
    tab.prevClass = tab.className;    
    tabs.appendChild(tab);
  }
  this.obj.style.display = "block"; 
  tab = document.createElement("div");
  tab.className = "TabFill";
  if(this.obj.childNodes[2] && this.obj.childNodes[2].id.toLowerCase() == "controls") {
    tab.innerHTML = this.obj.childNodes[2].innerHTML;
  } else {
    tab.innerHTML = "&nbsp;";
  }   
  tab.style.pixelHeight = 27;
  tabs.appendChild(tab);
} 

tabs.prototype.drawHeadings = function () {
  var oThis = this;
  for (var a = 0; a < this.aTabs.length; a++) {
    var heading = document.createElement("h4");
    heading.innerHTML = this.aTabs[a];
    heading.className = "tabHeading";
    this.tabbed[1 + (2*a)].insertBefore(heading, this.tabbed[1 + (2*a)].children[0]);
  }
}

tabs.prototype.tabSwitch = function(id) {
  var tabs = this.obj.children[0].childNodes;
  for (var a = 0; a < tabs.length - 1; a++) {
    if (tabs[a].ref == id) {
      tabs[a].className = tabs[a].prevClass + " on";
      this.tabbed[1 + (2*a)].className = "active";
    } else {
      if(tabs[a].className.indexOf("disabled") < 1) { 
        tabs[a].className = tabs[a].prevClass; 
      }
      this.tabbed[1 + (2*a)].className = "not_active";
    }
  }
}

tabs.prototype.tabDisable = function (tab) {
  tab.className = tab.className + " disabled";
  tab.title = "This tab is currently disabled";
  tab.onmouseover = null;
  tab.onmouseout = null;
  tab.onclick = null;
}

tabs.prototype.tabEnable = function (tab) {
  var oThis = this;
  tab.className = "Tab";
  tab.title = "";
  tab.prevClass = tab.className;
  tab.onmouseover = function() {
    if (this.className == this.prevClass) {
      this.className += " over";
    }
  }
  tab.onmouseout = function() {
    if (this.className.indexOf("over") > 1) {
      this.className = this.prevClass;
    }
  }
  tab.onclick = function() {
    oThis.tabSwitch(this.ref);
  } 
}
