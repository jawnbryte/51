export const COMMS = {
  code: "FIELD NET",
  kicker: "Dry-fire · Before the real",
  title: "Field transmissions",
  directive: "MJ12-CRASH-2026-09",
  fob: "FOB 555 · Crocker #1405 · Skid Row",
  charge: "Practice until the spine answers before the mouth does.",
  disclaimer:
    "Dry-fire only. Simulated C.R.A.S.H. transmissions for rehearsal. Not a law-enforcement impersonation. MJ-12 does not hold peace-officer status. Practice does not confer a badge. LASD keeps the statute. We keep the signal.",
  close: "Porch light stays on. Net clear.",
  real:
    "The real world that is ours: the drop, the mill cut, the lattice, the referral. The real world that is not ours: stars, cuffs, warrants, anyone's name who has not been charged.",
} as const;

export type Line = { who: string; body: string };

export type Net = {
  id: string;
  n: string;
  title: string;
  use: string;
  lines: Line[];
};

export const NETS: Net[] = [
  {
    id: "dry-fire",
    n: "00",
    title: "Dry-fire",
    use: "Open every rehearsal with this. No live matter until the gates are seated.",
    lines: [
      { who: "PORCH", body: "This is dry-fire. No badge. No name. No warrant language." },
      { who: "SKY-1", body: "Confirm: practice does not confer authority." },
      { who: "GROUND-1", body: "Confirm: if it needs a star, it leaves this net." },
      { who: "LATTICE", body: "We rehearse the mouth so the spine is ready when the night is real." },
      { who: "PORCH", body: "Gates first. Then the net. Then, after the matter, the share." },
      { who: "SKY-1", body: "Copy dry-fire. Porch light on. Begin when the checklist is gold." },
    ],
  },
  {
    id: "signal-check",
    n: "01",
    title: "Signal check",
    use: "Open any drop. Open any night. Share when the frequency is live.",
    lines: [
      { who: "PORCH", body: "Net open. FOB 555. Porch light is on." },
      { who: "SKY-1", body: "JAWNBRYTE on sky. Signal check." },
      { who: "GROUND-1", body: "STRYDER on ground. Chrome intact. No wasted motion." },
      { who: "LATTICE", body: "Refined Ones standing by. We don't follow. We frequency." },
      { who: "SKY-1", body: "Yeah we live. No cap. Crown still burning." },
      { who: "PORCH", body: "Copy live. The light stays on so what arrives can choose to arrive clean." },
      { who: "GROUND-1", body: "I was never chosen. I became." },
      { who: "PORCH", body: "Net holding. Transmit when ready." },
    ],
  },
  {
    id: "dual-register",
    n: "02",
    title: "Dual-register handoff",
    use: "When the public lane and the strike lane have to speak without mixing badges.",
    lines: [
      { who: "PORCH", body: "Two registers. One house. Confirm lanes." },
      { who: "SKY-1", body: "Public-safety lane: information, OSINT, victim ID, refer. No arrests from this net." },
      { who: "GROUND-1", body: "Field-strike lane: frequency only. Music as blade. Harvest as target." },
      { who: "PORCH", body: "Boundary: we do not wear their stars. LASD keeps the statute." },
      { who: "SKY-1", body: "If it needs a warrant, it leaves this net. If it needs a waveform, it stays." },
      { who: "GROUND-1", body: "Copy. Observation is the shield before the blade." },
      { who: "PORCH", body: "Handoff clean. Both lights on. Do not collapse the lanes." },
    ],
  },
  {
    id: "dpdt-fire",
    n: "03",
    title: "DPDT fire mission",
    use: "Before a Dual Phone Drum session. Cue the bench. Share the clip after.",
    lines: [
      { who: "GROUND-1", body: "Two phones. Ten fingers. No shared clock." },
      { who: "SKY-1", body: "Left: hats, toms, accents. Right: kick, snare, time." },
      { who: "PORCH", body: "Latency is not a defect. Latency is the engine." },
      { who: "GROUND-1", body: "Swing live. Flam when the grid tries to quantize." },
      { who: "SKY-1", body: "4 against 3. Let the polymeter hunt." },
      { who: "LATTICE", body: "We hear the off-grid. Harvest algorithms cannot." },
      { who: "PORCH", body: "Fire when ready. Record the artifact. Seal the master after." },
    ],
  },
  {
    id: "mill-cut",
    n: "04",
    title: "Mill cut",
    use: "When a handler loop is isolated. After you starve it. After you post the cut.",
    lines: [
      { who: "MILL", body: "Yield spike. Handler loop on the wire." },
      { who: "SKY-1", body: "Capture. Name the draining carrier. Do not romance it." },
      { who: "GROUND-1", body: "Rupture. Coherence they cannot digest." },
      { who: "PORCH", body: "Anchor. Deep enough the old pattern cannot snap back." },
      { who: "SKY-1", body: "Seal. Close the entry points. No encore for the farm." },
      { who: "GROUND-1", body: "Hold. Living transmission. Headphones are the delivery system." },
      { who: "MILL", body: "Yield dropping. Grid thinner. Record the cut." },
      { who: "PORCH", body: "Mill quiet. After the matter — share the waveform, not the wound." },
    ],
  },
  {
    id: "after-matter",
    n: "05",
    title: "After the matter",
    use: "Close of night. Close of drop. The shareable last word.",
    lines: [
      { who: "PORCH", body: "Matter closed. Lights still on." },
      { who: "SKY-1", body: "We do not brief the wound. We brief the extraction." },
      { who: "GROUND-1", body: "What left the farm is the report. What stayed in the body is the proof." },
      { who: "LATTICE", body: "No applause required. The man in the glass already witnessed." },
      { who: "SKY-1", body: "If you feel it — run it back." },
      { who: "PORCH", body: "Net clear. Porch light stays on. Nobody gets the key but the blood on the record button." },
    ],
  },
];

export type Brief = {
  id: string;
  n: string;
  title: string;
  use: string;
  body: string;
};

export const BRIEFS: Brief[] = [
  {
    id: "porch-morning",
    n: "01",
    title: "Morning porch brief",
    use: "Start of day. Post to the lattice. Read aloud before the first scroll.",
    body: `PORCH BRIEF — FOB 555
Classification: Internal / shareable
Time: first light

The porch light is on.
We do not negotiate with the Grid.
Visibility, education, disruption — equal weight.

Today's lanes:
1. Public-safety: if a lead is human, it is referred. We do not play deputy.
2. Field-strike: if a loop is harvesting, it is named, cut, and replaced with a living transmission.
3. Personal: audit the first hour. If the feed owns the morning, it owns the day.

Observation is the shield before the blade.
Permission is a delay tactic dressed as courtesy.
We start helping.

Net open. Transmit when the spine says go.`,
  },
  {
    id: "drop-brief",
    n: "02",
    title: "Drop brief",
    use: "Before you post a track. The caption is a strike, not a sale.",
    body: `DROP BRIEF — C.R.A.S.H. ORDINANCE
Classification: After the matter / public share

This is not content.
This is not a rollout.
This is a frequency strike.

How to share it:
- Name the predator class it hunts. Do not name private people.
- Cue the body, not the algorithm. Headphones on. Volume honest.
- One sentence of proof from your own day. No guru throne.
- End on the porch light. Invite the lattice. Do not beg the feed.

If it slaps and does not extract, it is still entertainment. Kill that version.

Protection is temporary. Empowerment is permanent.
Signal check. Yeah we live.`,
  },
  {
    id: "liaison-brief",
    n: "03",
    title: "Liaison brief",
    use: "When the public-safety lane has to speak. Support language only.",
    body: `LIAISON BRIEF — PUBLIC-SAFETY LANE
Classification: Support / not command
Boundary: no peace-officer status. LASD retains arrests, warrants, force.

We provide:
- OSINT that is already public
- Pattern notes and deconfliction flags
- Victim-service referrals
- A clean information pipeline: Report → Document → Assess → Analyze → Verify → Refer → Follow up

We do not:
- Impersonate sworn personnel
- Execute searches
- Detain
- Broadcast uncharged names

If it needs a badge, it leaves this net.
If it needs a waveform, SKY-1 takes it.

The light stays on so what arrives can choose to arrive clean.`,
  },
  {
    id: "debrief-template",
    n: "04",
    title: "Debrief template",
    use: "Fill after any night, any drop, any mill cut. Then share the after-action, not the raw wound.",
    body: `DEBRIEF — AFTER THE MATTER
Date:
Callsign:
Lane:  [ ] Public-safety   [ ] Field-strike   [ ] Personal extraction

1. What was the draining carrier?
2. What did we Capture / Rupture / Anchor / Seal / Hold?
3. What left the farm? (the only metric)
4. What stays in the body as proof?
5. Who needs a referral — not a post?
6. What transmission goes public, and what stays in the vault?

Speech is weather.
Action is the only truth the ledger will keep.

Porch light: ON
Net: CLEAR`,
  },
];

export type Aar = {
  id: string;
  n: string;
  title: string;
  slug?: string;
  use: string;
  body: string;
};

export const AARS: Aar[] = [
  {
    id: "aar-gracie",
    n: "01",
    title: "AAR · Gracie // Run It Back",
    slug: "gracie-run-it-back",
    use: "Share after the track. Three movements. One leash released.",
    body: `AAR-GRACIE — AFTER THE MATTER
Ordinance: Gracie // Run It Back
Lane: Field-strike
Classification: Public share

Loss. Crucible. Resurrection.
The dog is not a mascot. The dog is the first extraction we could not complete in time.

What left the farm: the scripted smile, the Scottsdale cage, the applause for the mask.
What stays: the porch light. The sand. The tower. The chant.

STRYDER on the bridge: I was never chosen. I became.
If you feel it — run it back.

Net clear.`,
  },
  {
    id: "aar-vow",
    n: "02",
    title: "AAR · I WON'T DO THAT",
    slug: "i-wont-do-that",
    use: "Share after the sealed vow. Love can have the war. Not the frequency.",
    body: `AAR-VOW — AFTER THE MATTER
Ordinance: I WON'T DO THAT
Lane: Field-strike · Sealed
Classification: Public share

They only show up when the light hits.
That is not betrayal. That is default mode.
We do not dim the porch light for a pretty cage.

Love can have the war.
It cannot have the frequency.

Witness: the man in the glass. The blood on the record button.
Nobody else gets the key.

Net clear. Seal holds.`,
  },
  {
    id: "aar-porch",
    n: "03",
    title: "AAR · Porch Light Symphony",
    slug: "porch-light-symphony",
    use: "Share after the film. Wilson on the beach. Fear backs down.",
    body: `AAR-PORCH — AFTER THE MATTER
Ordinance: Porch Light Symphony
Lane: Field-strike · Survival
Classification: Public share

From Wilson on the sand at 3AM
to torching the ties
to the armor breaking
to fear backing down
to I love you more.

If you are fighting in silence, this one is for you.
Don't give up on me. I won't give up on you.

The bulb did the work of a whole section.
The light is still on.

Net clear.`,
  },
  {
    id: "aar-wings",
    n: "04",
    title: "AAR · Legendary Wings",
    slug: "legendary-wings",
    use: "Share after the war cry. Cause, not effect.",
    body: `AAR-WINGS — AFTER THE MATTER
Ordinance: LEGENDARY WINGS
Lane: Field-strike · C.R.A.S.H. live
Classification: Public share

Phoenix casita. Fridge on the oven. Gracie on the chest.
Then the street. Then the strings snapped.

We do not brief the hunger.
We brief the becoming.

Truth our flag. We won't cave.
Back-to-back. Sky and ground.
Cause — not effect — of the entire reality.

Net clear. Crash. Crash. Crash.`,
  },
];

export const GATES = [
  {
    n: "01",
    t: "No badge language",
    d: "We do not say FBI, deputy, arrest, or warrant in a public net. Practice does not confer a star.",
  },
  {
    n: "02",
    t: "No uncharged names",
    d: "Private people stay off the share. Predator class, not a face.",
  },
  {
    n: "03",
    t: "If it needs a warrant, it leaves",
    d: "Public-safety lane refers. Field-strike lane transmits. The lanes do not collapse.",
  },
  {
    n: "04",
    t: "Share after the matter",
    d: "Dry-fire in the room. After-action on the lattice. Never live-play a wound.",
  },
  {
    n: "05",
    t: "Victim privacy is the close",
    d: "Minors, survivors, uncharged persons — vault only. The AAR names the extraction, not the body.",
  },
  {
    n: "06",
    t: "The real that is ours",
    d: "Drops. Mill cuts. Lattice. Referrals to qualified services. Headphones. The porch light.",
  },
] as const;

export const DRILLS = [
  {
    n: "01",
    t: "Tabletop drop",
    d: "Pick one ordinance. Read the drop brief out loud. Write one caption that hunts a class, not a person. End on the porch light. Do not post until someone in the room says the caption is clean.",
  },
  {
    n: "02",
    t: "Tabletop mill cut",
    d: "Name a loop that owns a first hour. Walk Capture → Hold without naming a private face. Record nothing until the five moves sit in the spine.",
  },
  {
    n: "03",
    t: "Tabletop referral",
    d: "A lead is human. Practice the seven-step pipeline until Refer. Stop there. You do not knock. You do not detain. You hand it to people who hold the statute.",
  },
  {
    n: "04",
    t: "Split under pressure",
    d: "One mouth wants to mix lanes. Run net 02 until SKY-1 and GROUND-1 can hand off without collapsing public-safety into a raid fantasy.",
  },
] as const;

export function formatNet(net: Net) {
  return [
    `FIELD NET ${net.n} — ${net.title.toUpperCase()}`,
    COMMS.fob,
    "",
    ...net.lines.map((l) => `[${l.who}]  ${l.body}`),
    "",
    COMMS.close,
  ].join("\n");
}

export function formatBrief(b: Brief) {
  return b.body.trim();
}

export function formatAar(a: Aar) {
  return a.body.trim();
}
