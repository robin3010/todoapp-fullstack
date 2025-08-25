import LINKS from '../lib/links'

const FooterLink: React.FC<(typeof LINKS)[number]> = ({
  href,
  linkName,
  icon,
}) => (
  <a
    target="_blank"
    href={href}
    className="group flex items-center gap-3 no-underline *:transition
     *:duration-200 *:ease-[cubic-bezier(.645,.045,.355,1)]"
    rel="author noreferrer"
  >
    <span
      className={`flex h-[calc(6px+2ex)] w-[calc(12px+1ex)] items-center justify-center ${icon} bg-white mask-size-[100%] mask-center mask-no-repeat group-hover:bg-sky-200 group-active:bg-sky-300`}
    />
    <span className="hidden group-hover:text-sky-200 group-active:text-sky-300 md:block">
      {linkName}
    </span>
  </a>
)

const FooterLinks = () => (
  <>
    {LINKS.map((el, index) => (
      <FooterLink key={`key-${index + 1}`} {...el} />
    ))}
  </>
)

export default FooterLinks
