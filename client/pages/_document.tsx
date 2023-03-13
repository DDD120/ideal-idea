import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko" className="h-full">
      <Head />
      <body className="bg-navy-900 min-w-[1288px] min-h-[600px] text-white h-full flex justify-center items-center font-maple-light">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
