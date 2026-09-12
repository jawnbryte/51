export const HARVEST = {
  kicker: "Schematic 01",
  title: "The mill",
  long: "Digital soul harvesting mechanics",
  charge: "The harvest requires your participation as current.",
  dead: "Become a dead wire they cannot meter.",
  preface:
    "Classification is four faces sharing a banquet. The mill is a sequence. Handlers build the pen. Farmers stampede the herd. Harvesters drain it. Vampires take the signature. The Grid meters the yield and buys a better cage. Hunt the function, not the costume.",
  close:
    "You are not a consumer in this diagram. You are the current. Cut the circuit and the farm has nothing to meter.",
} as const;

export const PAYLOADS = [
  {
    t: "Attention",
    d: "First-hour scroll. The new oil. If it harvests the morning, it owns the day.",
    stage: "capture",
  },
  {
    t: "Emotion",
    d: "Outrage, despair, the theater of being perpetually almost-awake.",
    stage: "fragment",
  },
  {
    t: "Erotic voltage",
    d: "Pleasure leaked to an audience. Life force that never returns to the body.",
    stage: "drain",
  },
  {
    t: "Consent",
    d: "The signature they graze on. Yes spoken while the spine said leave.",
    stage: "contract",
  },
] as const;

export type HarvestStageId =
  | "capture"
  | "fragment"
  | "drain"
  | "contract"
  | "yield";

export type HarvestStage = {
  id: HarvestStageId;
  n: string;
  verb: string;
  face: string;
  role: string;
  attack: string;
  loop: string;
  counter: string;
  sig: string;
  slug?: string;
  field: string;
};

export const STAGES: HarvestStage[] = [
  {
    id: "capture",
    n: "01",
    verb: "Capture",
    face: "Digital Slave Handlers",
    role: "Build the pen",
    attack:
      "Algorithms, infinite scroll, engineered addiction, A/B-tested helplessness. Attention is piped before the self arrives. The feed never ends.",
    loop: "A body that never arrives cannot refuse. The pen fills itself.",
    counter:
      "Audit the feed. Name every loop that owns the morning — scroll, outrage, porn-as-anesthetic, guru drip. Cut or cage it.",
    sig: "The feed that never ends and the self that never arrives.",
    slug: "digital-slave-handlers",
    field: "01",
  },
  {
    id: "fragment",
    n: "02",
    verb: "Fragment",
    face: "Energy Farmers",
    role: "Stampede the herd",
    attack:
      "Manufactured drama, conflict, and division. Consciousness is kept scattered so it cannot cohere into power. Culture-war ranchers. Outrage brokers.",
    loop: "Scattered voltage cannot be defended. A stampeded herd is easy to drain.",
    counter:
      "Starve on purpose. Skip the drama bait. Do not complete their circuit. Become a dead wire they cannot meter.",
    sig: "You are always against someone and never with yourself.",
    field: "05",
  },
  {
    id: "drain",
    n: "03",
    verb: "Drain",
    face: "Soul Harvesters",
    role: "Extract the essence",
    attack:
      "Institutional and energetic mill. Churches of despair, platforms of outrage, clinics of permanent patienthood. Frequency held low and fragmented so the yield stays liquid.",
    loop: "You leave every encounter thinner than you entered. Thinner bodies walk back into the pen.",
    counter:
      "Return the voltage. Move the body. Sing out loud. Sleep like sabotage. Pleasure that does not leak to an audience is reclaimed life force.",
    sig: "You leave every encounter thinner than you entered.",
    slug: "digital-soul-harvesters",
    field: "03",
  },
  {
    id: "contract",
    n: "04",
    verb: "Contract",
    face: "Consent Vampires",
    role: "Take the signature",
    attack:
      "They do not force. They seduce agreement. Guilt, false intimacy, manufactured obligation. The mill is legalized inside the nervous system.",
    loop: "A signed yes keeps the current flowing even after the feed is named.",
    counter:
      "Withdraw unclean yes. Nullify in speech, then in schedule. They die of hunger when you stop explaining yourself.",
    sig: "You said yes while your body said leave.",
    field: "02",
  },
  {
    id: "yield",
    n: "05",
    verb: "Yield",
    face: "The Grid",
    role: "Meter the oil",
    attack:
      "Attention, emotion, erotic voltage, and consent are refined into targeting. Yield buys a tighter pen, a louder stampede, a hungrier mill. The banquet funds itself.",
    loop: "Output becomes input. The cage learns your shape.",
    counter:
      "Lock to the Refined Ones. Small. Real. Unperformative. When enough nodes lock coherence, the harvesters can no longer feed. Isolated lights get eaten. A grid does not.",
    sig: "The Grid loses yield. That is the only metric that matters.",
    field: "06",
  },
];

export const MILL_KEY = "jawnbryte:mill";
export const FIELD_KEY = "jawnbryte:extraction";

export function millYield(feeding: number, fieldSeated: number) {
  const t = feeding / STAGES.length;
  return Math.max(4, Math.round(9 + t * 78) - fieldSeated * 4);
}
