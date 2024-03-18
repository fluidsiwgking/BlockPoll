'use client';
import { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { votingFactoryAbi } from '../lib/abi';
import { VOTING_FACTORY_ADDRESS } from '../lib/chain';

export function CreatePollForm() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [deadlineHours, setDeadlineHours] = useState(24);
  const { writeContractAsync, isPending } = useWriteContract();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = options.map(o => o.trim()).filter(Boolean);
    if (!question || trimmed.length < 2) {
      alert('Please provide a question URI/CID and at least two options.');
      return;
    }
    const deadline = Math.floor(Date.now() / 1000) + deadlineHours * 3600;
    await writeContractAsync({
      address: VOTING_FACTORY_ADDRESS as `0x${string}`,
      abi: votingFactoryAbi as any,
      functionName: 'createPoll',
      args: [question, trimmed, BigInt(deadline)],
    });
    setQuestion('');
    setOptions([]);
    alert('Transaction submitted.');
  };

  return (
    <form style={{ display: 'grid', gap: 12 }} onSubmit={onSubmit}>
      <label>Question URI/CID
        <input value={question} onChange={e=>setQuestion(e.target.value)} />
      </label>
      <label>Options (comma-separated)
        <input value={options.join(',')} onChange={e=>setOptions(e.target.value.split(','))} />
      </label>
      <label>Deadline (hours from now)
        <input type="number" value={deadlineHours} onChange={e=>setDeadlineHours(parseInt(e.target.value||'24',10))} />
      </label>
      <button type="submit" disabled={isPending}>Create Poll</button>
    </form>
  );
}
