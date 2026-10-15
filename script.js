/**
 * ============================================================================
 * ROYAL WEDDING INVITATION - PURE JAVASCRIPT ENGINE (NO FRAMEWORK REQUIRED)
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. DATA MODEL & STATE
// ----------------------------------------------------------------------------
const DEFAULT_DATA = {
  groom: {
    name: 'RITESH',
    parents: 'S/O MR. RAJESH & MRS. SUNITA MALHOTRA',
  },
  bride: {
    name: 'REET',
    parents: 'D/O MR. RAJENDRA & MRS. KAVITA VERMA',
  },
  weddingDate: {
    day: '24',
    month: 'DEC',
    year: '2026',
    targetIso: '2026-12-24T18:00:00',
  },
  venue: {
    address: 'RADISSON BLU HOTEL',
    cityState: 'PLOT NO. 5 & 6, AIRPORT PLAZA, TONK RD, DURGAPURA, JAIPUR, RAJASTHAN 302018',
    mapsUrl: 'https://maps.google.com/?q=Radisson+Blu+Hotel+Airport+Plaza+Tonk+Rd+Jaipur',
  },
  familyNames: 'The Malhotra & Verma Families',
};

let currentData = { ...DEFAULT_DATA };

// ----------------------------------------------------------------------------
// 2. WEB AUDIO API SYNTHESIZER (Indian Sitar & Bansuri Wedding Melody)
// ----------------------------------------------------------------------------
class WeddingAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.droneOscs = [];
    this.masterGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playWaxCrack() {
    try {
      this.init();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.6);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.65);
    } catch (e) {
      // Audio not permitted yet
    }
  }

  playChime() {
    try {
      this.init();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const freqs = [587, 659, 740, 880, 987, 1174];
      const freq = freqs[Math.floor(Math.random() * freqs.length)];
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {}
  }

  startMusic() {
    if (this.isPlaying) return;
    this.init();
    if (!this.ctx) return;
    this.isPlaying = true;

    // Tanpura Drone (D3, A3, D4)
    const baseFreqs = [146.83, 220.0, 293.66];
    this.droneOscs = baseFreqs.map((f) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      return osc;
    });

    // Raag Yaman Wedding Scale
    const scale = [293.66, 329.63, 369.99, 415.3, 440.0, 493.88, 554.37, 587.33, 659.25];
    const phrase = [0, 1, 2, 4, 3, 2, 1, 0, 4, 5, 6, 7, 6, 4, 2, 0, 1, 2, 4, 6, 7, 8, 7, 6, 4, 2, 1, 0];
    let idx = 0;

    this.intervalId = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      const freq = scale[phrase[idx % phrase.length]];
      idx++;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.004, now + 0.4);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.85);
    }, 700);

    updateAudioUI(true);
  }

  stopMusic() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.droneOscs.forEach((o) => {
      try { o.stop(); o.disconnect(); } catch (e) {}
    });
    this.droneOscs = [];
    updateAudioUI(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
  }
}

const audioEngine = new WeddingAudioEngine();

function updateAudioUI(isPlaying) {
  const btn = document.getElementById('audio-toggle-btn');
  if (!btn) return;
  const eq = btn.querySelector('.music-equalizer');
  const label = btn.querySelector('.audio-label');
  if (isPlaying) {
    if (eq) eq.style.display = 'flex';
    if (label) label.textContent = 'Music On';
  } else {
    if (eq) eq.style.display = 'none';
    if (label) label.textContent = 'Music Off';
  }
}

// ----------------------------------------------------------------------------
// 3. CANVAS SPARKLE PARTICLES FOR WAX SEAL & SCRATCH REVEAL
// ----------------------------------------------------------------------------
function triggerParticles(x, y, count = 35) {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  const particles = [];
  const colors = ['#FFE082', '#FFD54F', '#FFA000', '#FF8F00', '#D81B60', '#FFF'];

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 6;
    particles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      radius: 2 + Math.random() * 3,
      alpha: 1,
      gravity: 0.12,
    });
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= 0.02;
      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    });

    if (alive) {
      requestAnimationFrame(frame);
    } else {
      canvas.remove();
    }
  }
  requestAnimationFrame(frame);
}

// ----------------------------------------------------------------------------
// 4. INTERACTIVE SCRATCH CARDS
// ----------------------------------------------------------------------------
function initScratchCard(canvasId, value, subText) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  let isScratching = false;
  let isRevealed = false;

  // Draw gold foil texture
  function drawFoil() {
    ctx.globalCompositeOperation = 'source-over';
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#e5be6b');
    grad.addColorStop(0.3, '#c9933b');
    grad.addColorStop(0.5, '#fceda2');
    grad.addColorStop(0.7, '#b8862d');
    grad.addColorStop(1, '#dfa938');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Stippling
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (let i = 0; i < 200; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Border
    ctx.strokeStyle = 'rgba(120, 60, 10, 0.35)';
    ctx.lineWidth = 2;
    ctx.strokeRect(4, 4, w - 8, h - 8);

    // Text: "scratch"
    ctx.fillStyle = '#613e0e';
    ctx.font = 'italic 500 14px "Playfair Display", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('scratch', w / 2, h / 2 - 2);

    ctx.font = '10px sans-serif';
    ctx.fillText('♥', w / 2, h / 2 + 14);
  }

  drawFoil();

  function scratch(clientX, clientY) {
    if (isRevealed) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();

    audioEngine.playChime();
    checkPercent();
  }

  function checkPercent() {
    try {
      const data = ctx.getImageData(0, 0, w, h).data;
      let transparent = 0;
      for (let i = 3; i < data.length; i += 16) {
        if (data[i] === 0) transparent++;
      }
      const ratio = transparent / (data.length / 16);
      if (ratio > 0.4) {
        revealFull();
      }
    } catch (e) {}
  }

  function revealFull() {
    if (isRevealed) return;
    isRevealed = true;
    ctx.clearRect(0, 0, w, h);
    audioEngine.playChime();

    const rect = canvas.getBoundingClientRect();
    triggerParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);

    const statusEl = canvas.closest('.scratch-card-item')?.querySelector('.scratch-status-label');
    if (statusEl) statusEl.textContent = 'Revealed';
  }

  // Pointer events
  canvas.addEventListener('pointerdown', (e) => {
    isScratching = true;
    scratch(e.clientX, e.clientY);
  });
  window.addEventListener('pointermove', (e) => {
    if (isScratching) scratch(e.clientX, e.clientY);
  });
  window.addEventListener('pointerup', () => { isScratching = false; });
  window.addEventListener('pointercancel', () => { isScratching = false; });

  // Expose reveal function for "Reveal All" button
  canvas.revealFull = revealFull;
}

// ----------------------------------------------------------------------------
// 5. LIVE COUNTDOWN TIMER
// ----------------------------------------------------------------------------
function startCountdown() {
  function tick() {
    const target = new Date(currentData.weddingDate.targetIso).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    let d = 0, h = 0, m = 0, s = 0;
    if (diff > 0) {
      d = Math.floor(diff / (1000 * 60 * 60 * 24));
      h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      m = Math.floor((diff / (1000 * 60)) % 60);
      s = Math.floor((diff / 1000) % 60);
    }

    const pad = (n) => String(n).padStart(2, '0');
    const elD = document.getElementById('timer-days');
    const elH = document.getElementById('timer-hours');
    const elM = document.getElementById('timer-minutes');
    const elS = document.getElementById('timer-seconds');

    if (elD) elD.textContent = pad(d);
    if (elH) elH.textContent = pad(h);
    if (elM) elM.textContent = pad(m);
    if (elS) elS.textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
}

// ----------------------------------------------------------------------------
// 6. DOM DATA HYDRATION
// ----------------------------------------------------------------------------
function updateDOM() {
  // Couple names & Parents
  document.querySelectorAll('.groom-name-text').forEach((el) => {
    el.textContent = currentData.groom.name;
  });
  document.querySelectorAll('.bride-name-text').forEach((el) => {
    el.textContent = currentData.bride.name;
  });
  document.querySelectorAll('.groom-parents-text').forEach((el) => {
    el.textContent = currentData.groom.parents;
  });
  document.querySelectorAll('.bride-parents-text').forEach((el) => {
    el.textContent = currentData.bride.parents;
  });

  // Seal monogram
  const gInit = currentData.groom.name.trim().charAt(0) || 'R';
  const bInit = currentData.bride.name.trim().charAt(0) || 'R';
  const monogramEl = document.getElementById('wax-seal-initials');
  if (monogramEl) {
    monogramEl.innerHTML = `${gInit}<span>&amp;</span>${bInit}`;
  }

  // Date in Scratch Cards
  const valDay = document.getElementById('scratch-val-day');
  const valMonth = document.getElementById('scratch-val-month');
  const valYear = document.getElementById('scratch-val-year');
  if (valDay) valDay.textContent = currentData.weddingDate.day;
  if (valMonth) valMonth.textContent = currentData.weddingDate.month;
  if (valYear) valYear.textContent = currentData.weddingDate.year;

  // Venue & Address
  const vAddress = document.getElementById('venue-address-el');
  const vCity = document.getElementById('venue-city-el');
  const vMaps = document.getElementById('venue-maps-link');
  if (vAddress) vAddress.textContent = currentData.venue.address;
  if (vCity) vCity.textContent = currentData.venue.cityState;
  if (vMaps) vMaps.href = currentData.venue.mapsUrl;

  // Family Title
  const familyEl = document.getElementById('family-title-el');
  if (familyEl) familyEl.textContent = currentData.familyNames;
}

// ----------------------------------------------------------------------------
// 7. INITIALIZATION ON PAGE LOAD
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Load query params or localStorage
  const params = new URLSearchParams(window.location.search);
  if (params.get('groom')) currentData.groom.name = params.get('groom');
  if (params.get('bride')) currentData.bride.name = params.get('bride');
  if (params.get('day')) currentData.weddingDate.day = params.get('day');
  if (params.get('month')) currentData.weddingDate.month = params.get('month');
  if (params.get('year')) currentData.weddingDate.year = params.get('year');
  if (params.get('venue')) currentData.venue.address = params.get('venue');

  const stored = localStorage.getItem('royal_wedding_data');
  if (stored && !params.get('groom')) {
    try {
      currentData = JSON.parse(stored);
    } catch (e) {}
  }

  updateDOM();

  // Initialize Scratch Cards
  initScratchCard('scratch-canvas-day', currentData.weddingDate.day, 'DAY');
  initScratchCard('scratch-canvas-month', currentData.weddingDate.month, 'MONTH');
  initScratchCard('scratch-canvas-year', currentData.weddingDate.year, 'YEAR');

  startCountdown();

  // Wax Seal Click to Open Envelope
  const sealBtn = document.getElementById('wax-seal-btn');
  const envWrapper = document.getElementById('envelope-wrapper');
  const envScreen = document.getElementById('envelope-screen');
  const inviteCard = document.getElementById('invitation-card');

  if (sealBtn) {
    sealBtn.addEventListener('click', (e) => {
      audioEngine.playWaxCrack();
      audioEngine.startMusic();

      const rect = sealBtn.getBoundingClientRect();
      triggerParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 60);

      envWrapper.classList.add('opening');

      setTimeout(() => {
        envScreen.classList.add('opened');
        inviteCard.classList.add('visible');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 900);
    });
  }

  // Audio Toggle
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      audioEngine.toggle();
    });
  }

  // Re-view envelope button
  const reopenBtn = document.getElementById('btn-reopen-envelope');
  if (reopenBtn) {
    reopenBtn.addEventListener('click', () => {
      envScreen.classList.remove('opened');
      envWrapper.classList.remove('opening');
      inviteCard.classList.remove('visible');
    });
  }

  // Scratch All Button
  const scratchAllBtn = document.getElementById('btn-scratch-all');
  if (scratchAllBtn) {
    scratchAllBtn.addEventListener('click', () => {
      ['scratch-canvas-day', 'scratch-canvas-month', 'scratch-canvas-year'].forEach((id) => {
        const c = document.getElementById(id);
        if (c && c.revealFull) c.revealFull();
      });
    });
  }

  // Calendar .ics download
  const calBtn = document.getElementById('btn-add-calendar');
  if (calBtn) {
    calBtn.addEventListener('click', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Royal Wedding//Invitation//EN
BEGIN:VEVENT
SUMMARY:Wedding: ${currentData.groom.name} & ${currentData.bride.name}
DESCRIPTION:Wedding Celebration of ${currentData.groom.name} & ${currentData.bride.name}
LOCATION:${currentData.venue.address}, ${currentData.venue.cityState}
DTSTART:20261224T123000Z
DTEND:20261224T183000Z
END:VEVENT
END:VCALENDAR`;
      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${currentData.groom.name}_${currentData.bride.name}_Wedding.ics`;
      a.click();
    });
  }

  // Share Link
  const shareBtn = document.getElementById('btn-share-invite');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: `${currentData.groom.name} & ${currentData.bride.name} Wedding Invitation`,
          text: `You are cordially invited to celebrate the marriage of ${currentData.groom.name} & ${currentData.bride.name}!`,
          url: window.location.href,
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
          alert('Invitation Link Copied to Clipboard!');
        });
      }
    });
  }

  // Modals (Customize & RSVP)
  setupModals();
});

// ----------------------------------------------------------------------------
// 8. MODAL HANDLERS
// ----------------------------------------------------------------------------
function setupModals() {
  const customizeModal = document.getElementById('modal-customize');
  const rsvpModal = document.getElementById('modal-rsvp');

  const openCustomizeBtn = document.getElementById('btn-open-customize');
  const closeCustomizeBtn = document.getElementById('btn-close-customize');
  const formCustomize = document.getElementById('form-customize');

  const openRsvpBtn = document.getElementById('btn-open-rsvp');
  const closeRsvpBtn = document.getElementById('btn-close-rsvp');
  const formRsvp = document.getElementById('form-rsvp');

  if (openCustomizeBtn && customizeModal) {
    openCustomizeBtn.addEventListener('click', () => {
      // Pre-fill form
      document.getElementById('edit-groom-name').value = currentData.groom.name;
      document.getElementById('edit-groom-parents').value = currentData.groom.parents;
      document.getElementById('edit-bride-name').value = currentData.bride.name;
      document.getElementById('edit-bride-parents').value = currentData.bride.parents;
      document.getElementById('edit-day').value = currentData.weddingDate.day;
      document.getElementById('edit-month').value = currentData.weddingDate.month;
      document.getElementById('edit-year').value = currentData.weddingDate.year;
      document.getElementById('edit-venue').value = currentData.venue.address;
      document.getElementById('edit-address').value = currentData.venue.cityState;
      customizeModal.classList.add('active');
    });
  }

  if (closeCustomizeBtn && customizeModal) {
    closeCustomizeBtn.addEventListener('click', () => {
      customizeModal.classList.remove('active');
    });
  }

  if (formCustomize) {
    formCustomize.addEventListener('submit', (e) => {
      e.preventDefault();
      currentData.groom.name = document.getElementById('edit-groom-name').value;
      currentData.groom.parents = document.getElementById('edit-groom-parents').value;
      currentData.bride.name = document.getElementById('edit-bride-name').value;
      currentData.bride.parents = document.getElementById('edit-bride-parents').value;
      currentData.weddingDate.day = document.getElementById('edit-day').value;
      currentData.weddingDate.month = document.getElementById('edit-month').value.toUpperCase();
      currentData.weddingDate.year = document.getElementById('edit-year').value;
      currentData.venue.address = document.getElementById('edit-venue').value;
      currentData.venue.cityState = document.getElementById('edit-address').value;

      localStorage.setItem('royal_wedding_data', JSON.stringify(currentData));
      updateDOM();

      // re-draw scratch cards
      initScratchCard('scratch-canvas-day', currentData.weddingDate.day, 'DAY');
      initScratchCard('scratch-canvas-month', currentData.weddingDate.month, 'MONTH');
      initScratchCard('scratch-canvas-year', currentData.weddingDate.year, 'YEAR');

      customizeModal.classList.remove('active');
    });
  }

  if (openRsvpBtn && rsvpModal) {
    openRsvpBtn.addEventListener('click', () => {
      rsvpModal.classList.add('active');
    });
  }

  if (closeRsvpBtn && rsvpModal) {
    closeRsvpBtn.addEventListener('click', () => {
      rsvpModal.classList.remove('active');
    });
  }

  if (formRsvp) {
    formRsvp.addEventListener('submit', (e) => {
      e.preventDefault();
      const guestName = document.getElementById('rsvp-guest-name').value;
      alert(`Thank you ${guestName}! Your RSVP has been received.`);
      triggerParticles(window.innerWidth / 2, window.innerHeight / 2, 50);
      rsvpModal.classList.remove('active');
    });
  }
}
