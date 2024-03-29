import {backIcon, forwardIcon} from "../icons/svgIcons";

function Block({blocks, toggleBlock}) {
    // ***hooks ***

    // ***store***

    // ***states***

    // ***variables***

    // ***lifecycle***

    // ***handlers***

    // ***functions***

    // ***components***
    
    // ***render***
    return(
        <>
            <div className='col-3  d-flex align-items-center justify-content-center'>
                {(blocks.index !== 0) && (
                    <button onClick={() => toggleBlock(-1)}>          
                        {backIcon}
                    </button> 
                )}  
            </div>
            <div className='col-6 d-flex align-items-center justify-content-center'>
                <h2>{blocks.value}</h2>
            </div>
            <div className='col-3 d-flex align-items-center justify-content-center'>
                {(blocks.index !== blocks.max) && (
                    <button onClick={() => toggleBlock(1)}>          
                        {forwardIcon}
                    </button> 
                )} 
            </div>
        </>
        
    );
}

export default Block;