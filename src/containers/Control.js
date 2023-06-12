import {backIcon, forwardIcon} from "../icons/svgIcons";

function Control({control, toggleControlLeft, toggleControlRight}) {
    return(
        <>
            <div class='col-3  controlIcon d-flex align-items-center justify-content-center'>
                {(control.index !== 0) && (
                <button onClick={toggleControlLeft}>          
                    {backIcon}
                </button> 
                )}  
            </div>
            <div class='col-6 d-flex align-items-center justify-content-center'>
                <h2>{control.value}</h2>
            </div>
            <div class='col-3 controlIcon d-flex align-items-center justify-content-center'>
                {(control.index !== control.max) && (
                <button onClick={toggleControlRight}>          
                    {forwardIcon}
                </button> 
                )} 
            </div>
        </>
        
    );
}

export default Control;