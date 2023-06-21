import {backIcon, forwardIcon} from "../icons/svgIcons";

function Blocks({blocks, toggleBlockLeft, toggleBlockRight}) {
    return(
        <>
            <div className='col-3  d-flex align-items-center justify-content-center'>
                {(blocks.index !== 0) && (
                <button onClick={toggleBlockLeft}>          
                    {backIcon}
                </button> 
                )}  
            </div>
            <div className='col-6 d-flex align-items-center justify-content-center'>
                <h2>{blocks.value}</h2>
            </div>
            <div className='col-3 d-flex align-items-center justify-content-center'>
                {(blocks.index !== blocks.max) && (
                <button onClick={toggleBlockRight}>          
                    {forwardIcon}
                </button> 
                )} 
            </div>
        </>
        
    );
}

export default Blocks;