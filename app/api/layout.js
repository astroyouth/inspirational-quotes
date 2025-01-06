export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>
          <header style={{ textAlign: 'center', margin: '20px' }}>
            <h1>Inspirational Quotes</h1>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
