'use client'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { genPageMetadata } from 'app/seo'
const adjectives = [
  'amazing',
  'innovative',
  'exciting',
  'dynamic',
  'cutting-edge',
  'creative',
  'impactful',
  'transformative',
  'engaging',
  'versatile',
]
const colors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFC300', '#A66DD4', '#FF9F1C', '#00B8A9']

const MAX_DISPLAY = 5

// export const metadata = genPageMetadata({ title: 'Home' })

export default function Home({ posts, projects }) {
  // Randomly select an adjective from the list
  const [adjective, setAdjective] = useState(() => {
    return adjectives[Math.floor(Math.random() * adjectives.length)]
  })
  // Use a key to force Framer Motion to re-render the adjective when it changes
  const [key, setKey] = useState(0)
  // Randomly select a color for the adjective
  const [color, setColor] = useState(() => {
    return colors[Math.floor(Math.random() * colors.length)]
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setAdjective((prevAdjective) => {
        let nextAdjective
        do {
          nextAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
        } while (nextAdjective === prevAdjective)

        // Pick a new color
        let nextColor
        do {
          nextColor = colors[Math.floor(Math.random() * colors.length)]
        } while (nextColor === color)

        setColor(nextColor)
        setKey((k) => k + 1)
        return nextAdjective
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [color]) // depend on `color` so it updates correctly

  const MY_TIMEZONE_DISPLAY = 'Vancouver • UTC-7'

  return (
    <>
      <div className="mb-6 space-y-2 pt-6 pb-8 md:space-y-5">
        <div className="from-blue-10 rounded-2xl bg-gradient-to-r to-cyan-50 p-3">
          <motion.h1
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14 dark:text-gray-100"
          >
            I'm Davin and this is my blog. A software developer who enjoys building{' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={key}
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{ color, fontWeight: 'bold', display: 'inline-block' }}
              >
                {adjective}
              </motion.span>
            </AnimatePresence>{' '}
            things. 🙂
          </motion.h1>

          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg leading-7 text-gray-500 dark:text-gray-400"
          >
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              {siteMetadata.description}
            </p>

            <p className="text-md leading-6 text-gray-600 dark:text-gray-400">
              {MY_TIMEZONE_DISPLAY}
            </p>
          </motion.span>
        </div>
      </div>

      {/* projects */}
      <motion.span
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="mb-6 text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
          Projects
        </h1>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => {
            const { id, title, description, href, imgSrc } = project
            return (
              <li key={id} className="flex">
                <article className="h-full w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:shadow-md dark:hover:shadow-lg">
                  <div className="space-y-4">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={title}
                        className="h-48 w-full rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-48 w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400 italic dark:bg-gray-800 dark:text-gray-500">
                        No image available
                      </div>
                    )}
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      <Link href={`/projects/${id}`}>{title}</Link>
                    </h2>
                    <p className="line-clamp-3 text-gray-600 dark:text-gray-400">{description}</p>
                    <div>
                      {href ? (
                        <Link
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
                          aria-label={`Visit project: "${title}"`}
                        >
                          Visit Project &rarr;
                        </Link>
                      ) : (
                        <span className="font-medium text-gray-500 dark:text-gray-400">
                          No link available
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>

        {/* Show All Projects Button */}
        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="bg-primary-500 hover:bg-primary-600 dark:hover:bg-primary-400 inline-block rounded-md px-5 py-3 font-semibold text-white transition"
          >
            Show All Projects
          </Link>
        </div>
      </motion.span>

      {/* posts */}
      {/* <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!posts.length && 'No posts found.'}
        {posts.slice(0, MAX_DISPLAY).map((post) => {
          const { slug, date, title, summary, tags } = post
          return (
            <li key={slug} className="py-12">
              <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl leading-8 font-bold tracking-tight">
                          <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                            {title}
                          </Link>
                        </h2>
                        <div className="flex flex-wrap">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>
                    </div>
                    <div className="text-base leading-6 font-medium">
                      <Link
                        href={`/blog/${slug}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Read more: "${title}"`}
                      >
                        Read more &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )} */}

      {/* newsletter..? */}
      {/* {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )} */}
    </>
  )
}
