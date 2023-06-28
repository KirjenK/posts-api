import { FC } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Post } from '../../../pages/PostList/types/types';
import { FAV_POST } from '../../../shared/variables/variables';

interface IModalPostActions {
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>
  arrOfCb: number[]
  currentBtn: string
  setFilteredPosts: React.Dispatch<React.SetStateAction<Post[]>>
  setArrOfCb: React.Dispatch<React.SetStateAction<number[]>>
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  setFavorites: React.Dispatch<React.SetStateAction<{
    [postId: number]: boolean }>>
}

const ModalPostActions: FC <IModalPostActions> = (props) => {
  const { setIsModalActive,
    arrOfCb, currentBtn, setFilteredPosts, setArrOfCb,
     setPosts, setFavorites } = props;

  const handleClickCancel = (): void => {
    setIsModalActive((prev) => !prev);
  };

  const handleConfirm = async (): Promise <void> => {
    if (currentBtn === 'Удалить') {
      try {
        const deletePromises = arrOfCb.map((postId) => {
          localStorage.removeItem(`isFav-${postId}`);
          return axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        });
        await Promise.all(deletePromises);

        setFilteredPosts((prev) => prev.filter((post) => !arrOfCb.includes(post.id)));
        setPosts((prev) => prev.filter((post) => !arrOfCb.includes(post.id)));
        setIsModalActive((prev) => !prev);
        setArrOfCb([]);

        setFavorites((prev) => {
           arrOfCb.forEach((key) => {
            delete prev[key];
          });
          localStorage.setItem(FAV_POST, JSON.stringify(prev));
          return prev;
        });

        toast.success('Посты успешно удалены!');
      } catch (err) {
        console.error(err, 'Err in block catch');
        toast.error('Ошибка при удалении постов.');
      }
    } else {
      console.log(arrOfCb);

      setFavorites((prev) => {
        const updatedFavorites = arrOfCb.reduce((res, num) => {
          return { ...res, [num]: true };
        }, prev);

        localStorage.setItem(FAV_POST, JSON.stringify(updatedFavorites));
        return updatedFavorites;
      });
      setIsModalActive((prev) => !prev);
      setArrOfCb([]);
      toast.success(`${arrOfCb.length} поста(ов) добавлены в избранное`);
    }
  };
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-md">
          {currentBtn === 'Удалить' && (
          <>
            <h2 className="text-xl font-bold mb-4">Удаление поста</h2>
            <p className="mb-4">Вы уверены, что хотите удалить {arrOfCb.length} поста(а)</p>
          </>
        )}
           {currentBtn === 'В избранное' && (
          <>
            <h2 className="text-xl font-bold mb-4">Добавить в избранное</h2>
            <p className="mb-4">Вы уверены, что хотите добавить {arrOfCb.length} поста(а) в избранное? </p>
          </>
        )}
          <div className="flex justify-end">
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mr-2"
              onClick={handleConfirm}
            >
              Да
            </button>
            <button
              onClick={handleClickCancel}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
            >
              Нет
            </button>
          </div>
        </div>
      </div>
    );
};

export default ModalPostActions;
