import AddPostForm from './features/posts/AddPostForm';
import PostsList from './features/posts/PostsList';
import { Routes, Route } from 'react-router-dom';
import SinglePost from './features/posts/SinglePost';
import Layout from './components/Layout';
import EditPostForm from './features/posts/EditPostForm';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<PostsList />} />

        <Route path='post'>
          <Route index element={<AddPostForm />} />
          <Route path=':postId' element={<SinglePost />} />
          <Route path='edit/:postId' element={<EditPostForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
