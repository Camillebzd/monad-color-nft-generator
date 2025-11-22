import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export function Footer({ className }: Props) {
  return (
    <footer
      className={cn(
        'flex flex-col gap-2.5 items-center justify-center pt-4 py-4 md:py-6 w-full',
        className,
      )}
    >
      <div className="flex flex-col gap-6 items-start w-full container">
        <div className="flex flex-col md:flex-row gap-10 md:gap-0 items-start md:justify-between w-full">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} Monad Color NFT Generator.
          </p>
        </div>
      </div>
    </footer>
  )
}