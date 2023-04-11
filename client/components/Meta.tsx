import Head from "next/head";

interface Props {
  description: string;
}

export default function Meta({ description }: Props) {
  return (
    <Head>
      <title>ideal idea</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="description" content={description} />
      <meta
        name="Keywords"
        content="그림, 실시간 그림, 그림 공유, 그림판, 그림판 공유"
      />
      <meta name="author" content="DDD120" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="ideal idea" />
      <meta property="og:site_name" content="ideal idea" />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://ideal-idea.vercel.app/default-og.png"
      />
      <meta name="twitter:title" content="ideal idea" />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://ideal-idea.vercel.app/default-og.png"
      />
    </Head>
  );
}
