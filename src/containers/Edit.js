import {useParams, useOutletContext, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import content from '../utils/content';
import mockStore from '../utils/mockStore';
import {toAmountString, toPercentString, toNumber, setColorClass, toDate} from '../utils/assetsFunctions';
import Loading from '../components/Loading';
import {syncAssets, selectItemTitles, selectAccounts, selectAssetsItem, updateAssetsEntry} from '../store/assetsSlice';


function Edit() {
    
    // ***hooks***
    const [mainIndex, itemIndex, main, item, form] = useOutletContext();
    const {block, id} = useParams();    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // ***store***
    const itemStore = useSelector(state => selectAssetsItem(state, item));
    const accounts = useSelector(state => selectAccounts(state));
    const titles = useSelector(state => selectItemTitles(state, item, block));
    const status = useSelector(state => state.assets.status);
    
    // ***variables***
    const rawDate = new Date();
    const currentDate = rawDate.toISOString().split('T')[0];

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
    // const handleFocus = (event) => {
    //     const {name} = event.target;
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         [name]: null,
    //       }));
    // };

    const handleChange = (event) => {
        const {name, value, type} = event.target;
        if(item !== 'transfers' && type === 'number'){
            setFormData((prevFormData) => ({
                ...prevFormData,
                date: currentDate,
            }));
        }
      };
      
    const handleTextChange = (event) => {
        const {name, value, type} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
      };

      const handleNumberChange = (event) => {
        const {name, value, type} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: parseFloat(value),
        }));
      };

    const handleDateChange = (event) => {
        const {name, value, type} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            date: value,
        }));    
      };

    const handleFrozenChange = (event) => {
        const {name, value, type, checked} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: checked,
        }));
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`submitting:`);
        console.log(formData);
        // check if new title already exisitng in title array!
        dispatch(updateAssetsEntry({item, entry: formData}));
        navigate('/assets/' + item);
      };

    // ***components***
    let editComponent = (<h1>no edit data available</h1>);

    switch(status){
    case 'error':
        editComponent = (<h1>error</h1>);
        break;
        
    case 'loading':
        editComponent = <Loading/>;
        break;

    case 'idle':
        editComponent = (
        <form onSubmit={handleSubmit} onChange={handleChange}>
            <div className='form-container'>                    
                {content[mainIndex].items[itemIndex].editForm.map((formEntry, formEntryIndex) => (
                    <div key={`entry-${formEntryIndex}-${formEntry.name}`} className={`row form-row ${formEntry.colored && setColorClass(formData[formEntry.name])} ${formEntry.margin && 'big-margin'} ${formEntry.bold && 'big-font'}`}>
                        <div className='col-5'>
                            <p>{formEntry.title}</p>
                            {formEntry.type === 'displayDate' && formData.block !== 'overall' &&            
                                <div className='form-check form-switch d-flex align-items-center form-row-bold'>
                                    <label className='form-check-label' htmlFor='freeze-switch'>Last Update</label>
                                </div>
                            }
                        </div>
                        <div className='col-1 text-center p-0'>
                            <p>{formEntry.operator}</p>
                            {formEntry.type === 'displayDate' && formData.block !== 'overall' &&            
                                <div className='form-check form-switch d-flex align-items-center justify-content-center'>
                                    <input
                                        name='frozen'
                                        checked={formData.frozen}
                                        onChange={handleFrozenChange}
                                        className='form-check-input'
                                        type='checkbox'
                                        role='switch'
                                        id='freeze-switch'
                                    />
                                </div>
                            }
                        </div>
                        <div className='col-5 text-end'>
                            {formEntry.type === 'text' &&
                                <input
                                    type='text'
                                    name={formEntry.name}
                                    value={formData[formEntry.name]}
                                    onChange={handleTextChange}>
                                </input>}
                            {formEntry.type === 'number' && !formData.frozen && formData.block !== 'overall' &&
                                <input
                                    className='text-end'
                                    type='number'
                                    name={formEntry.name}
                                    value={formData[formEntry.name]}
                                    onChange={handleNumberChange}>
                                </input>}
                            {formEntry.type === 'percent' && !formData.frozen && formData.block !== 'overall' &&
                                <input
                                    className='text-end'
                                    type='number'
                                    name={formEntry.name}
                                    value={formData[formEntry.name]}
                                    onChange={handleNumberChange}>
                                </input>}
                            {formEntry.type === 'date' &&
                                <input type='date'
                                    name={formEntry.name}
                                    value={formData[formEntry.name]}
                                    onChange={handleDateChange} />}
                            {(formEntry.type === 'displayNumber' || (formEntry.type === 'number' && (formData.frozen || formData.block === 'overall'))) &&
                                <p name={formEntry.name}>
                                    {toAmountString(formData[formEntry.name])}
                                </p>}
                            {(formEntry.type === 'displayPercent' || (formEntry.type === 'percent' && (formData.frozen || formData.block === 'overall'))) &&
                                <p name={formEntry.name}>
                                    {String(formData[formEntry.name])}
                                </p>
                            }
                            {formEntry.type === 'displayText' &&
                                <p name={formEntry.name}>
                                    {formData[formEntry.name]}
                                </p>
                            }
                            {formEntry.type === 'displayDate' &&
                                <p
                                    className='text-end'
                                    name={formEntry.name}>
                                    {!formData.frozen ? (formData[formEntry.name] ? toDate(formData[formEntry.name]) : '') : 'frozen'}
                                </p>                                    
                            }
                            {formEntry.type === 'group' && (
                                <select
                                    name={formEntry.name}
                                    value={formData[formEntry.name]}
                                    onChange={handleTextChange}>
                                    {content[mainIndex].items[itemIndex].groups.map(group => <option
                                        key={group}
                                        value={group}>
                                        {group}
                                    </option>
                                    )}
                                </select>
                            )}
                            {formEntry.type === 'account' && (
                                <select 
                                    name={formEntry.name}
                                    value={formData[formEntry.name]}
                                    onChange={handleTextChange}>
                                    {accounts.map((currentAccount, currentAccountIndex) => 
                                        <option
                                            key={currentAccountIndex}
                                            value={currentAccount}>
                                            {currentAccount}
                                        </option>
                                        )}
                                </select>)}
                            </div>
                                <div className='col-1'>
                                    <p>{formEntry.unit}</p>                                        
                                </div>
                            </div>
                    ))}                           
                    </div>
                    <div className='row form-row d-flex justify-content-center'>
                        <button className='form-button' type='submit'>Save</button>
                    </div>  
        </form>
        ); 

        break;
    }
    
    // ***render***
    return(         
        <div className='container-fluid content' id='edit'>
            {editComponent}           
        </div> 
    );
}

export default Edit;
