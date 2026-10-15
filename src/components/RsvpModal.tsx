import React, { useState } from 'react';
import { X, Heart, Check, Users } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupleNames: string;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose, coupleNames }) => {
  const [guestName, setGuestName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'regret'>('yes');
  const [guestCount, setGuestCount] = useState('2');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (attending === 'yes') {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#881337', '#FBBF24'],
      });
    }

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      existing.push({
        guestName,
        attending,
        guestCount,
        message,
        date: new Date().toISOString(),
      });
      localStorage.setItem('wedding_rsvps', JSON.stringify(existing));
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#fffdf8] rounded-2xl border-2 border-[#d4af37] shadow-2xl p-6 text-[#3c2a21]">
        
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-1 rounded-lg text-amber-800 hover:bg-amber-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-3 font-sans-clean">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-[#831843]">
              {attending === 'yes' ? 'We are Delighted!' : 'Thank You for Letting Us Know'}
            </h3>
            <p className="text-sm text-amber-900/80 leading-relaxed max-w-xs mx-auto">
              {attending === 'yes'
                ? `Thank you ${guestName}! We cannot wait to celebrate with you.`
                : `Thank you ${guestName}. You will be warmly missed!`}
            </p>
            <button
              onClick={onClose}
              type="button"
              className="mt-4 px-6 py-2 text-xs font-semibold text-white bg-[#831843] rounded-lg hover:bg-[#6b1437]"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#a16207]">
                Celebrate With Us
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-[#831843] mt-1">
                RSVP
              </h3>
              <p className="text-xs text-amber-900/70 font-sans-clean mt-1">
                For {coupleNames}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans-clean">
              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  Your Full Name(s) *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Rahul & Priya Sharma"
                  className="w-full px-3 py-2 text-sm bg-white border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  Will You Be Joining? *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1.5 transition-all ${
                      attending === 'yes'
                        ? 'bg-[#831843] text-white border-[#831843] shadow-sm'
                        : 'bg-white text-gray-700 border-amber-200 hover:bg-amber-50'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5" /> Joyfully Accepts
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending('regret')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1.5 transition-all ${
                      attending === 'regret'
                        ? 'bg-[#78350f] text-white border-[#78350f] shadow-sm'
                        : 'bg-white text-gray-700 border-amber-200 hover:bg-amber-50'
                    }`}
                  >
                    Regretfully Declines
                  </button>
                </div>
              </div>

              {attending === 'yes' && (
                <div>
                  <label className="block text-xs font-semibold text-amber-950 mb-1">
                    Number of Guests Attending
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-amber-700 absolute left-3 top-2.5 pointer-events-none" />
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5+">5+ Family Members</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  Blessings &amp; Wishes for the Couple
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave warm wishes for the bride & groom..."
                  className="w-full px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#9f1239] to-[#831843] rounded-lg shadow-md hover:from-[#881337] hover:to-[#6b1437] transition-all"
              >
                Send RSVP
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
