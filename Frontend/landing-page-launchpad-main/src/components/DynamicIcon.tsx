import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  if (!name) return null;

  // Normalize string: convert kebab-case to PascalCase
  // e.g., "trending-down" -> "TrendingDown"
  const pascalName = name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  // Try both the normalized name and the raw name
  const Icon = (LucideIcons as any)[pascalName] || (LucideIcons as any)[name];

  if (!Icon) {
    // Return a fallback icon if not found
    const Fallback = (LucideIcons as any).CircleHelp || (LucideIcons as any).HelpCircle || (LucideIcons as any).Globe;
    return <Fallback {...props} />;
  }

  return <Icon {...props} />;
};

export default DynamicIcon;
