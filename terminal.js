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
        "mana_valley/concept.txt": `
MANA VALLEY - Core Concept Document
====================================
Date: 2023-04-15
Status: ACTIVE DEVELOPMENT

Core Mechanic: Resource management meets exploration
Theme: Energy as a living, flowing entity

The player must balance:
- Mana collection (primary resource)
- Valley expansion (territory control)  
- Entity relationships (diplomacy/combat)

DESIGN PILLARS:
1. Flow - Energy should feel alive
2. Choice - Multiple paths to victory
3. Consequence - Actions ripple through the valley

Color Palette Research:
Primary: #4D414E (Deep Purple)
Secondary: #416E4D (Forest Green)
Accent: #4E4D41 (Earthen Brown)
Highlight: #41454E (Storm Blue)

Notes: The hex values aren't just colors...
`,

        "mana_valley/design_doc.md": `
# Mana Valley Design Document

## Energy System Architecture

\`\`\`
Energy Flow Model:
Source -> Conduit -> Storage -> Application

Energy Types:
- Raw Mana (harvested)
- Refined Mana (processed)
- Corrupted Mana (unstable)
\`\`\`

## World Building

The valley exists in multiple states simultaneously.
Players experience different "frequencies" of reality.

Frequency Codes (for debug):
- F1: Physical realm
- F2: Energy realm  
- F3: ???

Internal dev note: Check commit SHA 5f3759df for frequency shader code

## Cross-Project Notes
Strange... the mana flow patterns match the clone distribution in Pixel Labs.
Is there a connection? Check .archive for memory fragments.
`,

        "mana_valley/energy_system.log": `
[2023-04-15 14:23:11] Energy flow initialized
[2023-04-15 14:23:12] Mana pools spawned: 12
[2023-04-15 14:23:45] Player collected mana: +50 units
[2023-04-15 14:24:03] Conversion rate: 1.0 -> 1.2 (BOOSTED)
[2023-04-15 14:24:30] Mana overflow detected
[2023-04-15 14:24:31] Emergency containment: ACTIVE
[2023-04-15 14:24:35] System stabilized

[ERROR] Unusual pattern in collection sequence:
Positions: (4,13), (1,14), (14,1), (1,14)
Cross-reference with hex color values in concept doc?

[2023-04-15 14:25:00] Session ended normally
`,

        "mana_valley/.hidden_notes": `
Dev Notes (Personal - DO NOT COMMIT)
====================================

The mana system is more than a game mechanic.
It's about FLOW. It's about CONNECTION.

When I look at the energy patterns, I see something:
The way mana moves between pools... it's not random.

It's like the game is trying to tell us something.

Hex values from concept art -> ASCII chars:
4D 41 4E 41 = M A N A
41 4E 53 57 45 52 = ?

The answer is in the energy flow coordinates.
Grid position (row, col) from energy_system.log...

This is crazy. I'm seeing patterns that shouldn't exist.
But what if they're real?

Verification code for terminal access: FLOW_STATE_ALPHA

P.S. If you're stuck on the rhythm puzzle later, check Simon's Hallway.
Directions and timing... they're related.
`,

        "burger_riot/playtest_report.txt": `
BURGER RIOT - Playtesting Session #47
=====================================
Date: 2023-06-22
Build: v0.8.3-alpha

PLAYTESTER: Mike K.
Session Duration: 23 minutes

Timestamp Log:
00:00 - Game start, tutorial skipped
00:15 - First burger assembled
00:43 - Customer #1 satisfied
01:12 - Speed boost activated
01:58 - "Riot mode" triggered (chaos event)
02:34 - Multi-order juggling (3 simultaneous)
03:11 - First failure (burnt burger)
03:45 - Recovery, back to normal speed
04:23 - High score achieved: 1,250 points

BUGS FOUND:
- Burger sometimes clips through counter
- Sound effect delay on "perfect" orders
- Riot mode difficulty spike too harsh

NOTES:
Mike mentioned the game has a "rhythm" to it.
The timestamps feel musical? Need to analyze.

[INTERNAL]: Check riot_trigger_sequence.wav
Pattern analysis suggests morse-like intervals...

Funny coincidence: The chaos in riot mode feels similar to 
the destruction mechanics in Suspended. Same energy, different context.
`,

        "burger_riot/bug_log.dat": `
BUG DATABASE - BURGER RIOT
=========================

BUG-001: Physics glitch in burger assembly
Severity: LOW
Status: FIXED

BUG-002: Audio desync during riot mode  
Severity: MEDIUM
Status: INVESTIGATING

The audio desync is weird. It's like there's a PATTERN:
Long pause, short pause, short, long, short, long...

Wait, that's not a bug. That's MORSE CODE.

Decoded from riot mode sound gaps:
... --- ... (SOS? No, wait...)

Actually decoded (using riot mode timestamp intervals):
- .... --- - (HOT)
... - --- ...- . (STOVE)

Password for next level: HOTSTOVE? 

BUG-003: Customer AI pathfinding error
Severity: LOW  
Status: BACKLOG

[ENCRYPTED SECTION - Use 'decrypt' command with key]
U2FsdGVkX1+vupppZksvRf5pq5g5XjFRlipRkwB0K1Y=
`,

        "burger_riot/timestamp_analysis.csv": `
Time,Event,Duration,Interval
00:15,burger_complete,2.3s,-
00:43,customer_served,1.8s,28s
01:12,boost_start,0.5s,29s
01:58,riot_begin,3.1s,46s
02:34,multi_juggle,2.7s,36s
03:11,first_fail,1.2s,37s
03:45,recovery,0.8s,34s
04:23,high_score,2.1s,38s

Pattern Analysis:
Intervals between events: 28,29,46,36,37,34,38
Modulo 26 (for alphabet): 2,3,20,10,11,8,12
ASCII offset +64: B,C,T,J,K,H,L

Hmm, not quite right. Try different offset?
What if we use +72? Then: J,K,\\,R,S,P,T

Still gibberish. The pattern must be elsewhere...
Or maybe the DURATION column?
2.3, 1.8, 0.5, 3.1, 2.7, 1.2, 0.8, 2.1
Multiplied by 10: 23,18,5,31,27,12,8,21
Mod 26: 23,18,5,5,1,12,8,21
+65: W,R,E,E,A,L,H,U

Still doesn't make sense. Need more coffee...
Or maybe need to look at Desktop Village defense patterns?
`,

        "indie_dev_500/README.txt": `
INDIE DEV 500 - The Journey
============================

A game about making games.
500 days of development.
1 developer.
Infinite coffee.

This project is a love letter to the indie dev grind.
Every mechanic represents a real struggle:
- Resource management = Time & money
- Random events = Life happening  
- Tech tree = Learning new skills
- Boss battles = Crunch time

The game tracks YOUR actual play sessions.
It knows when you're struggling.
It adapts.

TO DECRYPT THE DEV JOURNAL:
1. Find the encryption key (it's hidden in the other projects)
2. Use the decrypt_tool.sh script
3. Prepare yourself for the truth

Hint: The key is made of ANSWERS you've already found.

Note: The archive folder has strange memory fragments.
They talk about connections between all the projects.
Maybe that's the real final puzzle?
`,

        "indie_dev_500/dev_journal.enc": `
-----BEGIN ENCRYPTED JOURNAL-----
Day 1-100: [ENCRYPTED]
U2FsdGVkX19K3vNHGSc4bGAHN2yTpKSqE+vMQhP5rWE=

Day 101-200: [ENCRYPTED]  
U2FsdGVkX1+2Jz8vK4cX9fYqHbR+pqKsE9kPxHm8Gf0=

Day 201-300: [ENCRYPTED]
U2FsdGVkX1/Hk9mR4pFx2NbQ+KzPqjRsT8vXnYm3Dc4=

Day 301-400: [ENCRYPTED]
U2FsdGVkX1+Ym2nT5qGy4OcR+LzQskUtV9wYoZn4Ee8=

Day 401-500: [PARTIALLY READABLE]
I can't believe I made it. 500 days.
The game is done. But something happened...

All my projects started... connecting.
The mana system from Valley.
The rhythm from Riot.  
The persistence from Dev500.

They're all the same game.
They've ALWAYS been the same game.

The core truth: [REQUIRES FULL DECRYPTION]

To unlock this, you need the MASTER_KEY.
Combine the solutions from:
- Mana Valley answer
- Burger Riot password
- Your session verification code

Format: VALLEY_RIOT_[SESSION_ID]
-----END ENCRYPTED JOURNAL-----
`,

        "indie_dev_500/decrypt_tool.sh": `
#!/bin/bash
# Decryption Tool for Dev Journal
# Usage: ./decrypt_tool.sh <encrypted_file> <key>

decrypt() {
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
}

# The real decryption happens when you submit the final passphrase
# This tool is just a hint to the puzzle structure

echo "Hint: Look at the hex values. Look at the intervals."
echo "Hint: The answer flows through all projects."
echo "Hint: Your unique session is part of the key"
`,

        "pixel_labs/lab_blueprints.txt": `
PIXEL LABS - Laboratory Design
================================
Project Status: ARCHIVED
Last Modified: 2022-11-08

Purpose: Create automated lab to supply clones for various game systems

LAB LAYOUT:
+---+---+---+---+
| A | B | C | D |
+---+---+---+---+
| E | F | G | H |
+---+---+---+---+
| I | J | K | L |
+---+---+---+---+

Clone Distribution Pattern:
Row 1: Management & Control
Row 2: Production & Processing
Row 3: Storage & Distribution

Optimal flow: A->E->I (vertical cascade)
But somehow clones prefer: A->B->F->G->K (diagonal?)

This pattern... it matches something.
Check clone_data.csv for coordinates.
`,

        "pixel_labs/clone_data.csv": `
CloneID,SpawnX,SpawnY,Efficiency,Notes
C001,4,1,87%,First generation
C002,1,2,92%,Improved genome
C003,6,2,89%,Standard production
C004,4,1,91%,Duplicate spawn point?
C005,1,2,94%,High performer

Wait, these coordinates...
(4,1), (1,2), (6,2), (4,1), (1,2)

If this is a grid reference system...
And if we convert to letters (A=1, B=2, etc)...

4,1 = D,A
1,2 = A,B
6,2 = F,B
4,1 = D,A  
1,2 = A,B

DA BA FB DA BA?

Or maybe it's row,col for a keyboard layout?
Or... coordinate system for Mana Valley energy pools?

This is connected to the main puzzle somehow.
`,

        "pixel_labs/research_notes.md": `
# Research Log - Clone Efficiency

## Discovery
The clones aren't just following programmed paths.
They're exhibiting emergent behavior.

## Pattern Recognition
When I map their movement patterns, they form LETTERS.
Not random. Intentional.

## Hypothesis
The lab simulation is leaking data from other projects.
The clones are trying to communicate something.

## Hint for Future Me
If you're stuck on coordinate systems in other projects,
remember: Everything is connected through position data.

Row 4, Column 13 = ?
Row 1, Column 14 = ?

Think GRID. Think ASCII. Think LETTERS.
`,

        "simons_hallway/direction_log.txt": `
SIMON'S HALLWAY - Playtesting Directions
=========================================
Game: Follow verbal directions or die trying
Difficulty: Brutal

Test Session #23:
-----------------
Direction 1: "FORWARD 3 steps"
Direction 2: "TURN LEFT"
Direction 3: "FORWARD 5 steps"  
Direction 4: "TURN RIGHT"
Direction 5: "BACKWARD 2 steps"
Direction 6: "TURN LEFT"
Direction 7: "FORWARD 1 step"

Player died at Direction 5. Again.

The timing between directions matters.
- Short pause: 0.5s
- Medium pause: 1.0s
- Long pause: 2.0s

Pause Pattern (in seconds):
0.5, 2.0, 0.5, 0.5, 2.0, 0.5, 2.0

That's: SHORT, LONG, SHORT, SHORT, LONG, SHORT, LONG

Wait... is that MORSE CODE?
Short = dot (.)
Long = dash (-)

Pattern: . - . . - . -

If I decode that... 
No wait, I need letter boundaries.

Ugh, I'm overthinking this.
But it FEELS like the rhythm puzzle in Burger Riot.
Same energy. Pattern-based thinking.
`,

        "simons_hallway/failure_analysis.dat": `
FAILURE ANALYSIS - Simon's Hallway
===================================

Most Common Death Points:
1. Direction 5 (Backward movement) - 67% deaths
2. Direction 7 (Final step) - 21% deaths  
3. Direction 3 (Forward 5) - 12% deaths

Analysis:
Players struggle with TIMING more than direction.
The game isn't about spatial awareness.
It's about RHYTHM and PATTERN RECOGNITION.

Recommendation: Add visual metronome?
Or accept that this is a rhythm game disguised as a puzzle game.

[DEV NOTE]: 
The morse code interpretation was right.
If you break the directions into beats...
And map the pause durations to dots and dashes...

You get a MESSAGE.

But I'm not going to spoil it here.
Figure it out yourself, future puzzle solver.

Hint: Combine this with the timestamp intervals
from Burger Riot. They're the SAME TYPE of puzzle.
`,

        "simons_hallway/.corridor_map": `
     N
     |
 W---+---E
     |
     S

START: Center position
GOAL: North exit

Successful Path Sequence:
F F F L F F F F F R B B L F

F=Forward, L=Left, R=Right, B=Back

But that's not the puzzle.
The puzzle is the RHYTHM of the commands.

Time between commands (ms):
500, 2000, 500, 1000, 500, 2000, 1000, 500

Convert to beats:
Short (500ms) = .
Long (2000ms) = -  
Medium (1000ms) = (space between letters)

. - . (space) . - (space) . 

Morse Code:
E (.) T (-)? No...

Actually:
First group: . - . = R
Second group: . - = A

RA? 
Or keep going with more sessions?

[HIDDEN HINT: This helps decode Burger Riot timestamps]
`,

        "desktop_village/twitch_integration.js": `
// Desktop Village - Twitch Chat Integration
// Tower Defense with Chat Control

const chatCommands = {
    '!spawn': spawnEnemy,
    '!buff': buffPlayer,
    '!debuff': debuffPlayer,
    '!chaos': triggerChaosEvent
};

// Chat Pattern Analysis
// Discovered something weird...

const messageCounts = {
    'Session 1': 42,
    'Session 2': 17,
    'Session 3': 89,
    'Session 4': 34,
    'Session 5': 76
};

// If I convert these to hex...
// 42 = 2A
// 17 = 11  
// 89 = 59
// 34 = 22
// 76 = 4C

// Then ASCII: * (garbage?) Y " L

// Or maybe it's about DEFENSE PATTERNS?
// Check defense_patterns.txt
`,

        "desktop_village/defense_patterns.txt": `
DESKTOP VILLAGE - Optimal Defense Patterns
===========================================

Tower Placement Efficiency:
- Corner placement: 45% effectiveness
- Center placement: 78% effectiveness
- Edge placement: 62% effectiveness

But when Twitch chat gets involved...
Chaos multiplier: 2.3x

The pattern emerges when you track:
- Spawn timing
- Tower targeting priority  
- Resource allocation

It's not random. It's DELIBERATE.
The chaos has a rhythm.

[Cross-reference with Burger Riot]
Same energy as riot mode.
Same unpredictable-but-patterned behavior.

Maybe all tower defense games share this DNA?
Or maybe it's just how I design chaos systems...
`,

        "desktop_village/chat_logs.txt": `
Twitch Chat Log - Desktop Village Session
==========================================
[14:23:15] xXGamer420Xx: !spawn
[14:23:18] PuzzleMaster: !buff
[14:23:45] NoobSlayer: This is chaos lol
[14:24:03] CuteKitten88: !chaos  
[14:24:30] xXGamer420Xx: !spawn !spawn !spawn
[14:24:35] ModeratorBot: Slow down!

Pattern Recognition:
The timestamps... they're familiar.
14:23:15, 14:23:18, 14:23:45, 14:24:03, 14:24:30, 14:24:35

Wait.
Those are almost EXACTLY the same as Mana Valley energy_system.log!

14:23:11 -> 14:23:15 (4 second offset)
14:23:12 -> 14:23:18 (6 second offset)

This can't be a coincidence.
The projects are SHARING timing data.

Memory leak confirmed.
`,

        "mana_god/fortress_design.md": `
# MANA GOD - Fortress Defense Design

## Core Concept
Defend the fortress from hordes of blood-red goblins.
Player is a god. Uses mana. Casts spells.

Wait.

MANA.

Mana Valley uses mana as a resource.
Mana God uses mana as a weapon.

They're connected.

## Energy System
- Mana Pool: 100 units (starting)
- Mana Regeneration: 5 per second
- Spell Costs: 10-50 mana

The energy flow... it's the same algorithm.
I literally copied the code from Mana Valley.

But it FEELS different in context.
Tower defense vs resource management.

Same system. Different experience.

## Revelation
All my games use MANA as the core resource.
Even when I call it something else:
- Energy (Valley)
- Time (Burger Riot)  
- Momentum (Simon's Hallway)
- Resources (Indie Dev)

It's all the same.
It's all CREATIVE ENERGY.
`,

        "mana_god/goblin_ai.txt": `
GOBLIN AI BEHAVIOR PATTERNS
============================

Goblin pathfinding algorithm:
1. Identify shortest path to fortress
2. Avoid player spell zones
3. Swarm behavior when in groups

But they're not acting randomly.
When I log their spawn coordinates...

Spawn Pattern (X,Y):
(4,13), (1,14), (14,1), (1,14), (13,5)

Those coordinates AGAIN.

They're the same as:
- Mana Valley energy pools
- Pixel Labs clone spawn points  
- Desktop Village tower placements

Everything is connected through COORDINATES.

[MAJOR HINT]: If you're trying to decode position-based puzzles,
this is your Rosetta Stone. The coordinates MEAN something.
`,

        "mana_god/.mana_connection": `
.mana_connection - Hidden File
================================

This file shouldn't exist.
It appeared after I ran the memory diagnostic.

Contents:
---------
ALL PROJECTS SHARE THE SAME MANA CORE.

Energy flows between:
- Mana Valley (source)
- Mana God (weapon)
- Pixel Labs (distribution)
- Indie Dev 500 (persistence)
- Burger Riot (rhythm)
- Simon's Hallway (timing)
- Desktop Village (chaos)

They're all aspects of the same thing:
CREATIVE ENERGY FLOWING THROUGH THE DEVELOPER.

The "memory leak" isn't a bug.
It's a FEATURE.

My subconscious is connecting all my work.
Finding patterns I didn't consciously design.

Coordinates: (4,13) (1,14) (14,1) (1,14)
These positions spell something.
Row = Letter number. Column = ???

Figure it out. The archive has more clues.
`,

        "suspended/destruction_metrics.csv": `
Destruction Tracking - Suspended Game
======================================
Object,Damage,Points,Location
Desk,100,50,Classroom_A
Chair,50,25,Classroom_B  
Window,200,150,Hallway
Locker,150,100,Hallway
Computer,300,250,Lab
Whiteboard,75,40,Classroom_A

Total Chaos Score: 615 points
Suspension Days Earned: 6.15 days

Fun Fact:
The chaos calculation algorithm is IDENTICAL to
the riot mode chaos in Burger Riot.

Same code. Different context.
Destruction vs Food Service chaos.

When I copy-pasted that code, I didn't realize
I was creating a PATTERN across projects.

The chaos has a signature.
My signature.
`,

        "suspended/school_layout.txt": `
SCHOOL LAYOUT - Suspended
==========================

    [Classroom A]--[Hallway]--[Lab]
          |                      |
    [Classroom B]          [Computer Room]
          |                      |
    [Cafeteria]------------[Library]

Optimal Destruction Route:
Start: Computer Room (high value targets)
Path: Lab -> Hallway -> Classrooms -> Library

But players never follow optimal routes.
They follow INTUITION.

And their intuition leads them to create PATTERNS.

When I track player destruction heatmaps...
They spell WORDS.

Top 5 destruction coordinates (Grid X,Y):
(4,13), (1,14), (14,1), (1,14), (8,9)

THOSE COORDINATES AGAIN.

The players aren't choosing randomly.
The GAME is guiding them.
Subconsciously.

My code has hidden intent.
`,

        "suspended/chaos_theory.md": `
# Chaos Theory in Game Design

## Observation
Every game I make has a chaos element:
- Burger Riot: Riot mode
- Suspended: Destruction scoring  
- Desktop Village: Twitch chat interference
- Mana Valley: Energy overflow events

## Pattern
The chaos follows mathematical patterns.
It LOOKS random but isn't.

## Realization  
I keep implementing the same chaos algorithm.
Different variables. Same structure.

Pseudocode:
\`\`\`
chaos_value = base_value * (1 + random(0.5, 2.0))
if chaos_value > threshold:
    trigger_cascade_event()
\`\`\`

The cascade events trigger at SPECIFIC intervals.
Not random.

The intervals match MORSE CODE timing.
- Short pulse: 0.5s
- Long pulse: 2.0s

Did I do this on purpose?
Or is my subconscious encoding messages in my games?

[HINT FOR BURGER RIOT PUZZLE]:
If you're stuck on the timing puzzle,
remember that chaos has rhythm.
The intervals between chaos events = morse code.
`,

        ".archive/manifest.txt": `
ARCHIVE MANIFEST - Legacy Projects
===================================
Status: CORRUPTED
Last Modified: [TIMESTAMP CORRUPTED]

WARNING: Memory leak detected between archived projects
and active development files.

Projects showing cross-contamination:
- Mana Valley <-> Mana God (mana system bleeding)
- Burger Riot <-> Suspended (chaos algorithms merged)
- Pixel Labs <-> Desktop Village (spawn patterns identical)  
- Simon's Hallway <-> Burger Riot (timing systems linked)

Root Cause: Unknown
Recommendation: Full system reset

But wait... what if this ISN'T a bug?

What if the projects WANT to connect?
What if there's a message hidden in the connections?

See memory_fragments.log for details.

[ACCESS LEVEL: Requires solving at least 2 side puzzles]
`,

        ".archive/memory_fragments.log": `
MEMORY FRAGMENT ANALYSIS
=========================
Analyzing cross-project data leaks...

Fragment 001: COORDINATE SYSTEM
---------------------------------
Recurring coordinates across all projects:
Position (4,13) appears in:
  - Mana Valley energy_system.log
  - Pixel Labs clone_data.csv
  - Mana God goblin_ai.txt
  - Suspended school_layout.txt

Position (1,14) appears in:
  - [same files as above]

These aren't bugs. They're ANCHORS.
Reference points connecting all projects.

If we treat them as a GRID COORDINATE SYSTEM:
Row 4, Column 13 = Letter ?
Row 1, Column 14 = Letter ?

Using 1-indexed grid where A=1, B=2...
Row 4 = D
Row 1 = A  
Column 13 = M
Column 14 = N

But how do we combine them?
(Row, Column) = (D,M)? DM?
Or Column, Row = (M,D)? MD?

Fragment 002: TIMING PATTERNS  
-------------------------------
All projects share timing signatures:
- 0.5s intervals (SHORT)
- 1.0s intervals (MEDIUM)
- 2.0s intervals (LONG)

Morse code mapping:
SHORT = . (dot)
LONG = - (dash)  
MEDIUM = (letter separator)

Simon's Hallway timing: . - . . - . -
Burger Riot timestamps: - . - - . . - .
Suspended chaos events: . . - . - - .

These spell words when decoded properly.

Fragment 003: THE CONNECTION
-----------------------------
All projects are connected through:
1. Shared coordinate system
2. Shared timing patterns
3. Shared MANA/energy algorithms

Hypothesis:
The developer's subconscious created a META-PUZZLE
spanning all their games.

The individual games are CHAPTERS.
Together, they tell a complete story.

Fragment 004: THE MESSAGE
--------------------------
[CORRUPTED - Requires all 3 main puzzles solved]

Fragment 005: YOUR ROLE
------------------------
You're not just solving puzzles.
You're reconstructing the developer's creative journey.

Every coordinate is a brushstroke.
Every timing pattern is a rhythm.
Every energy system is a heartbeat.

The games are alive.
And they're speaking to you.
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
