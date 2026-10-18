// ==========================================
// MÓDULO DE FEEDBACK AUDITIVO (Sons da Fazenda)
// ==========================================
let audioCtx = null;

function initAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

// 1. Som de sino de vaca autêntico (Metálico, seco, oco e rústico)
export function playCowbellSound() {
    try {
        initAudioContext();
        const now = audioCtx.currentTime;

        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        // Ondas quadradas e triangulares misturadas imitam o som de chapa metálica grossa
        osc1.type = 'square';
        osc2.type = 'triangle';

        // Frequências típicas de um verdadeiro cowbell (mais encorpadas e "secas")
        osc1.frequency.setValueAtTime(440, now);
        osc1.frequency.exponentialRampToValueAtTime(380, now + 0.15);

        osc2.frequency.setValueAtTime(560, now);
        osc2.frequency.exponentialRampToValueAtTime(480, now + 0.15);

        // Filtro passa-baixo para dar o tom oco e abafado característico do sino no pescoço do gado
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now);
        filter.frequency.exponentialRampToValueAtTime(500, now + 0.2);

        // Envelope de volume: ataque imediato e corte seco (sem som de sininho brilhante)
        gainNode.gain.setValueAtTime(0.01, now);
        gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        // Conexões
        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc1.start(now);
        osc2.start(now);
        
        osc1.stop(now + 0.25);
        osc2.stop(now + 0.25);
    } catch (e) {
        console.error("Erro ao reproduzir sino de vaca:", e);
    }
}

// 2. Mugido de vaca longo e arrastado ("Muuuuu...")
export function playSadMuuSound() {
    try {
        initAudioContext();

        const now = audioCtx.currentTime;
        const duration = 1.8; // Duração total prolongada (~1.8 segundos)
        
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc1.type = 'triangle';
        osc2.type = 'sine';

        // Curva de frequência para um mugido longo com sustentação no meio
        osc1.frequency.setValueAtTime(130, now);
        osc1.frequency.linearRampToValueAtTime(160, now + 0.4); // Sobe no "Muu" inicial
        osc1.frequency.setValueAtTime(160, now + 0.9);           // Sustenta o tom por mais tempo
        osc1.frequency.exponentialRampToValueAtTime(95, now + duration); // Desce lentamente no final

        osc2.frequency.setValueAtTime(65, now);
        osc2.frequency.linearRampToValueAtTime(80, now + 0.4);
        osc2.frequency.setValueAtTime(80, now + 0.9);
        osc2.frequency.exponentialRampToValueAtTime(45, now + duration);

        // Controlo de volume (Envelope com sustentação estendida)
        gainNode.gain.setValueAtTime(0.01, now);
        gainNode.gain.linearRampToValueAtTime(0.28, now + 0.25); // Entrada suave
        gainNode.gain.setValueAtTime(0.28, now + 1.0);           // Mantém o volume alto no meio
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration); // Morre suavemente no fim

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc1.start(now);
        osc2.start(now);
        
        osc1.stop(now + duration);
        osc2.stop(now + duration);
    } catch (e) {
        console.error("Erro ao reproduzir mugido longo:", e);
    }
}

// 3. Som com Pan Espacial (Efeito estéreo para exclusões)
export function playDeleteSound() {
    try {
        initAudioContext();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const panner = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.3);

        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

        osc.connect(gain);

        if (panner) {
            panner.pan.setValueAtTime(0.7, audioCtx.currentTime); // Joga o som mais para o canal direito
            gain.connect(panner);
            panner.connect(audioCtx.destination);
        } else {
            gain.connect(audioCtx.destination);
        }

        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
        console.error("Erro ao reproduzir som de exclusão:", e);
    }
}