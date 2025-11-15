import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MonadGeneratorModule", (m) => {
  const monadGenerator = m.contract("MonadGenerator");

  return { monadGenerator };
});
