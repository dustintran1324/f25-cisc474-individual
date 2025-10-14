import { COLORS, OPACITY } from '../../constants/theme';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.primary }}>
        {title}
      </h1>
      {subtitle && (
        <p className="text-base" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
