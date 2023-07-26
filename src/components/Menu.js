import {NavLink, useOutletContext} from 'react-router-dom';

import {forwardIcon} from '../icons/svgIcons';
import content from '../utils/content';


function Menu() {
    // ***hooks ***
    const [mainIndex] = useOutletContext();

    // ***store***

    // ***states***

    // ***variables***

    // ***lifecycle***

    // ***handlers***

    // ***functions***

    // ***components***
    
    // ***render***
    return(               
        <div className='container-fluid content' id='menu'>
            {content[mainIndex].items.map(item => (
                    <NavLink to={item.route} key={item.route} className='nav-link'>
                        <div className='row content-row'>                    
                            <div className='col-10 d-flex align-items-center'>
                                <h2>{item.title}</h2>
                            </div>
                            <div className='col-2 d-flex align-items-center justify-content-end'>
                                {forwardIcon}
                            </div>                    
                        </div>
                    </NavLink>
            ))}
        </div>
    );
}

export default Menu;