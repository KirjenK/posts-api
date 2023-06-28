/* eslint-disable max-len */
import { FC, useState } from 'react';
import { Post, User } from '../../pages/PostList/types/types';

interface IFilterPostProps {
  users: User[],
  setFilteredPosts: React.Dispatch<React.SetStateAction<Post[]>>
  posts: Post[]
  favorites: {
    [postId: number]: boolean;
  }
}

const FilterPost: FC <IFilterPostProps> = ({ users, setFilteredPosts, posts, favorites }) => {
  const [filterText, setFilterText] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => {
      return Number(option.value);
    });
    if (selectedOptions.length !== 0) {
      filterPosts(selectedOptions);
    } else {
      setFilteredPosts(posts);
    }
  };

  const handleFavoritesChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setShowFavoritesOnly((prev) => !prev);
    if (e.target.checked) {
      const filteredFavorites = posts
      .filter((post) => favorites[post.id])
      .filter((post) => post.title.toLowerCase().includes(filterText.toLocaleLowerCase()));
      setFilteredPosts(filteredFavorites);
    } else {
      const filteredFavorites = posts
      .filter((post) => post.title.toLowerCase().includes(filterText.toLocaleLowerCase()));
      setFilteredPosts(filteredFavorites);
    }
  };

  const filterPosts = (arrOfUsers: number[]): void => {
    if (showFavoritesOnly) {
      const filtred = posts
      .filter((post) => favorites[post.id])
      .filter((post) => post.title.toLowerCase().includes(filterText.toLocaleLowerCase()))
      .filter((post) => arrOfUsers.includes(post.userId));
      setFilteredPosts(filtred);
    } else {
      const filtered = posts
      .filter((post) => arrOfUsers.includes(post.userId))
      .filter((post) => post.title.toLowerCase().includes(filterText.toLocaleLowerCase()));
      setFilteredPosts(filtered);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setFilterText(value);

    if (showFavoritesOnly) {
      const filteredFavorites = posts
      .filter((post) => favorites[post.id])
      .filter((post) => post.title.toLowerCase().includes(value.toLocaleLowerCase()));
      setFilteredPosts(filteredFavorites);
    } else {
      const filtered = posts.filter((post) => post.title.toLowerCase().includes(value.toLowerCase()));
      setFilteredPosts(filtered);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
      <input
        type="text"
        value={filterText}
        onChange={handleFilterChange}
        placeholder="Фильтр по названию"
        className="border border-gray-300 rounded p-2 mr-2 mb-2 md:mb-0"
      />

      <select
        multiple
        className="border border-gray-300 rounded p-2 mr-2 mb-2 md:mb-0"
        onChange={handleSelectChange}
      >
      {users.map((user) => (
        <option key={user.id} value={user.id}>{user.name}</option>
      ))}
      </select>

     <label className="flex items-center">
       <input
         type="checkbox"
         className="form-checkbox mr-2"
         onChange={handleFavoritesChange}
         checked={showFavoritesOnly}
       />
      Показывать только избранные
     </label>
    </div>
  );
};

export default FilterPost;
