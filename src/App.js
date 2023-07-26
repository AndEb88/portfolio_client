import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {syncItems, syncItem, selectAssetsItem} from './store/assetsSlice';

import Navigator from './components/Navigator';
import Header from './containers/Header';
import content from './utils/content';
import mockStore from './utils/mockStore';


function App() {

  // ***hooks ***
  const {pathname} = useLocation();
  const [home, main, item, form, block, id] = pathname.split('/');
  const dispatch = useDispatch();

  // ***store***
  const store = useSelector(state => state.assets);
  const status = useSelector(state => state.assets.status);

  console.log(status);

  // ***states***
  const [blocks, setBlocks] = useState({
    value: '', 
    index: 0,
    max: 0,
    list: []
  });

  // ***variables***
  const mainIndex = main ? content.findIndex(currentMain => currentMain.route === main) : -1;
  const itemIndex = item ? content[mainIndex].items.findIndex(currentItem => currentItem.route === item) : -1;
  const blockList = store[item] ? Object.keys(store[item]) : [];

  // ***lifecycle***
  useEffect(() => {
    dispatch(syncItems());
  }, [])
  
  // ***functions***
  if (blockList && JSON.stringify(blockList) !== JSON.stringify(blocks.list)){
    const last = blockList.length - 1;
    let offset = 0;
    if (blockList[last] === 'overall') {
      offset = -1;
    } 
    setBlocks({
      value: blockList[last + offset],
      index: last + offset,
      max: last,
      list: blockList
    });
  };

  // ***handlers***  
  const toggleBlock = (step) => {
      setBlocks(prevBlock => {
          const newIndex = prevBlock.index + step;
          return {
              ...prevBlock,
              value: prevBlock.list[newIndex],
              index: newIndex
          };
      });
  };

  // ***components***

  // ***render***
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
        toggleBlock={toggleBlock}   
      />   
      <Outlet
        context={[mainIndex, itemIndex, main, item, form, blocks.value]}
      />
      <Navigator/>
    </>
  );
}

export default App;
