/*import { os, app, events, window } from "@neutralinojs/lib";

let tray = {
  icon: "/resources/icons/trayIcon.png",
  menuItems: [
    {
      id: "open",
      text: "Öffnen",
    },
    { id: "close", text: "Schließen" },
  ],
};

const trayClick = async () => {
  os.setTray(tray);
};
trayClick();

events.on("trayMenuItemClicked", (event) => {
  console.log(event.detail);
  if (event.detail.id === "open") {
    window.show();
  }
  if (event.detail.id === "close") {
    app.exit();
  }
});

events.on("windowClose", () => {
  window.hide();
  //os.setTray(tray);
});

/*events.on("windowFocus", () => {
  os.setTray({});
});*/
