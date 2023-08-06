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

    // ***components***

    // ***lifecycle***
    useEffect(() => {
        if (messages.length > 0) { // else clear message que
            const newMessage = messages[0];
            setMessageQueue(prevMessageQueue => [...prevMessageQueue, newMessage]); //add display bool prop
            dispatch(popMessage());
        }        
      }, [messages]);

    // ***handlers***

    // ***functions*** 
    function PopoverComponent ({message}){

        useEffect(() => {                
            const timeout = setTimeout(() => { 
                setMessageQueue(prevMessageQueue => prevMessageQueue.slice(1)); // set display false
            }, 3000);
            return () => clearTimeout(timeout);            
          }, []);

        return (
            <div className='row d-flex justify-content-center slide-in'>
                <div className='field col-auto d-flex align-items-center justify-content-center'>
                    <p>{message}</p>
                </div>
            </div>
        );
    } 
    
    // ***render***
    return(         
        <div className='container-fluid justify-content-center' id='popover'>
            {messageQueue.map((currentMessage, index) => (
                <PopoverComponent key={index} message={currentMessage}/> // consider display prop
            ))}        
        </div> 
    );
}

export default Popover;

