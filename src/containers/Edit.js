import {useParams, useOutletContext} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import content from '../utils/content';
import mockStore from '../utils/mockStore';
import {toAmount, toPercent, toNumber, toDate} from '../utils/assetsFunctions';
import Loading from '../components/Loading';
import {syncAssets, updateAssetsEntry, selectAssetsItem, updateAssetsAccount} from '../store/assetsSlice';


function Edit() {

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
            console.log(itemStore['2023'].entries)
        }
      }, [status]);

    // const handleFocus = (event) => {
    //     const {name} = event.target;
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         [name]: null,
    //       }));
    // };

    const handleChange = (event) => {
        const {name, value, type, checked} = event.target;
        if (type === 'checkbox') {
            setFormData((prevFormData) => ({
              ...prevFormData,
              [name]: !checked,
            }));
          } else {
            setFormData((prevFormData) => ({
              ...prevFormData,
              [name]: value,
            }));
          }
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Process form data
        console.log(`submitting:`);
        console.log(formData);
        // dispatch(updateAssetsEntry(item, entry));
        dispatch(updateAssetsAccount({item, entry: formData}));
      };

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
                    {content[mainIndex].items[itemIndex].editForm.map((formEntry, index) => (
                        <div key={`entry-${index}-${formEntry.name}`} className={`row form-row ${formEntry.colored && (formData[formEntry.name] < 0 ? 'negative-color' : formData[formEntry.name] > 0 ? 'positive-color' : '')} ${formEntry.margin && 'big-margin'} ${formEntry.bold && 'big-font'}`}>
                            <div className='col-5'>
                                <p>{formEntry.title}</p>
                            </div>
                            <div className='col-1 text-center'>
                                <p>{formEntry.operator}</p>
                            </div>
                            <div className='col-5 text-end'>
                                {formEntry.type === 'text' && 
                                    <input 
                                        type='text' 
                                        name={formEntry.name} 
                                        value={formData[formEntry.name]}>
                                    </input>
                                }
                                {formEntry.type === 'number' && formData.pending &&
                                    <input 
                                        className='text-end' 
                                        type='number' 
                                        name={formEntry.name} 
                                        value={formData[formEntry.name] || ''} 
                                        onChange={handleChange}>
                                    </input>
                                }
                                {formEntry.type === 'percent' && formData.pending &&
                                    <input 
                                        className='text-end'
                                        type='number'
                                        name={formEntry.name} 
                                        value={formData[formEntry.name]} 
                                        onChange={handleChange}>
                                    </input>
                                }
                                {formEntry.type === 'date' && 
                                    <input type='date' 
                                        name={formEntry.name} 
                                        value={formData[formEntry.name]} 
                                        onChange={handleChange}
                                    />
                                }
                                {(formEntry.type === 'displayNumber' ||  (formEntry.type === 'number' && !formData.pending)) &&
                                    <p name={formEntry.name}>
                                        {toAmount(formData[formEntry.name])}
                                    </p>
                                }
                                {(formEntry.type === 'displayPercent' ||  (formEntry.type === 'percent' && !formData.pending)) &&
                                    <p name={formEntry.name}>
                                        {toPercent(formData[formEntry.name])}
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
                                        {formData.pending ? (formData[formEntry.name] ? toDate(formData[formEntry.name]) : '') : 'frozen'}
                                    </p>
                                }
                                {formEntry.type === 'group' && (
                                    <select 
                                        name={formEntry.name} 
                                        value={formData[formEntry.name]} 
                                        onChange={handleChange}>
                                        {content[mainIndex].items[itemIndex].groups.map(group => 
                                            <option 
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
                                        onChange={handleChange}>
                                        {mockStore.assets.investments.overall.entries.sort((a, b) => a.title.localeCompare(b.title)).map(entry => 
                                            <option 
                                                key={entry.id}
                                                value={entry.title}>
                                                {entry.title}
                                            </option>
                                        )}
                                    </select>)}
                            </div>
                            <div className='col-1'>
                                <p>{formEntry.unit}</p>
                            </div>                 
                        </div>
                    ))}
                    {content[mainIndex].items[itemIndex].freeze && 
                        <div className='row form-row'>
                            <div className='col-12'>
                                <div className='form-check form-switch d-flex align-items-center form-row-bold'>
                                    <label className='form-check-label' htmlFor='freeze-switch'>Freeze</label>
                                    <input name='pending' checked={!formData.pending} className='form-check-input' type='checkbox' role='switch' id='freeze-switch'/>
                                </div>
                            </div>
                        </div>}                                              
                </div>
                <div className='row form-row d-flex justify-content-center'>
                    <button className='form-button' type='submit'>Save</button>
                </div>   
            </form>
            ); 

            break;
        }
    
    return(         
        <div className='container-fluid content' id='edit'>
            {editComponent}           
        </div> 
    );
}

export default Edit;
