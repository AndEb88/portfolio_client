import {useParams, useOutletContext, useNavigate} from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import content from '../utils/content';
import mockStore from '../utils/mockStore';
import {toAmountString, toPercentString, toNumber, setColorClass, toDate} from '../utils/assetsFunctions';
import Loading from '../components/Loading';
import {syncAssets, selectItemTitles, selectAssetsItem, updateAssetsEntry, popMessage} from '../store/assetsSlice';


function Popover() { 
   
    // ***hooks***    
    const dispatch = useDispatch(); // for popping first message after timeout
    
    // ***store***
    const messages = useSelector(state => state.assets.messages);
    
    // ***variables***

    // ***states***
    const [messageQueue, setMessageQueue] = useState([]);
    const [timeoutQueue, setTimeoutQueue] = useState([]);


    // ***components***
    const popoverComponent = messageQueue.map((currentMessage, index) => 
        createPopoverComponent(currentMessage, index)
    );  

    // ***lifecycle***
    useEffect(() => {
        let timeout;
        if (messages.length > 0) { 
            const newMessage = messages[0];
            setMessageQueue(prevMessageQueue => [...prevMessageQueue, newMessage]); 
            dispatch(popMessage());
            
            const newTimeout = setTimeout(() => { 
                setMessageQueue(prevMessageQueue => prevMessageQueue.slice(1)); 
            }, 3000);
            setTimeoutQueue(prevTimeoutQueue => [...prevTimeoutQueue, newTimeout]); 
            
        } 
        // return () => clearTimeout(timeout);  // must clear timeouts and messageQueue       
      }, [messages]);

    // ***handlers***

    // ***functions*** 
    function createPopoverComponent (message, index){ 
        return (
            <div key={index} className='row d-flex justify-content-center slide-in'>
                <div className='field col-auto d-flex align-items-center justify-content-center'>
                    <p>{message}</p>
                </div>
            </div>
        );
    } 
    
    // ***render***
    return(         
        <div className='container-fluid justify-content-center' id='popover'>
            {popoverComponent}        
        </div> 
    );
}

export default Popover;

