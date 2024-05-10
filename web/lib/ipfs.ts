export function toIpfsUri(cid: string) { return `ipfs://${cid}`; }
export function fromIpfsUri(uri: string) { return uri.replace(/^ipfs:\/\//, ""); }
export async function uploadJson(obj: unknown): Promise<string> {
  const res = await fetch("/api/ipfs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: obj, type: "json" }) });
  if (!res.ok) throw new Error(await res.text());
  const { cid } = await res.json();
  return cid as string;
}
