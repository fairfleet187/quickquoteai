// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [desc, setDesc] = useState('');
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);
  const [pdfUrl, setPdfUrl] = useState('');
  const [payUrl, setPayUrl] = useState('');

  const onGenerate = async () => {
    const res = await fetch('/api/generateInvoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: desc, quantity: qty, unitPrice: price })
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };

  const onPay = async () => {
    const res = await fetch('/api/createCheckout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: desc, quantity: qty, unitPrice: price })
    });
    const { sessionUrl } = await res.json();
    setPayUrl(sessionUrl);
  };

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">QuickQuoteAI</h1>

      <textarea
        className="w-full p-2 border mb-2"
        placeholder="Service description"
        value={desc}
        onChange={e => setDesc(e.target.value)}
      />

      <div className="flex space-x-2 mb-4">
        <input
          type="number"
          className="flex-1 p-2 border"
          value={qty}
          onChange={e => setQty(+e.target.value)}
          placeholder="Quantity"
        />
        <input
          type="number"
          className="flex-1 p-2 border"
          value={price}
          onChange={e => setPrice(+e.target.value)}
          placeholder="Unit Price"
        />
      </div>

      <button
        onClick={onGenerate}
        className="mr-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Generate PDF
      </button>
      <button
        onClick={onPay}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Create Pay Link
      </button>

      {pdfUrl && (
        <div className="mt-4">
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            Download Invoice PDF
          </a>
        </div>
      )}
      {payUrl && (
        <div className="mt-4">
          <a href={payUrl} target="_blank" rel="noopener noreferrer" className="text-green-500">
            Pay Invoice
          </a>
        </div>
      )}
    </main>
  );
}
