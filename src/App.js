import React, { useMemo, useRef, useState } from "react";
import CLassCounter from "./components/ClassCounter";
import Counter from "./components/Counter";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import MySelect from "./components/UI/select/MySelect";
import "./styles/App.css";

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'qwqw', body: 'JavaScript'},
    {id: 2, title: 'asas', body: 'JavaScript - язык программирования'}
  ])

  {/* Неуправляемый компонент */}
  // const bodyInputRef = useRef();

  const [filter, setFilter] = useState({sort:'', query:''}); //алгоритм сортировки и поисковая строка

  const sortedPosts = useMemo(() => {
    console.log('функция отработала')
    if(filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    return posts;
  }, [filter.sort, posts]); //алгоритм сортировки и массив с постами

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(filter.query));
  }, [filter.query, sortedPosts]); //поисковая строка и отсортированный массив

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1"/>
    </div>
  );
}

export default App;
