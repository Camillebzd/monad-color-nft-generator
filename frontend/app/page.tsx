import { LayoutWrapper } from '@/components/layout-wrapper'
import { MintPage } from '@/components/mint-page'

export default function Home() {
  return (
    <LayoutWrapper footerClassName="bg-brand-off-black-bg dark">
      <MintPage />
    </LayoutWrapper>
  )
}
