/**
 * Game Images Mapping
 * Maps game names to their image URLs or paths
 * Images should be stored in public/games/ folder
 */

export const gameImages: Record<string, string> = {
  // Video Games - Action/Adventure
  "god-of-war": "/games/god_of_war.webp",
  "ratchet-clank": "/games/ratchetanclank.jfif",
  "gta-v": "/games/gtav.jfif",
  "mario": "/games/mario.jfif",

  // Video Games - Sports
  "fc24": "/games/fc24.jfif",
  "fc25": "/games/fc25.jfif",
  "nba-2k24": "/games/nba24.jfif",
  "ufc5": "/games/ufc5.jfif",

  // Video Games - Fighting
  "tekken-7": "/games/tekken7.jfif",

  // Video Games - Shooter
  "call-of-duty": "/games/COD.jfif",
  "fortnite": "/games/fortnite.jfif",

  // Video Games - Racing
  "rocket-league": "/games/rocketleague.jfif",
  "grid-legends": "/games/gridlegends.jfif",

  // Board Games - Classic
  "monopoly": "/games/monopolyy.jfif",
  "checkers": "/games/checkers.webp",
  "cluedo": "/games/cluedo.webp",
  "puissance-4": "/games/connect4.webp",
  "parchisi": "/games/parchisi.webp",
  "chess": "/games/chess.webp",

  // Board Games - Modern
  "la-bonne-paie": "/games/la_bonne_paye.webp",
  "loups-garous": "/games/loups-garous.jfif",
  "code-names": "/games/codenames.jpg",
  "district-noir": "/games/districtnoir.jfif",
  "top-ten": "/games/topten.webp",
  "ole-guaca-mole": "/games/ole_guaca.jfif",
  "las-vegas": "/games/las_vegas.webp",
  "trio": "/games/Trío.jfif",
  "xoxo": "/games/xo.webp",
  "little-secret": "/games/Little Secret.jfif",
  "nommez-en-5": "/games/nommezen5.jpg",
  "escape-game": "/games/excapegame.jpg",
  "sans-pitie": "/games/sanspitie.webp",
  "54-pes-blocs": "/games/54pes_blocs.webp",
  "jokes-de-papa": "/games/jokesdepapa.jpg",
  "falling-monkeys": "/games/fallingmonkeys.jpg",
  "shit-happens": "/games/shithappens.webp",
  "thats-not-a-hat": "/games/thatsnotahat.webp",
  "plus-ou-moins": "/games/plusoumoins.jpg",

  // Card Games
  "reummy": "/games/rummy.jpg",
  "uno": "/games/uno.jpg",
  "poker": "/games/poker.jfif",

  // Consoles
  "nintendo-switch": "/games/nintendo-switch.webp",
  "ps5": "/games/ps5.webp",
  "xbox": "/games/xbox.webp",
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

