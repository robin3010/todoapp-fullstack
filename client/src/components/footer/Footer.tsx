import FooterLinks from './footerLinks/FooterLinks'
import './footer.css'
import getCopyrightSig from './lib/utils'

const Footer = () => {
  return (
    <footer className="flex flex-col-reverse items-center justify-around gap-4 border-t-2 border-t-stone-600/30 bg-linear-50 from-stone-600/60 to-stone-600 py-4 text-white md:flex-row md:gap-0">
      <div className="flex flex-col items-center gap-1 md:flex-row md:items-start">
        <span>{getCopyrightSig()}</span>
        <span>by Aleksey Klimov</span>
      </div>
      <div className="flex flex-row gap-2 md:flex-col">
        <FooterLinks />
      </div>
    </footer>
  )
}

export default Footer
