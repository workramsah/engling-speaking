'use client';

import { useState, useRef } from 'react';

export function Image() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setImageUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={loading}
        className="block w-full max-w-xs text-sm file:mr-4 file:rounded file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white file:hover:bg-indigo-700 disabled:opacity-50"
      />

      {loading && <p className="text-sm text-gray-500">Uploading…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {imageUrl && (
        <div className="mt-2">
          <img
            src={imageUrl}
            alt="Uploaded"
            className="max-w-full max-h-96 rounded-lg shadow-md object-contain"
          />
          <p className="mt-2 text-xs text-gray-500 break-all">{imageUrl}</p>
        </div>
      )}
    </div>
  );
}
