export type PollCardProps = { question: string; options: string[]; counts?: number[] };
export function PollCard({ question, options, counts }: PollCardProps) {
  return (
    <article style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 8, marginBottom: 12 }}>
      <h3>{question}</h3>
      <ul>
        {options.map((o, i) => (
          <li key={i}>
            {o} {counts ? `(${counts[i] ?? 0})` : null}
          </li>
        ))}
      </ul>
    </article>
  );
}
