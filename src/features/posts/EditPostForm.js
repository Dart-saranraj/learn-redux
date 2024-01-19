import { selectAllUsers } from "../user/usersSlice"
import { useSelector, useDispatch } from "react-redux"
import { singlePostId, updatePost, deletePost } from "./postsSlice"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"

const EditPostForm = () => {

    const { postId } = useParams()
    const post = useSelector((state)=>singlePostId(state, Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)
    const [requestStatus, setRequestStatus] = useState('idle')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    if(!post){
        return(
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChange = e => setTitle(e.target.value)
    const onContentChange = e => setContent(e.target.value)
    const onAurthorChange = e => setUserId(Number(e.target.value))

    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';
    
    const userOption = users.map(user =>(
        <option key = {user.id} value={user.id}>
          {user.name}
        </option>
      ))
    

    const onEditPostClicked = ()=>{
        if(canSave){
          try{
            setRequestStatus('pending')
            dispatch(updatePost({id: post.id, title, body: content, userId, reactions: post.reactions})).unwrap()
            setTitle('')
            setContent('')
            setUserId('')
            navigate(`/post/${postId}`)
          }catch(err){
            console.error('Failed to edit the post', err)
          }finally{
            setRequestStatus('idle')
          }
        }
      }

      const onDeletePostClicked = ()=>{
        if(canSave){
          try{
            setRequestStatus('pending')
            dispatch(deletePost({id: post.id})).unwrap()
            setTitle('')
            setContent('')
            setUserId('')
            navigate(`/`)
          }catch(err){
            console.error('Failed to edit the post', err)
          }finally{
            setRequestStatus('idle')
          }
        }
      }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text"
               id= "postTitle"
               name='postTitle'
               value={title}
               onChange={onTitleChange}
        />
        <label htmlFor="aurthor">Aurthor Name:</label>
        <select id="aurthor" value={userId} onChange={onAurthorChange}><option value=""></option>{userOption}</select>
        
        <label htmlFor="postContent">Post Content:</label>
        <textarea
               id= "postContent"
               name='postContent'
               value={content}
               onChange={onContentChange}
        />
        <button type='button' onClick={onEditPostClicked} disabled={!canSave}>Update Post
        </button>
        <button type='button' onClick={onDeletePostClicked} >Delete Post
        </button>
      </form>
    </section>
  )
}

export default EditPostForm