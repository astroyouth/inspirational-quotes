import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { quote } = await req.json();

    if (!quote) {
      return new Response(
        JSON.stringify({ error: 'Quote is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert in analyzing quotes. Provide an interpretation of the given quote in about 50 words, focusing on a modern context.',
        },
        {
          role: 'user',
          content: `Interpret this quote: "${quote}"`,
        },
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    const interpretation = response.choices[0].message.content.trim();

    return new Response(
      JSON.stringify({ interpretation }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating interpretation:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate interpretation' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
