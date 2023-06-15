import React, {useState} from 'react';
import {Outlet} from 'react-router-dom';

import Navigator from './components/Navigator';

//retrive main, item and context via useLocation() and pass as props
//place Header directly here
//store can be accessed via main, item, context properties (indexes are not suitable!)
//refactor store to object instead of array
// const location = useLocation().pathname;
// const [home, main, item, context] = location.split('/');

function App() {

   return (
    <>   
      <Outlet/>
      <Navigator/>
    </>
  );
}

export default App;
