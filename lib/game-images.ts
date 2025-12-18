/**
 * Game Images Mapping
 * Maps game names to their image URLs or paths
 * Images should be stored in public/games/ folder
 * 
 * Version 2 - Updated to fix Vercel caching issues
 * Increment version number when updating images to force cache refresh
 */

const IMAGE_VERSION = "v=2";

function imagePath(path: string): string {
  return `${path}?${IMAGE_VERSION}`;
}

export const gameImages: Record<string, string> = {
  // Video Games - Action/Adventure
  "god-of-war": imagePath("/games/god-of-war.webp"),
  "ratchet-clank": imagePath("/games/ratchet-clank.webp"),
  "gta-v": imagePath("/games/gta-v.webp"),
  "mario": imagePath("/games/mario.webp"),

  // Video Games - Sports
  "fc24": imagePath("/games/fc24.webp"),
  "fc25": imagePath("/games/fc25.webp"),
  "nba-2k24": imagePath("/games/nba-2k24.webp"),
  "ufc5": imagePath("/games/ufc5.webp"),

  // Video Games - Fighting
  "tekken-7": imagePath("/games/tekken-7.webp"),

  // Video Games - Shooter
  "call-of-duty": imagePath("/games/call-of-duty.webp"),
  "fortnite": imagePath("/games/fortnite.webp"),

  // Video Games - Racing
  "rocket-league": imagePath("/games/rocket-league.webp"),
  "grid-legends": imagePath("/games/grid-legends.webp"),

  // Board Games - Classic
  "monopoly": imagePath("/games/monopoly.webp"),
  "checkers": imagePath("/games/checkers.webp"),
  "cluedo": imagePath("/games/cluedo.webp"),
  "puissance-4": imagePath("/games/puissance-4.webp"),
  "parchisi": imagePath("/games/parchisi.webp"),
  "chess": imagePath("/games/chess.webp"),

  // Board Games - Modern
  "la-bonne-paie": imagePath("/games/la-bonne-paie.webp"),
  "loups-garous": imagePath("/games/loups-garous.webp"),
  "code-names": imagePath("/games/code-names.webp"),
  "district-noir": imagePath("/games/district-noir.webp"),
  "top-ten": imagePath("/games/top-ten.webp"),
  "ole-guaca-mole": imagePath("/games/ole-guaca-mole.webp"),
  "las-vegas": imagePath("/games/las-vegas.webp"),
  "trio": imagePath("/games/trio.webp"),
  "xoxo": imagePath("/games/xoxo.webp"),
  "little-secret": imagePath("/games/little-secret.webp"),
  "nommez-en-5": imagePath("/games/nommez-en-5.webp"),
  "escape-game": imagePath("/games/escape-game.webp"),
  "sans-pitie": imagePath("/games/sans-pitie.webp"),
  "54-pes-blocs": imagePath("/games/54-pes-blocs.webp"),
  "jokes-de-papa": imagePath("/games/jokes-de-papa.webp"),
  "falling-monkeys": imagePath("/games/falling-monkeys.webp"),
  "shit-happens": imagePath("/games/shit-happens.webp"),
  "thats-not-a-hat": imagePath("/games/thats-not-a-hat.webp"),
  "plus-ou-moins": imagePath("/games/plus-ou-moins.webp"),

  // Card Games
  "reummy": imagePath("/games/reummy.webp"),
  "uno": imagePath("/games/uno.webp"),
  "poker": imagePath("/games/poker.webp"),

  // Consoles
  "nintendo-switch": imagePath("/games/default-game.webp"),
  "ps5": imagePath("/games/default-game.webp"),
  "xbox": imagePath("/games/default-game.webp"),
};

/**
 * Get image URL for a game
 * Returns the image path or a fallback
 */
export function getGameImage(gameName: string): string {
  return gameImages[gameName] || imagePath("/games/default-game.webp");
}

/**
 * Check if game has an image
 */
export function hasGameImage(gameName: string): boolean {
  return gameName in gameImages;
}

