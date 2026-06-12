import { ReactNode } from 'react';
import { MapPin, Calendar, Package, ArrowRightLeft, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Medicine } from '../types';
import Badge from './Badge';
import { formatDate } from '../utils/helpers';
import { useAuth } from '../contexts/AuthContext';

interface MedicineCardProps {
  medicine: Medicine;
  onAction?: (medicine: Medicine, action: string) => void;
}

const typeIcons: Record<'exchange' | 'donate' | 'sell', ReactNode> = {
  exchange: <ArrowRightLeft className="w-4 h-4" />,
  donate: <Heart className="w-4 h-4" />,
  sell: <ShoppingCart className="w-4 h-4" />,
};

const typeLabels: Record<'exchange' | 'donate' | 'sell', string> = {
  exchange: 'Exchange',
  donate: 'Request',
  sell: 'Buy Now',
};

const typeBtnColors: Record<'exchange' | 'donate' | 'sell', string> = {
  exchange: 'bg-blue-600 hover:bg-blue-700',
  donate: 'bg-purple-600 hover:bg-purple-700',
  sell: 'bg-orange-500 hover:bg-orange-600',
};

export default function MedicineCard({ medicine, onAction }: MedicineCardProps) {
  const { user } = useAuth();
  const isOwnListing = user !== null && user.name === medicine.listedBy;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
      {/* Top color stripe */}
      <div className={`h-1.5 w-full ${medicine.status === 'safe' ? 'bg-emerald-400' : medicine.status === 'expiring' ? 'bg-yellow-400' : 'bg-red-400'}`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-poppins font-semibold text-gray-900 text-base leading-tight">{medicine.name}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{medicine.manufacturer}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Badge
              label={medicine.status === 'safe' ? '🟢 Safe' : medicine.status === 'expiring' ? '🟡 Expiring' : '🔴 Urgent'}
              variant={medicine.status}
            />
            <Badge label={medicine.type.charAt(0).toUpperCase() + medicine.type.slice(1)} variant={medicine.type} />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Package className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>{medicine.quantity} units · {medicine.condition}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>Expires {formatDate(medicine.expiryDate)} <span className="text-xs text-gray-400">({medicine.daysLeft}d left)</span></span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>{medicine.location}</span>
          </div>
        </div>

        {/* Category + Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">{medicine.category}</span>
          {medicine.type === 'sell' && medicine.price && (
            <span className="font-bold text-emerald-600 text-base">₹{medicine.price}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {isOwnListing ? (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-400 text-sm font-semibold px-3 py-2.5 rounded-xl cursor-not-allowed border border-slate-200"
              aria-label="Your listing"
            >
              Your Listing
            </button>
          ) : (
            <button
              onClick={() => onAction?.(medicine, medicine.type)}
              className={`flex-1 flex items-center justify-center gap-2 text-white text-sm font-semibold px-3 py-2.5 rounded-xl transition-colors ${typeBtnColors[medicine.type]}`}
              aria-label={`${typeLabels[medicine.type]} ${medicine.name}`}
            >
              {typeIcons[medicine.type]}
              {typeLabels[medicine.type]}
            </button>
          )}
          <button
            onClick={() => onAction?.(medicine, 'details')}
            className="flex items-center justify-center gap-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-3 py-2.5 rounded-xl transition-colors"
            aria-label={`View details for ${medicine.name}`}
          >
            <Eye className="w-4 h-4" />
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
