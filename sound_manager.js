class SoundManager {
    constructor() {
        this.startupSound = new Audio('sounds/startup_intro.mp3');
        this.ambientSound = new Audio('sounds/ambient_loop.mp3');
        this.enterSound = new Audio('sounds/input_confirm.mp3');

        // Config
        this.ambientSound.loop = true;
        this.ambientSound.volume = 0.0;
        this.startupSound.volume = 0.6;
        this.enterSound.volume = 0.5;

        this.soundEnabled = false; // start off until user allows
        this.hasStarted = false;
    }

    async playStartupSequence() {
        if (!this.soundEnabled || this.hasStarted) {
            console.log('[SoundManager] Startup blocked or already played.');
            return;
        }
        this.hasStarted = true;

        try {
            console.log('[SoundManager] Playing startup sound...');
            await this.startupSound.play();
            console.log('[SoundManager] Startup sound playing...');

            this.startupSound.addEventListener('ended', () => {
                console.log('[SoundManager] Startup sound ended — starting ambient fade-in.');
                this.fadeInAmbient();
            });
        } catch (err) {
            console.warn('[SoundManager] Could not play startup sound:', err);
        }
    }

    fadeInAmbient() {
        if (!this.soundEnabled) return;

        if (this.ambientSound.paused) {
            this.ambientSound.currentTime = 0;
            this.ambientSound.play()
                .then(() => {
                    console.log('[SoundManager] Ambient loop started — fading in...');
                    let volume = 0.0;
                    const fadeTarget = 0.3;
                    const fadeStep = 0.02;
                    const fadeInterval = setInterval(() => {
                        if (volume < fadeTarget) {
                            volume += fadeStep;
                            this.ambientSound.volume = Math.min(volume, fadeTarget);
                        } else {
                            clearInterval(fadeInterval);
                            console.log('[SoundManager] Ambient fade-in complete.');
                        }
                    }, 200);
                })
                .catch(err => console.warn('[SoundManager] Could not start ambient loop:', err));
        }
    }

    playEnterSound() {
        if (!this.soundEnabled) return;
        console.log('[SoundManager] Playing input submit sound.');
        this.enterSound.currentTime = 0;
        this.enterSound.play().catch(err =>
            console.warn('[SoundManager] Could not play enter sound:', err)
        );
    }

    showSoundConsentPopup() {
        // Create the popup UI
        const popup = document.createElement('div');
        popup.id = 'sound-consent-popup';
        popup.innerHTML = `
            <div class="sound-consent-overlay"></div>
            <div class="sound-consent-box">
                <h2>Enable Sound?</h2>
                <p>This experience includes ambient and typing sounds.<br>
                Would you like to allow sound to autoplay for this site?</p>
                <div class="buttons">
                    <button id="allow-sound">Yes, enable sound</button>
                    <button id="mute-sound">No, stay muted</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);

        // Add basic styles inline so it works without CSS
        const style = document.createElement('style');
        style.textContent = `
            #sound-consent-popup {
                position: fixed;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                font-family: sans-serif;
            }
            .sound-consent-overlay {
                position: absolute;
                inset: 0;
                background: rgba(0, 0, 0, 0.6);
            }
            .sound-consent-box {
                position: relative;
                background: #111;
                color: #fff;
                padding: 1.5rem 2rem;
                border-radius: 10px;
                max-width: 400px;
                text-align: center;
                box-shadow: 0 0 10px rgba(0,0,0,0.5);
                z-index: 2;
            }
            .sound-consent-box h2 {
                margin-top: 0;
                font-size: 1.5rem;
                color: #66ccff;
            }
            .sound-consent-box button {
                margin: 0.5rem;
                padding: 0.5rem 1rem;
                background: #222;
                border: 1px solid #66ccff;
                color: #66ccff;
                border-radius: 5px;
                cursor: pointer;
            }
            .sound-consent-box button:hover {
                background: #66ccff;
                color: #111;
            }
        `;
        document.head.appendChild(style);

        // Wire up buttons
        document.getElementById('allow-sound').addEventListener('click', () => {
            console.log('[SoundManager] User consented to sound.');
            this.soundEnabled = true;
            this.playStartupSequence();
            popup.remove();
        });

        document.getElementById('mute-sound').addEventListener('click', () => {
            console.log('[SoundManager] User denied sound.');
            this.soundEnabled = false;
            popup.remove();
        });
    }
}

const soundManager = new SoundManager();

if (typeof window !== 'undefined') {
    window.soundManager = soundManager;
}

// 🔊 Initialize popup + enter key sound
document.addEventListener('DOMContentLoaded', () => {
    console.log('[SoundManager] DOM loaded — asking for sound permission.');
    soundManager.showSoundConsentPopup();

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            soundManager.playEnterSound();
        }
    });
});
