var data = require("sdk/self").data;
var doing_search = false;

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
    if (doing_search == true) {
        console.log("already doing stuff");
        return;
    }
    var Request = require("sdk/request").Request;

    Request({
    url: "http://192.81.222.194:1142/api",
    content : { url : url },
     onComplete: function (response) {
        doing_search = false;
        text_entry.postMessage(response.json)
     }
    }).post();
    doing_search = true;
}
 
text_entry.on("show", function() {
     var tabs = require("sdk/tabs");
     url = tabs.activeTab.url;
     make_request(url);
});

