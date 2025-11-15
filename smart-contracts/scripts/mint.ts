import { network } from "hardhat";

async function main() {
  const { viem } = await network.connect();
  const [wallets] = await viem.getWalletClients();

  console.log("Minting an nft...");

  // Monad testnet deployed address
  const monadGeneratorAddress = "0x0172840629f21ce319454607db37a5a98adfb338";
  const monadGenerator = await viem.getContractAt('MonadGenerator', monadGeneratorAddress);

  // Choose the colors for the NFT
  const logo = "#FFFFFF";
  const bg = "#6E54FF";

  // to, logo, bg
  const hash = await monadGenerator.write.safeMint([wallets.account.address, logo, bg]);

  await (await viem.getPublicClient()).waitForTransactionReceipt({ hash });

  // Get the tokenId of the last minted NFT
  const totalSupply = await monadGenerator.read.totalSupply();
  const tokenId = totalSupply - 1n;

  console.log("NFT minted with tokenId:", tokenId.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
