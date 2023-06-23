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
        <script
        dangerouslySetInnerHTML={{
          __html: `history.scrollRestoration = "manual"`,
        }}
      />
        {/* <script src="https://unpkg.com/flowbite@1.4.1/dist/flowbite.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js" integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ=" crossorigin="anonymous"></script> */}
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@100;400;600&family=Inter:wght@400;600;700&family=Playball&family=Playfair+Display:wght@400;600;900&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
        </Head>
        <body className="overflow-x-hidden">
          <Main />
          <NextScript />
          <div id="modal-root"></div>
        </body>
      </Html>
    )
  }
}

export default MyDocument
