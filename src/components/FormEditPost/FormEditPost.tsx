import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Post, User } from '../../pages/PostList/types/types';

interface IFormEditPostProps {
  post: Post;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredPosts: React.Dispatch<React.SetStateAction<Post[]>>
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  users: User[]

}

const FormEditPost: FC <IFormEditPostProps> = ({ post, setIsEditing, setFilteredPosts,
   users, setPosts }) => {
  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.body);
  const [currentUser, setCurrentUser] = useState<number>(post.userId);

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = e.target;
    setCurrentUser(Number(value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise <void> => {
    const { id } = post;
    e.preventDefault();

    const newPost = {
      userId: currentUser,
      id,
      title,
      body: text
    };

    try {
      const response = await toast.promise(
      axios.patch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, newPost), {
      pending: 'Запрос на изменение данных..',
      success: 'Пост успешно изменен',
      error: 'Ошибка при изменении поста'
    }
    );
    if (response && response.status === 200) {
      setIsEditing((prev) => !prev);
      setFilteredPosts((prev) => prev.map((item) => {
        if (item.id === post.id) {
          return newPost;
        }
          return item;
      }));
      setPosts((prev) => prev.map((item) => {
        if (item.id === post.id) {
          return newPost;
        }
          return item;
      }));
    }
    } catch (error) {
      console.error(error, 'Error in block catch');
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
  };
  const handleCloseClick = (): void => {
    setIsEditing((prev) => !prev);
  };
   return (
    <form onSubmit={handleSubmit} className="relative flex flex-col items-center w-full">
        <h3 className="text-lg font-semibold mb-2">Выберите пользователя</h3>
        <select
          value={currentUser}
          onChange={handleUserChange}
          className="border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 w-full"
        >
        {users.map((user) => (
        <option key={user.id} value={user.id}>{user.name}</option>
        ))}
        </select>
        <h3 className="mt-2 text-lg font-semibold">Текст</h3>
        <input
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          type="text"
          className="mt-2 border rounded-md py-4 px-4 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
       <h3 className="mt-2 text-lg font-semibold mb-2">Описание</h3>
        <textarea
          placeholder="Text"
          onChange={handleTextChange}
          value={text}
          className="mt-2 border rounded-md py-4 px-4 focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
        <button
          type="submit"
          className="mt-4 mb-0 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
        Редактировать
        </button>
        <button
          className="absolute top-0 right-2  w-6 h-6 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
          type="button"
          onClick={handleCloseClick}
        >
          Ⓧ
        </button>
    </form>
  );
};

export default FormEditPost;
