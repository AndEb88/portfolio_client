import {Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';

import App from './App';
import Menu from './components/Menu';
import Landing from './containers/Landing';
import Display from './containers/Display';
import Edit from './containers/Edit';
import Create from './containers/Create';
import content from './utils/content';


const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route index element={<Landing/>}/>
        {content.map((main, mainIndex) => (
            <>
                <Route path={main.route} element={<Menu mainIndex={mainIndex}/>}/>
                {main.items.map((item, itemIndex) => (
                    <>
                        <Route path={main.route + '/' + item.route} element={<Display mainIndex={mainIndex} itemIndex={itemIndex}/>}/>
                        {item.edit && <Route path={`${main.route}/${item.route}/edit/:id`} element={<Edit mainIndex={mainIndex} itemIndex={itemIndex} context={'edit'}/>}/>}
                        {item.create && <Route path={`${main.route}/${item.route}/create`} element={<Create mainIndex={mainIndex} itemIndex={itemIndex} context={'create'}/>}/>}
                    </>
                ))}
            </>
        ))}
    </Route> 
  ));

export default router;