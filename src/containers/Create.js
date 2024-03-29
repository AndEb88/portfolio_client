
import {NavLink, useParams, useOutletContext, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import content from '../utils/content';
import mockStore from '../utils/mockStore';
import {selectAssetsItem, selectAccounts, createAssetsEntry, pushMessage} from '../store/assetsSlice';



function Create() {

    // ***hooks***
    const [mainIndex, itemIndex, main, item, form, block] = useOutletContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // ***store***
    const itemStore = useSelector(state => selectAssetsItem(state, item));
    const accounts = useSelector(state => selectAccounts(state));
    const status = useSelector(state => state.assets.status);

    // ***variables***
    const rawDate = new Date();
    const currentDate = rawDate.toISOString().split('T')[0];
    const defaultSelect = 'Select...';

    // ***states***
    const [formData, setFormData] = useState({
        date: currentDate,
        block: block,
    });

    // ***lifecycle***

    // ***handlers***  
    const handleChange = (event) => {
        const {name, value, type} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
        }));
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
        if(item == 'expanses'){
            let amountMonthly = value;
            let amountYearly = value;
            if(name === 'amountMonthly'){
                amountYearly = amountMonthly / 12;
                amountYearly = amountYearly.toFixed(2);
            }
            if(name === 'amountYearly'){
                amountMonthly = amountYearly * 12;
                amountMonthly = amountMonthly.toFixed(2);
            }
            setFormData((prevFormData) => ({
                ...prevFormData,
                amountMonthly: parseFloat(amountMonthly),
                amountYearly: parseFloat(amountYearly),
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: parseFloat(value),
            }));
        }
      };

    const handleDateChange = (event) => {
        const {name, value, type} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            date: value,
            block: value.slice(0, 4),
        }));    
      };

    const handleSubmit = (event) => {
        event.preventDefault();  
        console.log(`creating:`);
        console.log(formData);
        let abort = false;
        content[mainIndex].items[itemIndex].createForm.map(formEntry => {
           if (!formData[formEntry.name]){
            const message = `${formEntry.title} may not be empty!`
            dispatch(pushMessage({message}));
            abort = true;
           } 
           if(formEntry.name === 'title' && item !== 'transfers'){
            if(accounts.includes(formData[formEntry.name])){
                const message = `Title ${formData[formEntry.name]} already exists!`
                dispatch(pushMessage({message}));
                abort = true;
            }
           }
        })
        if(!abort){
            dispatch(pushMessage({message: 'Creating...'}))
            dispatch(createAssetsEntry({item, entry: formData}));
            navigate('/assets/' + item);  
        }    
    };

    // ***render*** generate in function (SOC)?
    return(
        <div className='container-fluid content' id='create'>                
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <div className='form-container'>
                    {content[mainIndex].items[itemIndex].createForm.map((formEntry, index) => (
                        <div key={formEntry.name} className={`row form-row ${formEntry.accent && 'accent-color'} ${formEntry.margin && 'big-margin'} ${formEntry.bold && 'big-font'}`}>
                            <div className='col-5'>
                                <p>{formEntry.title}</p>
                            </div>
                            <div className='col-1 text-center'>
                                <p>{formEntry.operator}</p>
                            </div>
                            <div className='col-5 text-end'>
                                {formEntry.type === 'text' && 
                                    <input
                                        value={formData[formEntry.name]}  
                                        type='text' 
                                        name={formEntry.name}  
                                        onChange={handleTextChange}>
                                    </input>
                                }
                                {formEntry.type === 'number' && 
                                    <input 
                                        className='text-end'
                                        value={formData[formEntry.name]}  
                                        type='number' 
                                        name={formEntry.name} 
                                        onChange={handleNumberChange}>
                                    </input>}
                                {formEntry.type === 'date' && 
                                    <input 
                                        value={formData[formEntry.name]} 
                                        type='date'
                                        name={formEntry.name} 
                                        onChange={handleDateChange}/>
                                    }
                                {formEntry.type === 'group' && (
                                    <select 
                                        name={formEntry.name} 
                                        value={formData[formEntry.name] || ''} 
                                        onChange={handleTextChange}>
                                        <option 
                                            disabled 
                                            defaultValue  
                                            value=''>
                                            {defaultSelect}
                                        </option>                                      
                                        {content[mainIndex].items[itemIndex].groups.map(group => (
                                            <option key={group} value={group}>
                                                {group}
                                            </option>
                                            ))}
                                    </select>
                                )}
                                {formEntry.type === 'account' && (
                                    <select 
                                        name={formEntry.name} 
                                        value={formData[formEntry.name] ||''} 
                                        onChange={handleTextChange}>
                                        <option 
                                            disabled 
                                            defaultValue  
                                            value=''>
                                            {defaultSelect}
                                        </option>
                                        {accounts.map((currentAccount, currentAccountIndex) => (
                                        <option 
                                            key={currentAccountIndex} 
                                            value={currentAccount}>
                                            {currentAccount}
                                        </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            <div className='col-1'>
                                <p>{formEntry.unit}</p>
                            </div>                 
                        </div>
                    ))}
                    </div>
                    <div className='row form-row d-flex justify-content-center form-row-bold'>
                        <button className='form-button' type='submit'>Create</button>
                    </div>
            </form>
        </div>
    );
}

export default Create;

