import axios from 'axios';
import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { Post, User } from '../../pages/PostList/types/types';

interface IFormAddPost {
  setFilteredPosts: React.Dispatch<React.SetStateAction<Post[]>>
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  setIsFormAdd: React.Dispatch<React.SetStateAction<boolean>>
  setButtonText: React.Dispatch<React.SetStateAction<string>>
  users: User[]

}

const FormAddPost: FC <IFormAddPost> = ({ setFilteredPosts, setIsFormAdd,
  setButtonText, setPosts, users }) => {
  const [text, setText] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [userSelect, setUserSelect] = useState<number>(0);

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = e.target;
    setUserSelect(Number(value));
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise <void> => {
    e.preventDefault();
    const newPost: Post = {
      id: Date.now(),
      userId: userSelect,
      title,
      body: text
    };

    try {
   const response = await toast.promise(
    axios.post('https://jsonplaceholder.typicode.com/posts', newPost), {
      pending: 'Добавление...',
      success: 'Пост успешно добавлен!',
      error: 'Ошибка при добавлении поста.'
    }
   );
    if (response && response.status === 201) {
      setIsFormAdd((prev) => !prev);
      setFilteredPosts((prev) => [...prev, newPost]);
      setPosts((prev) => [...prev, newPost]);
      setButtonText('Добавить пост');
    }
   } catch (error) {
      console.error(error, 'Error in block catch');
    }
  };

  return (
      <form onSubmit={handleSubmit} className="mb-4 mt-4">
        <input
          value={title}
          onChange={handleChangeTitle}
          type="text"
          placeholder="Enter title.."
          className="border rounded-md py-2 px-4 mr-2 focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          value={text}
          onChange={handleChangeText}
          type="text"
          placeholder="Enter text.."
          className="border rounded-md py-2 px-4 mr-2 focus:outline-none focus:ring focus:border-blue-300"
        />
        <select
          className="border rounded-md py-2 px-4 mr-2 focus:outline-none focus:ring focus:border-blue-300"
          onChange={handleUserChange}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
        Send
        </button>
      </form>
  );
};

export default FormAddPost;
