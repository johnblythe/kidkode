---
date: 2026-03-04
topic: boss-battle-quiz
issue: "#5"
---

# Boss Battle Quiz UI

## What We're Building
Transform the quiz section into an RPG boss battle. Each lesson has a unique code-themed boss. Quiz answers are attack moves — correct answer = effective spell, wrong answer = fizzle + boss counterattack. Player has HP too — lose it all and you go back to study.

## Why This Approach
Quizzes-as-battles makes learning feel like gameplay, not school. Per-lesson bosses reinforce the topic (Merge Conflict Hydra, Permission Denied Golem). The "choose your attack" framing means the kid is playing a game, not taking a test.

## Key Decisions

### Boss Design
- **Per-lesson bosses**: each lesson has a unique creature tied to the topic
- **Code-themed with classic RPG flavor**: Merge Conflict Hydra, Syntax Error Demon, etc.
- **Boss data lives in lesson content**: name, sprite, HP, attack names, defeat text

### Battle Mechanics
- **Attack selection**: quiz options styled as attack moves (spell names, icons)
- **Correct answer**: effective hit, boss takes damage, satisfying animation
- **Wrong answer**: fizzle/dud, boss counterattacks, player takes damage
- **Boss HP**: depletes proportionally per correct answer (e.g., 5 questions = 20% per hit)
- **Player HP**: depletes on wrong answers. Amount TBD but ~3 wrong = death
- **Boss defeated**: victory animation → unlock flow
- **Player defeated**: "Study Up!" review screen

### Death/Retry Flow
- On player death: show targeted review screen
- Highlights which topics were missed (based on wrong answers)
- "Study Up" button jumps back to relevant lesson sections
- After review: retry battle with boss at full HP, player at full HP

### Visual Style
- **SVG for boss sprites**: attempt first, pivot to PNG sprite sheets if too hard
- **SVG/CSS for UI**: health bars, damage numbers, attack effects
- **CSS keyframes for animation**: idle bob, damage shake, attack lunge, death fade
- **Framer-motion for transitions**: screen shake, damage numbers floating up

## Boss Roster (initial)

| Lesson | Boss | Concept |
|--------|------|---------|
| Git: Save Points | Merge Conflict Hydra | Multi-headed beast representing diverging code |
| Git: Branches | The Rebase Wraith | Ghost that rewrites history |
| Terminal | Permission Denied Golem | Stone guardian blocking access |
| Client/Server | The 404 Phantom | Creature that can't be found |
| Databases | The Null Pointer | Void creature that consumes data |
| Sync vs Async | The Callback Serpent | Snake that tangles execution order |

## Open Questions
- SVG sprite complexity — how detailed can we get before it's a time sink? Will prototype one and evaluate.
- Player HP amount — need to playtest. 3 wrong = death might be too harsh with 5 questions.

## Next Steps
→ Depends on #4 (audio system) for battle music/SFX
→ Prototype one boss SVG (Merge Conflict Hydra) to validate the visual approach
→ Build battle UI shell, then plug in per-lesson bosses
