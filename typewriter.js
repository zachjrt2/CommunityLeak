// Load filesystem - embedded data
async function loadFileSystem() {
    fileSystem = {
        "mana_valley/concept.txt": `
MANA VALLEY - Core Concept Document
====================================
Date: 2019-04-15
Status: ACTIVE DEVELOPMENT

Core Mechanic: Resource management meets exploration
Theme: Energy as a living, flowing entity
Inspiration: Stardew Valley, Breath of the Wild

The player must balance:
- Mana collection (primary resource)
- Valley exploration (finding new plaves)  
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
- .... --- -
... - --- ...- .

Password for next level? 

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
A race to be remembered.
7 developers.
Infinite coffee.

This project is a love letter to the indie dev grind.
Every bot made by a contestent represents a real struggle:
- Resource management = Time & complexity
- Physics Unpredictabilaty = Life happening  
- Node structure = Learning new skills
- Time Limit = Crunch time

The game was built to break you.
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
remember: Everything is connected through <span class="rotating-word" data-words="position|location|placement|coordinate">position</span> data.

Row 4, Column 13 = ?
Row 1, Column 14 = ?

Think GRID. Think <span class="rotating-word" data-words="ASCII|UNICODE|BINARY|HEX">ASCII</span>. Think <span class="rotating-word" data-words="LETTERS|NUMBERS|SYMBOLS|WORDS">LETTERS</span>.
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

Hint: Combine this with the <span class="rotating-word" data-words="timestamp|duration|interval|timing">timestamp</span> intervals
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
Short (<span class="rotating-word" data-words="500ms|250ms|100ms|1000ms">500ms</span>) = .
Long (<span class="rotating-word" data-words="2000ms|1000ms|3000ms|500ms">2000ms</span>) = -  
Medium (1000ms) = (space between letters)

. - . (space) . - (space) . 

Morse Code:
E (.) T (-)? No...

Actually:
First group: . - . = R
Second group: . - = A

RA? 
Or keep going with more sessions?

[HIDDEN HINT: This helps decode Burger Riot <span class="rotating-word" data-words="timestamps|durations|intervals|patterns">timestamps</span>]
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

Everything is connected through <span class="rotating-word" data-words="COORDINATES|POSITIONS|LOCATIONS|GRIDS">COORDINATES</span>.

[MAJOR HINT]: If you're trying to decode <span class="rotating-word" data-words="position|location|coordinate|grid">position</span>-based puzzles,
this is your Rosetta Stone. The coordinates <span class="rotating-word" data-words="MEAN|ENCODE|SPELL|HIDE">MEAN</span> something.
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
These <span class="rotating-word" data-words="positions|coordinates|points|locations">positions</span> spell something.
<span class="rotating-word" data-words="Row|Column|X|Y">Row</span> = Letter number. Column = ???

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

The cascade events trigger at SPECIFIC <span class="rotating-word" data-words="intervals|durations|timings|periods">intervals</span>.
Not random.

The intervals match <span class="rotating-word" data-words="MORSE|BINARY|ASCII|HEX">MORSE</span> CODE timing.
- Short pulse: <span class="rotating-word" data-words="0.5s|1.0s|0.25s|2.0s">0.5s</span>
- Long pulse: <span class="rotating-word" data-words="2.0s|1.0s|3.0s|0.5s">2.0s</span>

Did I do this on purpose?
Or is my subconscious encoding messages in my games?

[HINT FOR BURGER RIOT PUZZLE]:
If you're stuck on the timing puzzle,
remember that chaos has <span class="rotating-word" data-words="rhythm|pattern|timing|structure">rhythm</span>.
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
    
    // Initialize rotating words after a short delay
    setTimeout(initRotatingWords, 100);
}

function initRotatingWords() {
    setInterval(() => {
        const rotatingElements = document.querySelectorAll('.rotating-word');
        rotatingElements.forEach(el => {
            const words = el.getAttribute('data-words').split('|');
            const currentText = el.textContent;
            const currentIndex = words.indexOf(currentText);
            const nextIndex = (currentIndex + 1) % words.length;
            el.textContent = words[nextIndex];
        });
    }, 3000); // Rotate every 3 seconds
}
