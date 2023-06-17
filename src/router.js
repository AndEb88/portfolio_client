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
        {content.map(main => (
            <>
                <Route path={main.route} element={<Menu/>}/>
                {main.items.map(item => (
                    <>
                        <Route path={main.route + '/' + item.route} element={<Display/>}/>
                        {item.edit && <Route path={`${main.route}/${item.route}/edit/:block/:id`} element={<Edit/>}/>}
                        {item.create && <Route path={`${main.route}/${item.route}/create/:block`} element={<Create/>}/>}
                    </>
                ))}
            </>
        ))}
    </Route> 
  ));

export default router;