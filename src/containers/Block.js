import {backIcon, forwardIcon} from "../icons/svgIcons";

function Block({block, toggleBlockLeft, toggleBlockRight}) {
    return(
        <>
            <div className='col-3  d-flex align-items-center justify-content-center'>
                {(block.index !== 0) && (
                <button onClick={toggleBlockLeft}>          
                    {backIcon}
                </button> 
                )}  
            </div>
            <div className='col-6 d-flex align-items-center justify-content-center'>
                <h2>{block.value}</h2>
            </div>
            <div className='col-3 d-flex align-items-center justify-content-center'>
                {(block.index !== block.max) && (
                <button onClick={toggleBlockRight}>          
                    {forwardIcon}
                </button> 
                )} 
            </div>
        </>
        
    );
}

export default Block;