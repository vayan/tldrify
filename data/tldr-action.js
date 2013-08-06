var tldrcontent = document.getElementById("tldr-content");

self.on("message", function(addonMessage) {
  tldrcontent.innerHTML = '';
  for (var key = 0; key < addonMessage.length; ++key) {
    tldrcontent.innerHTML += "<li>"+addonMessage[key]+"</li>";
    }
});