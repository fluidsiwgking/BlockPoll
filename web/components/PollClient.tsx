"use client";
import { useEffect, useMemo, useState } from "react";
import { Address } from "viem";
import { useReadContract, useWatchContractEvent, useWriteContract } from "wagmi";
import { votingPollAbi } from "../lib/abi";

export function PollClient({ address }: { address: Address }) {
  const [counts, setCounts] = useState<number[]>([]);
  const { data: options } = useReadContract({
    address,
    abi: votingPollAbi as any,
    functionName: "getOptions",
  }) as { data: string[] | undefined };
  const { data: rawCounts, refetch } = useReadContract({
    address,
    abi: votingPollAbi as any,
    functionName: "getCounts",
  }) as { data: bigint[] | undefined; refetch: () => void };

  const { writeContractAsync, isPending } = useWriteContract();

  useEffect(() => {
    if (rawCounts) setCounts(rawCounts.map((c) => Number(c)));
  }, [rawCounts?.toString()]);

  useWatchContractEvent({
    address,
    abi: votingPollAbi as any,
    eventName: "Voted",
    onLogs: () => {
      // refresh counts on any vote
      void refetch();
    },
  });

  const onVote = async (i: number) => {
    await writeContractAsync({ address, abi: votingPollAbi as any, functionName: "vote", args: [BigInt(i)] });
  };

  return (
    <section>
      <ul style={{ padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
        {(options || []).map((o, i) => (
          <li key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button disabled={isPending} onClick={() => onVote(i)}>Vote</button>
            <span>{o}</span>
            <strong>({counts[i] ?? 0})</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}


