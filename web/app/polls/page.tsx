import Link from "next/link";
import { createPublicClient, http } from "viem";
import { polygon } from "viem/chains";
import { votingFactoryAbi } from "../../lib/abi";
import { VOTING_FACTORY_ADDRESS } from "../../lib/chain";

async function getPolls() {
  const client = createPublicClient({ chain: polygon, transport: http() });
  const polls = await client.readContract({ address: VOTING_FACTORY_ADDRESS as `0x${string}`, abi: votingFactoryAbi as any, functionName: "allPolls" });
  return polls as string[];
}

export default async function PollsPage() {
  const polls = await getPolls();
  return (
    <main style={{ padding: 24 }}>
      <h2>Polls</h2>
      <ul>
        {polls.map((addr) => (
          <li key={addr}>
            <code>{addr}</code> — <Link href={`/polls/${addr}`}>view</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
