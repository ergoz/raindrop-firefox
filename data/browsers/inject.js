self.port.on("getHTML", function(message) {
    RainDropPanzer.run(function(item) {
        self.port.emit("sendRequest", item);
    });
});