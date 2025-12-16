export interface MenuItem {
  name: string;
  price: string;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
  color?: string;
  icon?: string;
}

export interface MenuPage {
  leftPage: {
    title: string;
    icon: string;
    pageNumber: string;
    categories: MenuCategory[];
  };
  rightPage: {
    title: string;
    icon: string;
    pageNumber: string;
    categories: MenuCategory[];
  } | null;
}

export interface GamePricing {
  name: string;
  description: string;
  price: string;
  icon: string;
  hoverColor: string;
}

export interface BookingOption {
  title: string;
  description: string;
  icon: string;
  buttonText: string;
  buttonIcon: string;
  whatsappMessage: string;
  variant: "primary" | "secondary";
}

