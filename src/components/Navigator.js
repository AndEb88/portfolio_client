import {NavLink} from 'react-router-dom';

import content from '../utils/content';
import {aboutIcon, cheatsheetsIcon, assetsIcon, foobarIcon} from '../icons/svgIcons';


const icons = [aboutIcon, cheatsheetsIcon, assetsIcon, foobarIcon];


function Navigator() {

    return( 
        <div class='container-fluid fixed-bottom' id='navigator'>
            <div class='row'>
                {content.map((main, index) => ( 
                    <div class='col-3 text-center'>
                        <NavLink to={main.route} className='nav-link'>
                                {icons[index]}
                                <h1>{main.title}</h1>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Navigator;