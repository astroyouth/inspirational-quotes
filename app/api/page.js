'use client';

import { useState } from 'react';

export default function HomePage() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/getQuote');
      const data = await response.json();
      setQuote(data.quote);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote('Failed to fetch a quote. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <button
        onClick={fetchQuote}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        {loading ? 'Loading...' : 'Get a Quote'}
      </button>
      {quote && (
        <div
          style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '10px',
            display: 'inline-block',
            textAlign: 'left',
          }}
        >
          <p>{quote}</p>
        </div>
      )}
    </div>
  );
}
