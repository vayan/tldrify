var tldrcontent = document.getElementById("tldr-content");

self.on("message", function(addonMessage) {
	if (addonMessage === "fail") {
		tldrcontent.innerHTML = 'Failed...sorry';
		return;
	}
  tldrcontent.innerHTML = '';
  for (var key = 0; key < addonMessage.length; ++key) {
    tldrcontent.innerHTML += "<li>"+addonMessage[key]+"</li>";
    }
});

self.port.on("show", function(data) {
  tldrcontent.innerHTML = '<img src="'+data+'" />';
});