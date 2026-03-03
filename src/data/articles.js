export const articles = [
  {
    slug: 'travel-forecast',
    title: 'Travel Forecast',
    excerpt: 'A practical way to plan trips using seasonality, budget, and flexibility windows.',
    date: '2026-03-03',
    readingTime: '7 min read',
    tags: ['Travel', 'Planning'],
    content: [
      {
        type: 'p',
        text:
          'This is a starter article page wired into your site. Replace this content with your own text, images, and sections. The layout is designed to match your existing aesthetic (dark, clean, typography-forward).',
      },
      { type: 'h2', text: 'Why a “forecast” helps' },
      {
        type: 'p',
        text:
          'Instead of planning from a single fixed date, build a range of options. Think in terms of constraints (budget, time off, weather tolerance) and then pick the best window as prices and conditions change.',
      },
      { type: 'h2', text: 'A simple framework' },
      {
        type: 'ul',
        items: [
          'Choose 1–2 destinations you genuinely want, not “best deals”.',
          'Define a flexible travel window (2–6 weeks).',
          'Set a hard budget ceiling and a comfort budget.',
          'Track prices weekly; pull the trigger when you hit comfort budget.',
        ],
      },
      { type: 'h2', text: 'Next steps' },
      {
        type: 'p',
        text:
          'If you want, I can add support for Markdown articles later (so you can write posts as .md files) while keeping this same styling.',
      },
    ],
  },
  {
    slug: 'building-this-site',
    title: 'Building This Portfolio',
    excerpt: 'Notes on the design and motion system behind this site, and what I optimized for.',
    date: '2026-02-18',
    readingTime: '5 min read',
    tags: ['Design', 'Frontend'],
    content: [
      {
        type: 'p',
        text:
          'This is a second sample article to show how the index and routing behave. Swap it with a real post when you’re ready.',
      },
      { type: 'h2', text: 'Principles' },
      {
        type: 'ul',
        items: [
          'Keep the layout simple and let motion do the storytelling.',
          'Use a tight palette and consistent spacing tokens.',
          'Prefer clear hierarchy over heavy ornamentation.',
        ],
      },
    ],
  },
]

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug)
}
