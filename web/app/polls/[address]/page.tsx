import { votingPollAbi } from "../../../lib/abi";
import { notFound } from "next/navigation";
import { Address, Hex } from "viem";
import { createPublicClient, http } from "viem";
import { polygon } from "viem/chains";

async function getPoll(address: string) {
  try {
    const client = createPublicClient({ chain: polygon, transport: http() });
    const q = await client.readContract({ address: address as Address, abi: votingPollAbi as any, functionName: "questionUri" });
    const options = await client.readContract({ address: address as Address, abi: votingPollAbi as any, functionName: "getOptions" });
    const counts = await client.readContract({ address: address as Address, abi: votingPollAbi as any, functionName: "getCounts" });
    return { q, options, counts } as { q: string; options: string[]; counts: bigint[] };
  } catch (e) {
    return null;
  }
}

export default async function PollDetail({ params }: { params: { address: string } }) {
  const data = await getPoll(params.address);
  if (!data) return notFound();
  return (
    <main style={{ padding: 24 }}>
      <h2>Poll</h2>
      <p>Question URI: {data.q}</p>
      <ul>
        {data.options.map((o, i) => (
          <li key={i}>{o} ({Number(data.counts[i] || 0n)})</li>
        ))}
      </ul>
    </main>
  );
}


