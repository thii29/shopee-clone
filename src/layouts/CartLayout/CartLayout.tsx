import { ReactNode } from 'react'
import Footer from 'src/components/Footer'
import HearderCart from 'src/components/HeaderCart'

interface Props {
  children?: ReactNode
}

export default function CartLayout({ children }: Props) {
  return (
    <div>
      <HearderCart />
      {children}
      <Footer />
    </div>
  )
}
