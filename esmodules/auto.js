import * as module from "./moduleVariables.js"
import * as screenshot from "./screenshot.js"
import * as zoom from "./zoom.js"

async function autoScreenshot(hookType, combat, updateData) {
  const autoScreenshotType = module.Settings.autoScreenshot;
  const combatant = combat.turns[updateData.turn];
  const isPlayer = combatant.hasPlayerOwner;
  const bConditions = autoScreenshotType == "b" && isPlayer;
  const cConditions = autoScreenshotType == "c" && (isPlayer || hookType == "combatStart");
  const dConditions = autoScreenshotType == "d";
  if (bConditions || cConditions || dConditions) {
    let choosenToken = canvas.tokens.get(combatant.tokenId);
    await zoom.fitTokensByCamera(choosenToken);
    await screenshot.sendToDiscordFromCamera(`Раунд ${updateData.round}. Ход ${combatant.name}`);
  }
}

Hooks.on("combatTurn", (combat, updateData, updateOptions) => {
  autoScreenshot("combatTurn", combat, updateData)
});

Hooks.on("combatRound", (combat, updateData, updateOptions) => {
  autoScreenshot("combatRound", combat, updateData)
});

Hooks.on("combatStart", (combat, updateData) => {
  autoScreenshot("combatStart", combat, updateData)
});  