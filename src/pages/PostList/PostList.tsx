import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import CurrentPost from '../../components/CurrentPost/CurrentPost';
import { FAV_POST, POST_PER_PAGE } from '../../shared/variables/variables';
import FormAddPost from '../../components/FormAddPost/FormAddPost';
import 'react-toastify/dist/ReactToastify.css';
import PostActions from '../../components/PostsActions/PostActions';
import FilterPost from '../../components/FilterPost/FilterPost';
import { Post, User } from './types/types';

const PostList: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [buttonText, setButtonText] = useState<string>('Добавить пост');
  const [isFormAdd, setIsFormAdd] = useState<boolean>(false);
  const [arrOfCb, setArrOfCb] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<{ [postId: number]: boolean }>({});

  const [perPage, setPerPage] = useState<number>(() => {
    const currentData = Number(localStorage.getItem(POST_PER_PAGE));
    return currentData || 10;
  });

  useEffect(() => {
    const fav = localStorage.getItem(FAV_POST);
    if (fav) {
      setFavorites(JSON.parse(fav));
    }

    axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${perPage}`)
      .then((res) => {
        setPosts(res.data);
        setFilteredPosts(res.data);
      })
      .catch((err) => console.error(err, 'Error in block catch'));

    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, [perPage]);

  const handleChangePosts = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value: postsPerPage } = e.target;
    setPerPage(Number(postsPerPage));
    localStorage.setItem(POST_PER_PAGE, postsPerPage);
  };

  const handleAddPost = (): void => {
    setIsFormAdd((prev) => !prev);
    setButtonText(isFormAdd ? 'Добавить пост' : 'Закрыть');
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Список постов</h1>
      <label className="mb-4">
        Количество постов на странице:
        <select
          value={perPage}
          onChange={handleChangePosts}
          className="ml-2 px-2 py-1 border border-gray-300 rounded"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={-1}>Все</option>
        </select>
      </label>
      <div className="mb-4">
        <button
          type="button"
          onClick={handleAddPost}
          className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-green-500"
        >
          {buttonText}
        </button>
        {isFormAdd && (
      <FormAddPost
        users={users}
        setButtonText={setButtonText}
        setIsFormAdd={setIsFormAdd}
        setFilteredPosts={setFilteredPosts}
        setPosts={setPosts}
      />
      )}
    <PostActions
      setFavorites={setFavorites}
      setPosts={setPosts}
      setFilteredPosts={setFilteredPosts}
      arrOfCb={arrOfCb}
      setArrOfCb={setArrOfCb}
    />
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
      <FilterPost
        favorites={favorites}
        users={users}
        posts={posts}
        setFilteredPosts={setFilteredPosts}
      />
      <ul>
        {filteredPosts.map((post) => {
          const user = users.find((currentUser) => currentUser.id === post.userId);
          return (
            <CurrentPost
              favorites={favorites}
              setArrOfCb={setArrOfCb}
              users={users}
              key={post.id}
              post={post}
              user={user}
              setFilteredPosts={setFilteredPosts}
              setPosts={setPosts}
              arrOfCb={arrOfCb}
              setFavorites={setFavorites}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default PostList;
