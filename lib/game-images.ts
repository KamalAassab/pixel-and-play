/**
 * Game Images Mapping
 * Maps game names to their image URLs or paths
 * Images should be stored in public/games/ folder
 */

export const gameImages: Record<string, string> = {
  // Video Games - Action/Adventure
  "god-of-war": "/games/god_of_war.webp",
  "ratchet-clank": "/games/Ratchet.webp",
  "gta-v": "/games/gta_v.webp",
  "mario": "/games/mario.webp",
  
  // Video Games - Sports
  "fc24": "/games/fc_24.webp",
  "fc25": "/games/fc_25.webp",
  "nba-2k24": "/games/nba24.webp",
  "ufc5": "/games/ufc5.webp",
  
  // Video Games - Fighting
  "tekken-7": "/games/tekken7.webp",
  
  // Video Games - Shooter
  "call-of-duty": "/games/cod.webp",
  "fortnite": "/games/fortnite.webp",
  
  // Video Games - Racing
  "rocket-league": "/games/rocket_league.webp",
  "grid-legends": "/games/grid_legends.webp",
  
  // Board Games - Classic
  "monopoly": "/games/monopoly.webp",
  "checkers": "/games/checkers.webp",
  "cluedo": "/games/cluedo.webp",
  "puissance-4": "/games/connect4.webp",
  "parchisi": "/games/parchisi.webp",
  "chess": "/games/chess.webp",
  
  // Board Games - Modern
  "la-bonne-paie": "/games/la_bonne_paye.webp",
  "loups-garous": "/games/loups_garous.webp",
  "code-names": "/games/code_names.webp",
  "district-noir": "/games/district_noir.webp",
  "top-ten": "/games/top_ten.webp",
  "ole-guaca-mole": "/games/ole_guaca_mole.webp",
  "las-vegas": "/games/las_vegas.webp",
  "trio": "/games/trio.webp",
  "xoxo": "/games/xo.webp",
  "little-secret": "/games/little_secret.webp",
  "nommez-en-5": "/games/nommez_een5.webp",
  "escape-game": "/games/escape_game.webp",
  "sans-pitie": "/games/sans_pitie.webp",
  "54-pes-blocs": "/games/54pes_blocs.webp",
  "jokes-de-papa": "/games/jokes_de_papa.webp",
  "falling-monkeys": "/games/falling_monkeys.webp",
  "shit-happens": "/games/shit_happens.webp",
  "thats-not-a-hat": "/games/thats_not_a_hat.webp",
  "plus-ou-moins": "/games/plus_ou_moins.webp",
  
  // Card Games
  "reummy": "/games/rummy.webp",
  "uno": "/games/uno.webp",
  "poker": "/games/poker.webp",
  
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

