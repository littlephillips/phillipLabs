import {
  Globe2, LayoutDashboard, ShoppingCart, SearchCheck, MessageCircle, RefreshCw,
  PhoneCall, FileCheck2, Code2, Rocket, LifeBuoy, Package, Layers, Award, Gem,
  MapPin, TrendingUp, Sparkles, Workflow,
} from "lucide-react";

// Only icons referenced by data keys in data/constants.js. Add a key here
// when adding a new icon name there; unknown names fall back to Sparkles.
export const ICONS = {
  Globe2, LayoutDashboard, ShoppingCart, SearchCheck, MessageCircle, RefreshCw,
  PhoneCall, FileCheck2, Code2, Rocket, LifeBuoy, Package, Layers, Award, Gem,
  MapPin, TrendingUp, Sparkles, Workflow,
};

export const getIcon = (name) => ICONS[name] ?? Sparkles;
