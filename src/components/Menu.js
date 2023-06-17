import {NavLink, useOutletContext} from 'react-router-dom';

import {forwardIcon} from '../icons/svgIcons';
import content from '../utils/content';


function Menu() {

    const [mainIndex] = useOutletContext();

    return(               
        <div class='container-fluid content' id='menu'>
            {content[mainIndex].items.map(item => (
                    <NavLink to={item.route} className='nav-link'>
                        <div class='row content-row'>                    
                            <div class='col-10 d-flex align-items-center'>
                                <h2>{item.title}</h2>
                            </div>
                            <div class='col-2 d-flex align-items-center justify-content-end'>
                                {forwardIcon}
                            </div>                    
                        </div>
                    </NavLink>
            ))}
        </div>
    );
}

export default Menu;