export function getDaysLeft(expiryDate: string): number {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diff = expiry.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getExpiryStatus(daysLeft: number): 'safe' | 'expiring' | 'urgent' {
  if (daysLeft > 90) return 'safe';
  if (daysLeft >= 30) return 'expiring';
  return 'urgent';
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function generateTransactionId(): string {
  return 'TXN' + Date.now().toString().slice(-8).toUpperCase();
}

export function getStatusColor(status: 'safe' | 'expiring' | 'urgent'): string {
  switch (status) {
    case 'safe': return 'text-emerald-600 bg-emerald-50';
    case 'expiring': return 'text-yellow-600 bg-yellow-50';
    case 'urgent': return 'text-red-600 bg-red-50';
  }
}

export function getStatusDot(status: 'safe' | 'expiring' | 'urgent'): string {
  switch (status) {
    case 'safe': return 'bg-emerald-500';
    case 'expiring': return 'bg-yellow-500';
    case 'urgent': return 'bg-red-500';
  }
}

export function getStatusLabel(status: 'safe' | 'expiring' | 'urgent'): string {
  switch (status) {
    case 'safe': return '🟢 Safe';
    case 'expiring': return '🟡 Expiring Soon';
    case 'urgent': return '🔴 Urgent';
  }
}
