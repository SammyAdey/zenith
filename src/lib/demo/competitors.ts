export type CompetitorId =
  | "zenith"
  | "gtco"
  | "access"
  | "firstbank"
  | "opay"
  | "moniepoint"
  | "palmpay"
  | "mtn"

export type CompetitorSegment = "bank" | "fintech" | "telco"

export type CompetitorProfile = {
  id: CompetitorId
  name: string
  short: string
  segment: CompetitorSegment
  color: string
  reputationScore: number
  shareOfVoice: number
  netSentiment: number
  advocacy: number
  trust: number
  innovation: number
  service: number
  mentionVolume24h: number
  weekChange: number
}

export const competitors: CompetitorProfile[] = [
  {
    id: "zenith",
    name: "Zenith Bank",
    short: "Zenith",
    segment: "bank",
    color: "#ed1c24",
    reputationScore: 72,
    shareOfVoice: 18,
    netSentiment: 12,
    advocacy: 71,
    trust: 78,
    innovation: 66,
    service: 61,
    mentionVolume24h: 1456,
    weekChange: -2,
  },
  {
    id: "gtco",
    name: "GTCO",
    short: "GTCO",
    segment: "bank",
    color: "#f15a22",
    reputationScore: 74,
    shareOfVoice: 14,
    netSentiment: 8,
    advocacy: 69,
    trust: 76,
    innovation: 72,
    service: 68,
    mentionVolume24h: 1280,
    weekChange: 1,
  },
  {
    id: "access",
    name: "Access Bank",
    short: "Access",
    segment: "bank",
    color: "#ef7d00",
    reputationScore: 68,
    shareOfVoice: 12,
    netSentiment: -4,
    advocacy: 62,
    trust: 70,
    innovation: 64,
    service: 58,
    mentionVolume24h: 1194,
    weekChange: -1,
  },
  {
    id: "firstbank",
    name: "FirstBank",
    short: "FirstBank",
    segment: "bank",
    color: "#0033a0",
    reputationScore: 70,
    shareOfVoice: 10,
    netSentiment: 2,
    advocacy: 65,
    trust: 80,
    innovation: 54,
    service: 63,
    mentionVolume24h: 980,
    weekChange: 0,
  },
  {
    id: "opay",
    name: "OPay",
    short: "OPay",
    segment: "fintech",
    color: "#00a651",
    reputationScore: 69,
    shareOfVoice: 13,
    netSentiment: 6,
    advocacy: 74,
    trust: 58,
    innovation: 82,
    service: 70,
    mentionVolume24h: 1520,
    weekChange: 3,
  },
  {
    id: "moniepoint",
    name: "Moniepoint",
    short: "Moniepoint",
    segment: "fintech",
    color: "#0b1f3a",
    reputationScore: 71,
    shareOfVoice: 12,
    netSentiment: 9,
    advocacy: 76,
    trust: 62,
    innovation: 80,
    service: 73,
    mentionVolume24h: 1388,
    weekChange: 2,
  },
  {
    id: "palmpay",
    name: "PalmPay",
    short: "PalmPay",
    segment: "fintech",
    color: "#6c2bd9",
    reputationScore: 65,
    shareOfVoice: 9,
    netSentiment: 1,
    advocacy: 68,
    trust: 52,
    innovation: 78,
    service: 64,
    mentionVolume24h: 1102,
    weekChange: 1,
  },
  {
    id: "mtn",
    name: "MTN Nigeria",
    short: "MTN",
    segment: "telco",
    color: "#ffcc00",
    reputationScore: 67,
    shareOfVoice: 12,
    netSentiment: -2,
    advocacy: 60,
    trust: 64,
    innovation: 70,
    service: 55,
    mentionVolume24h: 1640,
    weekChange: -3,
  },
]

export const perceptionAttributes = [
  { key: "trust" as const, label: "Trust & stability" },
  { key: "innovation" as const, label: "Digital innovation" },
  { key: "service" as const, label: "Service quality" },
  { key: "advocacy" as const, label: "Advocacy / NPS proxy" },
]

export const competitiveThemes = [
  {
    theme: "Digital banking reliability",
    leader: "GTCO",
    zenithRank: 2,
    insight:
      "GTCO leads positive digital chatter; Zenith recovery narrative is closing the gap after USSD praise.",
  },
  {
    theme: "Payments & cards",
    leader: "Moniepoint",
    zenithRank: 5,
    insight:
      "Agent-banking fintechs own POS reliability talk; Zenith is most exposed on declines among deposit banks.",
  },
  {
    theme: "Mobile money / wallet",
    leader: "OPay",
    zenithRank: 4,
    insight:
      "OPay and PalmPay dominate wallet convenience narrative; banks trail on speed-to-cash perception.",
  },
  {
    theme: "USSD & airtime adjacency",
    leader: "MTN",
    zenithRank: 3,
    insight:
      "MTN frames connectivity + MoMo adjacency; Zenith USSD recovery helps but still shares airtime/fraud chatter with telco.",
  },
  {
    theme: "Community / CSR",
    leader: "Zenith",
    zenithRank: 1,
    insight:
      "SME academy and women-in-banking content give Zenith clear share-of-voice ownership vs banks and fintechs.",
  },
  {
    theme: "Investor / earnings narrative",
    leader: "Zenith",
    zenithRank: 1,
    insight:
      "Pre-earnings coverage frames Zenith NIM and deposit franchise constructively vs peers.",
  },
  {
    theme: "Branch / agent experience",
    leader: "Moniepoint",
    zenithRank: 4,
    insight:
      "Moniepoint agent praise outpaces bank branch talk; Lagos VI queue complaints drag Zenith.",
  },
]

export const headToHeadNarratives = [
  {
    competitor: "GTCO",
    zenithAdvantage: "Stronger CSR / community equity and investor narrative this cycle.",
    competitorAdvantage: "Cleaner digital reliability perception and slightly higher reputation score.",
    publicView:
      "Audiences see both as tier-1 digital banks; Zenith is associated with community investment, GTCO with slicker app experience.",
  },
  {
    competitor: "Access",
    zenithAdvantage: "Higher trust and advocacy; less negative net sentiment overall.",
    competitorAdvantage: "Broader pan-African brand mentions dilute single-incident focus.",
    publicView:
      "Zenith is viewed as more stable domestically; Access draws more mixed service chatter this week.",
  },
  {
    competitor: "FirstBank",
    zenithAdvantage: "Leads on innovation perception and share of voice among heritage banks.",
    competitorAdvantage: "Heritage trust scores remain very high among older retail segments.",
    publicView:
      "FirstBank owns ‘heritage/trust’; Zenith owns ‘modern retail + CSR’ in current conversation.",
  },
  {
    competitor: "OPay",
    zenithAdvantage: "Far stronger trust, deposit-franchise credibility and CSR equity.",
    competitorAdvantage: "Wins on wallet convenience, youth advocacy and innovation buzz.",
    publicView:
      "Public splits ‘serious banking’ (Zenith) vs ‘instant payments / cash-out’ (OPay). Cross-over risk when POS/USSD fails.",
  },
  {
    competitor: "Moniepoint",
    zenithAdvantage: "Institutional trust and investor narrative; deeper product suite beyond agents.",
    competitorAdvantage: "Owns agent-banking reliability and SME merchant advocacy this week.",
    publicView:
      "Merchants praise Moniepoint settlement speed; Zenith is still the default for salaries and wealth, but loses micro-merchant mindshare.",
  },
  {
    competitor: "PalmPay",
    zenithAdvantage: "Trust, service depth and regulatory stature as a deposit bank.",
    competitorAdvantage: "Aggressive rewards and wallet UX keep younger users engaged.",
    publicView:
      "PalmPay is framed as promotional and convenient; Zenith as safe but slower for everyday micro-payments.",
  },
  {
    competitor: "MTN",
    zenithAdvantage: "Banking licence trust and earnings narrative; clearer financial-services positioning.",
    competitorAdvantage: "Massive reach, USSD ubiquity and MoMo adjacency in payments conversation.",
    publicView:
      "MTN is the pipe; Zenith is the bank. Shared USSD/fraud chatter means telco outages or scams can splash onto Zenith perception.",
  },
]

export const competitiveBrief = {
  title: "Competitive perception brief — 12 Oct 2026",
  body: "Zenith leads deposit-bank share of voice (18%) in a widened set that includes OPay, Moniepoint, PalmPay and MTN, but trails GTCO on reputation score and loses payments/agent narratives to fintechs. Public conversation frames Zenith as strong on community investment and earnings resilience, while POS friction and wallet convenience gaps are the clearest competitive vulnerabilities this week.",
  bullets: [
    "Defend: publish payments clarity before Moniepoint/OPay reliability praise widens the merchant gap",
    "Amplify: SME academy / women-in-banking — Zenith’s clearest owned narrative vs banks and fintechs",
    "Watch: MTN USSD/fraud chatter can migrate onto bank brands sharing the same rails",
    "Opportunity: PalmPay and OPay lead innovation buzz but lag trust — contrast Zenith deposit safety",
    "Peer banks: GTCO still edges digital reliability; Access negative sentiment remains an industry spillover risk",
  ],
}

export const sentimentTrend = [
  {
    day: "Mon",
    Zenith: 14,
    GTCO: 10,
    Access: 2,
    FirstBank: 4,
    OPay: 7,
    Moniepoint: 8,
    PalmPay: 3,
    MTN: 1,
  },
  {
    day: "Tue",
    Zenith: 13,
    GTCO: 9,
    Access: 0,
    FirstBank: 3,
    OPay: 6,
    Moniepoint: 9,
    PalmPay: 2,
    MTN: 0,
  },
  {
    day: "Wed",
    Zenith: 15,
    GTCO: 11,
    Access: -1,
    FirstBank: 5,
    OPay: 8,
    Moniepoint: 10,
    PalmPay: 4,
    MTN: -1,
  },
  {
    day: "Thu",
    Zenith: 11,
    GTCO: 8,
    Access: -3,
    FirstBank: 2,
    OPay: 5,
    Moniepoint: 7,
    PalmPay: 1,
    MTN: -2,
  },
  {
    day: "Fri",
    Zenith: 10,
    GTCO: 9,
    Access: -5,
    FirstBank: 1,
    OPay: 6,
    Moniepoint: 9,
    PalmPay: 2,
    MTN: -3,
  },
  {
    day: "Sat",
    Zenith: 12,
    GTCO: 8,
    Access: -4,
    FirstBank: 2,
    OPay: 7,
    Moniepoint: 8,
    PalmPay: 1,
    MTN: -2,
  },
  {
    day: "Sun",
    Zenith: 12,
    GTCO: 8,
    Access: -4,
    FirstBank: 2,
    OPay: 6,
    Moniepoint: 9,
    PalmPay: 1,
    MTN: -2,
  },
]
