'use client'
import { AnimatePresence, motion } from 'motion/react'
import Card from './Card'
import { useState } from 'react'

export default function ProjectDisplay({ projects }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(projects.length / itemsPerPage)

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }
  return (
    <div className="mb-6 pt-6 pb-8">
      <motion.div
        initial={{ opacity: 0, x: 5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-2 pt-6 pb-8 md:space-y-5"
      >
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Projects
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          All the cool things I have worked on!
        </p>
      </motion.div>

      <div className="container py-12">
        {/* displays projects */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="-m-4 flex flex-wrap"
          >
            {currentProjects.map((data) => (
              <Card
                key={data.id}
                title={data.title}
                description={data.description}
                imgSrc={data.imgSrc}
                href={data.href}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* pagination */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            &lt;
          </button>
          <span className="text-gray-800 dark:text-gray-200">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}
