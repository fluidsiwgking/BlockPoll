'use client';
import { useState } from 'react';
export function CreatePollForm() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string>([""] as any);
  return (
    <form style={{ display: 'grid', gap: 12 }} onSubmit={(e)=>{ e.preventDefault(); alert('Submit to chain TBD'); }}>
      <label>Question URI/CID<input value={question} onChange={e=>setQuestion(e.target.value)} /></label>
      <label>Options (comma-separated)<input value={options.join(',')} onChange={e=>setOptions(e.target.value.split(','))} /></label>
      <button type="submit">Create Poll</button>
    </form>
  );
}
