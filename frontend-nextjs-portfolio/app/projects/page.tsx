// import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import ProjectDisplay from '@/components/ProjectDisplay'
import { genPageMetadata } from 'app/seo'
import { AnimatePresence, motion } from 'motion/react'

export const metadata = genPageMetadata({ title: 'Projects' })

export default async function Projects() {
  const projectsData = await fetch(`${process.env.API_URL}/projects`, { cache: 'no-store' });
  const { projects } = await projectsData.json()
  if (!projects || projects.error) {
    return <div>Error loading projects</div>
  }
  return (
    <>
      <ProjectDisplay projects={projects}/>
    </>
  )
}
