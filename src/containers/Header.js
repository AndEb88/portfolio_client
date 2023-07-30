import {NavLink} from 'react-router-dom';

import {arrowBackIcon, addIcon, appIcon} from '../icons/svgIcons';
import Block from './Block';
import content from '../utils/content';
import {deleteIcon} from '../icons/svgIcons';


function Header({mainIndex, itemIndex, main, item, form, blocks, toggleBlock, id}) {

    // ***hooks ***

    // ***store***

    // ***states***

    // ***variables***
    const contentMain = content[mainIndex];
    const contentItem = contentMain ? contentMain.items[itemIndex] : undefined;

    // ***lifecycle***

    // ***handlers***

    // ***functions***
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

    // ***components***
    const bannerComponent = ((disableLink) => (
        <NavLink to={'/'} className={disableLink && 'nav-link-disabled'}>
            {appIcon}
            <h1 className=''>DIBS</h1> 
        </NavLink>    
    ));

    const backComponent = ((title) => (
        <>
            <NavLink to={generateBackLink(title)}>
                {arrowBackIcon} 
                <h2>{title}</h2> 
            </NavLink>
            {!form && contentItem.create && blocks.value !== 'overall' && createComponent}
            {form === 'edit' && deleteComponent}
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

    const toggleBlocksComponent = (
        <Block
            blocks={blocks} 
            toggleBlock={toggleBlock} 
        />
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

    // Display
    else if(!form){
        headerComponent = backComponent(contentItem.title);
        blocksComponent = toggleBlocksComponent;
    }

    // Create, Edit, Delete
    else if(form){
        const formTitle = form.charAt(0).toUpperCase() + form.slice(1);
        headerComponent = backComponent(formTitle);
        blocksComponent = (<h2>{blocks.value}</h2>);
    }    
    
    // ***render***
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