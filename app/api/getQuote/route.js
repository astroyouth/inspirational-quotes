import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    // Randomized Parameters
    const themes = [
      'leadership',
      'perseverance',
      'love',
      'creativity',
      'courage',
      'freedom',
      'happiness',
      'wisdom',
      'success',
      'resilience',
    ];
    const tones = [
      'inspirational',
      'humorous',
      'profound',
      'thought-provoking',
      'motivational',
      'contemplative',
      'optimistic',
      'challenging',
    ];
    const types = [
      'aphorism',
      'metaphor',
      'anecdote',
      'philosophical',
      'poetic',
      'call-to-action',
    ];
    const domains = [
      'science',
      'politics',
      'literature',
      'arts',
      'sports',
      'business',
      'philosophy',
      'history',
    ];
    const historicalPeriods = [
      'ancient',
      'medieval',
      'enlightenment',
      'modern',
      'contemporary',
    ];

    // Randomly select one from each category
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const randomTone = tones[Math.floor(Math.random() * tones.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const randomPeriod =
      historicalPeriods[Math.floor(Math.random() * historicalPeriods.length)];

    // Generate dynamic system message
    const systemMessage = `You are an expert in generating diverse quotes from famous people. Please provide a ${randomTone} ${randomType} related to ${randomTheme}, coming from the domain of ${randomDomain}, and originating from the ${randomPeriod} period.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemMessage },
        {
          role: 'user',
          content:
            'Provide an inspirational quote from a famous person, including their name.',
        },
      ],
      max_tokens: 100,
      temperature: 1.0, // High creativity
    });

    const quote = response.choices[0].message.content.trim();

    return new Response(
      JSON.stringify({ quote }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching quote:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch quote' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
