export const VOYAGE = {
  url: "https://voyagela.com/interview/conversations-with-john-zwack/",
  outlet: "VoyageLA",
  kicker: "Interview series",
  title: "Conversations with John Zwack",
  pull: "I refused to stay weak. I burned the old version of myself to the ground and rose as Chief Prince.",
  issues: [
    {
      id: "light-work",
      src: "/press/voyage-light-work.jpg",
      masthead: "The Vision Keeper",
      title: "Light Work",
      deck: "A new era of energy, expression, and legacy. Inside the rise of JAWNBRYTE.",
    },
    {
      id: "run-it-back",
      src: "/press/voyage-run-it-back.jpg",
      masthead: "Issue 01 // 2025",
      title: "Run It Back",
      deck: "JAWNBRYTE × STRYDER. He sent the signal. I broke through.",
    },
  ],
} as const;

export type VoyageIssueId = (typeof VOYAGE.issues)[number]["id"];
