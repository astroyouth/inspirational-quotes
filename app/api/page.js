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

      // Parse the response for quote and author
      const [quoteText, author] = data.quote.split(' - ');
      setQuote({ text: quoteText.trim(), author: author ? author.trim() : 'Unknown' });
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote({ text: 'Failed to fetch a quote. Please try again later.', author: null });
    } finally {
      setLoading(false);
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
        </div>
      )}
    </div>
  );
}
