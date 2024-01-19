import React from 'react'
import { useSelector } from 'react-redux'
import { singlePostId } from './postsSlice'
import PostAurthor from "./PostAurthor"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


const SinglePost = () => {
    const {postId} = useParams()
    const post = useSelector((state)=> singlePostId(state, Number(postId)))

    if(!post){
        return(
            <section>
                <h2>Page Not Found!</h2>
            </section>
        )
    }

  return (
    <article >
        <h3>{post.title}</h3>
        <p className='excerpt' >{post.body.substring(0,75)}...</p>
        <p className='postCredit'>
          <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
          <PostAurthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
          <ReactionButtons post={post} />
        </p>

    </article>
  )
}

export default SinglePost