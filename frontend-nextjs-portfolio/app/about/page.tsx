import { genPageMetadata } from 'app/seo'
import AboutDisplay from '@/components/AboutDisplay'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  return (
    <>
      <AboutDisplay />
    </>
  )
}
