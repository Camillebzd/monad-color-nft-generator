import { network } from "hardhat";

async function main() {
  const { viem } = await network.connect();

  console.log("Deploy MonadGenerator contract...");

  const monadGenerator = await viem.deployContract('MonadGenerator');

  console.log("MonadGenerator deployed to:", monadGenerator.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
