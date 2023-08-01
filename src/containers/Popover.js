import {useParams, useOutletContext, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import content from '../utils/content';
import mockStore from '../utils/mockStore';
import {toAmountString, toPercentString, toNumber, setColorClass, toDate} from '../utils/assetsFunctions';
import Loading from '../components/Loading';
import {syncAssets, selectItemTitles, selectAssetsItem, updateAssetsEntry, popMessage} from '../store/assetsSlice';


function Popover() { 
    // make createPopoverCOmponent a separate component and move timer useEffect inside -> each message has its own timer
    // but after pop message, message will cahnge and trigger timer again(?) -> not with empty dependency array for timer!
    
    // ***hooks***    
    const dispatch = useDispatch(); // for popping first message after timeout
    
    // ***store***
    const messages = useSelector(state => state.assets.messages);
    console.log(messages);
    
    // ***variables***

    // ***states***

    // ***components***

    // ***lifecycle***
    useEffect(() => {
        const timer = setTimeout(() => {
          dispatch(popMessage()); 
        }, 3000); 
    
        return () => clearTimeout(timer);
      }, [timer]);

    // ***handlers***

    // ***functions*** 
    function createPopoverComponent (message){

        // const timer = setTimeout(() => {
        //     dispatch(popMessage(message.id)); // Assuming the message has an id
        //   }, 3000);
      
        //   // Clear the timer when the component is unmounted or the message is removed
        //   useEffect(() => {
        //     return () => clearTimeout(timer);
        //   }, [timer]);

        return (
            <div className='row d-flex justify-content-center'>
                <div className='field col-auto d-flex align-items-center justify-content-center'>
                    <p>{message}</p>
                </div>
            </div>
        );
    } 
    
    // ***render***
    return(         
        <div className='container-fluid justify-content-center' id='popover'>
            {messages.map(currentMessage => (
                createPopoverComponent(currentMessage)
            ))}          
        </div> 
    );
}

export default Popover;
