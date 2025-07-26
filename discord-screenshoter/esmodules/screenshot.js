import * as module from "./moduleVariables.js"
import { useWebhook, sleep, Mutex } from "./utils.js"

async function _getScene() {
  console.log("Начинаем делать скриншот.");
  const quality = module.Settings.quality;
  const delay = module.Settings.delay;
  let tokens;
  let tokensBarsVisibility;
  if (game.user.isGM && module.Settings.trueInvisibility) {
    tokens = canvas.tokens.placeables.filter(token => token.document.hidden && token.isVisible);
    if (tokens.length != 0) {
      tokensBarsVisibility = tokens.map(token => token.bars.visible);
      tokens.forEach(token => token.bars.visible = false);
      let changeAlphaPromises = tokens.map(token => token.animate({alpha: 0}, {duration: 0}));
      await Promise.all(changeAlphaPromises);
      await sleep(delay);
    }
  }
  let texture = canvas.snapshot.getFramebufferTexture(canvas.app.renderer);
  let tempCanvas = await canvas.app.renderer.extract.canvas(texture);
  if (tokensBarsVisibility) {
    tokens.forEach((token, index) => {
      token.animate({alpha: 0.5}, {duration: 0});
      token.bars.visible = tokensBarsVisibility[index];
    })
  }
  let blob = await new Promise(resolve => {
    tempCanvas.toBlob(resolve, 'image/webp', quality);
  });
  console.log("Скриншот сделан.");
  return blob;
}

const mutex = new Mutex();
async function getScene() {
  let blob;
  await mutex.lock();
  try {
    blob = await _getScene()
  } finally {
    mutex.unlock();
  }
  return blob;
}


export async function sendToDiscord(message = "") {
  try {
    let screenshotBlob = await getScene();
    await useWebhook(screenshotBlob, message);
  } catch (err) {
    console.error("Ошибка:", err);
  }
}

export async function sendToDiscordFromCamera(message = "") {
  const cameraUser = module.Settings.cameraUser;
  if (cameraUser) {
    module.socket.executeAsUser(sendToDiscord, cameraUser, message);
  } else {
    sendToDiscord(message);
  }
}