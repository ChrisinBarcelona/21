/* PROJECT — the content of one case study.

   This is the whole input to the template. Every chapter, method and body
   below is data; nothing in the page hard-codes this project. To publish a
   different study, replace this file.

   Image paths point at assets/case/ and are expected to be missing for a
   study that has not been shot yet — GlassImage drops the <img> on error,
   so an unfilled board still renders as composed glass tiles. */
(function () {
  const PROJECT = {
    kicker: "Case Study",
    title: "Locker Room",
    summary:
      "Beachgoers in Barcelona have nowhere safe to leave a bag. We tested whether a network of attended, app-booked lockers on the sand could work as a business before building anything.",
    liveHref: "#prototype",
    liveLabel: "Jump to the prototype",
    meta: [
      { label: "Role", value: "UX & Product" },
      { label: "Timeline", value: "9 weeks" },
      { label: "Team", value: "Three" },
      { label: "Platform", value: "iOS & Web" }
    ],

    chapters: [
      {
        id: "discovery",
        number: 1,
        name: "Discovery",
        icon: "Search",
        summary: "Establishing that the problem is real, expensive, and not already solved.",
        methods: [
          {
            method: "Problem Statement",
            title: "A day at the beach costs you the beach",
            type: "prose",
            data: {
              statement:
                "Visitors either carry everything into the water with them, take turns watching the pile, or simply go somewhere else.",
              paragraphs: [
                "Barcelona's beaches take roughly seven million visits a year, and almost none of that shoreline offers anywhere to leave a bag. The result is a small, constant tax on the day: one of the group always stays behind, phones go into the sea in a dry bag, and anyone travelling alone stays out of the water entirely.",
                "Theft reporting bears this out. Beach thefts cluster in the first fifty metres of sand, and the overwhelming majority are opportunistic — an unattended bag, taken in seconds, while the owner is twenty metres away in the water."
              ]
            }
          },
          {
            method: "Long Term Goal",
            title: "Hands free by default",
            type: "prose",
            data: {
              statement: "In three years, arriving at a Barcelona beach with a bag should be a solved problem.",
              paragraphs: [
                "The measure is not locker rentals. It is whether a solo traveller feels able to swim. If the service works, the behaviour it unlocks is visible from the shoreline: more people in the water, fewer bags being guarded."
              ]
            }
          },
          {
            method: "Business Model Canvas",
            title: "Where the money actually comes from",
            lede: "Mapped before the first prototype, because the unit economics decide whether the design problem is even worth solving.",
            type: "canvas",
            data: {
              blocks: {
                partners: ["Beach bar concessions", "Ajuntament de Barcelona licensing", "Container fabricator", "Payment processor"],
                activities: ["Siting and permits", "Daily attend and clean", "Booking platform", "Loss and claims handling"],
                resources: ["Licensed pitches", "Container units", "Booking app", "Seasonal staff"],
                value: [
                  "Swim without watching your bag",
                  "Booked in under a minute",
                  "Insured up to €500",
                  "Charge your phone while you swim"
                ],
                relationships: ["Self-service booking", "Attended handover", "In-app support during opening hours"],
                channels: ["iOS app", "Web booking", "QR at beach entrances", "Hotel and hostel referral"],
                segments: ["Solo travellers", "Day-trip families", "Cruise passengers", "Local regulars"],
                cost: ["Pitch licences", "Unit build and haulage", "Seasonal wages", "Insurance float", "Payment fees"],
                revenue: ["Hourly rental", "Full-day rate", "Towel and parasol add-ons", "Hotel referral commission"]
              }
            }
          },
          {
            method: "Competitive Analysis",
            title: "Nobody is doing this on the sand",
            lede: "Six alternatives people currently use, scored against what a beachgoer actually needs.",
            type: "matrix",
            data: {
              caption: "Competitors scored against four criteria: on the beach, bookable in advance, insured, and open at beach hours.",
              criteria: ["On the beach", "Bookable ahead", "Insured", "Beach hours"],
              competitors: [
                { name: "Station lockers", note: "Sants and França, 20 minutes inland", scores: { "On the beach": "none", "Bookable ahead": "none", Insured: "partial", "Beach hours": "full" } },
                { name: "Bag-drop apps", note: "Shops acting as drop points", scores: { "On the beach": "none", "Bookable ahead": "full", Insured: "full", "Beach hours": "partial" } },
                { name: "Beach bar counters", note: "Informal, favour-based", scores: { "On the beach": "full", "Bookable ahead": "none", Insured: "none", "Beach hours": "full" } },
                { name: "Hotel storage", note: "Guests only, checkout day", scores: { "On the beach": "none", "Bookable ahead": "partial", Insured: "partial", "Beach hours": "partial" } },
                { name: "Waterproof pouch", note: "Carry it in with you", scores: { "On the beach": "full", "Bookable ahead": "none", Insured: "none", "Beach hours": "full" } },
                { name: "Locker Room", note: "The proposition under test", scores: { "On the beach": "full", "Bookable ahead": "full", Insured: "full", "Beach hours": "full" } }
              ]
            }
          }
        ]
      },

      {
        id: "define",
        number: 2,
        name: "Define",
        icon: "Target",
        summary: "Narrowing a broad opportunity to one testable design problem.",
        methods: [
          {
            method: "Defined Goal",
            title: "Bag to water in under two minutes",
            type: "prose",
            data: {
              statement:
                "Design a booking and handover flow that gets a first-time user from arriving at the unit to being in the sea in under two minutes, without an account.",
              paragraphs: [
                "The two-minute constraint came out of Discovery: it is roughly the point at which people in the intercepts said they would give up and just watch the bag instead. Everything downstream is measured against it."
              ]
            }
          },
          {
            method: "Task Flow Analysis",
            title: "The first-time rental",
            lede: "The critical path, with the branch where most testers stalled.",
            type: "flow",
            data: {
              label: "First-time rental task flow",
              steps: [
                { kind: "start", label: "Scan the QR on the unit", lane: "On sand", note: "No app install required" },
                { kind: "step", label: "Pick a duration", lane: "Web", note: "Two hours, four, or all day" },
                { kind: "decision", label: "Locker free?", lane: "System", note: "Live availability per unit" },
                { kind: "step", label: "Pay with Apple Pay", lane: "Web", note: "No account, no email" },
                { kind: "step", label: "Attendant opens the locker", lane: "On sand", note: "Code shown on screen" },
                { kind: "end", label: "In the water", lane: "On sand" }
              ]
            }
          },
          {
            method: "User Journey Map",
            title: "A first visit, start to finish",
            lede: "Five phases from planning the day to walking away. The line is how it felt; the words underneath say the same thing.",
            type: "journey",
            data: {
              label: "First-visit user journey map",
              lanes: ["Actions", "Touchpoints", "Thinking"],
              phases: [
                {
                  name: "Planning",
                  feeling: 1,
                  feelingLabel: "Optimistic",
                  actions: ["Searches for beach storage", "Reads two reviews"],
                  touchpoints: ["Search results", "Hostel front desk"],
                  thinking: ["Is this a real thing?", "Will it be there when I arrive?"]
                },
                {
                  name: "Arrival",
                  feeling: -1,
                  feelingLabel: "Uncertain",
                  actions: ["Walks the promenade", "Looks for the unit"],
                  touchpoints: ["Beach signage", "Map pin"],
                  thinking: ["The pin is not exact", "Am I in the right stretch?"]
                },
                {
                  name: "Booking",
                  feeling: -2,
                  feelingLabel: "Frustrated",
                  actions: ["Scans the QR", "Fumbles wet hands on a phone"],
                  touchpoints: ["QR sticker", "Booking page"],
                  thinking: ["Do I have to make an account?", "How long do I even need?"]
                },
                {
                  name: "Swimming",
                  feeling: 2,
                  feelingLabel: "Relieved",
                  actions: ["Leaves the bag", "Goes in the water"],
                  touchpoints: ["Attendant", "Locker"],
                  thinking: ["This is what I came for"]
                },
                {
                  name: "Return",
                  feeling: 1,
                  feelingLabel: "Satisfied",
                  actions: ["Collects the bag", "Charges phone while drying off"],
                  touchpoints: ["Attendant", "Charge point"],
                  thinking: ["I would use this again", "I would tell the others"]
                }
              ]
            }
          },
          {
            method: "User Persona",
            title: "Mara, travelling alone",
            lede: "Drawn from eleven intercepts on Barceloneta and Bogatell; the solo traveller is the segment the service lives or dies on.",
            type: "persona",
            data: {
              name: "Mara Lindqvist",
              role: "28 · Solo traveller · Malmö",
              portrait: { src: "assets/case/persona-mara.jpg", alt: "Portrait of the persona, a woman in her late twenties on a beach promenade" },
              quote: "I just don't swim when I'm on my own. It isn't worth losing my passport over.",
              demographics: [
                { label: "Trip length", value: "5 days" },
                { label: "Travelling", value: "Alone" },
                { label: "Budget", value: "€60 / day" },
                { label: "Books", value: "On the day" }
              ],
              goals: [
                "Actually get in the sea",
                "Keep passport and phone dry and safe",
                "Not commit to a whole day up front"
              ],
              frustrations: [
                "Everything needs an account first",
                "Storage is always inland",
                "No idea what is safe and what is a scam"
              ],
              traits: [
                { label: "Books ahead", value: 0.25 },
                { label: "Price sensitive", value: 0.7 },
                { label: "Trusts reviews", value: 0.9 },
                { label: "Comfortable with apps", value: 0.85 }
              ]
            }
          }
        ]
      },

      {
        id: "ideate",
        number: 3,
        name: "Ideate",
        icon: "Lightbulb",
        summary: "Finding a voice for something that has to feel safe and be seen from a hundred metres away.",
        methods: [
          {
            method: "Brand Attributes",
            title: "Warm, obvious, and clearly staffed",
            lede: "The brand has one job before it has any others: read as legitimate to someone deciding whether to hand over their passport.",
            type: "attributes",
            data: {
              chips: ["Sun-bleached", "Unmissable", "Attended", "Unfussy", "Holiday, not utility"],
              scales: [
                { from: "Playful", to: "Serious", value: 0.35, note: "Warm enough to approach; never jokey about security." },
                { from: "Quiet", to: "Loud", value: 0.8, note: "It has to be findable from the waterline." },
                { from: "Premium", to: "Everyday", value: 0.7, note: "Priced and pitched as part of a normal beach day." },
                { from: "Local", to: "Global", value: 0.3, note: "Reads as Barcelona, not as a chain." }
              ]
            }
          },
          {
            method: "Mood Board",
            title: "Sunset neon on salt-worn metal",
            lede: "The reference set the identity was pulled from.",
            type: "moodboard",
            data: {
              caption: "References: shipping-container retail, lido signage, late-golden-hour palettes.",
              images: [
                { src: "assets/case/mood-neon.jpg", alt: "Neon signage glowing at dusk", caption: "Neon at golden hour", wide: true },
                { src: "assets/case/mood-container.jpg", alt: "A painted shipping container used as a kiosk", caption: "Container retail" },
                { src: "assets/case/mood-lido.jpg", alt: "Mid-century lido signage", caption: "Lido lettering" },
                { src: "assets/case/mood-palette.jpg", alt: "A sunset colour palette of pinks and warm oranges", caption: "Palette" },
                { src: "assets/case/mood-signage.jpg", alt: "Wayfinding signage on a promenade", caption: "Wayfinding" }
              ]
            }
          }
        ]
      },

      {
        id: "prototype",
        number: 4,
        name: "Prototype",
        icon: "Layers",
        summary: "One flow, built well enough to test on the sand with wet hands.",
        methods: [
          {
            method: "Prototype",
            title: "The two-minute rental",
            lede: "Built as a mobile web flow rather than an app, because the Discovery work said an install was the single biggest drop-off.",
            type: "prototype",
            data: {
              note:
                "Tested with fourteen people on Bogatell across two weekends. Median time from scan to locker open was one minute fifty-two. The duration step was rebuilt twice: the first version asked for a return time, which nobody could answer on arrival.",
              linkLabel: "Open the prototype",
              href: "#prototype",
              frames: [
                { src: "assets/case/proto-scan.jpg", alt: "Prototype screen: scanning the QR code on the unit", caption: "Scan" },
                { src: "assets/case/proto-duration.jpg", alt: "Prototype screen: choosing a rental duration", caption: "Duration" },
                { src: "assets/case/proto-code.jpg", alt: "Prototype screen: the locker code after payment", caption: "Handover" }
              ]
            }
          }
        ]
      },

      {
        id: "retrospective",
        number: 5,
        name: "Retrospective",
        icon: "CircleCheck",
        summary: "What the nine weeks actually established.",
        methods: [
          {
            method: "UX Summary",
            title: "The flow works; the siting is the risk",
            lede: "The design problem turned out to be tractable. The business problem moved to where the units go.",
            type: "summary",
            data: {
              outcomes: [
                { value: "1:52", label: "Median scan to open" },
                { value: "14", label: "Testers on sand" },
                { value: "0", label: "Accounts required" },
                { value: "9", label: "Weeks end to end" }
              ],
              columns: [
                {
                  heading: "What worked",
                  items: [
                    "Dropping the account entirely",
                    "Duration as blocks, not a return time",
                    "An attendant at handover — it was the whole trust story",
                    "Testing on the beach rather than in a room"
                  ]
                },
                {
                  heading: "What I would change",
                  items: [
                    "Recruited too many confident app users early",
                    "The canvas should have come before the competitive scan",
                    "No test in rain; the flow assumes a dry phone"
                  ]
                },
                {
                  heading: "Open questions",
                  items: [
                    "Can pitches be licensed at all on Barceloneta?",
                    "Does the model survive outside peak season?",
                    "What does loss actually cost per unit per month?"
                  ]
                }
              ]
            }
          }
        ]
      }
    ]
  };

  window.PROJECT = PROJECT;
})();
