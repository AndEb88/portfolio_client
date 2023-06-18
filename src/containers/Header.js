import {NavLink} from 'react-router-dom';

import {deleteIcon, arrowBackIcon, addIcon} from '../icons/svgIcons';
import mainIcon from '../icons/main.png';
import Block from './Block';
import content from '../utils/content';


function Header({mainIndex, itemIndex, main, item, form, block, toggleBlockLeft, toggleBlockRight}) {

    const contentMain = content[mainIndex];
    const contentItem = contentMain ? contentMain.items[itemIndex] : undefined;

    const bannerComponent = (
        <>
            <img className='' src={mainIcon}/>
            <h1 className=''>AndEb</h1> 
        </>    
    );

    const backComponent = ((currentItem) => (
        <>
            {arrowBackIcon} 
            <h2>{currentItem}</h2> 
        </>
    ));

    const createComponent = (
        <NavLink to={'/' + main + '/' + item + '/create/' + block.value}> 
            {addIcon}        
        </NavLink>
    );
    
    let headerComponent = (<h2>Path did not match!</h2>);

    //Landing
    if(!main){
        headerComponent= (
            <>                        
                <div className='col-6 d-flex align-items-center'>
                    {bannerComponent}   
                </div>                      
                <div className='col-6 text-center d-flex align-items-center'>
                    <p>Welcome!</p>
                </div>
            </>
        )
    }

    //Menu
    else if(!item){
        headerComponent = (
            <>                        
                <div className='col-6 d-flex align-items-center'>
                    <NavLink to={'/'}>
                        {bannerComponent}          
                    </NavLink>
                </div>                       
                <div className='col-6 text-center d-flex align-items-center'>
                    <p>{contentMain.description}</p>
                </div>
            </>
        );
    }

    //Display
    else if(!form){
        headerComponent = (
            <>                    
                <div className='col-8 d-flex align-items-center'>
                    <NavLink to={'/' + main}>
                        {backComponent(contentItem.title)}      
                    </NavLink>
                    {contentItem.create && createComponent}
                </div>                        
                <div className='col-4 d-flex text-center'>
                    <Block block={block} toggleBlockLeft={toggleBlockLeft} toggleBlockRight={toggleBlockRight}/>
                </div>
        </>
        );
    }

    //Create
    else if(form === 'create'){
        headerComponent = (
            <>                    
                <div className='col-8'>
                    <NavLink to={'/' + main + '/' + item} >
                        {backComponent('Create')}       
                    </NavLink>
                </div>
                <div className='col-4 d-flex align-items-center justify-content-center'>
                    <h2>{block.value}</h2>
                </div>                        
            </>
        );
    }    
    
    //Edit
    else if(form === 'edit'){
        headerComponent = (
            <>                    
            <div className='col-8'>
                <NavLink to={'/' + main + '/' + item} >
                    {backComponent('Edit')}      
                </NavLink>
            </div>                        
            <div className='col-4 d-flex align-items-center justify-content-center'>
                {deleteIcon}
            </div>
        </>
        );
    }

    return(
        <div className='container-fluid fixed-top' id='header'>
            <div className='row d-flex'>
                {headerComponent}
            </div>
        </div>
    );
}

export default Header;