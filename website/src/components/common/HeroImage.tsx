import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import customLoader from '../../lib/loader'

interface Props {
  imgSrc: StaticImageData
  label: string
  href: string
  className?: string
}

function HeroImage({ imgSrc, label, href, className }: Props) {
  return (
    <Link passHref href={href}>
      <a
        className={clsx(
          'rounded-xl flex flex-row items-center px-2 mb-4 text-center cursor-pointer last:mb-0 md:mb-0 md:last:mr-0 md:p-4 md:flex-1 md:flex-col text-uzh-red-100 hover:bg-uzh-grey-20',
          className
        )}
      >
        <div className="relative flex-1">
          <Image
            // placeholder="blur"
            loader={customLoader}
            src={imgSrc}
            alt="Hero"
            layout="intrinsic"
          />
        </div>
        <p className="flex-1 pl-8 text-2xl font-kollektif font-bold md:pl-0">
          {label}
        </p>
      </a>
    </Link>
  )
}

HeroImage.defaultProps = {
  className: '',
}

HeroImage.Group = function HeroImageGroup({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col md:m-auto md:justify-between md:flex-row">
      {children}
    </div>
  )
}

export default HeroImage
