import { MenuPage, GamePricing, BookingOption } from "@/types";

export const menuPages: MenuPage[] = [
  {
    leftPage: {
      title: "Hot Drinks & Chocolate",
      icon: "coffee",
      pageNumber: "PAGE 01",
      categories: [
        {
          title: "Hot Drinks",
          icon: "Coffee",
          items: [
            { name: "Espresso", price: "16 DH" },
            { name: "Longo Coffee", price: "18 DH" },
            { name: "Espresso Macchiato", price: "20 DH" },
            { name: "Espresso & Flavour (Caramel/Noisette/Vanilla)", price: "20 DH" },
            { name: "Double Espresso", price: "20 DH" },
            { name: "Espresso Chocolate", price: "22 DH" },
            { name: "Café Latte", price: "22 DH" },
            { name: "Cappuccino", price: "23 DH" },
            { name: "Caramel Macchiato", price: "28 DH" },
            { name: "Moccaccino (Dark & White)", price: "30 DH" },
            { name: "Hot Chocolate", price: "22 DH" },
            { name: "Vanilla Chocolate", price: "26 DH" },
            { name: "Dark Chocolate", price: "26 DH" },
          ],
          color: "brand-blue",
        },
      ],
    },
    rightPage: {
      title: "Hot Tea",
      icon: "tea",
      pageNumber: "PAGE 02",
      categories: [
        {
          title: "Hot Tea",
          icon: "CupSoda",
          items: [
            { name: "Moroccan Tea", price: "18 DH" },
            { name: "Black Tea", price: "20 DH" },
            { name: "Verveine", price: "20 DH" },
            { name: "Verveine with Milk", price: "22 DH" },
            { name: "English Breakfast", price: "22 DH" },
            { name: "Earl Grey", price: "22 DH" },
            { name: "Green Jasmine", price: "22 DH" },
            { name: "Blossom of Camomile", price: "22 DH" },
            { name: "Lemon & Lime", price: "22 DH" },
            { name: "Red Fruits", price: "22 DH" },
          ],
          color: "brand-red",
        },
      ],
    },
  },
  {
    leftPage: {
      title: "Juices",
      icon: "citrus",
      pageNumber: "PAGE 03",
      categories: [
        {
          title: "Juices",
          icon: "Citrus",
          items: [
            { name: "Lemon", price: "20 DH" },
            { name: "Lemon with Ginger", price: "22 DH" },
            { name: "Orange", price: "22 DH" },
            { name: "Banana", price: "22 DH" },
            { name: "Mango", price: "26 DH" },
            { name: "Ananas", price: "26 DH" },
            { name: "Strawberry", price: "26 DH" },
            { name: "Avocado", price: "28 DH" },
            { name: "Avocado & Dried Fruit", price: "32 DH" },
          ],
          color: "brand-blue",
        },
        {
          title: "Smoothies",
          icon: "Droplet",
          items: [
            { name: "Red Fruit Smoothy", price: "32 DH" },
            { name: "Tropical Smoothy", price: "34 DH" },
            { name: "Pixel & Play Smoothy", price: "38 DH" },
            { name: "Mountassir Smoothy", price: "38 DH" },
          ],
          color: "brand-blue",
        },
      ],
    },
    rightPage: {
      title: "Mojitos",
      icon: "glass-water",
      pageNumber: "PAGE 04",
      categories: [
        {
          title: "Mojitos",
          icon: "GlassWater",
          items: [
            { name: "Virgin Mojito", price: "28 DH" },
            { name: "Mojito Strawberry", price: "30 DH" },
            { name: "Mojito Tropical", price: "30 DH" },
            { name: "Mojito Blue Curaçao", price: "30 DH" },
            { name: "Mojito Red Bull", price: "38 DH" },
          ],
          color: "brand-red",
        },
        {
          title: "Cocktails",
          icon: "Wine",
          items: [
            { name: "Piña Colada", price: "32 DH" },
            { name: "Bubble Gum", price: "32 DH" },
            { name: "Peach & Berry", price: "34 DH" },
            { name: "Pixel & Play Cocktail", price: "38 DH" },
          ],
          color: "brand-red",
        },
      ],
    },
  },
  {
    leftPage: {
      title: "Iced Drinks",
      icon: "ice-cream",
      pageNumber: "PAGE 05",
      categories: [
        {
          title: "Iced Drinks",
          icon: "Coffee",
          items: [
            { name: "Iced Café Latte", price: "28 DH" },
            { name: "Iced Chocolate", price: "30 DH" },
            { name: "Iced Caramel", price: "30 DH" },
            { name: "Iced Moccaccino Dark", price: "30 DH" },
            { name: "Iced Banana Chocolate", price: "32 DH" },
          ],
          color: "brand-blue",
        },
        {
          title: "Iced Tea",
          icon: "GlassWater",
          items: [
            { name: "Ice Tea Lemon", price: "26 DH" },
            { name: "Ice Tea Strawberry", price: "26 DH" },
            { name: "Ice Tea Peach", price: "26 DH" },
            { name: "Red Fruit", price: "26 DH" },
          ],
          color: "brand-blue",
        },
      ],
    },
    rightPage: {
      title: "Shakes",
      icon: "ice-cream-2",
      pageNumber: "PAGE 06",
      categories: [
        {
          title: "Shakes",
          icon: "IceCream2",
          items: [
            { name: "Classic Shake (Vanilla/Strawberry/Choc/Caramel)", price: "30 DH" },
            { name: "Cookie Shake", price: "32 DH" },
            { name: "Oreo Shake", price: "34 DH" },
            { name: "Brownie Shake", price: "36 DH" },
          ],
          color: "brand-red",
        },
        {
          title: "Classic Drinks",
          icon: "Beer",
          items: [
            { name: "Oulmes", price: "20 DH" },
            { name: "Soda", price: "20 DH" },
            { name: "Lipton Ice Tea", price: "20 DH" },
            { name: "Red Bull", price: "30 DH" },
          ],
          color: "brand-red",
        },
      ],
    },
  },
  {
    leftPage: {
      title: "Crepes & Combos",
      icon: "utensils",
      pageNumber: "PAGE 07",
      categories: [
        {
          title: "Crepes",
          icon: "Utensils",
          items: [
            { name: "Nutella", price: "22 DH" },
            { name: "Nutella Banana", price: "26 DH" },
            { name: "Honey & Nuts", price: "26 DH" },
            { name: "Add 3DH for a crepe nutella banana", price: "" },
            { name: "Smoked Turkey Crepe", price: "30 DH" },
            { name: "Chicken Crepe", price: "36 DH" },
            { name: "All In Crepe", price: "40 DH" },
          ],
          color: "brand-blue",
        },
        {
          title: "Sweet Combos",
          icon: "Gift",
          items: [
            { name: "Nutella Crepe +", price: "" },
            { name: "Café Latte / Cappuccino", price: "38 DH" },
            { name: "Caramel / Moccaccino", price: "44 DH" },
            { name: "Iced Drink", price: "46 DH" },
            { name: "Shake / Cocktail", price: "48 DH" },
          ],
          color: "brand-blue",
        },
      ],
    },
    rightPage: null,
  },
];

export const gamePricing: GamePricing[] = [
  {
    name: "Board Games",
    description: "Access to our entire library of board games.",
    price: "10",
    icon: "dice-5",
    hoverColor: "brand-blue",
  },
  {
    name: "Nintendo Switch",
    description: "Multiplayer fun with Mario Kart, Smash Bros & more.",
    price: "30",
    icon: "gamepad",
    hoverColor: "brand-red",
  },
  {
    name: "PlayStation 5",
    description: "Next-gen gaming. FIFA, Tekken, Mortal Kombat.",
    price: "30",
    icon: "gamepad-2",
    hoverColor: "brand-blue",
  },
];

export const bookingOptions: BookingOption[] = [
  {
    title: "Reserve a Table",
    description: "Book your spot for gaming or coffee via WhatsApp.",
    icon: "users",
    buttonText: "Book Now (0612919613)",
    buttonIcon: "message-circle",
    whatsappMessage: "Hello PIXEL & PLAY! I'd like to reserve a table.",
    variant: "primary",
  },
  {
    title: "Events & Birthdays",
    description: "Planning a special event? Contact us directly.",
    icon: "cake",
    buttonText: "Contact Us",
    buttonIcon: "calendar",
    whatsappMessage: "Hello PIXEL & PLAY! I'm interested in booking an event/birthday.",
    variant: "secondary",
  },
];
