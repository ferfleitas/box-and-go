export interface LogoConfiguration {
  url: string | null;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export interface RibbonConfiguration {
  color: string;
  style: string;
}

export interface CardConfiguration {
  message: string;
  fontStyle: string;
}

export interface PackagingPreferences {
  wrapStyle: string;
  giftNote: string;
}

export interface Customization {
  logo: LogoConfiguration;
  ribbon: RibbonConfiguration;
  card: CardConfiguration;
  packaging: PackagingPreferences;
}

export function createDefaultCustomization(): Customization {
  return {
    logo: { url: null, x: 0, y: 0, scale: 1, rotation: 0 },
    ribbon: { color: "#8b4513", style: "classic" },
    card: { message: "", fontStyle: "serif" },
    packaging: { wrapStyle: "standard", giftNote: "" },
  };
}
