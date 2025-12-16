/**
 * Comprehensive Games Catalog for PIXEL & PLAY
 * All games are categorized with details for display and filtering
 */

export interface Game {
  name: string;
  displayName: string;
  category: string;
  subcategory: string;
  type: "video" | "board" | "card" | "console";
  platform?: string[];
  genre?: string;
  players?: string;
  description?: string;
  tags: string[];
}

export const gamesCatalog: Game[] = [
  // ========== VIDEO GAMES ==========
  
  // Action/Adventure Games
  {
    name: "god-of-war",
    displayName: "God of War",
    category: "Action/Adventure",
    subcategory: "Action RPG",
    type: "video",
    platform: ["PS5"],
    genre: "Action-Adventure",
    players: "1",
    description: "Epic action-adventure game following Kratos and Atreus on a mythological journey.",
    tags: ["action", "adventure", "rpg", "mythology", "single-player"]
  },
  {
    name: "ratchet-clank",
    displayName: "Ratchet & Clank",
    category: "Action/Adventure",
    subcategory: "Platformer",
    type: "video",
    platform: ["PS5"],
    genre: "Action-Platformer",
    players: "1-2",
    description: "Fast-paced platformer with shooting mechanics and space exploration.",
    tags: ["action", "platformer", "shooter", "sci-fi", "co-op"]
  },
  {
    name: "gta-v",
    displayName: "GTA V",
    category: "Action/Adventure",
    subcategory: "Open World",
    type: "video",
    platform: ["PS5", "XBOX"],
    genre: "Action-Adventure",
    players: "1-30",
    description: "Open-world crime game with single-player story and online multiplayer modes.",
    tags: ["open-world", "action", "crime", "multiplayer", "online"]
  },
  {
    name: "mario",
    displayName: "Mario",
    category: "Action/Adventure",
    subcategory: "Platformer",
    type: "video",
    platform: ["Nintendo Switch"],
    genre: "Platformer",
    players: "1-4",
    description: "Classic platforming adventures featuring Mario and friends.",
    tags: ["platformer", "family", "multiplayer", "nintendo"]
  },

  // Sports Games
  {
    name: "fc24",
    displayName: "FC 24",
    category: "Sports",
    subcategory: "Football/Soccer",
    type: "video",
    platform: ["PS5", "XBOX"],
    genre: "Sports Simulation",
    players: "1-4",
    description: "EA Sports FC 24 - Realistic football simulation with official teams and players.",
    tags: ["sports", "football", "soccer", "simulation", "multiplayer"]
  },
  {
    name: "fc25",
    displayName: "FC 25",
    category: "Sports",
    subcategory: "Football/Soccer",
    type: "video",
    platform: ["PS5", "XBOX"],
    genre: "Sports Simulation",
    players: "1-4",
    description: "EA Sports FC 25 - Latest football simulation with updated rosters and features.",
    tags: ["sports", "football", "soccer", "simulation", "multiplayer"]
  },
  {
    name: "nba-2k24",
    displayName: "NBA 2K24",
    category: "Sports",
    subcategory: "Basketball",
    type: "video",
    platform: ["PS5", "XBOX"],
    genre: "Sports Simulation",
    players: "1-4",
    description: "Professional basketball simulation with realistic gameplay and MyCareer mode.",
    tags: ["sports", "basketball", "simulation", "multiplayer"]
  },
  {
    name: "ufc5",
    displayName: "UFC 5",
    category: "Sports",
    subcategory: "Fighting Sports",
    type: "video",
    platform: ["PS5", "XBOX"],
    genre: "Sports Simulation",
    players: "1-2",
    description: "Ultimate Fighting Championship simulation with realistic MMA combat.",
    tags: ["sports", "fighting", "mma", "simulation", "multiplayer"]
  },

  // Fighting Games
  {
    name: "tekken-7",
    displayName: "Tekken 7",
    category: "Fighting",
    subcategory: "3D Fighter",
    type: "video",
    platform: ["PS5"],
    genre: "Fighting",
    players: "1-2",
    description: "3D fighting game with deep combat system and diverse character roster.",
    tags: ["fighting", "competitive", "multiplayer", "arcade"]
  },

  // Shooter Games
  {
    name: "call-of-duty",
    displayName: "Call of Duty",
    category: "Shooter",
    subcategory: "First-Person Shooter",
    type: "video",
    platform: ["PS5", "XBOX"],
    genre: "FPS",
    players: "1-18",
    description: "First-person shooter with campaign, multiplayer, and battle royale modes.",
    tags: ["shooter", "fps", "multiplayer", "online", "competitive"]
  },
  {
    name: "fortnite",
    displayName: "Fortnite",
    category: "Shooter",
    subcategory: "Battle Royale",
    type: "video",
    platform: ["PS5", "XBOX", "Nintendo Switch"],
    genre: "Battle Royale",
    players: "1-100",
    description: "Free-to-play battle royale game with building mechanics and seasonal content.",
    tags: ["battle-royale", "shooter", "multiplayer", "online", "free-to-play"]
  },

  // Racing Games
  {
    name: "rocket-league",
    displayName: "Rocket League",
    category: "Racing",
    subcategory: "Sports Racing",
    type: "video",
    platform: ["PS5", "XBOX", "Nintendo Switch"],
    genre: "Sports Racing",
    players: "1-8",
    description: "Soccer with rocket-powered cars - fast-paced competitive multiplayer game.",
    tags: ["racing", "sports", "multiplayer", "online", "competitive"]
  },

  // Strategy/Puzzle Games
  {
    name: "grid-legends",
    displayName: "Grid Legends",
    category: "Racing",
    subcategory: "Racing Simulation",
    type: "video",
    platform: ["PS5", "XBOX"],
    genre: "Racing",
    players: "1-22",
    description: "Racing game with story mode and extensive multiplayer options.",
    tags: ["racing", "simulation", "multiplayer", "online"]
  },
  // ========== BOARD GAMES ==========
  
  // Classic Board Games
  {
    name: "monopoly",
    displayName: "Monopoly",
    category: "Board Games",
    subcategory: "Classic Board Games",
    type: "board",
    genre: "Economic Strategy",
    players: "2-8",
    description: "Classic property trading game where players buy, sell, and develop properties.",
    tags: ["classic", "strategy", "family", "economic"]
  },
  {
    name: "checkers",
    displayName: "Checkers",
    category: "Board Games",
    subcategory: "Classic Board Games",
    type: "board",
    genre: "Abstract Strategy",
    players: "2",
    description: "Traditional two-player strategy game on a checkered board.",
    tags: ["classic", "strategy", "two-player", "simple"]
  },
  {
    name: "cluedo",
    displayName: "Cluedo",
    category: "Board Games",
    subcategory: "Classic Board Games",
    type: "board",
    genre: "Mystery/Deduction",
    players: "3-6",
    description: "Mystery deduction game where players solve a murder case.",
    tags: ["mystery", "deduction", "classic", "family"]
  },
  {
    name: "puissance-4",
    displayName: "Puissance 4 (Connect 4)",
    category: "Board Games",
    subcategory: "Classic Board Games",
    type: "board",
    genre: "Vertical Strategy",
    players: "2",
    description: "Vertical strategy game where players connect four pieces in a row.",
    tags: ["strategy", "two-player", "quick", "family"]
  },
  {
    name: "parchisi",
    displayName: "Parchisi",
    category: "Board Games",
    subcategory: "Classic Board Games",
    type: "board",
    genre: "Race Game",
    players: "2-4",
    description: "Classic cross and circle board game, similar to Ludo.",
    tags: ["classic", "race", "family", "dice"]
  },
  {
    name: "chess",
    displayName: "Chess",
    category: "Board Games",
    subcategory: "Classic Board Games",
    type: "board",
    genre: "Abstract Strategy",
    players: "2",
    description: "Classic strategy board game of skill and tactics.",
    tags: ["strategy", "classic", "two-player", "intellectual"]
  },

  // Strategy & Family Board Games
  {
    name: "la-bonne-paie",
    displayName: "La Bonne Paye",
    category: "Board Games",
    subcategory: "Strategy & Family Board Games",
    type: "board",
    genre: "Economic Simulation",
    players: "2-5",
    description: "French economic board game about managing salary and expenses. Uses board & money.",
    tags: ["economic", "simulation", "strategy", "french"]
  },
  {
    name: "las-vegas",
    displayName: "Las Vegas",
    category: "Board Games",
    subcategory: "Strategy & Family Board Games",
    type: "board",
    genre: "Dice Strategy",
    players: "2-5",
    description: "Dice game where players compete to control casinos in Las Vegas. Uses casino mats/dice.",
    tags: ["dice", "strategy", "casino", "competitive"]
  },
  {
    name: "code-names",
    displayName: "Codenames",
    category: "Board Games",
    subcategory: "Strategy & Family Board Games",
    type: "board",
    genre: "Word Association",
    players: "2-8",
    description: "Word association game where teams compete to find their agents. Uses a 5x5 grid layout.",
    tags: ["word", "party", "team", "communication"]
  },
  {
    name: "nommez-en-5",
    displayName: "Nommez-en 5",
    category: "Board Games",
    subcategory: "Strategy & Family Board Games",
    type: "board",
    genre: "Trivia",
    players: "2-8",
    description: "Word game where players name 5 items in a category. Uses a board to advance pawns.",
    tags: ["word", "party", "quick", "family", "trivia"]
  },
  {
    name: "top-ten",
    displayName: "Top Ten",
    category: "Board Games",
    subcategory: "Strategy & Family Board Games",
    type: "board",
    genre: "Cooperative Party",
    players: "3-8",
    description: "Party game where players rank items in top ten lists. Uses a playmat and tokens.",
    tags: ["party", "ranking", "social", "fun", "cooperative"]
  },

  // Puzzle & Dexterity Games
  {
    name: "54-pes-blocs",
    displayName: "54 Pes Blocs",
    category: "Board Games",
    subcategory: "Puzzle & Dexterity Games",
    type: "board",
    genre: "Wood Block Stacking",
    players: "1-4",
    description: "Jenga-style block stacking game with 54 wooden blocks. Test your dexterity and steady hands.",
    tags: ["puzzle", "dexterity", "skill", "challenging", "jenga"]
  },
  {
    name: "falling-monkeys",
    displayName: "Falling Monkeys",
    category: "Board Games",
    subcategory: "Puzzle & Dexterity Games",
    type: "board",
    genre: "3D Structure/Dexterity",
    players: "2-4",
    description: "Dexterity game where players stack and balance monkey pieces in a 3D structure.",
    tags: ["dexterity", "skill", "family", "quick", "3d"]
  },
  {
    name: "escape-game",
    displayName: "Escape Game",
    category: "Board Games",
    subcategory: "Puzzle & Dexterity Games",
    type: "board",
    genre: "Cooperative Puzzle",
    players: "1-6",
    description: "Cooperative puzzle game where players solve mysteries to escape. Boxed adventure experience.",
    tags: ["puzzle", "cooperative", "mystery", "escape-room"]
  },
  {
    name: "xoxo",
    displayName: "XOXO",
    category: "Board Games",
    subcategory: "Puzzle & Dexterity Games",
    type: "board",
    genre: "Party Strategy",
    players: "4-12",
    description: "Social party game about relationships and connections with strategic elements.",
    tags: ["party", "social", "relationships", "fun", "strategy"]
  },

  // ========== CARD GAMES ==========
  
  // Classic Card Games
  {
    name: "reummy",
    displayName: "Rummy",
    category: "Card Games",
    subcategory: "Classic Card Games",
    type: "card",
    genre: "Set Collection",
    players: "2-6",
    description: "Classic card game where players form sets and runs of cards.",
    tags: ["classic", "strategy", "card", "family"]
  },
  {
    name: "uno",
    displayName: "Uno",
    category: "Card Games",
    subcategory: "Classic Card Games",
    type: "card",
    genre: "Matching",
    players: "2-10",
    description: "Popular matching card game with special action cards.",
    tags: ["classic", "matching", "family", "quick"]
  },
  {
    name: "poker",
    displayName: "Poker",
    category: "Card Games",
    subcategory: "Classic Card Games",
    type: "card",
    genre: "Bluffing/Strategy",
    players: "2-10",
    description: "Classic card game of skill, strategy, and bluffing.",
    tags: ["classic", "strategy", "bluffing", "competitive"]
  },

  // Modern & Party Card Games
  {
    name: "loups-garous",
    displayName: "Loups-Garous (Werewolves)",
    category: "Card Games",
    subcategory: "Modern & Party Card Games",
    type: "card",
    genre: "Social Deduction",
    players: "8-18",
    description: "Social deduction game where villagers try to identify werewolves among them.",
    tags: ["social", "deduction", "party", "bluffing"]
  },
  {
    name: "district-noir",
    displayName: "District Noir",
    category: "Card Games",
    subcategory: "Modern & Party Card Games",
    type: "card",
    genre: "2-Player Strategy",
    players: "2-4",
    description: "Strategic card game set in a noir-themed city with area control mechanics.",
    tags: ["strategy", "area-control", "thematic", "competitive"]
  },
  {
    name: "trio",
    displayName: "Trio",
    category: "Card Games",
    subcategory: "Modern & Party Card Games",
    type: "card",
    genre: "Memory/Deduction",
    players: "3-8",
    description: "Card game where players find matching trios using memory and deduction skills.",
    tags: ["card", "party", "matching", "quick", "memory", "deduction"]
  },
  {
    name: "ole-guaca-mole",
    displayName: "Olé GUACA Mole",
    category: "Card Games",
    subcategory: "Modern & Party Card Games",
    type: "card",
    genre: "Word Association",
    players: "3-8",
    description: "Fun party card game with Mexican theme and word association gameplay.",
    tags: ["party", "fun", "quick", "social", "word"]
  },
  {
    name: "little-secret",
    displayName: "Little Secret",
    category: "Card Games",
    subcategory: "Modern & Party Card Games",
    type: "card",
    genre: "Bluffing/Identity",
    players: "3-8",
    description: "Party card game where players share and guess secrets with bluffing and identity elements.",
    tags: ["party", "social", "guessing", "fun", "bluffing"]
  },
  {
    name: "sans-pitie",
    displayName: "Sans Pitié",
    category: "Card Games",
    subcategory: "Modern & Party Card Games",
    type: "card",
    genre: "Adult Party Game",
    players: "3-8",
    description: "Ruthless adult party card game with competitive elimination mechanics.",
    tags: ["party", "competitive", "elimination", "fun", "adult"]
  },
  {
    name: "shit-happens",
    displayName: "Shit Happens",
    category: "Card Games",
    subcategory: "Modern & Party Card Games",
    type: "card",
    genre: "Event Ranking",
    players: "3-8",
    description: "Hilarious party card game about ranking unfortunate events and bad luck.",
    tags: ["party", "humor", "adult", "fun", "ranking"]
  },
  {
    name: "thats-not-a-hat",
    displayName: "That's Not a Hat",
    category: "Card Games",
    subcategory: "Modern & Party Card Games",
    type: "card",
    genre: "Memory/Bluffing",
    players: "3-8",
    description: "Memory card game where players remember and pass objects that aren't what they seem.",
    tags: ["memory", "party", "quick", "fun", "bluffing"]
  },
  {
    name: "jokes-de-papa",
    displayName: "Jokes de Papa",
    category: "Card Games",
    subcategory: "Modern & Party Card Games",
    type: "card",
    genre: "Humor/Challenge",
    players: "3-8",
    description: "Humor-based party card game with dad jokes and fun challenges.",
    tags: ["party", "humor", "fun", "family", "challenge"]
  },
  {
    name: "plus-ou-moins",
    displayName: "Plus ou Moins",
    category: "Card Games",
    subcategory: "Modern & Party Card Games",
    type: "card",
    genre: "Guessing Game",
    players: "3-8",
    description: "Party card game about guessing and comparing quantities.",
    tags: ["party", "guessing", "quick", "social"]
  },

  // ========== CONSOLES ==========
  
  {
    name: "nintendo-switch",
    displayName: "Nintendo Switch",
    category: "Consoles",
    subcategory: "Gaming Console",
    type: "console",
    platform: ["Nintendo Switch"],
    description: "Hybrid gaming console for home and portable play.",
    tags: ["console", "nintendo", "portable", "multiplayer"]
  },
  {
    name: "ps5",
    displayName: "PlayStation 5",
    category: "Consoles",
    subcategory: "Gaming Console",
    type: "console",
    platform: ["PS5"],
    description: "Next-generation gaming console with advanced graphics and performance.",
    tags: ["console", "sony", "next-gen", "exclusive"]
  },
  {
    name: "xbox",
    displayName: "Xbox",
    category: "Consoles",
    subcategory: "Gaming Console",
    type: "console",
    platform: ["XBOX"],
    description: "Microsoft gaming console with Game Pass and online services.",
    tags: ["console", "microsoft", "game-pass", "online"]
  }
];

// Helper functions for filtering and organizing games
export function getGamesByCategory(category: string): Game[] {
  return gamesCatalog.filter(game => game.category === category);
}

export function getGamesByType(type: "video" | "board" | "card" | "console"): Game[] {
  return gamesCatalog.filter(game => game.type === type);
}

export function getGamesByPlatform(platform: string): Game[] {
  return gamesCatalog.filter(game => game.platform?.includes(platform));
}

export function getGamesByTag(tag: string): Game[] {
  return gamesCatalog.filter(game => game.tags.includes(tag));
}

export function getAllCategories(): string[] {
  return Array.from(new Set(gamesCatalog.map(game => game.category)));
}

export function getAllSubcategories(): string[] {
  return Array.from(new Set(gamesCatalog.map(game => game.subcategory)));
}

export function getAllTags(): string[] {
  const allTags = gamesCatalog.flatMap(game => game.tags);
  return Array.from(new Set(allTags));
}

