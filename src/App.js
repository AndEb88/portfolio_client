import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Outlet, useLocation} from 'react-router-dom';

import Navigator from './components/Navigator';
import Header from './containers/Header';
import content from './utils/content';
import mockStore from './utils/mockStore';

//debug: add keys o all mapped components
//change 'class' to 'className'
//clean up CSS styles and assigned classes

function App() {

  const location = useLocation().pathname;
  const [home, main, item, context] = location.split('/');

  const mainIndex = main ? content.findIndex(currentMain => currentMain.route === main) : -1;
  const itemIndex = item ? content[mainIndex].items.findIndex(currentItem => currentItem.route === item) : -1;
  const blockList = item ? mockStore[mainIndex][itemIndex].map(currentBlock => currentBlock.block) : [];

  const [block, setBlock] = useState({
    value: '', 
    index: 0,
    max: 0,
    list: []
  });
  
  if(blockList && JSON.stringify(blockList) !== JSON.stringify(block.list)){
    setBlock({
      value: blockList[0],
      index: 0,
      max: blockList.length - 1,
      list: blockList
    })
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
      <Header mainIndex={mainIndex} itemIndex={itemIndex} main={main} item={item} context={context} block={block} toggleBlockLeft={toggleBlockLeft} toggleBlockRight={toggleBlockRight}/>   
      <Outlet context={[mainIndex, itemIndex, main, item, context, block]}/>
      <Navigator/>
    </>
  );
}

export default App;
