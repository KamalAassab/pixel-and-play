/**
 * Game Images Mapping
 * Maps game names to their image URLs or paths
 * Images should be stored in public/games/ folder
 */

export const gameImages: Record<string, string> = {
  // Video Games - Action/Adventure
  "god-of-war": "/games/god-of-war.webp",
  "ratchet-clank": "/games/ratchet-clank.webp",
  "gta-v": "/games/gta-v.webp",
  "mario": "/games/mario.webp",

  // Video Games - Sports
  "fc24": "/games/fc24.webp",
  "fc25": "/games/fc25.webp",
  "nba-2k24": "/games/nba-2k24.webp",
  "ufc5": "/games/ufc5.webp",

  // Video Games - Fighting
  "tekken-7": "/games/tekken-7.webp",

  // Video Games - Shooter
  "call-of-duty": "/games/call-of-duty.webp",
  "fortnite": "/games/fortnite.webp",

  // Video Games - Racing
  "rocket-league": "/games/rocket-league.webp",
  "grid-legends": "/games/grid-legends.webp",

  // Board Games - Classic
  "monopoly": "/games/monopoly.webp",
  "checkers": "/games/checkers.webp",
  "cluedo": "/games/cluedo.webp",
  "puissance-4": "/games/puissance-4.webp",
  "parchisi": "/games/parchisi.webp",
  "chess": "/games/chess.webp",

  // Board Games - Modern
  "la-bonne-paie": "/games/la-bonne-paie.webp",
  "loups-garous": "/games/loups-garous.webp",
  "code-names": "/games/code-names.webp",
  "district-noir": "/games/district-noir.webp",
  "top-ten": "/games/top-ten.webp",
  "ole-guaca-mole": "/games/ole-guaca-mole.webp",
  "las-vegas": "/games/las-vegas.webp",
  "trio": "/games/trio.webp",
  "xoxo": "/games/xoxo.webp",
  "little-secret": "/games/little-secret.webp",
  "nommez-en-5": "/games/nommez-en-5.webp",
  "escape-game": "/games/escape-game.webp",
  "sans-pitie": "/games/sans-pitie.webp",
  "54-pes-blocs": "/games/54-pes-blocs.webp",
  "jokes-de-papa": "/games/jokes-de-papa.webp",
  "falling-monkeys": "/games/falling-monkeys.webp",
  "shit-happens": "/games/shit-happens.webp",
  "thats-not-a-hat": "/games/thats-not-a-hat.webp",
  "plus-ou-moins": "/games/plus-ou-moins.webp",

  // Card Games
  "reummy": "/games/reummy.webp",
  "uno": "/games/uno.webp",
  "poker": "/games/poker.webp",

  // Consoles
  "nintendo-switch": "/games/default-game.webp",
  "ps5": "/games/default-game.webp",
  "xbox": "/games/default-game.webp",
};

/**
 * Get image URL for a game
 * Returns the image path or a fallback
 */
export function getGameImage(gameName: string): string {
  return gameImages[gameName] || "/games/default-game.webp";
}

/**
 * Check if game has an image
 */
export function hasGameImage(gameName: string): boolean {
  return gameName in gameImages;
}

