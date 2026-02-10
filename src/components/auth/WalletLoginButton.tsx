"use client";
import { useState } from "react";
import { useAccount, useConnect, useSignMessage, useSwitchChain } from "wagmi";
import { SiweMessage } from "siwe";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

export default function WalletLoginButton() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { switchChainAsync } = useSwitchChain();
  const { signMessageAsync } = useSignMessage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleWalletLogin = async () => {
    try {
      setError("");
      setLoading(true);

      // Step 1: Connect wallet if not connected
      let walletAddress = address;
      if (!isConnected) {
        const metaMaskConnector = connectors.find(
          (c) => c.id === "injected" || c.name === "MetaMask"
        );
        if (!metaMaskConnector) {
          setError("MetaMask not found. Please install MetaMask extension.");
          setLoading(false);
          return;
        }
        const result = await connectAsync({ connector: metaMaskConnector });
        walletAddress = result.accounts[0];
      }

      if (!walletAddress) {
        setError("Could not get wallet address.");
        setLoading(false);
        return;
      }

      // Always switch to BSC (MetaMask may be on Ethereum)
      await switchChainAsync({ chainId: 56 });

      // Step 2: Get nonce from server
      const nonceRes = await fetch("/api/auth/siwe");
      const { nonce } = await nonceRes.json();

      // Step 3: Create SIWE message
      const message = new SiweMessage({
        domain: window.location.host,
        address: walletAddress,
        statement: "Sign in to Crypto Girls with your wallet.",
        uri: window.location.origin,
        version: "1",
        chainId: 56,
        nonce,
      });

      const messageString = message.prepareMessage();

      // Step 4: Sign the message
      const signature = await signMessageAsync({ message: messageString });

      // Step 5: Authenticate with NextAuth
      const result = await signIn("siwe", {
        message: messageString,
        signature,
        redirect: false,
      });

      if (result?.error) {
        setError("Wallet authentication failed. Please try again.");
      } else {
        router.push("/marketplace");
        router.refresh();
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "";
      if (errorMessage.includes("User rejected") || errorMessage.includes("rejected")) {
        setError("Signature request was rejected.");
      } else {
        setError("Failed to connect wallet. Is MetaMask installed?");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm backdrop-blur-sm">
          {error}
        </div>
      )}
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="w-full flex items-center justify-center gap-3"
        onClick={handleWalletLogin}
        disabled={loading}
      >
        <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M37.5 3L22.2 14.7L25 7.9L37.5 3Z" fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2.5 3L17.7 14.8L15 7.9L2.5 3Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32.1 27.2L28 33.5L36.7 36L39.3 27.3L32.1 27.2Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M0.7 27.3L3.3 36L12 33.5L7.9 27.2L0.7 27.3Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.5 17.5L8.8 21.6L17.5 22L17.2 12.7L11.5 17.5Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M28.5 17.5L22.7 12.6L22.5 22L31.2 21.6L28.5 17.5Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 33.5L17 31.1L12.7 27.4L12 33.5Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 31.1L28 33.5L27.3 27.4L23 31.1Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {loading ? "Connecting..." : "Connect MetaMask"}
      </Button>
      <p className="text-[10px] text-gray-600 text-center">
        BSC Network (BNB)
      </p>
    </div>
  );
}
