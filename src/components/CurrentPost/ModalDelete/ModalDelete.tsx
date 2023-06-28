import { FC } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Post } from '../../../pages/PostList/types/types';
import { FAV_POST } from '../../../shared/variables/variables';

interface IModalDeleteProps {
  setIsModalDelete: React.Dispatch<React.SetStateAction<boolean>>
  setFilteredPosts: React.Dispatch<React.SetStateAction<Post[]>>
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  postId: number
  setFavorites: React.Dispatch<React.SetStateAction<{
    [postId: number]: boolean }>>
}
const ModalDelete: FC <IModalDeleteProps> = ({ setIsModalDelete, setFilteredPosts,
   postId, setPosts, setFavorites }) => {
  const handleCancelDelete = (): void => {
    setIsModalDelete((prev) => !prev);
  };

  const handleConfirmDelete = async (): Promise <void> => {
    try {
      const response = await toast.promise(
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`), {
          pending: 'Удаление...',
          success: 'Пост успешно удален!',
          error: 'Ошибка при удалении поста.'
        }
       );
        if (response && response.status === 200) {
          setFilteredPosts((prev) => prev.filter((el) => el.id !== postId));
          setPosts((prev) => prev.filter((el) => el.id !== postId));
          setIsModalDelete((prev) => !prev);

          setFavorites((prev) => {
            delete prev[postId];
            localStorage.setItem(FAV_POST, JSON.stringify(prev));
            return prev;
          });
        }
    } catch (err) {
      console.error(err, 'Err in block catch');
    }
  };
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-xl font-bold mb-4">Удаление поста</h2>
          <p className="mb-4">Вы уверены, что хотите удалить этот пост?</p>
          <div className="flex justify-end">
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mr-2"
              onClick={handleConfirmDelete}
            >
              Да
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
              onClick={handleCancelDelete}
            >
              Нет
            </button>
          </div>
        </div>
      </div>
    );
};

export default ModalDelete;
