// Typewriter effect for terminal
class Typewriter {
    constructor() {
        this.speed = 3; // milliseconds per chunk (lower = faster)
        this.chunkSize = 10; // characters to display at once (higher = faster)
        this.lineDelay = 0; // delay between lines
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
        let i = 0;
        
        while (i < html.length) {
            const char = html[i];
            
            // Check if we're at a tag
            if (char === '<') {
                // Find the end of the tag
                let tagEnd = html.indexOf('>', i);
                if (tagEnd !== -1) {
                    // Check if it's a closing tag
                    const isClosingTag = html[i + 1] === '/';
                    
                    if (isClosingTag) {
                        // Just add the closing tag
                        const tag = html.substring(i, tagEnd + 1);
                        const temp = document.createElement('div');
                        temp.innerHTML = parent.innerHTML + tag;
                        parent.innerHTML = temp.innerHTML;
                        i = tagEnd + 1;
                    } else {
                        // Opening tag - find its closing tag and include all content
                        const tagName = html.substring(i + 1, tagEnd).split(' ')[0].split('>')[0];
                        const closingTag = `</${tagName}>`;
                        const closingIndex = html.indexOf(closingTag, tagEnd);
                        
                        if (closingIndex !== -1) {
                            // Get the entire element (opening tag + content + closing tag)
                            const fullElement = html.substring(i, closingIndex + closingTag.length);
                            
                            // Add it all at once
                            const temp = document.createElement('div');
                            temp.innerHTML = fullElement;
                            parent.appendChild(temp.firstChild);
                            
                            i = closingIndex + closingTag.length;
                            await this.sleep(speed);
                        } else {
                            // Self-closing or malformed - just add the tag
                            const tag = html.substring(i, tagEnd + 1);
                            const temp = document.createElement('div');
                            temp.innerHTML = tag;
                            if (temp.firstChild) {
                                parent.appendChild(temp.firstChild);
                            }
                            i = tagEnd + 1;
                        }
                    }
                    continue;
                }
            }
            
            // Regular character - add multiple at once for speed
            let textChunk = '';
            let charCount = 0;
            
            while (i < html.length && html[i] !== '<' && charCount < this.chunkSize) {
                textChunk += html[i];
                i++;
                charCount++;
            }
            
            if (textChunk.length > 0) {
                parent.appendChild(document.createTextNode(textChunk));
                await this.sleep(speed);
            }
        }
    }

    async typeText(element, text, speed) {
        let i = 0;
        while (i < text.length) {
            // Determine chunk size (may be smaller at end of text)
            const currentChunkSize = Math.min(this.chunkSize, text.length - i);
            const chunk = text.substring(i, i + currentChunkSize);
            
            element.appendChild(document.createTextNode(chunk));
            
            i += currentChunkSize;
            
            // Wait before next chunk (unless we're at the end)
            if (i < text.length) {
                await this.sleep(speed);
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