import { useSelector } from "react-redux"
import { selectAllPost ,getPostsError, getPostsStatus } from "./postsSlice"

import PostsExcerpt from "./PostsExcerpt"


const PostsList = () => {
//const dispatch = useDispatch()
const posts = useSelector(selectAllPost)
const postStatus = useSelector(getPostsStatus)
const error = useSelector(getPostsError )

 

let content;
if(postStatus === 'loading'){
  content = <p>"Loading... "</p>;
}else if(postStatus === 'succeeded'){
  const orderedPosts = posts.slice().sort((a,b)=> b.date.localeCompare(a.date))

  content= orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
}else if(postStatus === 'failed'){
  <p>{error}</p>
}

  return (
    <section>
      
     {/*  {renderedPosts.reverse()} */}
     {content}
    </section>
    
  )
}

export default PostsList