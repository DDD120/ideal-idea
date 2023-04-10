import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko" className="h-full">
      <Head>
        <title>ideal idea</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body className="bg-navy-900 h-full text-white flex justify-center items-center font-maple-light">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
