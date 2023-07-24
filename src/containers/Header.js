import {NavLink} from 'react-router-dom';

import {arrowBackIcon, addIcon} from '../icons/svgIcons';
import mainIcon from '../icons/main.png';
import Blocks from './Blocks';
import content from '../utils/content';
import {deleteIcon} from '../icons/svgIcons';


function Header({mainIndex, itemIndex, main, item, form, blocks, toggleBlockLeft, toggleBlockRight, id}) {

    const contentMain = content[mainIndex];
    const contentItem = contentMain ? contentMain.items[itemIndex] : undefined;

    function generateCreateLink (){
        return '/' + main + '/' + item + '/create/' + blocks.value;
    }

    function generateDeleteLink (){
        return '/' + main + '/' + item + '/delete/' + blocks.value + '/' + id;
    }

    function generateBackLink (title){
        let link = '/' + main;
        switch (title){
            case 'Edit':
                return link + '/' + item;
            case 'Create':
                return link + '/' + item;
            case 'Delete':
                return link + '/' + item + '/edit/' + blocks.value + '/' + id;
            default:
                return link;
        }
    }

    const bannerComponent = ((disableLink) => (
        <NavLink to={'/'} className={disableLink && 'nav-link-disabled'}>
            <img className='' src={mainIcon}/>
            <h1 className=''>AndEb</h1> 
        </NavLink>    
    ));

    const backComponent = ((title) => (
        <>
            <NavLink to={generateBackLink(title)}>
                {arrowBackIcon} 
                <h2>{title}</h2> 
            </NavLink>
            {!form && contentItem.create && blocks.value !== 'overall' && createComponent}
            {title === 'Edit' && deleteComponent}
        </>
    ));

    const createComponent = (
        <NavLink to={generateCreateLink()}> 
            {addIcon}        
        </NavLink>
    );

    const deleteComponent = (
        <NavLink to={generateDeleteLink()}> 
            {deleteIcon}        
        </NavLink>
    );
    
    let headerComponent = (<h2>Path did not match!</h2>);
    let blocksComponent = (<></>);

    // Landing
    if(!main){
        headerComponent = bannerComponent(true);
        blocksComponent = (<h2>Welcome!</h2>);
    }

    //  Menu
    else if(!item){
        headerComponent = bannerComponent(false);                    
        blocksComponent = (<p>{contentMain.description}</p>);
    }

    //Display
    else if(!form){
        headerComponent = backComponent(contentItem.title);
        blocksComponent = (
            <Blocks 
                blocks={blocks} 
                toggleBlockLeft={toggleBlockLeft} 
                toggleBlockRight={toggleBlockRight}
            />
        );
    }

    // Create
    else if(form === 'create'){
        headerComponent = backComponent('Create');
        blocksComponent = (<h2>{blocks.value}</h2>);
    }    
    
    // Edit
    else if(form === 'edit'){
        headerComponent = backComponent('Edit'); 
        blocksComponent = (<h2>{blocks.value}</h2>);  
    }

    // Delete
    else if(form === 'delete'){
        headerComponent = backComponent('Delete');
        blocksComponent = (<h2>{blocks.value}</h2>);
    }

    return(
        <div className='container-fluid fixed-top' id='header'>
            <div className='row d-flex'>
                <div className='col-8 d-flex align-items-center'>
                    {headerComponent}
                </div>
                <div className='col-4 d-flex align-items-center justify-content-center'>
                    {blocksComponent}
                </div>
            </div>
        </div>
    );
}

export default Header;