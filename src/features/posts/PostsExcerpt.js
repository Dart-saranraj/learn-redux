import React from 'react'
import PostAurthor from "./PostAurthor"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"
import { Link } from 'react-router-dom'

const PostsExcerpt = ({post}) => {
  return (
    <article >
        <h3>{post.title}</h3>
        <p className='excerpt' >{post.body.substring(0,75)}...</p>
        <p className='postCredit'>
          <Link to={`post/${post.id}`}>View Post</Link>
          <PostAurthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
          <ReactionButtons post={post} />
        </p>
    </article>
  )
}

export default PostsExcerpt