import React from 'react'
import { getPostDetails } from "../../../lib/allData/postDetails"
import DetailsComponents from "../../../components/DetailsComponent"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PostDetails({ params }: PageProps) {
  const { id } = await params
  const post = await getPostDetails(id)

  return (
    <DetailsComponents post={post}></DetailsComponents>
  )
}