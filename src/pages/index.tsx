import Head from 'next/head'
import { useRouter } from 'next/router'
import BannerSection from '../components/common/BannerSection'
import Button from '../components/common/Button'
import CitationSection from '../components/common/CitationSection'
import HeroImage from '../components/common/HeroImage'
import HomeSection from '../components/common/HomeSection'
import PaddedSection from '../components/common/PaddedSection'
import Title from '../components/common/Title'
import TitleImage from '../components/common/TitleImage'
import GameCard from '../components/games/GameCard'
import PageWithHeader from '../components/PageWithHeader'

function Home() {
  const router = useRouter()

  return (
    <PageWithHeader title="Home">
      <Head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      </Head>

      <TitleImage imgSrc="/images/hero2.jpg">
        <Title title="Digital Game-Based Learning" />
      </TitleImage>

      <PaddedSection className="bg-uzh-gray-20">
        <CitationSection>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum
          expedita fugiat ipsum est non minus aspernatur suscipit, soluta ipsa
          sint maiores aliquam facilis accusantium vel voluptas consequatur
          voluptatum molestiae exercitationem!
        </CitationSection>
      </PaddedSection>

      <PaddedSection>
        <HeroImage.Group>
          <HeroImage imgSrc="/images/vorlesung_icon.svg" label="for teachers" />
          <HeroImage
            imgSrc="/images/gruppenarbeit_icon.svg"
            label="for students"
          />
          <HeroImage
            imgSrc="/images/einzelarbeit_icon.svg"
            label="for developers"
          />
        </HeroImage.Group>
      </PaddedSection>

      <HomeSection title="GBL @ DBF" className="bg-uzh-gray-20">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 mb-4 md:mb-0">
            <div className="mb-2 md:mb-4">
              <div className="flex flex-col md:flex-wrap md:flex-row">
                {[
                  ['Portfolio Management Simulation', '/games/pfm'],
                  ['Derivatives Game', '/games/derivatives'],
                  ['Banking Game', '/games/banking'],
                ].map(([name, href]) => (
                  <GameCard name={name} linkHref={href} />
                ))}
              </div>
            </div>

            <Button onClick={() => router.push('/dbf')}>
              <Button.Arrow />
              Our Games and Courses
            </Button>
          </div>
        </div>
      </HomeSection>

      <HomeSection title="GBL Knowledge Base">
        <HomeSection.IconContent
          iconSrc="images/netzwerk_icon.svg"
          iconAlt="Knowledge Graph"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
          enim aspernatur! Vero laboriosam reprehenderit at, architecto odio
          deleniti mollitia illum cupiditate suscipit rerum accusantium sint
          inventore nostrum ad eveniet perferendis.
        </HomeSection.IconContent>

        <Button onClick={() => router.push('/kb')}>
          <Button.Arrow />
          Knowledge Base
        </Button>
      </HomeSection>

      <BannerSection imgSrc="/images/hero3.jpg">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum
        expedita fugiat ipsum est non minus aspernatur suscipit, soluta ipsa
        sint maiores aliquam facilis accusantium vel voluptas consequatur
        voluptatum molestiae exercitationem!
      </BannerSection>

      <HomeSection title="Development Workflow">
        <HomeSection.IconContent
          iconSrc="images/dev_workflow.png"
          iconAlt="Development Workflow"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
          enim aspernatur! Vero laboriosam reprehenderit at, architecto odio
          deleniti mollitia illum cupiditate suscipit rerum accusantium sint
          inventore nostrum ad eveniet perferendis.
        </HomeSection.IconContent>

        <Button onClick={() => router.push('/dev')}>
          <Button.Arrow />
          Development Workflow
        </Button>
      </HomeSection>

      <HomeSection title="Roadmap" className="bg-uzh-gray-20">
        <HomeSection.IconContent
          iconSrc="images/lernziele_icon.svg"
          iconAlt="Roadmap"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
          enim aspernatur! Vero laboriosam reprehenderit at, architecto odio
          deleniti mollitia illum cupiditate suscipit rerum accusantium sint
          inventore nostrum ad eveniet perferendis.
        </HomeSection.IconContent>

        <Button onClick={() => router.push('/roadmap')}>
          <Button.Arrow />
          Roadmap
        </Button>
      </HomeSection>

      <BannerSection imgSrc="/images/hero3.jpg">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum
        expedita fugiat ipsum est non minus aspernatur suscipit, soluta ipsa
        sint maiores aliquam facilis accusantium vel voluptas consequatur
        voluptatum molestiae exercitationem!
      </BannerSection>
    </PageWithHeader>
  )
}

export default Home
