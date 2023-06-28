import { FC, useState } from 'react';
import ModalPostActions from './ModalPostActions/ModalPostActions';
import { Post } from '../../pages/PostList/types/types';

interface IPostActionsProps {
  arrOfCb: number[]
  setFilteredPosts: React.Dispatch<React.SetStateAction<Post[]>>
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  setArrOfCb: React.Dispatch<React.SetStateAction<number[]>>
  setFavorites: React.Dispatch<React.SetStateAction<{
    [postId: number]: boolean;
}>>
}

const PostActions: FC <IPostActionsProps> = ({ arrOfCb, setFilteredPosts,
  setArrOfCb, setPosts, setFavorites }) => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [currentBtn, setCurrentBtn] = useState<string>('');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const { textContent } = e.target as HTMLButtonElement;
    setIsModalActive((prev) => !prev);
    setCurrentBtn(textContent);
  };
  return (
    <div>
         {arrOfCb.length > 0 && (
        <div className="flex mt-4 justify-center items-center">
          <button onClick={handleClick} type="button" className="px-8 py-2 bg-red-500 text-white rounded hover:bg-red-700">
           Удалить
          </button>
          <button onClick={handleClick} type="button" className="px-8 py-2 ml-4 bg-violet-500 text-white rounded hover:bg-violet-700">
            В избранное
          </button>
          <div className="ml-4">{arrOfCb.length} пост(а)</div>
        </div>
    )}
    {isModalActive && (
    <ModalPostActions
      setFilteredPosts={setFilteredPosts}
      setPosts={setPosts}
      currentBtn={currentBtn}
      arrOfCb={arrOfCb}
      setIsModalActive={setIsModalActive}
      setArrOfCb={setArrOfCb}
      setFavorites={setFavorites}
    />
  )}
    </div>
  );
};

export default PostActions;
