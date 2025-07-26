import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const projectsData = await fetch(`${process.env.API_URL}/projects`)
  const { projects } = await projectsData.json()
  if (!projects || projects.error) {
    return <div>Error loading projects</div>
  }
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} projects={projects} />
}
