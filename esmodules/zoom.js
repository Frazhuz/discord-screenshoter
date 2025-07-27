<<<<<<< HEAD
import * as module from "./moduleVariables.js"

export async function fitTokens() {
  let tokens = canvas.scene.tokens.contents.filter(token => !token.hidden);
  if (tokens.length === 0) return;

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  let gridSize = canvas.scene.grid.size;

  for (let token of tokens) {
    minX = Math.min(minX, token.x);
    minY = Math.min(minY, token.y);
    maxX = Math.max(maxX, token.x + token.width * gridSize);
    maxY = Math.max(maxY, token.y + token.height * gridSize);
  }

  let width = maxX - minX;
  let height = maxY - minY;
  let centerX = minX + width / 2;
  let centerY = minY + height / 2;

  let padding = canvas.scene.padding;
  let paddingFactor = 1 + padding * 2;
  let customPaddingFactor = 1 + module.Settings.padding * 2;
  let widthScale = canvas.dimensions.width / width;
  let heightScale = canvas.dimensions.height / height;
  let scale = Math.min(widthScale, heightScale) * canvas.dimensions.scale.min * paddingFactor / customPaddingFactor;
  return canvas.animatePan({ x: centerX, y: centerY, scale });
=======
import * as module from "./moduleVariables.js"

export async function fitTokens(choosenToken) {
  if (choosenToken?.isOwner && module.Settings.autoChoose) {
    choosenToken.control();
  }
  let tokens = canvas.scene.tokens.contents.filter(token => !token.hidden);
  if (tokens.length === 0) return;

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  let gridSize = canvas.scene.grid.size;

  for (let token of tokens) {
    minX = Math.min(minX, token.x);
    minY = Math.min(minY, token.y);
    maxX = Math.max(maxX, token.x + token.width * gridSize);
    maxY = Math.max(maxY, token.y + token.height * gridSize);
  }

  let width = maxX - minX;
  let height = maxY - minY;
  let centerX = minX + width / 2;
  let centerY = minY + height / 2;

  let padding = canvas.scene.padding;
  let paddingFactor = 1 + padding * 2;
  let customPaddingFactor = 1 + module.Settings.padding * 2;
  let widthScale = canvas.dimensions.width / width;
  let heightScale = canvas.dimensions.height / height;
  let scale = Math.min(widthScale, heightScale) * canvas.dimensions.scale.min * paddingFactor / customPaddingFactor;
  return canvas.animatePan({ x: centerX, y: centerY, scale });
}

export async function fitTokensByCamera(choosenToken) {
  const cameraUser = module.Settings.cameraUser;
  if (cameraUser) {
    module.socket.executeAsUser(fitTokens, cameraUser, choosenToken);
  } else {
    fitTokens(choosenToken);
  }
>>>>>>> adc4826 (	new file:   esmodules/auto.js)
}