import {NavLink} from 'react-router-dom';

import content from '../utils/content';
import {aboutIcon, cheatsheetsIcon, assetsIcon, foobarIcon} from '../icons/svgIcons';

function Navigator() {
    // ***hooks ***

    // ***store***

    // ***states***

    // ***variables***
    const icons = [aboutIcon, cheatsheetsIcon, assetsIcon, foobarIcon];
    
    // ***lifecycle***

    // ***handlers***

    // ***functions***

    // ***components***
    
    // ***render***
    return( 
        <div className='container-fluid fixed-bottom' id='navigator'>
            <div className='row'>
                {content.map((main, index) => ( 
                    <div className='col-3 text-center' key={main.route}>
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