import * as Icons from "lucide-react";

export default function DynamicIcon({ name, className }) {
  // Lucide icon names are PascalCase, so convert "a-arrow-down" → "AArrowDown"
  const toPascal = (str) =>
    str
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("");

  const IconComponent = Icons[toPascal(name)];

  if (!IconComponent) return <span>⚠️ Icon not found: {name}</span>;

  return <IconComponent className={className}  />;
}
