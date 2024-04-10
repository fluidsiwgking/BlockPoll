import { PollCard } from "../../components/PollCard";
export default function PollsPage() {
  const demo = [{ q: "Favorite language?", options: ["Solidity","TypeScript","Rust"], counts:[2,3,1]}];
  return (
    <main style={{ padding: 24 }}>
      <h2>Polls</h2>
      {demo.map((p, i) => (
        <PollCard key={i} question={p.q} options={p.options} counts={p.counts} />
      ))}
    </main>
  );
}
