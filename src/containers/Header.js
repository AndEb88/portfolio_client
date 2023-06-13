import {NavLink} from 'react-router-dom';

import {deleteIcon, arrowBackIcon, addIcon} from '../icons/svgIcons';
import mainIcon from '../icons/main.png';
import Block from './Block';
import content from '../utils/content';


function Header({mainIndex, itemIndex, context, block, toggleBlockLeft, toggleBlockRight}) {

    const main = content[mainIndex];
    const item = main ? main.items[itemIndex] : {};

    const bannerComponent = (
        <>
            <img class='' src={mainIcon}/>
            <h1 class=''>AndEb</h1> 
        </>    
    );

    const backComponent = ((context) => (
        <>
            {arrowBackIcon} 
            <h2>{context}</h2> 
        </>
    ));

    const createComponent = (
        <NavLink to={'create'}>
            {addIcon}        
        </NavLink>
    );
    
    let headerComponent = (<h2>Path did not match!</h2>);

    //Landing
    if(!main){
        headerComponent= (
            <>                        
                <div class='col-6 d-flex align-items-center'>
                    {bannerComponent}   
                </div>                      
                <div class='col-6 text-center'>
                    <p>Welcome!</p>
                </div>
            </>
        )
    }

    //Menu
    else if(!item){
        headerComponent = (
            <>                        
                <div class='col-6'>
                    <NavLink to={'/'} >
                        {bannerComponent}          
                    </NavLink>
                </div>                       
                <div class='col-6 text-center'>
                    <p>{main.description}</p>
                </div>
            </>
        );
    }

    //Display
    else if(!context){
        headerComponent = (
            <>                    
                <div class='col-8 d-flex align-items-center'>
                    <NavLink to={'/' + main.route}>
                        {backComponent(item.title)}      
                    </NavLink>
                    {item.create && createComponent}
                </div>                        
                <div class='col-4 d-flex text-center'>
                    <Block block={block} toggleBlockLeft={toggleBlockLeft} toggleBlockRight={toggleBlockRight}/>
                </div>
        </>
        );
    }

    //Create
    else if(context === 'create'){
        headerComponent = (
            <>                    
            <div class='col-8'>
                <NavLink to={'/' + main.route + '/' + item.route} >
                    {backComponent('Create')}       
                </NavLink>
            </div>                        
        </>
        );
    }    
    
    //Edit
    else if(context === 'edit'){
        headerComponent = (
            <>                    
            <div class='col-8'>
                <NavLink to={'/' + main.route + '/' + item.route} >
                    {backComponent('Edit')}      
                </NavLink>
            </div>                        
            <div class='col-4 d-flex align-items-center justify-content-center'>
                {deleteIcon} 
            </div>
        </>
        );
    }

    return(
        <div class='container-fluid fixed-top' id='header'>
            <div class='row d-flex'>
                {headerComponent}
            </div>
        </div>
    );
}

export default Header;