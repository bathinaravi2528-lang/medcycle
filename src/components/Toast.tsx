import { ReactNode } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function Toast() {
  const { toast, showToast } = useApp();

  if (!toast) return null;

  const icons: Record<'success' | 'error' | 'info', ReactNode> = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const borders: Record<'success' | 'error' | 'info', string> = {
    success: 'border-l-4 border-emerald-500',
    error: 'border-l-4 border-red-500',
    info: 'border-l-4 border-blue-500',
  };

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center gap-3 bg-white shadow-xl rounded-xl px-5 py-4 min-w-[280px] max-w-sm animate-slide-in ${borders[toast.type]}`}
      role="alert"
    >
      {icons[toast.type]}
      <span className="text-sm font-medium text-gray-800 flex-1">{toast.message}</span>
      <button
        onClick={() => showToast('', 'info')}
        className="text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
