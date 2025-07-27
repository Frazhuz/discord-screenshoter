import * as module from "./moduleVariables.js"
import * as screenshot from "./screenshot.js"
import * as zoom from "./zoom.js"

Hooks.once("init", () => {
  console.log("Discord Screenshot Module | Initializing");
  module.Settings.register();
  game.modules.get(module.NAME).api = {
    screenshot,
    zoom
  }
  Hooks.callAll(module.NAME + ".ready", game.modules.get(module.NAME).api);
});

