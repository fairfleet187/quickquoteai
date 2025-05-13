import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>QuickQuoteAI</title>
        <meta name="description" content="AI-powered quote and invoice generator" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <h1 className="text-5xl font-bold mb-4">QuickQuoteAI</h1>
        <p className="text-lg mb-8 text-center max-w-xl">
          Instant AI-generated quotes and invoices. Convert estimates to invoices and get paid faster.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700">
          Get Started
        </button>
      </main>
    </>
  );
}