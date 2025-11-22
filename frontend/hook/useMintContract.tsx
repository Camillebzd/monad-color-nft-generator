import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import monadGenerator from "@/abi/MonadGenerator.json";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x000000000000000000000000000000000000000000';
const abi = monadGenerator.abi;

export function useMintContract() {
  const { 
    data: hash, 
    isPending, 
    writeContract,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 

  const mint = async (to: string, backgroundColor: string, logoColor: string) => {
    if (!writeContract) {
      throw new Error("Contract write function is not available");
    }

    // Call the writeContract function with appropriate arguments
    writeContract({
      address: contractAddress as `0x${string}`,
      abi,
      functionName: 'safeMint',
      args: [to, logoColor, backgroundColor],
    });

    
  }

  return { mint, isPending, hash, isConfirming, isConfirmed };
}