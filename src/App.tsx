import React, { useState, useEffect } from 'react';
import { WeddingData, DEFAULT_WEDDING_DATA } from './types/wedding';
import { EnvelopeView } from './components/EnvelopeView';
import { InvitationCard } from './components/InvitationCard';
import { AudioPlayer } from './components/AudioPlayer';
import { CustomizeModal } from './components/CustomizeModal';
import { RsvpModal } from './components/RsvpModal';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<WeddingData>(DEFAULT_WEDDING_DATA);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

  // Initialize data from URL query params or localStorage
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const groomParam = searchParams.get('groom');
      const brideParam = searchParams.get('bride');
      const dayParam = searchParams.get('day');
      const monthParam = searchParams.get('month');
      const yearParam = searchParams.get('year');
      const venueParam = searchParams.get('venue');

      if (groomParam || brideParam || dayParam) {
        setData((prev) => ({
          ...prev,
          groom: { ...prev.groom, name: groomParam || prev.groom.name },
          bride: { ...prev.bride, name: brideParam || prev.bride.name },
          weddingDate: {
            ...prev.weddingDate,
            day: dayParam || prev.weddingDate.day,
            month: monthParam || prev.weddingDate.month,
            year: yearParam || prev.weddingDate.year,
          },
          venue: {
            ...prev.venue,
            address: venueParam || prev.venue.address,
          },
        }));
        return;
      }

      // Check localStorage
      const saved = localStorage.getItem('wedding_invitation_data');
      if (saved) {
        setData(JSON.parse(saved));
      }
    } catch {
      // Fallback to default sample data
    }
  }, []);

  const handleSaveData = (newData: WeddingData) => {
    setData(newData);
    try {
      localStorage.setItem('wedding_invitation_data', JSON.stringify(newData));
    } catch {
      // ignore
    }
  };

  const handleResetData = () => {
    setData(DEFAULT_WEDDING_DATA);
    try {
      localStorage.removeItem('wedding_invitation_data');
    } catch {
      // ignore
    }
  };

  // Derive initials for wax seal (e.g. R & R for Ritesh & Reet)
  const groomInitial = data.groom.name.trim().charAt(0) || 'R';
  const brideInitial = data.bride.name.trim().charAt(0) || 'R';

  return (
    <main className="min-h-screen bg-[#19060f] relative overflow-x-hidden selection:bg-amber-200 selection:text-amber-900">
      
      {/* Background Floating Gold Dust & Rose Petals ambient effect */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-25 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 40%),
                            radial-gradient(circle at 80% 70%, rgba(225, 29, 72, 0.18) 0%, transparent 45%)`,
        }}
      />

      {/* Floating Audio Controller */}
      <AudioPlayer />

      {/* Envelope Screen with 3D Wax Seal Opening Animation */}
      <EnvelopeView
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        initialsGroom={groomInitial}
        initialsBride={brideInitial}
      />

      {/* Main Unfolded Wedding Stationery View */}
      {isOpen && (
        <div className="relative z-10 transition-opacity duration-700 ease-in opacity-100">
          <InvitationCard
            data={data}
            onOpenRsvp={() => setIsRsvpOpen(true)}
            onOpenCustomize={() => setIsCustomizeOpen(true)}
            onReopenEnvelope={() => setIsOpen(false)}
          />
        </div>
      )}

      {/* Modals */}
      <CustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        data={data}
        onSave={handleSaveData}
        onReset={handleResetData}
      />

      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        coupleNames={`${data.groom.name} & ${data.bride.name}`}
      />
    </main>
  );
}
