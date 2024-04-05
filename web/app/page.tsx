import { Header } from "../components/Header";

export default function HomePage() {
  return (
    <main style={{ padding: 24 }}>
      <Header />
      <h1>BlockPoll</h1>
      <p>Transparent, on-chain polling and surveys.</p>
    </main>
  );
}
