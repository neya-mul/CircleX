import React from 'react'
import {getPostDetails} from "../../../lib/allData/postDetails"
import DetailsComponents from "../../../components/DetailsComponent"

export default async function PostDetails({params}) {
    const {id} = await params
    const post = await getPostDetails(id)
  return (
    <DetailsComponents post={post}></DetailsComponents>
  )
}
