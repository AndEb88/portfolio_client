import {useParams, useOutletContext, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import content from '../utils/content';
import mockStore from '../utils/mockStore';
import {toAmountString, toPercentString, toNumber, setColorClass, toShortDate} from '../utils/assetsFunctions';
import Loading from '../components/Loading';
import {syncAssets, updateAssetsEntry, selectAssetsItem, deleteAssetsEntry} from '../store/assetsSlice';
import {warningIcon} from '../icons/svgIcons';


function Delete() {

    // ***hooks***
    const [mainIndex, itemIndex, main, item, form] = useOutletContext();
    const {block, id} = useParams();    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ***store***
    const itemStore = useSelector(state => selectAssetsItem(state, item));
    const status = useSelector(state => state.assets.status);

    // ***states***
    const [formData, setFormData] = useState({}); 

    // ***lifecycle***
    useEffect(() => {
        if(status === 'idle'){
            const entry = itemStore[block].entries.find(currentEntry => currentEntry.id == id);
            setFormData(entry);
        }
      }, [status]);

    // ***handlers***
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`deleting:`);
        console.log(formData);
        dispatch(deleteAssetsEntry({item, entry: formData}));
        navigate('/assets/' + item);
    };
    
    // ***components***    
    let deleteComponent = (<h1>no delete data available</h1>);
    let warning = '';
    
    switch(item){
    case 'resources':
        warning = 'Account will be removed entirely!'
        break;
    case 'investments':
        warning = 'Account will be removed entirely incl. its transfers!'
        break;
    case 'transfers':
        warning = 'Only the currently selected transfer will be removed.'
        break;
    case 'pension':
        warning = 'Account will be removed entirely!'
        break;
    case 'expanses':
        warning = 'Only the currently selected expanse will be removed.'
        break;
    }

    switch(status){
    case 'error':
        deleteComponent = (<h1>error</h1>);
        break;
        
    case 'loading':
        deleteComponent = <Loading/>;
        break;

    case 'idle':
        deleteComponent = (
        <form onSubmit={handleSubmit}>
            <div className='form-container'>                  
                <div className={'row form-row'}>
                    <h4 className='text-center'>Are you sure you want to delete</h4>                
                </div>
                <div className={'row form-row'}>
                    <h3 className='text-center'>{formData.title} {item === 'transfers' && formData.date ? toShortDate(formData.date) : ''}</h3>                
                </div>  
                <div className={'row form-row'}>
                    <h4 className='text-center'>from {formData.group} {content[mainIndex].items[itemIndex].title}?</h4>                
                </div>
                {warning &&
                    <div className='row d-flex big-margin-top'>
                        <p className='text-center'> {warningIcon}{warning}</p> 
                    </div>
                }                                               
            </div>
            <div className='row form-row d-flex justify-content-center'>
                <button className='form-button' type='submit'>Delete</button>                    
            </div>   
        </form>
        ); 

        break;
    }
    
    // ***render***
    return(         
        <div className='container-fluid content' id='delete'>
            {deleteComponent}           
        </div> 
    );
}

export default Delete;
