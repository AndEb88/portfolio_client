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

    // ***components***

    // ***lifecycle***

    // ***handlers***

    // ***functions*** 
    function PopoverComponent ({message}){

        const [isVisible, setIsVisible] = useState(true);
        let animation = 'slide-in';

        const timer = setTimeout(() => {
            setIsVisible(false);
            if (messages.length > 0) {
                dispatch(popMessage());
              } 
        }, 3000);
      
        useEffect(() => {
            animation = '';
            return () => clearTimeout(timer);
        }, []);

        return (
            <>
                {isVisible && 
                    <div className={`row d-flex justify-content-center ${animation}`}>
                        <div className='field col-auto d-flex align-items-center justify-content-center'>
                            <p>{message}</p>
                        </div>
                    </div>
                }
            </>
        );
    } 
    
    // ***render***
    return(         
        <div className='container-fluid justify-content-center' id='popover'>
            {messages.map(currentMessage => (
                <PopoverComponent message={currentMessage}/>
            ))}          
        </div> 
    );
}

export default Popover;

