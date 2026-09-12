export const PROTOCOL = {
  title: "The Song-to-Sealed-Decree Protocol",
  kicker: "Field guide · Terminal 09X",
  charge: "Architecting transmissions. Refusing the harvest.",
  status: "Unsealed // for independent operators",
  issued: "27 April 2024",
  hash: "8A2F.C1D9.5E7B",
  terminal: "Lyte Sketch 143 / JAWNBRYTE / Chief Prince",
  origin: "Skid Row · self-directed",
  lock: "The file is the evidence. The hash is the lock.",
  proof: "Signal without proof is just noise with confidence.",
  close:
    "The seal is not artificial permanence. It is a boundary around a living work. It demands that each part perform its actual function, without apology, leaving a traceable lineage of truth.",
  motto: "Protection is temporary. Empowerment is permanent.",
  porch: "The porch light is on.",
  suffering:
    "If you're going to suffer, you better get something out of it.",
  preface:
    "Built from a zero-point reset on Skid Row. Not corporate strategy. Survival tactics translated into sovereign architecture. It rejects the passive wait for external rescue in favor of self-directed, independent operating codes.",
  response:
    "A reaction lets the first emotion make the decision. A response creates space to see clearly.",
  sealMeans:
    "A release is not sealed to make it untouchable. It is sealed to make its origin, form, and responsibility legible. A sealed release can still be remixed or remastered — those later works must be named honestly as new editions rather than silently replacing the original archive.",
  coreRule:
    "A visible pending field tells the truth. It is safer than a made-up answer.",
} as const;

export const PROTOCOL_TOC = [
  { id: "hardship", label: "Hardship" },
  { id: "circuit", label: "Circuit" },
  { id: "matrix", label: "Matrix" },
  { id: "house", label: "House" },
  { id: "stages", label: "Seven" },
  { id: "verify", label: "Hash" },
  { id: "ready", label: "Readiness" },
  { id: "cases", label: "Cases" },
] as const;

export const HARDSHIP = {
  n: "00",
  title: "The architecture of hardship",
  code: "PROTOCOL_ZERO::INITIATION",
  registry: "SUFFERING_UTILIZATION_PROTOCOL",
} as const;

export const CRASH_CIRCUIT = [
  {
    n: "01",
    t: "Capture",
    d: "Locate and isolate the draining signal.",
  },
  {
    n: "02",
    t: "Rupture",
    d: "Introduce precise counter-frequency.",
  },
  {
    n: "03",
    t: "Anchor",
    d: "Plant a new coherent baseline.",
  },
  {
    n: "04",
    t: "Seal",
    d: "Close remaining entry points.",
  },
  {
    n: "05",
    t: "Hold",
    d: "Maintain the field under pressure.",
  },
] as const;

export const MATRIX = [
  {
    axis: "Output",
    harvest: "Disposable content object",
    decree: "Living transmission",
  },
  {
    axis: "Goal",
    harvest: "Algorithmic reach",
    decree: "Signal resonance",
  },
  {
    axis: "Versioning",
    harvest: "Endless silent revisions",
    decree: "Immutable sealed editions",
  },
  {
    axis: "Value",
    harvest: "Extraction of attention and consent",
    decree: "Return of agency and empowerment",
  },
] as const;

export const HOUSE = [
  {
    n: "001",
    t: "Empowerment",
    d: "Empowerment over gatekeeping. Independent operating codes, not artist dependence.",
    code: "IND-OPS",
  },
  {
    n: "002",
    t: "Signal integrity",
    d: "Signal integrity over reach. Durable work over disposable vanity metrics.",
    code: "DURABLE_WORK",
  },
  {
    n: "003",
    t: "Intentional friction",
    d: "Discovery stays organic. Force active choice over passive consumption.",
    code: "ACTIVE_CHOICE",
  },
  {
    n: "004",
    t: "Earned authority",
    d: "Ground the work in craft, lived experience, and accountable execution.",
    code: "CRAFT+EXPERIENCE",
  },
] as const;

export const STAGES7 = [
  {
    n: "01",
    t: "Inspiration",
    k: "Lived spark",
    d: "The lived spark, pressure, or memory. Preserve the human starting point before the language of the rollout takes over.",
  },
  {
    n: "02",
    t: "Refinement",
    k: "Craft",
    d: "Writing, mixing, mastering, and visual design. If unresolved, status remains IN REFINEMENT.",
  },
  {
    n: "03",
    t: "Declaration",
    k: "Intent",
    d: "The operational sequence. What is the work specifically designed to express or do? Binding operational language.",
  },
  {
    n: "04",
    t: "Authentication",
    k: "Fingerprint",
    d: "Bind creative identity to technical reality. Exact title, artist, date, edition, format — and a SHA-256 from the authoritative master.",
  },
  {
    n: "05",
    t: "Registry",
    k: "Ledger",
    d: "A durable ledger line: TITLE-MASTER-V1-DATE. Independence from the changing structures of third-party platforms.",
  },
  {
    n: "06",
    t: "Decree",
    k: "Vow",
    d: "The central statement of intent. A plain-language vow of what the transmission asks, exposes, or protects. The release's reason for being.",
  },
  {
    n: "07",
    t: "Seal",
    k: "Closure",
    d: "Close the authoritative edition. A promise of clarity. Any future file with a different fingerprint is a different edition — or it is noise.",
  },
] as const;

export const LOCK_INPUTS = [
  { t: "Audio", d: "The authoritative master. The file is the evidence." },
  { t: "Metadata", d: "Title, artist, date, edition, format — named, not guessed." },
  { t: "Intent", d: "The decree. What the transmission asks, exposes, or protects." },
] as const;

export const HASH_STEPS = [
  {
    n: "01",
    t: "Hold the file",
    d: "The hash is of exact bytes. Not the song. Not the title. The file. WAV is not MP3. A tagged export is not the master.",
  },
  {
    n: "02",
    t: "Fingerprint it",
    d: "SHA-256 reads the whole file and returns 64 hex characters. Same bytes always produce the same fingerprint. One flipped bit produces a different one. There is no useful reverse.",
  },
  {
    n: "03",
    t: "Compare to the ledger",
    d: "Match the published SHA-256 character for character. Match = sealed edition. Mismatch = a different edition, a transcode, a tamper — or noise.",
  },
] as const;

export const READY_CHECKS = [
  {
    id: "master",
    t: "One authoritative master identified?",
  },
  {
    id: "edition",
    t: "Exact title and edition label correct?",
  },
  {
    id: "decree",
    t: "Decree specific (no placeholder language)?",
  },
  {
    id: "copy",
    t: "Safe copy of submitted master retained?",
  },
] as const;

export const SEQUENCE = [
  "Expose",
  "Indict",
  "Liberate",
  "Resist",
  "Observe",
  "Rebuild",
] as const;

export const CASES = [
  {
    slug: "phantom-protocol",
    n: "01",
    context:
      "Public wire 3 September 2026. The first Lyte Sketch 143 release to carry the complete sealed record in public view. Not a content drop — a frequency strike. Expose → Indict → Liberate. Forged 29 August 2026 at 03:46:05 UTC. SHA-256 bound. 41,080,492 bytes. Ground truth.",
  },
  {
    slug: "i-wont-do-that",
    n: "02",
    context:
      "The porch-light vow, locked 10 September 2026. Dual transmission. Love can have the war. It cannot have the frequency. Witnessed on this device.",
  },
] as const;
