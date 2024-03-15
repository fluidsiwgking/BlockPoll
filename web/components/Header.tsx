"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header = () => (
  <header style={{
    padding: 16,
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }}>
    <strong>BlockPoll</strong>
    <ConnectButton />
  </header>
);


