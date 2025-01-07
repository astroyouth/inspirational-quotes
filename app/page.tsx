'use client';

import { useState } from 'react';

type Quote = {
  text: string;
  author: string | null;
};

export default function HomePage() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [interpretationLoading, setInterpretationLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    setShowInterpretation(false);
    setInterpretation(null);
    try {
      const response = await fetch('/api/getQuote');
      const data = await response.json();

      const [quoteText, author] = data.quote.split(' - ');
      setQuote({ text: quoteText.trim(), author: author ? author.trim() : 'Unknown' });
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote({ text: 'Failed to fetch a quote. Please try again later.', author: null });
    } finally {
      setLoading(false);
    }
  };

  const fetchInterpretation = async () => {
    setInterpretationLoading(true);
    try {
      const response = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quote: `${quote?.text} - ${quote?.author}` }),
      });
      const data = await response.json();
      setInterpretation(data.interpretation || 'Failed to generate interpretation.');
    } catch (error) {
      console.error('Error fetching interpretation:', error);
      setInterpretation('Failed to generate interpretation. Please try again later.');
    } finally {
      setInterpretationLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
      }}
    >
      <button
        onClick={fetchQuote}
        style={{
          padding: '15px 30px',
          fontSize: '20px',
          cursor: 'pointer',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginBottom: '20px',
          fontWeight: 'bold',
        }}
      >
        {loading ? 'Loading...' : 'Get a Quote'}
      </button>
      {quote && (
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth: '600px',
          }}
        >
          <p style={{ fontSize: '24px', marginBottom: '10px' }}>{quote.text}</p>
          <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#555' }}>
            {quote.author}
          </p>
          <button
            onClick={() => {
              setShowInterpretation(!showInterpretation);
              if (!showInterpretation && !interpretation) {
                fetchInterpretation();
              }
            }}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#555',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            {showInterpretation ? 'Hide Interpretation' : 'Reveal Interpretation'}
          </button>
          {showInterpretation && (
            <div style={{ marginTop: '15px', fontSize: '16px', color: '#333' }}>
              {interpretationLoading ? 'Loading interpretation...' : interpretation}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
