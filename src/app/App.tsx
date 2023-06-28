import { FC, useState } from 'react';
import Navbar from '../widgets/Navbar/Navbar';
import PostList from '../pages/PostList/PostList';
import { ActiveTab } from '../widgets/Navbar/types/types';
import { ACTIVE_MAIN_HREF } from '../shared/variables/variables';
import Photos from '../pages/Photos/Photos';
import Tasks from '../pages/Tasks/Tasks';

const App: FC = () => {
  const [activeTab, setActiveTab] = useState<string>(() => {
    const currentTab = localStorage.getItem(ACTIVE_MAIN_HREF);
    return currentTab || 'posts';
  });

  return (
    <div>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === ActiveTab.posts &&
       <PostList />}
       {activeTab === ActiveTab.photos &&
       <Photos />}
       {activeTab === ActiveTab.tasks &&
       <Tasks />}
    </div>
  );
};

export default App;
