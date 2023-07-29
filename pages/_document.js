import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  render() {
    return (
      <Html>
        <Head>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
          />
        <script
        dangerouslySetInnerHTML={{
          __html: `history.scrollRestoration = "manual"`,
        }}
      />
       <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/myProjectImages%2FAsset%202.png?alt=media&token=e73cf3c5-a28c-4b7e-8067-c5f1e968a939" type="image/png" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@100;400;600&family=Inter:wght@400;600;700&family=Playball&family=Playfair+Display:wght@400;600;900&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
        </Head>
        <body className="overflow-x-hidden">
          <Main />
          <NextScript />
          <div id="modal-root">
          </div>
        </body>
      </Html>
    )
  }
}

export default MyDocument
