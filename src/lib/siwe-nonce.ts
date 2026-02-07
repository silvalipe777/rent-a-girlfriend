const globalForNonce = globalThis as unknown as {
  siweNonceStore: Map<string, { createdAt: number }>;
};

export const nonceStore =
  globalForNonce.siweNonceStore || new Map<string, { createdAt: number }>();

if (process.env.NODE_ENV !== "production") {
  globalForNonce.siweNonceStore = nonceStore;
}

export function generateNonce(): string {
  const nonce = crypto.randomUUID().replace(/-/g, "");
  nonceStore.set(nonce, { createdAt: Date.now() });
  return nonce;
}

export function consumeNonce(nonce: string): boolean {
  const entry = nonceStore.get(nonce);
  if (!entry) return false;

  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
  if (entry.createdAt < fiveMinutesAgo) {
    nonceStore.delete(nonce);
    return false;
  }

  nonceStore.delete(nonce);
  return true;
}

export function cleanExpiredNonces() {
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
  nonceStore.forEach((data, nonce) => {
    if (data.createdAt < fiveMinutesAgo) {
      nonceStore.delete(nonce);
    }
  });
}
