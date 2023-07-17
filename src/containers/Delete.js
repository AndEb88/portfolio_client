import {useParams, useOutletContext} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import content from '../utils/content';
import mockStore from '../utils/mockStore';
import {toAmountString, toPercentString, toNumber, setColorClass, toShortDate} from '../utils/assetsFunctions';
import Loading from '../components/Loading';
import {syncAssets, updateAssetsEntry, selectAssetsItem, updateAssetsAccount} from '../store/assetsSlice';
import {warningIcon} from '../icons/svgIcons';


function Delete() {

    // add onChange for each specific input type and update accordingly
    // add delete flag that enables delete after first press
    // add validated flag that recalculates and enables save for Investments (and Pensions?)
    // freeze sets lastUpdate to 31.12.
    // on submit, pass entries as required in database (incl. block but without dynamic data, like netProfit!)

    const [mainIndex, itemIndex, main, item, form] = useOutletContext();
    const {block, id} = useParams();
    
    const dispatch = useDispatch();
    const itemStore = useSelector(state => selectAssetsItem(state, item));
    const status = useSelector(state => state.assets.status);
    const [formData, setFormData] = useState({}); 

    useEffect(() => {
        if(status === 'idle'){
            const entry = itemStore[block].entries.find(currentEntry => currentEntry.id == id);
            setFormData(entry);
        }
      }, [status]);


    const handleSubmit = (event) => {
        event.preventDefault();
        // Process form data
        console.log(`deleting:`);
        console.log(formData);
        // dispatch(updateAssetsEntry(item, entry));
        dispatch(updateAssetsAccount({item, entry: formData}));
      };

      let deleteComponent = (<h1>no delete data available</h1>);
      let warning = '';
      
      switch(item){
        case 'resources':
            warning = 'Account will be removed entirely!'
            break;
        case 'investments':
            warning = 'Account will be removed entirely!'
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
                        <h3 className='highlight-color text-center'>{formData.title} {item === 'transfers' && formData.date ? toShortDate(formData.date) : ''}</h3>                
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
    
    return(         
        <div className='container-fluid content' id='delete'>
            {deleteComponent}           
        </div> 
    );
}

export default Delete;
