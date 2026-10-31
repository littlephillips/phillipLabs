import {
  Globe2,
  LayoutDashboard,
  ShoppingCart,
  SearchCheck,
  MessageCircle,
  RefreshCw,
  PhoneCall,
  FileCheck2,
  Code2,
  Rocket,
  LifeBuoy,
  Package,
  Layers,
  Award,
  Gem,
  MapPin,
  TrendingUp,
  Sparkles,
  Circle,
} from "lucide-react";

// Only the icons actually referenced by data (SERVICES/PROCESS/PACKAGES/WHY icon keys).
// Add new entries here when adding a new icon key to constants.js.
export const ICONS = {
  Globe2,
  LayoutDashboard,
  ShoppingCart,
  SearchCheck,
  MessageCircle,
  RefreshCw,
  PhoneCall,
  FileCheck2,
  Code2,
  Rocket,
  LifeBuoy,
  Package,
  Layers,
  Award,
  Gem,
  MapPin,
  TrendingUp,
  Sparkles,
  Circle,
};

export function getIcon(name) {
  return ICONS[name] ?? Sparkles;
}
