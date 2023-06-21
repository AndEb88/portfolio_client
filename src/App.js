import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Outlet, useLocation} from 'react-router-dom';

import Navigator from './components/Navigator';
import Header from './containers/Header';
import content from './utils/content';
import mockStore from './utils/mockStore';


function App() {

  const location = useLocation().pathname;
  const [home, main, item, form] = location.split('/');

  const mainIndex = main ? content.findIndex(currentMain => currentMain.route === main) : -1;
  const itemIndex = item ? content[mainIndex].items.findIndex(currentItem => currentItem.route === item) : -1;
  const blockList = item ? Object.keys(mockStore[main][item]) : []; //requires sort? 'overall' would be at last index

  const [block, setBlock] = useState({
    value: '', 
    index: 0,
    max: 0,
    list: []
  });
  
  if(blockList && JSON.stringify(blockList) !== JSON.stringify(block.list)){
    if (blockList[0] === 'overall') {
      setBlock({
        value: blockList[1],
        index: 1,
        max: blockList.length - 1,
        list: blockList
      });
    } else {
      setBlock({
        value: blockList[0],
        index: 0,
        max: blockList.length - 1,
        list: blockList
      });
    }
  };

  const toggleBlockLeft = () => {
      setBlock(prevBlock => {
          const newIndex = prevBlock.index - 1;
          return {
              ...prevBlock,
              value: prevBlock.list[newIndex],
              index: newIndex
          };
      });
  };

  const toggleBlockRight = () => {
      setBlock(prevBlock => {
          const newIndex = prevBlock.index + 1;
          return {
              ...prevBlock,
              value: prevBlock.list[newIndex],
              index: newIndex
          };
      });
  };

  return (
    <>
      <Header mainIndex={mainIndex} itemIndex={itemIndex} main={main} item={item} form={form} block={block} toggleBlockLeft={toggleBlockLeft} toggleBlockRight={toggleBlockRight}/>   
      <Outlet context={[mainIndex, itemIndex, main, item, form, block]}/>
      <Navigator/>
    </>
  );
}

export default App;
