import Image from 'next/image'
import { useState } from 'react'
import Panel from '../components/common/Panel'
import Title from '../components/common/Title'
import TitleBackground from '../components/common/TitleBackground'
import Content from '../components/Content'
import PageWithHeader from '../components/PageWithHeader'
import * as Util from '../lib/util'

interface Props {
  frontMatter: any
  source: any
}
function DevelopmentWorkflow({ frontMatter, source }: Props) {
  const [activePanel, setActivePanel] = useState(0)
  return (
    <PageWithHeader title={frontMatter.title}>
      <TitleBackground>
        <Title title={frontMatter.title} />
      </TitleBackground>
      <Content>
        {frontMatter.modules.map((module: any) => {
          const index = frontMatter.modules.indexOf(module)

          const keyTakeaways = () => {
            if (module.keyTakeawayList) {
              return module.keyTakeawayList
            } else {
              return (
                <Image
                  src={module.keyTakeawayImage.src}
                  alt={module.title}
                  width={module.keyTakeawayImage.width}
                  height={module.keyTakeawayImage.height}
                />
              )
            }
          }
          if (index < 1) {
            return (
              <Panel
                duration={module.duration}
                isOpen={activePanel === index}
                isCompleted={activePanel > index}
                title={module.title}
                videoSrc={module.videoSrc}
                keyTakeaways={keyTakeaways()}
                resources={module.resources.map((resource: any) => ({
                  name: resource.name,
                  href: resource.href,
                }))}
                onNext={() => setActivePanel(index + 1)}
                onActivate={() => setActivePanel(index)}
              >
                {module.description}
              </Panel>
            )
          } else {
            return (
              <Panel
                duration={module.duration}
                isOpen={activePanel === index}
                isCompleted={activePanel > index}
                title={module.title}
                videoSrc={module.videoSrc}
                keyTakeaways={keyTakeaways()}
                resources={module.resources.map((resource: any) => ({
                  name: resource.name,
                  href: resource.href,
                }))}
                onNext={() => setActivePanel(index + 1)}
                onPrevious={() => setActivePanel(index - 1)}
                onActivate={() => setActivePanel(index)}
              >
                {module.description}
              </Panel>
            )
          }
        })}
      </Content>
    </PageWithHeader>
  )
}

export default DevelopmentWorkflow
export const getStaticProps = Util.getStaticPropsSinglePage(
  'resources',
  'Development'
)
