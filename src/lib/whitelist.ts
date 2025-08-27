// Whitelist of authorized wallet addresses
export const whitelist = [
  "0x04c7aa030ed71502c00a7a805ad84209d0ba9256",
  "0x1234567890123456789012345678901234567890", // Demo wallet
];

/**
 * Check if a wallet address is in the whitelist
 * @param address - The wallet address to check
 * @returns true if the address is whitelisted, false otherwise
 */
export function isAddressWhitelisted(address: string): boolean {
  if (!address) return false;
  
  // Normalize address to lowercase for comparison
  const normalizedAddress = address.toLowerCase();
  
  return whitelist.some(whitelistedAddress => 
    whitelistedAddress.toLowerCase() === normalizedAddress
  );
}
