import React, {useState} from 'react';
import {Outlet} from 'react-router-dom';

import Navigator from './components/Navigator';


function App() {

   return (
    <>   
      <Outlet/>
      <Navigator/>
    </>
  );
}

export default App;
