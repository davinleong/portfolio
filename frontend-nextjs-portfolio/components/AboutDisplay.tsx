'use client'
import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { motion } from 'motion/react'

export default function AboutDisplay() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-2 pt-6 pb-8 md:space-y-5"
      >
        <AuthorLayout content={mainContent}>
          <h2 className="mb-4 text-xl text-gray-500 dark:text-gray-400">
            {/* Add your subtitle text here */}
            Hi I'm Davin! 👋
          </h2>
          <MDXLayoutRenderer code={author.body.code} />
        </AuthorLayout>
      </motion.div>
    </>
  )
}
