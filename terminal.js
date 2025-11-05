// Session Management
const sessionId = 'S' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
let solvedPuzzles = [];
let unlockedCommands = ['help', 'ls', 'cat', 'clear', 'cd'];
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



// Load filesystem - embedded data
async function loadFileSystem() {
  fileSystem = {
    "mana_valley/concept.txt": `<span class="file-header">MANA VALLEY - Core Concept Document</span>
<span class="file-divider">====================================</span>
<span class="file-timestamp">Date: 2019-04-15</span>
<span class="file-warning">Status: ACTIVE DEVELOPMENT</span>

<span class="file-subheader">Core Mechanic:</span> Resource management meets exploration
<span class="file-subheader">Theme:</span> Energy as a living, flowing entity
<span class="file-subheader">Inspiration:</span> Stardew Valley, Breath of the Wild

<span class="file-note">The player must balance:</span>
- Mana collection (primary resource)
- Valley exploration (finding new places)
- Entity relationships (diplomacy/combat)

<span class="file-header">DESIGN PILLARS:</span>
1. <span class="file-warning">Flow</span> - Energy should feel alive
2. <span class="file-warning">Choice</span> - Multiple paths to victory
3. <span class="file-warning">Consequence</span> - Actions ripple through the valley

<span class="file-subheader">Color Palette Research:</span>
<span class="code-block">#434F52 - Primary
#455354 - Secondary
#544845 - Cave Rocks
#45414C - Witches heart
#504841 - Field Grain
#554E44 - Corrupted Mana
#495346 - Nona's Amulet
#415445 - Pomplu Leaf
#4C4F57 - Basic Rocks
#554E44 - Corrupted Mana
#455253 - Pomplu Soul
#4B4559 - Cave Lighting
#434F52 - Amberfin Ash
#455253 - Mana Essence
#554E44 - Ocean Floor (Night)</span>

<span class="file-warning">Developer note:</span>
<span class="file-note">These hex values are not random — they hide letters if read as ASCII.
Each pair of digits (e.g., 4D → M) forms a word.

If decoded correctly, they reveal a keyword needed for the energy system.
Try starting with the Primary color and follow the same process for the others.
When finished, check the system logs for where to use it.</span>
`,

    "mana_valley/design_doc.md": `<span class="file-header">## World Building</span>

<span class="file-note">The valley exists in multiple states simultaneously.
Players experience different "frequencies" of reality.</span>

<span class="file-subheader">Stage 1:</span>
Cave exploration should expand the usability of the map and lay foundations for
mining.
<span class="file-warning">[Implement]</span>
    - Cave Rocks
    - Cave Lighting

<span class="file-subheader">Stage 2:</span>
Nona needs some more story and her house could use a little landscaping.
<span class="file-warning">[Implement]</span> 
    - Nona's Amulet
    - Basic Rocks

<span class="file-subheader">Stage 3:</span>
Redo the color balancing on the world to help unify the design language.
<span class="file-warning">[Color Considerations]</span>
    - Ocean Floor (Night)
    - Mana Essence
    - Primary
    - Secondary
    - Pomplu Leaf

<span class="file-subheader">Stage 4:</span>
New inventory system to help players gather and interact with items in the world
<span class="file-warning">[Items to make stackable]</span>
    - Corrupted Mana
    - Pomplu Soul
    - Amberfin Ash
    - Witches heart
    - Field Grain

<span class="file-note">Internal note:</span>
<span class="file-warning">The Alpha Flow shows unique synchronization behavior.
Terminal access for Alpha testing requires correct state identification.</span>

<span class="file-header">## Cross-Project Notes</span>
<span class="file-error">Strange... the mana flow patterns match the clone distribution in Pixel Labs.
Is there a connection? Check .archive for memory fragments.</span>
`,

    "mana_valley/energy_system.log": `<span class="file-timestamp">[2023-04-15 14:23:11]</span> Energy flow initialized
<span class="file-timestamp">[2023-04-15 14:23:12]</span> Mana pools spawned: 12
<span class="file-timestamp">[2023-04-15 14:23:45]</span> Player collected mana: +50 units

<span class="file-warning">[INFO]</span> Decoding attempt: Using color data from concept.txt
<span class="file-note">Result: (#4D414E) → "MAN"
Additional values pending analysis.</span>

<span class="file-warning">[NOTE]</span> Cross-reference remaining color hex codes with the pattern above.
<span class="file-note">Each decoded word may combine to form an instruction or key phrase.</span>
`,

    "mana_valley/.hidden_notes": `<span class="file-header">Dev Notes (Private)</span>
<span class="file-divider">====================</span>

<span class="file-warning">Confirmed:</span> The color codes in concept.txt are a cipher. 
           <span class="file-note">https://www.rapidtables.com/convert/number/hex-to-ascii.html</span>

<span class="file-subheader">Decoded sequence so far:</span>
<span class="code-block">    #544845 → THE
    #4B4559... (still decoding, may spell "KEY")</span>

<span class="file-note">The words form a phrase related to the system's key. But what order should the
colors come in. Perhaps design docs give some insight.</span>

<span class="file-warning">Final access format:</span>
<span class="file-encrypted">[WORD]_[WORD]_[WORD]</span>

<span class="file-note">Check the latest energy_system.log entry for which branch is currently active.
That should tell you what goes in the brackets.</span>
`,

    "burger_riot/playtest_report.txt": `<span class="file-header">BURGER RIOT - Playtesting Session #47</span>
<span class="file-divider">=====================================</span>
<span class="file-timestamp">Date: 2023-06-22</span>
Build: v0.8.3-alpha

<span class="file-subheader">PLAYTESTER:</span> Mike K.
<span class="file-subheader">Session Duration:</span> 23 minutes

<span class="file-subheader">Timestamp Log:</span>
<span class="file-timestamp">00:00</span> - Game start, tutorial skipped
<span class="file-timestamp">00:15</span> - First burger assembled
<span class="file-timestamp">00:43</span> - Customer #1 satisfied
<span class="file-timestamp">01:12</span> - Speed boost activated
<span class="file-timestamp">01:58</span> - <span class="file-warning">"Riot mode" triggered</span> (chaos event)
<span class="file-timestamp">02:34</span> - Multi-order juggling (3 simultaneous)
<span class="file-timestamp">03:11</span> - <span class="file-error">First failure</span> (burnt burger)
<span class="file-timestamp">03:45</span> - Recovery, back to normal speed
<span class="file-timestamp">04:23</span> - <span class="file-warning">High score achieved: 1,250 points</span>

<span class="file-header">BUGS FOUND:</span>
- Burger sometimes clips through counter
- Sound effect delay on "perfect" orders
- Riot mode difficulty spike too harsh

<span class="file-header">NOTES:</span>
<span class="file-note">Mike mentioned the game has a "rhythm" to it.
The timestamps feel musical? Need to analyze.</span>

<span class="file-warning">[INTERNAL]:</span> Check riot_trigger_sequence.wav
<span class="file-note">Pattern analysis suggests morse-like intervals...</span>

<span class="file-note">Funny coincidence: The chaos in riot mode feels similar to 
the destruction mechanics in Suspended. Same energy, different context.</span>
`,

    "burger_riot/bug_log.dat": `<span class="file-header">BUG DATABASE - BURGER RIOT</span>
<span class="file-divider">=========================</span>

<span class="file-warning">BUG-001:</span> Physics glitch in burger assembly
Severity: LOW
Status: FIXED

<span class="file-warning">BUG-002:</span> Audio desync during riot mode  
Severity: MEDIUM
Status: INVESTIGATING

<span class="file-note">The audio desync is weird. It's like there's a PATTERN:
Long pause, short pause, short, long, short, long...</span>

<span class="file-error">Wait, that's not a bug. That's MORSE CODE.</span>

<span class="file-subheader">Decoded from riot mode sound gaps:</span>
<span class="code-block">... --- ... (SOS? No, wait...)</span>

<span class="file-warning">Actually decoded (using riot mode timestamp intervals):</span>
<span class="code-block">.... --- -
... - --- ...- .</span>

<span class="file-note">Password for next level?</span> 

<span class="file-warning">BUG-003:</span> Customer AI pathfinding error
Severity: LOW  
Status: BACKLOG

<span class="file-encrypted">[ENCRYPTED SECTION - Use 'decrypt' command with key]
U2FsdGVkX1+vupppZksvRf5pq5g5XjFRlipRkwB0K1Y=</span>
`,

    "burger_riot/timestamp_analysis.csv": `<span class="file-header">Time,Event,Duration</span>
<span class="file-timestamp">00:00</span>,bun_place,1.15s,-
<span class="file-timestamp">00:01.15</span>,lettuce_add,1.15s,-
<span class="file-timestamp">00:02.3</span>,tomato_slice,1.15s,-
<span class="file-timestamp">00:03.45</span>,cheese_melt,1.15s,-
<span class="file-timestamp">00:04.6</span>,patty_grill,2.3s,-
<span class="file-timestamp">00:06.9</span>,bacon_fry,2.3s,-
<span class="file-timestamp">00:09.2</span>,burger_flip,2.3s,-
<span class="file-timestamp">00:11.5</span>,<span class="file-error">entity error</span>,4.6s,-
<span class="file-timestamp">00:16.1</span>,pickle_layer,1.15s,-
<span class="file-timestamp">00:17.25</span>,onion_chop,1.15s,-
<span class="file-timestamp">00:18.4</span>,sauce_drizzle,1.15s,-
<span class="file-timestamp">00:19.55</span>,fries_drop,2.3s,-
<span class="file-timestamp">00:21.85</span>,shake_stir,2.3s,-
<span class="file-timestamp">00:24.15</span>,customer_cheer,2.3s,-
<span class="file-timestamp">00:26.45</span>,nugget_toss,1.15s,-
<span class="file-timestamp">00:27.6</span>,drink_pour,1.15s,-
<span class="file-timestamp">00:28.75</span>,order_ring,1.15s,-
<span class="file-timestamp">00:29.9</span>,combo_ready,2.3s,-
<span class="file-timestamp">00:32.2</span>,bell_ring,1.15s,-

<span class="file-subheader">Pattern Analysis:</span>
<span class="file-warning">Intervals between events:</span> <span class="code-block">1.15, 1.15, 1.15, 1.15, 2.3, 2.3, 2.3, 4.6, 
1.15, 1.15, 1.15, 2.3, 2.3, 2.3, 1.15, 1.15, 1.15, 2.3 1.15</span>
<span class="file-note">Perhaps this number is offset by a constant value.

Still doesn't make sense. Need more coffee...
Or maybe need to look at Desktop Village defense patterns?</span>
`,

    "indie_dev_500/README.txt": `<span class="file-header">INDIE DEV 500 - The Journey</span>
<span class="file-divider">============================</span>

<span class="file-note">A game about making games.
A race to be remembered.
7 developers.
Infinite coffee.</span>

<span class="file-subheader">This project is a love letter to the indie dev grind.</span>
Every bot made by a contestent represents a real struggle:
- <span class="file-warning">Resource management</span> = Time & complexity
- <span class="file-warning">Physics Unpredictabilaty</span> = Life happening  
- <span class="file-warning">Node structure</span> = Learning new skills
- <span class="file-warning">Time Limit</span> = Crunch time

<span class="file-error">The game was built to break you.
It knows when you're struggling.
It adapts.</span>

<span class="file-header">TO DECRYPT THE DEV JOURNAL:</span>
1. Find the encryption key (it's hidden in the other projects)
2. Use the decrypt_tool.sh script
3. Prepare yourself for the truth

<span class="file-warning">Hint:</span> <span class="file-note">The key is made of ANSWERS you've already found.</span>

<span class="file-note">Note: The archive folder has strange memory fragments.
They talk about connections between all the projects.
Maybe that's the real final puzzle?</span>
`,

    "indie_dev_500/dev_journal.enc": `<span class="file-encrypted">-----BEGIN ENCRYPTED JOURNAL-----</span>
<span class="file-warning">Day 1-100:</span> <span class="file-encrypted">[ENCRYPTED]
U2FsdGVkX19K3vNHGSc4bGAHN2yTpKSqE+vMQhP5rWE=</span>

<span class="file-warning">Day 101-200:</span> <span class="file-encrypted">[ENCRYPTED]  
U2FsdGVkX1+2Jz8vK4cX9fYqHbR+pqKsE9kPxHm8Gf0=</span>

<span class="file-warning">Day 201-300:</span> <span class="file-encrypted">[ENCRYPTED]
U2FsdGVkX1/Hk9mR4pFx2NbQ+KzPqjRsT8vXnYm3Dc4=</span>

<span class="file-warning">Day 301-400:</span> <span class="file-encrypted">[ENCRYPTED]
U2FsdGVkX1+Ym2nT5qGy4OcR+LzQskUtV9wYoZn4Ee8=</span>

<span class="file-warning">Day 401-500:</span> <span class="file-warning">[PARTIALLY READABLE]</span>
<span class="file-note">I can't believe I made it. 500 days.
The game is done. But something happened...</span>

<span class="file-error">All my projects started... connecting.
The mana system from Valley.
The rhythm from Riot.  
The persistence from Dev500.

They're all the same game.
They've ALWAYS been the same game.</span>

<span class="file-warning">The core truth:</span> <span class="file-encrypted">[REQUIRES FULL DECRYPTION]</span>

<span class="file-note">To unlock this, you need the MASTER_KEY.
Combine the solutions from:</span>
- Mana Valley answer
- Burger Riot password
- Your session verification code

<span class="file-warning">Format:</span> <span class="file-encrypted">VALLEY_RIOT_[SESSION_ID]</span>
<span class="file-encrypted">-----END ENCRYPTED JOURNAL-----</span>
`,

    "indie_dev_500/decrypt_tool.sh": `<span class="file-header">#!/bin/bash</span>
<span class="file-note"># Decryption Tool for Dev Journal
# Usage: ./decrypt_tool.sh <encrypted_file> <key></span>

<span class="code-block">decrypt() {
    local file=$1
    local key=$2
    
    echo "Attempting decryption with key: $key"
    
    # This is a simulation - in reality you'd use openssl
    if [ "$key" == "CORRECT_KEY_HERE" ]; then
        echo "SUCCESS: Decryption complete"
        cat dev_journal_decrypted.txt
    else
        echo "ERROR: Invalid decryption key"
        echo "Key format should be: [MANA_VALLEY_SOLUTION]_[BURGER_RIOT_PASSWORD]_[SESSION]"
    fi
}</span>

<span class="file-note"># The real decryption happens when you submit the final passphrase
# This tool is just a hint to the puzzle structure</span>

<span class="file-warning">echo "Hint: Look at the hex values. Look at the intervals."
echo "Hint: The answer flows through all projects."
echo "Hint: Your unique session is part of the key"</span>
`,

    "pixel_labs/lab_blueprints.txt": `<span class="file-header">PIXEL LABS - Laboratory Design</span>
<span class="file-divider">================================</span>
<span class="file-warning">Project Status: ARCHIVED</span>
<span class="file-timestamp">Last Modified: 2022-11-08</span>

<span class="file-subheader">Purpose:</span> Create automated lab to supply clones for various game systems

<span class="file-header">LAB LAYOUT:</span>
<span class="ascii-art">    +---+---+---+---+
    | 1 | 2 | 3 | 4 |    
+---+---+---+---+---+
| 1 | A | B | C | D |
+---+---+---+---+---+
| 2 | E | F | G | H |
+---+---+---+---+---+
| 3 | I | J | K | L |
+---+---+---+---+---+
| 4 | M | N | O | P |
+---+---+---+---+---+
| 5 | Q | R | S | T |
+---+---+---+---+---+
| 6 | U | V | W | X |
+---+---+---+---+---+
| 7 | Y | Z | ! | _ |
+---+---+---+---+---+</span>

<span class="file-subheader">Clone Distribution Pattern:</span>
Row 1: Management & Control
Row 2: Production & Processing
Row 3: Storage & Distribution

<span class="file-note">Optimal flow: A->E->I (vertical cascade)
But somehow clones prefer: A->B->F->G->K (diagonal?)</span>

<span class="file-error">This pattern... it matches something.
Check clone_data.csv for coordinates.</span>
`,

    "pixel_labs/clone_data.csv": `<span class="file-header">CloneID,SpawnX,SpawnY,Efficiency,Notes</span>
C001,4,1,87%,First generation
C002,1,2,92%,Improved genome
C003,6,2,89%,Standard production
C004,4,1,91%,Duplicate spawn point?
C005,1,2,94%,High performer

<span class="file-warning">Wait, these coordinates...</span>

<span class="code-block">(2,2) (3,4) (4,3) (6,3) 
(7,4)
(5,3) (5,4) (1,1) (5,4) (2,1)
(7,4) 
(1,1) (3,4) (4,4) (2,4) (1,1)</span>

<span class="file-note">If this is a grid reference system...
And if we convert to letters (A=1, B=2, etc)...</span>

<span class="code-block">4,1 = D,A
1,2 = A,B
6,2 = F,B
4,1 = D,A  
1,2 = A,B</span>

<span class="file-note">DA BA FB DA BA? No... That can't be it

Or maybe it's row,col for a keyboard layout?
Or... coordinate system for Mana Valley energy pools?</span>

<span class="file-error">This is connected to the main puzzle somehow. I'm sure I can find something else 
in the pixel labs notes connected to this, check the research notes.</span>
`,

    "pixel_labs/research_notes.md": `<span class="file-header"># Research Log - Clone Efficiency</span>

<span class="file-subheader">## Discovery</span>
<span class="file-error">The clones aren't just following programmed paths.
They're exhibiting emergent behavior.</span>

<span class="file-subheader">## Pattern Recognition</span>
<span class="file-warning">When I map their movement patterns, they form LETTERS.
Not random. Intentional.</span>

<span class="file-subheader">## Hypothesis</span>
<span class="file-note">The lab simulation is leaking data from other projects.
The clones are trying to communicate something.</span>

<span class="file-subheader">## Hint for Future Me</span>
<span class="file-warning">If you're stuck on coordinate systems in other projects,
remember: Everything is connected through position data.</span>

<span class="code-block">Row 4, Column 3 = ?
Row 1, Column 4 = ?</span>

<span class="file-error">Think GRID. Think ASCII. Think LETTERS.</span>
`,

    "simons_hallway/direction_log.txt": `<span class="file-header">SIMON'S HALLWAY - Playtesting Directions</span>
<span class="file-divider">=========================================</span>
<span class="file-note">Game: Follow verbal directions or die trying
Difficulty: Brutal</span>

<span class="file-subheader">Test Session #23:</span>
<span class="file-divider">-----------------</span>
Direction 1: "FORWARD 3 steps"
Direction 2: "TURN LEFT"
Direction 3: "FORWARD 5 steps"  
Direction 4: "TURN RIGHT"
Direction 5: "BACKWARD 2 steps"
Direction 6: "TURN LEFT"
Direction 7: "FORWARD 1 step"

<span class="file-error">Player died at Direction 5. Again.</span>

<span class="file-warning">The timing between directions matters.</span>
- Short pause: 0.5s
- Medium pause: 1.0s
- Long pause: 2.0s

<span class="file-subheader">Pause Pattern (in seconds):</span>
<span class="code-block">0.5, 2.0, 0.5, 0.5, 2.0, 0.5, 2.0</span>

<span class="file-note">That's: SHORT, LONG, SHORT, SHORT, LONG, SHORT, LONG</span>

<span class="file-error">Wait... is that MORSE CODE?</span>
<span class="file-warning">Short = dot (.)
Long = dash (-)</span>

<span class="file-subheader">Pattern:</span> <span class="code-block">. - . . - . -</span>

<span class="file-note">If I decode that... 
No wait, I need letter boundaries.

Ugh, I'm overthinking this.
But it FEELS like the rhythm puzzle in Burger Riot.
Same energy. Pattern-based thinking.</span>
`,

    "simons_hallway/failure_analysis.dat": `<span class="file-header">FAILURE ANALYSIS - Simon's Hallway</span>
<span class="file-divider">===================================</span>

<span class="file-subheader">Most Common Death Points:</span>
1. Direction 5 (Backward movement) - <span class="file-error">67% deaths</span>
2. Direction 7 (Final step) - <span class="file-warning">21% deaths</span>  
3. Direction 3 (Forward 5) - 12% deaths

<span class="file-subheader">Analysis:</span>
<span class="file-note">Players struggle with TIMING more than direction.
The game isn't about spatial awareness.
It's about RHYTHM and PATTERN RECOGNITION.</span>

<span class="file-warning">Recommendation:</span> Add visual metronome?
Or accept that this is a rhythm game disguised as a puzzle game.

<span class="file-warning">[DEV NOTE]:</span> 
<span class="file-error">The morse code interpretation was right.
If you break the directions into beats...
And map the pause durations to dots and dashes...

You get a MESSAGE.</span>

<span class="file-note">But I'm not going to spoil it here.
Figure it out yourself, future puzzle solver.</span>

<span class="file-warning">Hint:</span> <span class="file-note">Combine this with the timestamp intervals
from Burger Riot. They're the SAME TYPE of puzzle.</span>
`,

    "simons_hallway/.corridor_map": `<span class="ascii-art">     N
     |
 W---+---E
     |
     S</span>

<span class="file-subheader">START:</span> Center position
<span class="file-subheader">GOAL:</span> North exit

<span class="file-subheader">Successful Path Sequence:</span>
<span class="code-block">F F F L F F F F F R B B L F</span>

<span class="file-note">F=Forward, L=Left, R=Right, B=Back</span>

<span class="file-warning">But that's not the puzzle.
The puzzle is the RHYTHM of the commands.</span>

<span class="file-subheader">Time between commands (ms):</span>
<span class="code-block">500, 2000, 500, 1000, 500, 2000, 1000, 500</span>

<span class="file-subheader">Convert to beats:</span>
<span class="file-warning">Short (500ms) = .
Long (2000ms) = -  
Medium (1000ms) = (space between letters)</span>

<span class="code-block">. - . (space) . - (space) . </span>

<span class="file-subheader">Morse Code:</span>
<span class="file-note">E (.) T (-)? No...

Actually:
First group: . - . = R
Second group: . - = A

RA? 
Or keep going with more sessions?</span>

<span class="file-warning">[HIDDEN HINT: This helps decode Burger Riot timestamps]</span>
`,

    "desktop_village/twitch_integration.js": `<span class="file-header">// Desktop Village - Twitch Chat Integration</span>
<span class="file-note">// Tower Defense with Chat Control</span>

<span class="code-block">const chatCommands = {
    '!spawn': spawnEnemy,
    '!buff': buffPlayer,
    '!debuff': debuffPlayer,
    '!chaos': triggerChaosEvent
};</span>

<span class="file-note">// Chat Pattern Analysis
// Discovered something weird...</span>

<span class="code-block">const messageCounts = {
    'Session 1': 42,
    'Session 2': 17,
    'Session 3': 89,
    'Session 4': 34,
    'Session 5': 76
};</span>

<span class="file-note">// If I convert these to hex...
// 42 = 2A
// 17 = 11  
// 89 = 59
// 34 = 22
// 76 = 4C</span>

<span class="file-warning">// Then ASCII: * (garbage?) Y " L</span>

<span class="file-note">// Or maybe it's about DEFENSE PATTERNS?
// Check defense_patterns.txt</span>
`,

    "desktop_village/defense_patterns.txt": `<span class="file-header">DESKTOP VILLAGE - Optimal Defense Patterns</span>
<span class="file-divider">===========================================</span>

<span class="file-subheader">Tower Placement Efficiency:</span>
- Corner placement: 45% effectiveness
- Center placement: <span class="file-warning">78% effectiveness</span>
- Edge placement: 62% effectiveness

<span class="file-note">But when Twitch chat gets involved...
Chaos multiplier: 2.3x</span>

<span class="file-warning">The pattern emerges when you track:</span>
- Spawn timing
- Tower targeting priority  
- Resource allocation

<span class="file-error">It's not random. It's DELIBERATE.
The chaos has a rhythm.</span>

<span class="file-warning">[Cross-reference with Burger Riot]</span>
<span class="file-note">Same energy as riot mode.
Same unpredictable-but-patterned behavior.

Maybe all tower defense games share this DNA?
Or maybe it's just how I design chaos systems...</span>
`,

    "desktop_village/chat_logs.txt": `<span class="file-header">Twitch Chat Log - Desktop Village Session</span>
<span class="file-divider">==========================================</span>
<span class="file-timestamp">[14:23:15]</span> xXGamer420Xx: !spawn
<span class="file-timestamp">[14:23:17]</span> PuzzleMaster: !buff
<span class="file-timestamp">[14:23:50]</span> NoobSlayer: This is chaos lol

<span class="file-subheader">Pattern Recognition:</span>
<span class="file-note">The timestamps... they're familiar.</span>
<span class="code-block">14:23:15, 14:23:18, 14:23:45, 14:24:03, 14:24:30, 14:24:35</span>

<span class="file-error">Wait.
Those are almost EXACTLY the same as Mana Valley energy_system.log!</span>

<span class="code-block">14:23:11 -> 14:23:15 (4 second offset)
14:23:12 -> 14:23:17 (5 second offset)
14:23:45 -> 14:23:50 (5 second offset)</span>

<span class="file-warning">_ _ _ _ - _ _ _ _ _ - _ _ _ _ _</span>

<span class="file-error">This can't be a coincidence.
The projects are SHARING timing data.

Memory leak confirmed.</span>
`,

    "mana_god/fortress_design.md": `<span class="file-header"># MANA GOD - Fortress Defense Design</span>

<span class="file-subheader">## Core Concept</span>
<span class="file-note">Defend the fortress from hordes of blood-red goblins.
Player is a god. Uses mana. Casts spells.</span>

<span class="file-error">Wait.

MANA.

Mana Valley uses mana as a resource.
Mana God uses mana as a weapon.

They're connected.</span>

<span class="file-subheader">## Energy System</span>
- Mana Pool: <span class="file-warning">100 units</span> (starting)
- Mana Regeneration: <span class="file-warning">5 per second</span>
- Spell Costs: <span class="file-warning">10-50 mana</span>

<span class="file-note">The energy flow... it's the same algorithm.
I literally copied the code from Mana Valley.</span>

<span class="file-warning">But it FEELS different in context.
Tower defense vs resource management.

Same system. Different experience.</span>

<span class="file-header">## Revelation</span>
<span class="file-error">All my games use MANA as the core resource.
Even when I call it something else:</span>
- Energy (Valley)
- Time (Burger Riot)  
- Momentum (Simon's Hallway)
- Resources (Indie Dev)

<span class="file-warning">It's all the same.
It's all CREATIVE ENERGY.</span>
`,

    "mana_god/goblin_ai.txt": `<span class="file-header">GOBLIN AI BEHAVIOR PATTERNS</span>
<span class="file-divider">============================</span>

<span class="file-subheader">Goblin pathfinding algorithm:</span>
1. Identify shortest path to fortress
2. Avoid player spell zones
3. Swarm behavior when in groups

<span class="file-note">But they're not acting randomly.
When I log their spawn coordinates...</span>

<span class="file-subheader">Spawn Pattern (X,Y):</span>
<span class="code-block">(4,13), (1,14), (14,1), (1,14), (13,5)</span>

<span class="file-error">Those coordinates AGAIN.</span>

<span class="file-warning">They're the same as:</span>
- Mana Valley energy pools
- Pixel Labs clone spawn points  
- Desktop Village tower placements

<span class="file-error">Everything is connected through COORDINATES.</span>

<span class="file-warning">[MAJOR HINT]:</span> <span class="file-note">If you're trying to decode position-based puzzles,
this is your Rosetta Stone. The coordinates MEAN something.</span>
`,

    "mana_god/.mana_connection": `<span class="file-header">.mana_connection - Hidden File</span>
<span class="file-divider">================================</span>

<span class="file-error">This file shouldn't exist.
It appeared after I ran the memory diagnostic.</span>

<span class="file-subheader">Contents:</span>
<span class="file-divider">---------</span>
<span class="file-warning">ALL PROJECTS SHARE THE SAME MANA CORE.</span>

<span class="file-note">Energy flows between:</span>
- Mana Valley (source)
- Mana God (weapon)
- Pixel Labs (distribution)
- Indie Dev 500 (persistence)
- Burger Riot (rhythm)
- Simon's Hallway (timing)
- Desktop Village (chaos)

<span class="file-error">They're all aspects of the same thing:
CREATIVE ENERGY FLOWING THROUGH THE DEVELOPER.</span>

<span class="file-warning">The "memory leak" isn't a bug.
It's a FEATURE.</span>

<span class="file-note">My subconscious is connecting all my work.
Finding patterns I didn't consciously design.</span>

<span class="file-warning">Coordinates:</span> <span class="code-block">(4,13) (1,14) (14,1) (1,14)</span>
<span class="file-note">These positions spell something.
Row = Letter number. Column = ???</span>

<span class="file-error">Figure it out. The archive has more clues.</span>
`,

    "suspended/destruction_metrics.csv": `<span class="file-header">Destruction Tracking - Suspended Game</span>
<span class="file-divider">======================================</span>
<span class="file-subheader">Object,Damage,Points,Location</span>
Desk,100,<span class="file-warning">50</span>,Classroom_A
Chair,50,25,Classroom_B  
Window,200,<span class="file-warning">150</span>,Hallway
Locker,150,<span class="file-warning">100</span>,Hallway
Computer,300,<span class="file-warning">250</span>,Lab
Whiteboard,75,40,Classroom_A

<span class="file-warning">Total Chaos Score: 615 points</span>
<span class="file-error">Suspension Days Earned: 6.15 days</span>

<span class="file-subheader">Fun Fact:</span>
<span class="file-note">The chaos calculation algorithm is IDENTICAL to
the riot mode chaos in Burger Riot.</span>

<span class="file-warning">Same code. Different context.
Destruction vs Food Service chaos.</span>

<span class="file-note">When I copy-pasted that code, I didn't realize
I was creating a PATTERN across projects.

The chaos has a signature.
My signature.</span>
`,

    "suspended/school_layout.txt": `<span class="file-header">SCHOOL LAYOUT - Suspended</span>
<span class="file-divider">==========================</span>

<span class="ascii-art">    [Classroom A]--[Hallway]--[Lab]
          |                      |
    [Classroom B]          [Computer Room]
          |                      |
    [Cafeteria]------------[Library]</span>

<span class="file-subheader">Optimal Destruction Route:</span>
<span class="file-warning">Start:</span> Computer Room (high value targets)
<span class="file-warning">Path:</span> Lab -> Hallway -> Classrooms -> Library

<span class="file-note">But players never follow optimal routes.
They follow INTUITION.</span>

<span class="file-error">And their intuition leads them to create PATTERNS.</span>

<span class="file-warning">When I track player destruction heatmaps...
They spell WORDS.</span>

<span class="file-subheader">Top 5 destruction coordinates (Grid X,Y):</span>
<span class="code-block">(2,2) (3,4) (4,3) (6,3) 
(7,4)
(5,3) (5,4) (1,1) (5,4) (2,1)
(7,4) 
(1,1) (3,4) (4,4) (2,4) (1,1)</span>

<span class="file-error">THOSE COORDINATES AGAIN.

The players aren't choosing randomly.
The GAME is guiding them.
Subconsciously.

My code has hidden intent.</span>
`,

    "suspended/chaos_theory.md": `<span class="file-header"># Chaos Theory in Game Design</span>

<span class="file-subheader">## Observation</span>
<span class="file-note">Every game I make has a chaos element:</span>
- Burger Riot: Riot mode
- Suspended: Destruction scoring  
- Desktop Village: Twitch chat interference
- Mana Valley: Energy overflow events

<span class="file-subheader">## Pattern</span>
<span class="file-warning">The chaos follows mathematical patterns.
It LOOKS random but isn't.</span>

<span class="file-subheader">## Realization</span>  
<span class="file-error">I keep implementing the same chaos algorithm.
Different variables. Same structure.</span>

<span class="file-subheader">Pseudocode:</span>
<span class="code-block">\`\`\`
chaos_value = base_value * (1 + random(0.5, 2.0))
if chaos_value > threshold:
    trigger_cascade_event()
\`\`\`</span>

<span class="file-warning">The cascade events trigger at SPECIFIC intervals.
Not random.</span>

<span class="file-note">The intervals match MORSE CODE timing.
- Short pulse: 0.5s
- Long pulse: 2.0s</span>

<span class="file-error">Did I do this on purpose?
Or is my subconscious encoding messages in my games?</span>

<span class="file-warning">[HINT FOR BURGER RIOT PUZZLE]:</span>
<span class="file-note">If you're stuck on the timing puzzle,
remember that chaos has rhythm.
The intervals between chaos events = morse code.</span>
`,

    ".archive/manifest.txt": `<span class="file-header">ARCHIVE MANIFEST - Legacy Projects</span>
<span class="file-divider">===================================</span>
<span class="file-error">Status: CORRUPTED</span>
<span class="file-timestamp">Last Modified: [TIMESTAMP CORRUPTED]</span>

<span class="file-warning">WARNING: Memory leak detected between archived projects
and active development files.</span>

<span class="file-subheader">Projects showing cross-contamination:</span>
- Mana Valley <-> Mana God <span class="file-note">(mana system bleeding)</span>
- Burger Riot <-> Suspended <span class="file-note">(chaos algorithms merged)</span>
- Pixel Labs <-> Desktop Village <span class="file-note">(spawn patterns identical)</span>  
- Simon's Hallway <-> Burger Riot <span class="file-note">(timing systems linked)</span>

<span class="file-warning">Root Cause:</span> Unknown
<span class="file-warning">Recommendation:</span> Full system reset

<span class="file-error">But wait... what if this ISN'T a bug?

What if the projects WANT to connect?
What if there's a message hidden in the connections?</span>

<span class="file-note">See memory_fragments.log for details.</span>

<span class="file-encrypted">[ACCESS LEVEL: Requires solving at least 2 side puzzles]</span>
`,

    ".archive/memory_fragments.log": `<span class="file-header">MEMORY FRAGMENT ANALYSIS</span>
<span class="file-divider">=========================</span>
<span class="file-note">Analyzing cross-project data leaks...</span>

<span class="file-header">Fragment 001: COORDINATE SYSTEM</span>
<span class="file-divider">---------------------------------</span>
<span class="file-warning">Recurring coordinates across all projects:</span>
<span class="file-note">Position (4,13) appears in:</span>
  - Mana Valley energy_system.log
  - Pixel Labs clone_data.csv
  - Mana God goblin_ai.txt
  - Suspended school_layout.txt

<span class="file-note">Position (1,14) appears in:</span>
  - [same files as above]

<span class="file-error">These aren't bugs. They're ANCHORS.
Reference points connecting all projects.</span>

<span class="file-warning">If we treat them as a GRID COORDINATE SYSTEM:</span>
<span class="code-block">Row 4, Column 13 = Letter ?
Row 1, Column 14 = Letter ?</span>

<span class="file-note">Using 1-indexed grid where A=1, B=2...
Row 4 = D
Row 1 = A  
Column 13 = M
Column 14 = N</span>

<span class="file-warning">But how do we combine them?</span>
<span class="file-note">(Row, Column) = (D,M)? DM?
Or Column, Row = (M,D)? MD?</span>

<span class="file-header">Fragment 002: TIMING PATTERNS</span>  
<span class="file-divider">-------------------------------</span>
<span class="file-warning">All projects share timing signatures:</span>
- 0.5s intervals <span class="file-note">(SHORT)</span>
- 1.0s intervals <span class="file-note">(MEDIUM)</span>
- 2.0s intervals <span class="file-note">(LONG)</span>

<span class="file-subheader">Morse code mapping:</span>
<span class="file-warning">SHORT = . (dot)
LONG = - (dash)  
MEDIUM = (letter separator)</span>

<span class="code-block">Simon's Hallway timing: . - . . - . -
Burger Riot timestamps: - . - - . . - .
Suspended chaos events: . . - . - - .</span>

<span class="file-error">These spell words when decoded properly.</span>

<span class="file-header">Fragment 003: THE CONNECTION</span>
<span class="file-divider">-----------------------------</span>
<span class="file-warning">All projects are connected through:</span>
1. Shared coordinate system
2. Shared timing patterns
3. Shared MANA/energy algorithms

<span class="file-subheader">Hypothesis:</span>
<span class="file-error">The developer's subconscious created a META-PUZZLE
spanning all their games.</span>

<span class="file-warning">The individual games are CHAPTERS.
Together, they tell a complete story.</span>

<span class="file-header">Fragment 004: THE MESSAGE</span>
<span class="file-divider">--------------------------</span>
<span class="file-encrypted">[CORRUPTED - Requires all 3 main puzzles solved]</span>

<span class="file-header">Fragment 005: YOUR ROLE</span>
<span class="file-divider">------------------------</span>
<span class="file-note">You're not just solving puzzles.
You're reconstructing the developer's creative journey.</span>

<span class="file-warning">Every coordinate is a brushstroke.
Every timing pattern is a rhythm.
Every energy system is a heartbeat.</span>

<span class="file-error">The games are alive.
And they're speaking to you.</span>
`
};
    
    console.log('Filesystem loaded with', Object.keys(fileSystem).length, 'files');
}

// Command handlers
const commands = {
    help: () => {
        let helpText = `
Available commands:
  help     - Show this help message
  ls       - List files in current directory  
  cat      - Display file contents (usage: cat <filename>)
  cd       - Change directory (usage: cd <directory>)
  clear    - Clear the terminal screen
  session  - Show your unique session ID

<span class="success">➤ GETTING STARTED:</span>
  1. Type 'ls' to see available projects
  2. Type 'cd mana_valley' to enter a project
  3. Type 'cat concept.txt' to read files
  4. Look for patterns, hex codes, and hidden clues
  5. Type 'verify <CODE>' when you find a solution
  
<span class="warning">➤ TIP: Use arrow keys (↑/↓) to navigate command history</span>`;
        
        if (gameState.terminalUnlocked) {
            helpText += `
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
        
        // If we're in a subdirectory and the path doesn't contain '/', prepend current directory
        if (!filePath.includes('/') && gameState.currentDir !== '~') {
            filePath = gameState.currentDir.replace('~/', '') + '/' + filePath;
        }
        
        console.log('Attempting to read file:', filePath); // Debug line
        console.log('Available files:', Object.keys(fileSystem)); // Debug line
        
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
            if (path.endsWith(fileName) || path.includes(fileName)) {
                suggestions.push(path);
            }
        }
        
        if (suggestions.length > 0) {
            return `Error: File '${args[0]}' not found\n\n<span class="warning">Did you mean:</span>\n${suggestions.slice(0, 5).map(s => `  cat ${s}`).join('\n')}`;
        }
        
        return `Error: File '${args[0]}' not found\n\n<span class="success">Tip: Use "ls" to see available files, or try "cat project_name/filename"</span>\n\nCurrent directory: ${gameState.currentDir}`;
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
        // Removed the terminalUnlocked check entirely
        
        if (!args[0] || args[0] === '~') {
            gameState.currentDir = '~';
            return 'Changed directory to ~\n\n<span class="success">Tip: Type "ls" to see available projects</span>';
        }
        
        // Handle cd .. to go back
        if (args[0] === '..') {
            gameState.currentDir = '~';
            return 'Changed directory to ~';
        }
        
        const project = args[0].replace('/', '');
        const fullProject = args[0].startsWith('.') ? args[0] : project;
        
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
            unlockedCommands.push('grep', 'decode', 'verify');
            return `<span class="success">✓ MANA VALLEY SOLVED!</span>

Terminal access granted.
New commands unlocked: grep, decode, verify
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
        const expectedKey = `FLOW_STATE_ALPHA_HOTSTOVE_${sessionId.toUpperCase()}`;
        
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
    console.log('%c🔮 VEDAIA Developer Terminal', 'color: #00ff00; font-size: 20px; font-weight: bold;');
    console.log('%cYou found the console! But the real puzzles are in the terminal...', 'color: #00aa00;');
    console.log('%cHint: The hex values in the files are important.', 'color: #006600;');
    console.log('%cHint: Patterns exist across multiple files.', 'color: #006600;');
    console.log('%cHint: Side projects contain hints for main puzzles.', 'color: #006600;');
    console.log('%cHint: Your session ID is part of the final answer.', 'color: #006600;');
    console.log(`%cYour Session: ${sessionId}`, 'color: #00ff00; font-weight: bold;');
});
