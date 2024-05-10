import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const token = process.env.WEB3_STORAGE_TOKEN;
  if (!token) {
    return new Response(JSON.stringify({ error: "WEB3_STORAGE_TOKEN missing" }), { status: 500 });
  }
  const { content, type } = await req.json();
  const body = type === "json" ? new Blob([JSON.stringify(content)], { type: "application/json" }) : new Blob([String(content)], { type: "text/plain" });

  const form = new FormData();
  form.append("file", body, type === "json" ? "poll.json" : "content.txt");

  const resp = await fetch("https://api.web3.storage/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
    cache: "no-store",
  });
  if (!resp.ok) {
    const txt = await resp.text();
    return new Response(JSON.stringify({ error: txt }), { status: 502 });
  }
  const data = await resp.json();
  return new Response(JSON.stringify({ cid: data?.cid || data?.value?.cid }), { status: 200 });
}


