import {useParams, useOutletContext, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import content from '../utils/content';
import mockStore from '../utils/mockStore';
import {toAmountString, toPercentString, toNumber, setColorClass, toDate} from '../utils/assetsFunctions';
import Loading from '../components/Loading';
import {syncAssets, selectItemTitles, selectAssetsItem, updateAssetsEntry} from '../store/assetsSlice';


function Popover() {
    
    // ***hooks***    
    const dispatch = useDispatch(); // for popping first message after timeout
    
    // ***store***
    const status = useSelector(state => state.assets.status);
    const messages = useSelector(state => state.assets.messages);
    console.log(messages);
    
    // ***variables***

    // ***states***

    // ***components***
    let popoverComponent = (<h1>no popover data available</h1>);
    if (messages.length > 0){
        console.log('hit');
        popoverComponent = messages.map(currentMessage => {
            createPopoverComponent(currentMessage);
        });
    }

    // ***lifecycle***
    useEffect(() => {        
        if (messages.length > 0){
            popoverComponent = messages.map(currentMessage => {
                createPopoverComponent(currentMessage);
            });
        }
      }, [messages]);

    // ***handlers***
    // const handleFocus = (event) => {
    //     const {name} = event.target;
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         [name]: null,
    //       }));
    // };


    // ***functions*** 
    function createPopoverComponent (message){ 
        return (
            <div className='row'>
                <div className='col-12 d-flex align-items-center'>
                    <h3>{message}</h3>
                </div>
            </div>
        );
    } 
    
    // ***render***
    return(         
        <div className='container-fluid content' id='popover'>
            {popoverComponent}           
        </div> 
    );
}

export default Popover;
