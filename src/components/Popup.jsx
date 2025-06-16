import React from 'react';

export default function Popup() {
  return (
    <div style={{ width: 300, padding: 20 }}>
      <h1 style={{ fontSize: '1.5rem', color: '#1E3A8A', fontWeight: 'bold' }}>
        LinguaPocket 🐬📘
      </h1>
      <p style={{ color: '#4B5563', marginBottom: 20 }}>
        Save words directly from Google Translate or Yandex!
      </p>
      <button
        style={{
          backgroundColor: '#2563EB',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Save Selected Word
      </button>
    </div>
  );
}