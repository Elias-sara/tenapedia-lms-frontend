import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Add any custom head tags or external stylesheets here */}
        </Head>
        <body className="min-h-screen bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300">
          <Main /> {/* This is where your page content will be rendered */}
          <NextScript /> {/* This includes the necessary Next.js scripts */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
