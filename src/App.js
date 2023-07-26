import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {syncItems, syncItem, selectAssetsItem} from './store/assetsSlice';

import Navigator from './components/Navigator';
import Header from './containers/Header';
import content from './utils/content';
import mockStore from './utils/mockStore';


function App() {

  const {pathname} = useLocation();
  const [home, main, item, form, block, id] = pathname.split('/');

  const dispatch = useDispatch();
  const status = useSelector(state => state.assets.status);
  const store = useSelector(state => state.assets);

  const mainIndex = main ? content.findIndex(currentMain => currentMain.route === main) : -1;
  const itemIndex = item ? content[mainIndex].items.findIndex(currentItem => currentItem.route === item) : -1;
  const blockList = store[item] ? Object.keys(store[item]) : [];
  console.log(status);

  useEffect(() => {
    dispatch(syncItems());
  }, [])

  const [blocks, setBlocks] = useState({
    value: '', 
    index: 0,
    max: 0,
    list: []
  });
  
  if(blockList && JSON.stringify(blockList) !== JSON.stringify(blocks.list)){
    const last = blockList.length - 1;
    if (blockList[last] === 'overall') {
      setBlocks({
        value: blockList[last - 1],
        index: last - 1,
        max: last,
        list: blockList
      });
    } else {
      setBlocks({
        value: blockList[last],
        index: last,
        max: last,
        list: blockList
      });
    }
  };

  const toggleBlockLeft = () => {
      setBlocks(prevBlock => {
          const newIndex = prevBlock.index - 1;
          return {
              ...prevBlock,
              value: prevBlock.list[newIndex],
              index: newIndex
          };
      });
  };

  const toggleBlockRight = () => {
      setBlocks(prevBlock => {
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
      <Header 
        mainIndex={mainIndex} 
        itemIndex={itemIndex} 
        main={main} 
        item={item} 
        form={form} 
        blocks={blocks}
        id={id}
        toggleBlockLeft={toggleBlockLeft} 
        toggleBlockRight={toggleBlockRight}
      />   
      <Outlet
        context={[mainIndex, itemIndex, main, item, form, blocks.value]}
      />
      <Navigator/>
    </>
  );
}

export default App;
