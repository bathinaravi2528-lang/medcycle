

interface BadgeProps {
  label: string;
  variant?: 'safe' | 'expiring' | 'urgent' | 'exchange' | 'donate' | 'sell' | 'default';
  size?: 'sm' | 'md';
}

const variantStyles: Record<string, string> = {
  safe: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  expiring: 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200',
  urgent: 'bg-red-50 text-red-700 ring-1 ring-red-200',
  exchange: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  donate: 'bg-purple-50 text-purple-700 ring-1 ring-purple-200',
  sell: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200',
  default: 'bg-gray-100 text-gray-700 ring-1 ring-gray-200',
};

export default function Badge({ label, variant = 'default', size = 'sm' }: BadgeProps) {
  const sizeStyles = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${sizeStyles} ${variantStyles[variant]}`}>
      {label}
    </span>
  );
}
