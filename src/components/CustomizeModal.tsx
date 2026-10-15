import React, { useState } from 'react';
import { WeddingData, DEFAULT_WEDDING_DATA } from '../types/wedding';
import { X, Save, RotateCcw, Share2, Check } from 'lucide-react';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: WeddingData;
  onSave: (newData: WeddingData) => void;
  onReset: () => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<WeddingData>(data);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleTextChange = (path: string, value: string) => {
    setFormData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let cur = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        cur = cur[parts[i]];
      }
      cur[parts[parts.length - 1]] = value;
      return copy;
    });
  };

  const handleEventChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const copy = { ...prev };
      const events = [...copy.events];
      events[index] = { ...events[index], [field]: value };
      copy.events = events;
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleShareLink = () => {
    // Generate share link with compressed params
    const params = new URLSearchParams({
      groom: formData.groom.name,
      bride: formData.bride.name,
      day: formData.weddingDate.day,
      month: formData.weddingDate.month,
      year: formData.weddingDate.year,
      venue: formData.venue.address,
      city: formData.venue.cityState,
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#fffdfa] rounded-2xl border-2 border-[#d4af37] shadow-2xl p-5 sm:p-6 my-auto text-[#3c2a21] max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-200">
          <div>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#831843]">
              Customize Wedding Invite
            </h2>
            <p className="text-xs text-amber-800 font-sans-clean mt-0.5">
              Update sample names, dates, events, and venue details.
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg text-amber-800 hover:bg-amber-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-5 font-sans-clean">
          {/* Couple Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/80">
              <h4 className="font-semibold text-xs text-[#831843] uppercase tracking-wider mb-2">
                Groom Details
              </h4>
              <label className="block text-xs font-medium text-amber-900 mb-1">
                Groom Name
              </label>
              <input
                type="text"
                value={formData.groom.name}
                onChange={(e) => handleTextChange('groom.name', e.target.value)}
                className="w-full px-3 py-1.5 text-sm bg-white border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]"
                required
              />
              <label className="block text-xs font-medium text-amber-900 mt-2 mb-1">
                Groom Parents Line
              </label>
              <input
                type="text"
                value={formData.groom.parents}
                onChange={(e) => handleTextChange('groom.parents', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]"
              />
            </div>

            <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/80">
              <h4 className="font-semibold text-xs text-[#831843] uppercase tracking-wider mb-2">
                Bride Details
              </h4>
              <label className="block text-xs font-medium text-amber-900 mb-1">
                Bride Name
              </label>
              <input
                type="text"
                value={formData.bride.name}
                onChange={(e) => handleTextChange('bride.name', e.target.value)}
                className="w-full px-3 py-1.5 text-sm bg-white border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]"
                required
              />
              <label className="block text-xs font-medium text-amber-900 mt-2 mb-1">
                Bride Parents Line
              </label>
              <input
                type="text"
                value={formData.bride.parents}
                onChange={(e) => handleTextChange('bride.parents', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]"
              />
            </div>
          </div>

          {/* Wedding Date & Scratch Card Values */}
          <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/80">
            <h4 className="font-semibold text-xs text-[#831843] uppercase tracking-wider mb-2">
              Wedding Date &amp; Countdown
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-amber-900 mb-1">Day</label>
                <input
                  type="text"
                  value={formData.weddingDate.day}
                  onChange={(e) => handleTextChange('weddingDate.day', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-amber-300 rounded-lg text-center font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-amber-900 mb-1">Month</label>
                <input
                  type="text"
                  value={formData.weddingDate.month}
                  onChange={(e) => handleTextChange('weddingDate.month', e.target.value.toUpperCase())}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-amber-300 rounded-lg text-center font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-amber-900 mb-1">Year</label>
                <input
                  type="text"
                  value={formData.weddingDate.year}
                  onChange={(e) => handleTextChange('weddingDate.year', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-amber-300 rounded-lg text-center font-bold"
                />
              </div>
            </div>
            <div className="mt-2.5">
              <label className="block text-xs font-medium text-amber-900 mb-1">
                Countdown Target ISO Date &amp; Time
              </label>
              <input
                type="datetime-local"
                value={formData.weddingDate.targetIso.slice(0, 16)}
                onChange={(e) => handleTextChange('weddingDate.targetIso', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-lg"
              />
            </div>
          </div>

          {/* Venue */}
          <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/80">
            <h4 className="font-semibold text-xs text-[#831843] uppercase tracking-wider mb-2">
              Venue &amp; Location
            </h4>
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-amber-900 mb-1">
                  Venue Name
                </label>
                <input
                  type="text"
                  value={formData.venue.address}
                  onChange={(e) => handleTextChange('venue.address', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-amber-300 rounded-lg font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-amber-900 mb-1">
                  Full Address &amp; City
                </label>
                <input
                  type="text"
                  value={formData.venue.cityState}
                  onChange={(e) => handleTextChange('venue.cityState', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Timeline Events quick view */}
          <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/80">
            <h4 className="font-semibold text-xs text-[#831843] uppercase tracking-wider mb-2">
              Schedule of Events ({formData.events.length})
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {formData.events.map((evt, idx) => (
                <div key={evt.id} className="grid grid-cols-12 gap-2 items-center bg-white p-2 rounded-lg border border-amber-200">
                  <input
                    type="text"
                    value={evt.date}
                    onChange={(e) => handleEventChange(idx, 'date', e.target.value)}
                    placeholder="Date"
                    className="col-span-3 px-2 py-1 text-xs border border-amber-200 rounded"
                  />
                  <input
                    type="text"
                    value={evt.time}
                    onChange={(e) => handleEventChange(idx, 'time', e.target.value)}
                    placeholder="Time"
                    className="col-span-3 px-2 py-1 text-xs border border-amber-200 rounded"
                  />
                  <input
                    type="text"
                    value={evt.title}
                    onChange={(e) => handleEventChange(idx, 'title', e.target.value)}
                    placeholder="Title"
                    className="col-span-6 px-2 py-1 text-xs font-semibold border border-amber-200 rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Family & Closing */}
          <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/80">
            <label className="block text-xs font-medium text-amber-900 mb-1">
              Family Blessing Names
            </label>
            <input
              type="text"
              value={formData.closing.familyNames}
              onChange={(e) => handleTextChange('closing.familyNames', e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-lg"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-amber-200">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setFormData(DEFAULT_WEDDING_DATA);
                  onReset();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-800 hover:text-amber-950 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Sample
              </button>

              <button
                type="button"
                onClick={handleShareLink}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                {copied ? 'Link Copied!' : 'Copy Share Link'}
              </button>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#9f1239] to-[#831843] rounded-lg shadow-sm hover:from-[#881337] hover:to-[#701a35] transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                Save &amp; Update
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
