var data = require("sdk/self").data;
var doing_search = false;
var currenturl = "";

var text_entry = require("sdk/panel").Panel({
  width: 500,
  height: 400,
  contentURL: data.url("tldr-content.html"),
  contentScriptFile: data.url("tldr-action.js")
});

require("sdk/widget").Widget({
  label: "TLDRIFY",
  id: "TLDRIFY",
  contentURL: data.url("icon.png"),
  panel: text_entry
});


function make_request(url) {
  if (doing_search == true || currenturl === url) {
    return;
  }
  var Request = require("sdk/request").Request;
  currenturl = url;
  text_entry.port.emit("show", data.url("load.gif"));
  Request({
    url: "http://192.81.222.194:1142/api",
    content : { url : url },
    onComplete: function (response) {
      doing_search = false;
      text_entry.postMessage((response.lenght < 10) ? "fail" : response.json);
    }
  }).post();
  doing_search = true;
}

text_entry.on("show", function() {
  var tabs = require("sdk/tabs"); 
  make_request(tabs.activeTab.url);
});

