/* eslint-disable react/function-component-definition */
import { FC } from 'react';
import { ActiveTab } from './types/types';
import { ACTIVE_MAIN_HREF } from '../../shared/variables/variables';

interface NavbarProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: FC <NavbarProps> = ({ activeTab, setActiveTab }) => {
  const handleClickPosts = (): void => {
    setActiveTab(ActiveTab.posts);
    localStorage.setItem(ACTIVE_MAIN_HREF, ActiveTab.posts);
  };

  const handleClickPhotos = (): void => {
    setActiveTab(ActiveTab.photos);
    localStorage.setItem(ACTIVE_MAIN_HREF, ActiveTab.photos);
  };

  const handleClickTasks = (): void => {
    setActiveTab(ActiveTab.tasks);
    localStorage.setItem(ACTIVE_MAIN_HREF, ActiveTab.tasks);
  };
  return (
    <div className="flex justify-center py-4">
      {/* px-4 py-2 bg-blue-500 text-white rounded */}
    <button
      className={`mr-4 px-4 py-2 text-white rounded ${
        activeTab === ActiveTab.posts ? 'bg-green-500' : 'bg-blue-500'
      }`}
      onClick={handleClickPosts}
    >
      Посты
    </button>
    <button
      className={`mr-4 px-4 py-2 text-white rounded ${
        activeTab === ActiveTab.photos ? 'bg-green-500' : 'bg-blue-500'
      }`}
      onClick={handleClickPhotos}
    >
      Фото
    </button>
    <button
      className={`px-4 py-2 text-white rounded ${
        activeTab === ActiveTab.tasks ? 'bg-green-500' : 'bg-blue-500'
      }`}
      onClick={handleClickTasks}
    >
      Задачи
    </button>
    </div>
  );
};

export default Navbar;
