import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewPost } from './postsSlice'
import { useSelector } from "react-redux"
import { selectAllUsers } from '../user/usersSlice'
import { useNavigate } from 'react-router-dom'

const AddPostForm = () => {
  const dispatch = useDispatch()
  const [title,setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const navigate = useNavigate()
    const users = useSelector(selectAllUsers)
  
    const userOption = users.map(user =>(
      <option key = {user.id} value={user.id}>
        {user.name}
      </option>
    ))
  
  
  const onTitleChange = e => setTitle(e.target.value)
  const onContentChange = e => setContent(e.target.value)
  const onAurthorChange = e => setUserId(e.target.value)

  
   
  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';
  
  const onSavePostClicked = ()=>{
    if(canSave){
      try{
        setAddRequestStatus('pending')
        dispatch(addNewPost({title, body: content, userId})).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
        navigate('/')
      }catch(err){
        console.error('Failed to save the post', err)
      }finally{
        setAddRequestStatus('idle')
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
        <button type='button' onClick={onSavePostClicked} disabled={!canSave}>Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm