import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Preconnect and load Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          {/* For the logo – using "Playfair Display" */}
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400&display=swap" rel="stylesheet" />
          {/* Overall text – "Noto Serif" */}
          <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@300&display=swap" rel="stylesheet" />
          <style>{`
            body { font-family: 'Noto Serif', serif; }
            .logo { font-family: 'Playfair Display', serif; font-weight: 400; font-size: 55px; }
          `}</style>
        </Head>
        <body className="theme-transition">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument