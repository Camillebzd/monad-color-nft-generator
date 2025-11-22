'use client';

import { useEffect, useState } from "react";
import { ChromePicker } from 'react-color';
import { Button } from "@/components/ui/button"
import { useAccount } from "wagmi";
import { toast } from "sonner"
import { useMintContract } from "@/hook/useMintContract";
import { Spinner } from "@/components/ui/spinner"

export function MintPage() {
  const [backgroundColor, setBackgroundColor] = useState('#6E54FF'); // Purple
  const [logoColor, setLogoColor] = useState('#FFFFFF'); // White
  const user = useAccount();
  const { mint, hash, isPending, isConfirming, isConfirmed } = useMintContract();

  const handleMint = async () => {
    try {
      console.log('Minting NFT with background color:', backgroundColor, 'and logo color:', logoColor);
      await mint(user.address || '', backgroundColor, logoColor);
    } catch (error) {
      console.error('Minting failed:', error);
      toast.error('Minting failed. Please try again.');
    }
  };

  const mintButton = () => {
    if (isPending || isConfirming) {
      return (
        <Button disabled>
          <Spinner />
          Minting
        </Button>
      );
    }
    return (
      <Button
        variant="default"
        disabled={!user.isConnected}
        onClick={handleMint}
      >
        {user.isConnected ? 'Mint' : 'Connect Wallet to Mint'}
      </Button>
    );
  }

  // Toast when transaction is validated
  useEffect(() => {
    if (isConfirmed) {
      toast.success('Transaction confirmed! Your NFT has been minted.');
    }
  }, [hash, isPending, isConfirming, isConfirmed]);

  return (
    <div className="flex flex-col w-full gap-16 items-center px-4 md:px-16 lg:px-32 ">
      {/* Title and description */}
      <div className="flex flex-col gap-2 w-full pt-8 items-center">
        <h1 className="text-3xl font-bold">
          Mint Your Unique Color NFT
        </h1>
        <p>Select the colors for the logo and the background, connect your wallet and mint your unique NFT!</p>
      </div>
      {/* Logo + color picker */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="rounded-xl overflow-hidden h-80 w-80 flex self-center">
          <svg width="100%" height="100%" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="480" height="480" fill={backgroundColor}/>
            <path d="M240.135 90C196.78 90 90 196.68 90 240C90 283.318 196.78 390 240.135 390C283.491 390 390.273 283.316 390.273 240C390.273 196.682 283.493 90 240.135 90ZM216.739 325.774C198.457 320.796 149.302 234.89 154.285 216.624C159.268 198.357 245.251 149.248 263.533 154.226C281.817 159.204 330.971 245.108 325.989 263.376C321.005 281.642 235.023 330.752 216.739 325.774Z" fill={logoColor}/>
          </svg>
        </div>
        <div className="flex flex-col gap-4">
          <p>Background Color</p>
          <ChromePicker
            color={backgroundColor}
            onChange={(color) => setBackgroundColor(color.hex)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <p>Logo Color</p>
          <ChromePicker
            color={logoColor}
            onChange={(color) => setLogoColor(color.hex)}
          />
        </div>
      </div>
      {/* Mint button */}
      {mintButton()}
    </div>
  );
}
