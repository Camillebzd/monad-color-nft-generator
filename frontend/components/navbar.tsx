import { ConnectButton } from "@rainbow-me/rainbowkit";


export function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <nav className="relative">
        <div className="w-full flex flex-row justify-end py-4 px-8 md:px-32">
          <ConnectButton />
        </div>
      </nav>
    </header>
  )
}