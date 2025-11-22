import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'

interface Props {
  children: React.ReactNode
  footerClassName?: string
}

export function LayoutWrapper({ children, footerClassName }: Props) {
  return (
    <div className="flex flex-col min-h-dvh">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer className={footerClassName} />
    </div>
  )
}