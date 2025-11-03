// Session Management
const sessionId = 'S' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
let solvedPuzzles = [];
let unlockedCommands = ['help', 'ls', 'cat', 'clear'];
let discoveredSecrets = [];
let hintsUnlocked = [];
let fileSystem = {};
let commandHistory = [];
let historyIndex = -1;

// Game State
const gameState = {
    currentDir: '~',
    terminalUnlocked: false,
    showHidden: false,
    projects: {
        'mana_valley': {
            locked: false,
            solved: false,
            type: 'main',
            files: ['concept.txt', 'design_doc.md', 'energy_system.log', '.hidden_notes']
        },
        'burger_riot': {
            locked: true,
            solved: false,
            type: 'main',
            files: ['playtest_report.txt', 'bug_log.dat', 'timestamp_analysis.csv']
        },
        'indie_dev_500': {
            locked: true,
            solved: false,
            type: 'main',
            files: ['dev_journal.enc', 'decrypt_tool.sh', 'README.txt']
        },
        '.archive': {
            locked: false,
            solved: false,
            type: 'hidden',
            files: ['manifest.txt', 'memory_fragments.log']
        },
        'pixel_labs': {
            locked: false,
            solved: false,
            type: 'side',
            files: ['lab_blueprints.txt', 'clone_data.csv', 'research_notes.md']
        },
        'simons_hallway': {
            locked: false,
            solved: false,
            type: 'side',
            files: ['direction_log.txt', 'failure_analysis.dat', '.corridor_map']
        },
        'desktop_village': {
            locked: false,
            solved: false,
            type: 'side',
            files: ['twitch_integration.js', 'defense_patterns.txt', 'chat_logs.txt']
        },
        'mana_god': {
            locked: false,
            solved: false,
            type: 'side',
            files: ['fortress_design.md', 'goblin_ai.txt', '.mana_connection']
        },
        'suspended': {
            locked: false,
            solved: false,
            type: 'side',
            files: ['destruction_metrics.csv', 'school_layout.txt', 'chaos_theory.md']
        }
    }
};

// Load filesystem from external JSON
async function loadFileSystem() {
    try {
        const response = await fetch('filesystem.json');
        fileSystem = await response.json();
    } catch (error) {
        console.error('Error loading filesystem:', error);
        // Fallback to empty filesystem
        fileSystem = {};
    }
}

// Command handlers
const commands = {
    help: () => {
        let helpText = `
Available commands:
  help     - Show this help message
  ls       - List files in current directory  
  cat      - Display file contents (usage: cat <filename>)
  clear    - Clear the terminal screen
  session  - Show your unique session ID

<span class="success">➤ GETTING STARTED:</span>
  1. Type 'ls' to see available projects
  2. Type 'cat mana_valley/concept.txt' to read files
  3. Look for patterns, hex codes, and hidden clues
  4. Type 'verify <CODE>' when you find a solution
  
<span class="warning">➤ TIP: Use arrow keys (↑/↓) to navigate command history</span>`;
        
        if (gameState.terminalUnlocked) {
            helpText += `
  cd       - Change directory (usage: cd <directory>)
  grep     - Search for patterns (usage: grep <pattern> <file>)
  decode   - Decode hex strings (usage: decode <hex>)
  verify   - Verify a solution code`;
        }
        
        if (solvedPuzzles.length >= 2) {
            helpText += `
  decrypt  - Attempt to decrypt files (usage: decrypt <key>)
  status   - Show puzzle completion status`;
        }

        if (discoveredSecrets.length >= 3) {
            helpText += `
  hints    - View unlocked hints from side puzzles`;
        }
        
        return helpText;
    },
    
    ls: (args) => {
        const showAll = args && args[0] === '-a';
        
        if (gameState.currentDir === '~') {
            let output = '\nProjects:\n';
            let mainProjects = [];
            let sideProjects = [];
            let hiddenProjects = [];
            
            for (let [project, data] of Object.entries(gameState.projects)) {
                // Skip hidden projects unless -a flag used
                if (data.type === 'hidden' && !showAll) continue;
                
                const status = data.locked ? '[LOCKED]' : 
                             data.solved ? '[SOLVED]' : '[ACTIVE]';
                
                let className = data.locked ? 'locked' : 'folder';
                if (data.type === 'side') className += ' archived';
                if (data.type === 'hidden') className += ' corrupted';
                
                const prefix = data.type === 'main' ? '★ ' : 
                             data.type === 'hidden' ? '. ' : '  ';
                
                const entry = `  <span class="${className}">${prefix}${project}/</span> ${status}`;
                
                if (data.type === 'main') mainProjects.push(entry);
                else if (data.type === 'side') sideProjects.push(entry);
                else hiddenProjects.push(entry);
            }
            
            if (mainProjects.length > 0) {
                output += '<span class="warning">Main Puzzles:</span>\n' + mainProjects.join('\n') + '\n\n';
            }
            if (sideProjects.length > 0) {
                output += '<span class="success">Side Projects (optional hints):</span>\n' + sideProjects.join('\n') + '\n\n';
            }
            if (hiddenProjects.length > 0) {
                output += '<span class="corrupted">Hidden:</span>\n' + hiddenProjects.join('\n') + '\n';
            }
            
            if (!showAll) {
                output += '\n<span class="hidden-hint">Hint: Try "ls -a" to show hidden files</span>';
            }
            
            output += '\n\n<span class="success">Tip: Use "cd <project>" to enter a project folder</span>';
            
            return output;
        } else {
            const project = gameState.currentDir.replace('~/', '');
            if (gameState.projects[project]) {
                let output = `\nContents of ${project}/:\n`;
                gameState.projects[project].files.forEach(file => {
                    const hidden = file.startsWith('.');
                    if (hidden && !showAll) return;
                    const className = hidden ? 'corrupted' : '';
                    output += `  <span class="${className}">${file}</span>\n`;
                });
                output += '\n<span class="success">Tip: Use "cat <filename>" to read a file</span>';
                return output;
            }
        }
        return 'Nothing to show here.';
    },
    
    cat: (args) => {
        if (!args[0]) return 'Usage: cat <filename>\n\n<span class="success">Tip: Use "ls" to see available files in the current directory</span>';
        
        let filePath = args[0];
        if (!filePath.includes('/') && gameState.currentDir !== '~') {
            filePath = gameState.currentDir.replace('~/', '') + '/' + filePath;
        }
        
        if (fileSystem[filePath]) {
            // Track discoveries from side puzzles
            if (filePath.includes('pixel_labs') || 
                filePath.includes('simons_hallway') || 
                filePath.includes('mana_god')) {
                const secretKey = filePath.split('/')[0];
                if (!discoveredSecrets.includes(secretKey)) {
                    discoveredSecrets.push(secretKey);
                    if (discoveredSecrets.length >= 3) {
                        return fileSystem[filePath] + '\n\n<span class="success">★ HINT UNLOCKED: Type "hints" to see your discoveries</span>';
                    }
                }
            }
            
            return fileSystem[filePath];
        }
        
        // Provide helpful suggestions for common mistakes
        const fileName = args[0];
        const suggestions = [];
        
        for (let path in fileSystem) {
            if (path.endsWith(fileName)) {
                suggestions.push(path);
            }
        }
        
        if (suggestions.length > 0) {
            return `Error: File '${args[0]}' not found\n\n<span class="warning">Did you mean:</span>\n${suggestions.map(s => `  cat ${s}`).join('\n')}`;
        }
        
        return `Error: File '${args[0]}' not found\n\n<span class="success">Tip: Use "ls" to see available files, or try "cat project_name/filename"</span>`;
    },
    
    clear: () => {
        document.getElementById('output-container').innerHTML = '';
        return '';
    },
    
    session: () => {
        return `Your unique session ID: <span class="success">${sessionId}</span>
This ID is part of your final passphrase.`;
    },
    
    cd: (args) => {
        if (!gameState.terminalUnlocked) {
            return 'Command not available. Unlock terminal access first.';
        }
        
        if (!args[0] || args[0] === '~') {
            gameState.currentDir = '~';
            return 'Changed directory to ~\n\n<span class="success">Tip: Type "ls" to see available projects</span>';
        }
        
        // Handle cd .. to go back
        if (args[0] === '..') {
            gameState.currentDir = '~';
            return 'Changed directory to ~';
        }
        
        const project = args[0].replace('/', '').replace('.', '');
        const fullProject = args[0].startsWith('.') ? '.' + project : project;
        
        if (gameState.projects[fullProject]) {
            if (gameState.projects[fullProject].locked) {
                return `Error: Project '${fullProject}' is locked. Solve previous puzzles to unlock.`;
            }
            gameState.currentDir = `~/${fullProject}`;
            return `Changed directory to ~/${fullProject}\n\n<span class="success">Tip: Type "ls" to see files, or "cd .." to go back</span>`;
        }
        return `Error: Directory '${args[0]}' not found\n\n<span class="success">Tip: Use "ls" in home directory (~) to see available projects</span>`;
    },
    
    decode: (args) => {
        if (!gameState.terminalUnlocked) {
            return 'Command not available yet.';
        }
        
        if (!args[0]) return 'Usage: decode <hex_string>\n\nExample: decode 4D414E41\n\n<span class="success">Tip: Look for hex values in project files (they look like: 4D 41 4E 41)</span>';
        
        try {
            const hex = args[0].replace(/\s/g, '');
            let result = '';
            for (let i = 0; i < hex.length; i += 2) {
                result += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
            }
            return `Decoded: <span class="success">${result}</span>\n\n<span class="warning">Keep this in mind - it might be part of a solution!</span>`;
        } catch (e) {
            return 'Error: Invalid hex string\n\n<span class="success">Tip: Hex strings should contain only 0-9 and A-F characters</span>';
        }
    },
    
    verify: (args) => {
        if (!args[0]) return 'Usage: verify <code>\n\n<span class="success">Tip: Look for verification codes or passwords in the project files</span>';
        
        const code = args[0].toUpperCase();
        
        // Mana Valley solution
        if (code === 'FLOW_STATE_ALPHA' && !gameState.projects.mana_valley.solved) {
            gameState.projects.mana_valley.solved = true;
            gameState.projects.burger_riot.locked = false;
            gameState.terminalUnlocked = true;
            solvedPuzzles.push('MANA');
            unlockedCommands.push('cd', 'grep', 'decode', 'verify');
            return `<span class="success">✓ MANA VALLEY SOLVED!</span>

Terminal access granted.
New commands unlocked: cd, grep, decode, verify
Burger Riot project is now accessible.

The energy flows through you...

<span class="warning">Side puzzles may contain hints for future challenges.</span>
<span class="success">Progress: ${solvedPuzzles.length}/3 main puzzles solved</span>`;
        }
        
        // Burger Riot solution  
        if (code === 'HOTSTOVE' && gameState.projects.mana_valley.solved && !gameState.projects.burger_riot.solved) {
            gameState.projects.burger_riot.solved = true;
            gameState.projects.indie_dev_500.locked = false;
            solvedPuzzles.push('RIOT');
            unlockedCommands.push('decrypt', 'status');
            return `<span class="success">✓ BURGER RIOT SOLVED!</span>

The rhythm was the key all along.
Indie Dev 500 project is now accessible.
New commands unlocked: decrypt, status

The patterns are becoming clearer...

<span class="warning">The archive folder may hold the final pieces...</span>
<span class="success">Progress: ${solvedPuzzles.length}/3 main puzzles solved</span>`;
        }
        
        return `<span class="error">Invalid verification code or puzzle already solved.</span>

<span class="warning">Make sure you:</span>
  - Have the correct code format
  - Haven't already solved this puzzle
  - Are solving puzzles in order (check "status" command)`;
    },
    
    decrypt: (args) => {
        if (solvedPuzzles.length < 2) {
            return 'Decrypt command not available yet. Solve more puzzles.';
        }
        
        if (!args[0]) return 'Usage: decrypt <key>';
        
        const key = args[0].toUpperCase();
        const expectedKey = `MANA_HOTSTOVE_${sessionId}`;
        
        if (key === expectedKey) {
            gameState.projects.indie_dev_500.solved = true;
            solvedPuzzles.push('DEV500');
            
            const passphrase = generatePassphrase();
            return `<span class="success">✓ INDIE DEV 500 SOLVED!</span>
<span class="success">✓✓✓ ALL CORE PUZZLES COMPLETE ✓✓✓</span>

DECRYPTED DEV JOURNAL - Final Entry:
=====================================

Day 500 - The Truth

All my games were connected from the start.
Mana Valley taught us about FLOW.
Burger Riot taught us about RHYTHM.  
Indie Dev 500 taught us about PERSISTENCE.

But they're all expressions of the same thing:
CREATIVE ENERGY.

The "Mana" was never just a game mechanic.
It's the force that drives creation itself.

Every line of code, every pixel of art,
every sound effect, every playtest...
It's all Mana flowing through the developer.

And now you've proven you have it too.

Your unique completion passphrase:
<span class="glitch success">${passphrase}</span>

Send this to the developer to prove your journey.
This passphrase is unique to YOUR path through the terminal.

${discoveredSecrets.length >= 3 ? '\n<span class="warning">★ COMPLETIONIST BONUS: You explored the side projects!\nThe archive holds deeper truths for those who seek...</span>' : ''}

Thank you for playing.
The flow continues...

=====================================`;
        }
        
        return `<span class="error">Decryption failed. Invalid key format.</span>
Expected format: MANA_VALLEY_ANSWER_BURGER_RIOT_ANSWER_SESSION_ID`;
    },
    
    status: () => {
        if (solvedPuzzles.length < 2) {
            return 'Status command not available yet.';
        }
        
        let output = '\n=== PUZZLE STATUS ===\n\n';
        output += 'Main Puzzles:\n';
        output += `  Mana Valley: ${gameState.projects.mana_valley.solved ? '✓ SOLVED' : '✗ Unsolved'}\n`;
        output += `  Burger Riot: ${gameState.projects.burger_riot.solved ? '✓ SOLVED' : '✗ Unsolved'}\n`;
        output += `  Indie Dev 500: ${gameState.projects.indie_dev_500.solved ? '✓ SOLVED' : '✗ Unsolved'}\n`;
        output += `\nPuzzles solved: ${solvedPuzzles.length}/3\n`;
        output += `\nSide Puzzles Explored: ${discoveredSecrets.length}\n`;
        output += `Session ID: ${sessionId}\n`;
        
        if (discoveredSecrets.length >= 3) {
            output += '\n<span class="success">★ You\'ve explored enough to unlock hints! Type "hints"</span>';
        }
        
        return output;
    },
    
    hints: () => {
        if (discoveredSecrets.length < 3) {
            return 'Explore more side projects to unlock hints.\nTry: pixel_labs, simons_hallway, mana_god, suspended, desktop_village';
        }
        
        let output = '\n=== UNLOCKED HINTS ===\n\n';
        
        if (discoveredSecrets.includes('pixel_labs')) {
            output += '<span class="success">★ Pixel Labs Hint:</span>\n';
            output += '  Coordinates are KEY. Row and Column numbers\n';
            output += '  can be converted to letters using the alphabet.\n';
            output += '  Position (4,13) = Row 4, Column 13\n\n';
        }
        
        if (discoveredSecrets.includes('simons_hallway')) {
            output += '<span class="success">★ Simon\'s Hallway Hint:</span>\n';
            output += '  Timing patterns = Morse code!\n';
            output += '  0.5s = dot (.), 2.0s = dash (-)\n';
            output += '  Apply this to Burger Riot timestamps!\n\n';
        }
        
        if (discoveredSecrets.includes('mana_god')) {
            output += '<span class="success">★ Mana God Hint:</span>\n';
            output += '  The same coordinates appear across ALL projects.\n';
            output += '  They\'re not random. They spell something.\n';
            output += '  Use row as letter position (A=1, B=2, ...)\n\n';
        }
        
        if (discoveredSecrets.includes('suspended')) {
            output += '<span class="success">★ Suspended Hint:</span>\n';
            output += '  Chaos has rhythm. Destruction has pattern.\n';
            output += '  The chaos intervals match morse code timing.\n\n';
        }
        
        if (discoveredSecrets.includes('desktop_village')) {
            output += '<span class="success">★ Desktop Village Hint:</span>\n';
            output += '  Cross-reference timestamps across projects.\n';
            output += '  The memory leak is INTENTIONAL.\n\n';
        }
        
        output += 'These hints should help with the main puzzles!\n';
        output += 'Remember: Everything is connected.\n';
        
        return output;
    },
    
    grep: (args) => {
        if (!gameState.terminalUnlocked) {
            return 'Command not available yet.';
        }
        return 'grep: Basic implementation - try reading files with cat instead';
    }
};

function generatePassphrase() {
    const checksum = solvedPuzzles.join('').split('').reduce((a, b) => {
        return ((a << 5) - a + b.charCodeAt(0)) | 0;
    }, 0);
    const bonus = discoveredSecrets.length >= 5 ? '-COMPLETE' : '';
    return `MANA-${sessionId}-${Math.abs(checksum).toString(36).toUpperCase()}${bonus}`;
}

// Terminal input handling
const input = document.getElementById('command-input');
const outputContainer = document.getElementById('output-container');

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = input.value.trim();
        if (command) {
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            processCommand(command);
            input.value = '';
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            input.value = '';
        }
    }
});

function processCommand(commandStr) {
    // Display the command
    const commandDiv = document.createElement('div');
    commandDiv.className = 'prompt';
    commandDiv.textContent = commandStr;
    outputContainer.appendChild(commandDiv);

    // Parse and execute
    const parts = commandStr.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const outputDiv = document.createElement('div');
    outputDiv.className = 'output';

    if (commands[cmd]) {
        const result = commands[cmd](args);
        outputDiv.innerHTML = result;
    } else {
        outputDiv.innerHTML = `<span class="error">Command not found: ${cmd}</span>
Type 'help' for available commands.`;
    }

    outputContainer.appendChild(outputDiv);
    
    // Scroll to bottom
    const terminal = document.getElementById('terminal');
    terminal.scrollTop = terminal.scrollHeight;
}

// Auto-focus input
document.addEventListener('click', () => {
    input.focus();
});

// Initialize - load filesystem then setup console
loadFileSystem().then(() => {
    // Console Easter Egg
    console.log('%c🔮 AIA Developer Terminal', 'color: #00ff00; font-size: 20px; font-weight: bold;');
    console.log('%cYou found the console! But the real puzzles are in the terminal...', 'color: #00aa00;');
    console.log('%cHint: The hex values in the files are important.', 'color: #006600;');
    console.log('%cHint: Patterns exist across multiple files.', 'color: #006600;');
    console.log('%cHint: Side projects contain hints for main puzzles.', 'color: #006600;');
    console.log('%cHint: Your session ID is part of the final answer.', 'color: #006600;');
    console.log(`%cYour Session: ${sessionId}`, 'color: #00ff00; font-weight: bold;');
});
