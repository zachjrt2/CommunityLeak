// Typewriter effect for terminal
class Typewriter {
    constructor() {
        this.speed = 8; // milliseconds per chunk
        this.chunkSize = 10; // characters to display at once
        this.lineDelay = 0; // delay between lines (0 = all lines type simultaneously)
        this.glitchChance = 0.01; // 1% chance of glitch per character
        this.queue = [];
        this.isTyping = false;
    }

    async typeElement(element, speed = this.speed) {
        // Get all text content including nested elements
        const originalHTML = element.innerHTML;
        element.innerHTML = '';
        element.style.display = element.style.display || 'block';
        
        // Parse HTML and type it out
        await this.typeHTML(element, originalHTML, speed);
    }

    async typeHTML(parent, html, speed) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        for (let node of tempDiv.childNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
                await this.typeText(parent, node.textContent, speed);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const newElement = document.createElement(node.tagName);
                
                // Copy attributes
                for (let attr of node.attributes) {
                    newElement.setAttribute(attr.name, attr.value);
                }
                
                parent.appendChild(newElement);
                await this.typeHTML(newElement, node.innerHTML, speed);
            }
        }
    }

    async typeText(element, text, speed) {
        let i = 0;
        while (i < text.length) {
            // Determine chunk size (may be smaller at end of text)
            const currentChunkSize = Math.min(this.chunkSize, text.length - i);
            const chunk = text.substr(i, currentChunkSize);
            
            // Add characters in this chunk
            for (let j = 0; j < chunk.length; j++) {
                const char = chunk[j];
                
                // Random glitch effect
                if (Math.random() < this.glitchChance) {
                    const glitchChars = ['█', '▓', '▒', '░', '╬', '╣', '║', '╗', '╝', '¶', '§'];
                    const glitch = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    
                    const textNode = document.createTextNode(glitch);
                    element.appendChild(textNode);
                    await this.sleep(speed / (this.chunkSize * 2));
                    textNode.textContent = char;
                } else {
                    element.appendChild(document.createTextNode(char));
                }
            }
            
            i += currentChunkSize;
            
            // Wait before next chunk (unless we're at the end)
            if (i < text.length) {
                // Variable speed for more organic feel
                const variance = speed * 0.3;
                const actualSpeed = speed + (Math.random() * variance - variance / 2);
                await this.sleep(actualSpeed);
            }
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async typeWriter(text, parent, className = '', speed = this.speed) {
        const element = document.createElement('div');
        if (className) element.className = className;
        parent.appendChild(element);
        
        await this.typeText(element, text, speed);
        return element;
    }

    // Queue system for sequential typing
    addToQueue(callback) {
        this.queue.push(callback);
        if (!this.isTyping) {
            this.processQueue();
        }
    }

    async processQueue() {
        if (this.queue.length === 0) {
            this.isTyping = false;
            return;
        }
        
        this.isTyping = true;
        const callback = this.queue.shift();
        await callback();
        this.processQueue();
    }
}

// Initialize typewriter
const typewriter = new Typewriter();

// Function to apply typewriter effect to existing elements
function initializeTypewriterEffects() {
    const terminal = document.getElementById('terminal');
    const bootSequence = terminal.querySelector('.boot-sequence');
    
    if (bootSequence) {
        // Store original content
        const originalContent = bootSequence.innerHTML;
        bootSequence.innerHTML = '';
        
        // Type out the boot sequence
        typewriter.addToQueue(async () => {
            await typewriter.typeHTML(bootSequence, originalContent, 20);
        });
    }
}

// Observer to handle dynamically added content
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE && 
                node.classList && 
                !node.classList.contains('boot-sequence') &&
                !node.id.includes('input') &&
                !node.classList.contains('cursor')) {
                
                const originalContent = node.innerHTML;
                node.innerHTML = '';
                
                typewriter.addToQueue(async () => {
                    await typewriter.typeHTML(node, originalContent, typewriter.speed);
                });
            }
        });
    });
});

// Start observing
document.addEventListener('DOMContentLoaded', () => {
    initializeTypewriterEffects();
    
    // Observe the output container for new elements
    const outputContainer = document.getElementById('output-container');
    if (outputContainer) {
        observer.observe(outputContainer, {
            childList: true,
            subtree: true
        });
    }
    
    // Also observe the terminal for any new content
    const terminal = document.getElementById('terminal');
    if (terminal) {
        observer.observe(terminal, {
            childList: true,
            subtree: false
        });
    }
});

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.typewriter = typewriter;
}
