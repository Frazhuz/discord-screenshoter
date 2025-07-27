export const NAME = "discord-screenshoter";

import * as screenshot from "./screenshot.js"
import * as zoom from "./zoom.js"
export let socket;
Hooks.once("socketlib.ready", () => {
  socket = socketlib.registerModule(NAME);
  socket.register("sendScreenshotToDiscord", screenshot.sendToDiscord);
  socket.register("zoomToFitTokens", zoom.fitTokens);
});

export class Settings {
  static register() {

    game.settings.register(NAME, "webhookUrl", {
      name: "Discord Webhook URL",
      hint: "Вставьте URL вебхука Discord для отправки скриншотов",
      scope: "world",
      config: true,
      type: new foundry.data.fields.StringField(),
    });

    game.settings.register(NAME, "cameraUser", {
      name: "Camera User",
      hint: "Вставьте  id пользователя, от лица которого будут выполняться скриншоты (без слова User)",
      scope: "world",
      config: true,
      type: new foundry.data.fields.StringField()
    });

    game.settings.register(NAME, "quality", {
      name: "Quality",
      hint: "Качество отправляемых скриншотов.",
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
      hint: "Дополнительное пространство, оставляемое при масштабировании для вмещения всех токенов.",
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
      hint: "Временно делать невидимые токены невидимыми даже для ГМа, если скриншот делается от его лица.",
      scope: "world",
      config: true,
      type: Boolean,
      default: false
    });

    game.settings.register(NAME, "delay", {
      name: "Delay",
      hint: "Задержка между исчезновением невидимых токенов и скриншотом (мс).",
      scope: "world",
      config: true,
      type: new foundry.data.fields.NumberField(),
      default: 200
    });

    game.settings.register(NAME, "autoScreenshot", {
      name: 'Auto screenshot',
      hint: "Автоматически делать и отправлять скриншот при смене хода в энкаунтере.",
      scope: "world",
      config: true,
      type: new foundry.data.fields.StringField({
        choices: {
          "a": "Нет",
          "b": "При ходе токена, имеющего игрока в качестве владельца",
          "c": "В начале боя и при ходе токена, имеющего игрока в качестве владельца",
          "d": "Всегда"
        },
      }),
      default: "b"
    });

    game.settings.register(NAME, "autoChoose", {
      name: "Auto choose",
      hint: "При автоматических скриншотах автоматически выбирать соответствующий токен.",
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