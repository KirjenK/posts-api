/* eslint-disable no-prototype-builtins */
import { FC, useState } from 'react';
import { FaRegComments } from 'react-icons/fa';
import { AiOutlineEdit, AiOutlineHeart } from 'react-icons/ai';
import { FiDelete } from 'react-icons/fi';
import { Post, User } from '../../pages/PostList/types/types';
import FormEditPost from '../FormEditPost/FormEditPost';
import ModalDelete from './ModalDelete/ModalDelete';
import Comments from '../Comments/Comments';
import { FAV_POST } from '../../shared/variables/variables';

interface ICurrentPostProps {
  post: Post;
  user: User;
  setFilteredPosts: React.Dispatch<React.SetStateAction<Post[]>>
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  users: User[]
  setArrOfCb: React.Dispatch<React.SetStateAction<number[]>>
  arrOfCb: number[]
  setFavorites: React.Dispatch<React.SetStateAction<{
    [postId: number]: boolean }>>
  favorites: {
    [postId: number]: boolean;
  }
}

const CurrentPost: FC <ICurrentPostProps> = (props) => {
  const { post, user, setFilteredPosts, users, setArrOfCb, arrOfCb,
    setPosts, setFavorites, favorites } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);

  const handleDelete = (): void => {
    setIsModalDelete((prev) => !prev);
  };

  const handleEditClick = (): void => {
    setIsEditing((prev) => !prev);
  };

  const handleFavClick = (): void => {
    setFavorites((prev) => {
      if (!prev.hasOwnProperty(post.id)) {
        const newFav = { ...prev, [post.id]: true };
        localStorage.setItem(FAV_POST, JSON.stringify(newFav));
        return newFav;
      }
      const updatedFavorites = { ...prev };
      delete updatedFavorites[post.id];
      localStorage.setItem(FAV_POST, JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const handleClickComments = (): void => {
    setIsActive((prev) => !prev);
  };

  const handleAddCheckBox = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setArrOfCb((prev) => {
      if (prev.includes(Number(value))) {
        return prev.filter((num) => num !== Number(value));
      }
      return [...prev, Number(value)];
    });
  };

  return (
    <>
  <li key={post.id} className={`${favorites[post.id] ? 'bg-violet-500' : ''} border p-4 mb-4 cursor-pointer `}>
    {isEditing ? (
      <FormEditPost
        users={users}
        setFilteredPosts={setFilteredPosts}
        setPosts={setPosts}
        post={post}
        setIsEditing={setIsEditing}
      />
    ) : (
      <>
        <h2 className="text-xl font-bold mb-2">Тема: {post.title}</h2>
        <p className="mb-2">Добавил: {user?.name}</p>
        <p className="mb-4">{post.body}</p>
        <div className="flex items-center mb-2">
        <FaRegComments
          onClick={handleClickComments}
          size={17}
          className={`mr-2 hover:text-blue-500 ${isActive ? 'opacity-100' : 'opacity-50'}`}
        />
        <AiOutlineEdit size={17} className="mr-2 hover:text-green-500" onClick={handleEditClick} />
        <FiDelete size={17} className="mr-2 hover:text-red-500" onClick={handleDelete} />
        <AiOutlineHeart onClick={handleFavClick} size={17} className="mr-2 hover:text-violet-500" />
        <input
          onChange={handleAddCheckBox}
          checked={arrOfCb.includes(post.id)}
          value={post.id}
          type="checkbox"
          className="custom-checkbox mr-2"
        />
        </div>
        {isActive &&
        <Comments postId={post.id} />}
      </>
    )}
  </li>
  {isModalDelete && (
  <ModalDelete
    setFavorites={setFavorites}
    postId={post.id}
    setFilteredPosts={setFilteredPosts}
    setPosts={setPosts}
    setIsModalDelete={setIsModalDelete}
  />
)}
    </>
  );
};

export default CurrentPost;
