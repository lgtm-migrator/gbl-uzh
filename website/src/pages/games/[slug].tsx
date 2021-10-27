import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PresentationChartBarIcon,
  XIcon,
} from '@heroicons/react/solid'
import clsx from 'clsx'
import { MDXRemote } from 'next-mdx-remote'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import RadarChart from '../../components/charts/RadarChart'
import Header from '../../components/common/Header'
import Tag from '../../components/common/Tag'
import Title from '../../components/common/Title'
import TitleImage from '../../components/common/TitleImage'
import Content from '../../components/Content'
import PageWithHeader from '../../components/PageWithHeader'
import * as Util from '../../lib/util'

interface Props {
  source: any
  frontMatter: any
}

const components = {}

function Game({ source, frontMatter }: Props) {
  const radarChartData = frontMatter.radarCharts.map((singleChart: any) => {
    const temp = singleChart.content.map((item: any) => ({
      subject: item.name,
      value: +item.value,
    }))
    return temp
  })

  console.log(radarChartData)

  const radarChartTexts = frontMatter.radarCharts.map(
    (singleChart: any) => singleChart.text
  )

  const [zoom, setZoom] = useState(false)
  const [zoomedImage, setZoomedImage] = useState({
    imgSrc: 'images/hero.jpg',
    alt: 'demo image',
  })

  function previousImage(e: any) {
    setZoomedImage(
      frontMatter.gallery[frontMatter.gallery.indexOf(zoomedImage) - 1]
    )
    const event = e || window.event
    event.stopPropagation()
  }
  function nextImage(e: any) {
    setZoomedImage(
      frontMatter.gallery[frontMatter.gallery.indexOf(zoomedImage) + 1]
    )
    const event = e || window.event
    event.stopPropagation()
  }

  const collapseImage = (e: any) => {
    if (e.key == 'Escape') {
      setZoom(false)
    }
  }
  useEffect(() => {
    document.body.addEventListener('keydown', collapseImage)
    return () => {
      removeEventListener('keypress', collapseImage)
    }
  })

  return (
    <>
      <div className="absolute w-screen">
        <PageWithHeader title={frontMatter.title}>
          {/* The thumbnail image corresponds to the first image from the gallery */}
          <TitleImage
            imgSrc={frontMatter.gallery ? frontMatter.gallery[0].imgSrc : ''}
          >
            <Title title={frontMatter.title} />
          </TitleImage>

          <Content>
            <Header.H2 className="mb-2 md:mb-4" align="left">
              {frontMatter.subtitle}
            </Header.H2>
            <div className="flex flex-col items-start md:flex-row">
              <div className="flex-1 pb-4 md:pb-0 md:pr-8">
                <p className="prose max-w-none">
                  <MDXRemote {...source} components={components} />
                </p>

                <div>
                  <div className="flex-1 mt-8">
                    <Header.H3>Characteristics</Header.H3>
                    <div className="inline lg:flex lg:flex-row">
                      <p className="flex-1 prose-sm prose">
                        {radarChartTexts[0]}
                      </p>
                      <div className="flex-1 mt-3 mb-6 lg:mt-0">
                        <RadarChart data={radarChartData[0]} />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 mt-4">
                    <Header.H3>Gamification Elements</Header.H3>
                    <div className="inline lg:flex lg:flex-row">
                      <p className="flex-1 prose-sm prose">
                        {radarChartTexts[1]}
                      </p>
                      <div className="flex-1 mt-3 mb-6 lg:mt-0">
                        <RadarChart data={radarChartData[1]} />
                      </div>
                    </div>
                  </div>

                  {frontMatter.gallery !== '' &&
                  frontMatter.gallery !== undefined ? (
                    <div className="justify-center flex-1 mt-8">
                      <Header.H3>Gallery</Header.H3>
                      <div className="container grid grid-cols-3 gap-2 mx-auto sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
                        {frontMatter.gallery?.map((image: any) => (
                          <div
                            className="m-auto rounded hover:opacity-70"
                            key={frontMatter.gallery.indexOf(image)}
                          >
                            <div
                              className="inline-block bg-center bg-cover rounded shadow-md cursor-[zoom-in] w-[28vw] h-[28vw] sm:w-28 sm:h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:h-36 lg:h-36"
                              style={{
                                backgroundImage: 'url("' + image.imgSrc + '")',
                              }}
                              onClick={() => {
                                setZoomedImage(image)
                                setZoom(true)
                              }}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {frontMatter.resources ? (
                    <div className="flex-1 mt-8">
                      <Header.H3>Resources</Header.H3>
                      <div className="inline md:flex md:flex-row">
                        <ul>
                          {frontMatter.resources.map((item: any) => (
                            <li key={item.name}>
                              <a
                                className="flex flex-row items-center hover:text-uzh-blue-100"
                                target="_blank"
                                href={item.href}
                                rel="noreferrer"
                              >
                                <PresentationChartBarIcon className="h-4 mr-1" />
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="flex-1 p-4 border rounded md:flex-initial md:w-96 bg-uzh-gray-20 md:max-w-[33%] lg:max-w-full">
                <Header.H3 className="!text-gray-600">
                  Learning Objectives
                </Header.H3>
                <p className="prose-sm prose">
                  <ul>
                    {frontMatter.objectives?.map((item: any) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </p>

                <Header.H3 className="mt-6 !text-gray-600">Keywords</Header.H3>
                <div className="flex flex-row flex-wrap justify-center md:justify-start">
                  {frontMatter.keywords?.map((item: any) => (
                    <Tag key={item} label={item} className="mb-2" />
                  ))}
                </div>

                <Header.H3 className="mt-6 !text-gray-600">Languages</Header.H3>
                <div className="flex flex-row flex-wrap justify-center md:justify-start">
                  {frontMatter.language?.map((item: any) => (
                    <Tag key={item} label={item} className="mb-1" />
                  ))}
                </div>

                <Header.H3 className="mt-6 !text-gray-600">Imprint</Header.H3>
                <ReactMarkdown className="prose-sm prose text-center md:text-left">
                  {frontMatter.imprint}
                </ReactMarkdown>

                <Header.H3 className="mt-6 !text-gray-600">Contact</Header.H3>
                <ReactMarkdown className="prose-sm prose text-center md:text-left">
                  {frontMatter.contact}
                </ReactMarkdown>

                {frontMatter['usedIn'] && (
                  <>
                    <Header.H3 className="mt-6 !text-gray-600">
                      Used In
                    </Header.H3>
                    <ul>
                      {frontMatter['usedIn'].map((course: any) => (
                        <li key={course.name}>
                          <p className="prose-sm prose text-center md:text-left">
                            {course.name}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </Content>
        </PageWithHeader>
      </div>
      {zoom ? (
        <div
          className="fixed z-10 w-full h-full bg-gray-900 bg-opacity-60"
          onClick={() => setZoom(false)}
        >
          <XIcon
            className="float-right w-8 h-8 mt-2 mr-2 md:w-12 md:h-12 hover:cursor-pointer"
            onClick={() => setZoom(false)}
          />
          <div className="absolute w-full top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">
            <div className="flex items-stretch justify-around max-width-full">
              <div
                className={clsx(
                  frontMatter.gallery.indexOf(zoomedImage) == 0
                    ? 'invisible'
                    : '',
                  'relative h-[80vh] flex-[0 0 50px] hover:bg-white hover:bg-opacity-50 hover:cursor-pointer'
                )}
                onClick={previousImage}
              >
                <ChevronLeftIcon className="absolute w-16 top-1/2 -translate-y-2/4 -left-1 md:-left-2" />
              </div>
              <div className="w-[80vw] max-w-max  mx-auto">
                <img
                  src={zoomedImage.imgSrc}
                  alt="Magnified Image"
                  className="relative top-1/2 -translate-y-2/4 max-h-[80vh] cursor-[zoom-out]"
                  onClick={() => setZoom(false)}
                />
              </div>
              <div
                className={clsx(
                  frontMatter.gallery.indexOf(zoomedImage) ==
                    frontMatter.gallery.length - 1
                    ? 'invisible'
                    : '',
                  'relative h-[80vh] flex-[0 0 50px] hover:bg-white hover:bg-opacity-50 hover:cursor-pointer'
                )}
                onClick={nextImage}
              >
                <ChevronRightIcon className="absolute w-16 top-1/2 -translate-y-2/4 -right-1 md:-right-2" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export const getStaticProps = Util.getStaticProps('games')
export const getStaticPaths = Util.getStaticPaths('games')

export default Game
