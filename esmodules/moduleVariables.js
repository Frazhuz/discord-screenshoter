export const NAME = "discord-screenshoter";

import * as screenshot from "./screenshot.js"
export let socket;
Hooks.once("socketlib.ready", () => {
  socket = socketlib.registerModule(NAME);
  socket.register("sendScreenshotToDiscord", screenshot.sendToDiscord);
});

export class Settings {
  static register() {

    game.settings.register(NAME, "webhookUrl", {
      name: "Discord Webhook URL",
      hint: "Paste the Discord webhook URL to send screenshots.",
      scope: "world",
      config: true,
      type: new foundry.data.fields.StringField(),
    });

    game.settings.register(NAME, "cameraUser", {
      name: "Camera User",
      hint: "Insert the user ID on whose behalf the screenshots will be taken (without the word User).",
      scope: "world",
      config: true,
      type: new foundry.data.fields.StringField()
    });

    game.settings.register(NAME, "quality", {
      name: "Quality",
      hint: "Quality of sent screenshots.",
      scope: "world",
      config: true,
      type: Number,
      default: 0.9,
      range: {
        min: 0.1,
        max: 1.0,
        step: 0.1
      }
    });

    game.settings.register(NAME, "padding", {
      name: "Padding",
      hint: "Extra space left when scaling to accommodate all tokens.",
      scope: "world",
      config: true,
      type: Number,
      default: 0.2,
      range: {
        min: 0.0,
        max: 1.0,
        step: 0.1
      }
    });

    game.settings.register(NAME, "trueInvisibiliy", {
      name: "True invisibiliy",
      hint: "Temporarily make hidden tokens invisible even to the GM if the screenshot is taken from his perspective.",
      scope: "world",
      config: true,
      type: Boolean,
      default: false
    });

    game.settings.register(NAME, "delay", {
      name: "Delay",
      hint: "Delay between invisible tokens disappearing and screenshot (ms). If hidden tokens are still visible in screenshots, increase the delay.",
      scope: "world",
      config: true,
      type: new foundry.data.fields.NumberField(),
      default: 200
    });

    game.settings.register(NAME, "autoScreenshot", {
      name: 'Auto screenshot',
      hint: "Automatically take and send a screenshot when changing turns in an encounter.",
      scope: "world",
      config: true,
      type: new foundry.data.fields.StringField({
        choices: {
          "a": "No.",
          "b": "When a token that has a player as its owner turns.",
          "c": "At the start of the encounter and when that has a player as its owner turns.",
          "d": "Always."
        },
      }),
      default: "b"
    });

    game.settings.register(NAME, "autoChoose", {
      name: "Auto choose",
      hint: "When taking automatic screenshots, automatically select the appropriate token.",
      scope: "world",
      config: true,
      type: Boolean,
      default: true
    });
  }

  static get webhookUrl() {
    return game.settings.get(NAME, "webhookUrl");
  }

  static get cameraUser() {
    return game.settings.get(NAME, "cameraUser");
  }

  static get quality() {
    return game.settings.get(NAME, "quality");
  }

  static get padding() {
    return game.settings.get(NAME, "padding");
  }

  static get trueInvisibility() {
    return game.settings.get(NAME, "trueInvisibiliy");
  }

  static get delay() {
    return game.settings.get(NAME, "delay");
  }

  static get autoScreenshot() {
    return game.settings.get(NAME, "autoScreenshot");
  }

  static get autoChoose() {
    return game.settings.get(NAME, "autoChoose");
  }
}
