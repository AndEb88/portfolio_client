
import {NavLink, useParams, useOutletContext} from 'react-router-dom';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import content from '../utils/content';
import mockStore from '../utils/mockStore';
import {selectAssetsItem} from '../store/assetsSlice';



function Create() {

    // add onChange for each specific input type and update accordingly
    // do I need to declare keys that are not set here? e.g. 'netProfit' would be undefined and could cause issues in Display(?)
    // on submit, pass entries as required in database (incl. block!)

    const [mainIndex, itemIndex, main, item, form, block] = useOutletContext();

    const dispatch = useDispatch();
    const itemStore = useSelector(state => selectAssetsItem(state, item));
    const status = useSelector(state => state.assets.status);

    const [formData, setFormData] = useState({});

    const handleChange = (event) => {
        const {name, value} = event.target;
        // setFormData((prevFormData) => ({
        //   ...prevFormData,
        //   [name]: value,
        // }));
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Process form data
      };

    return(
        <div className='container-fluid content' id='create'>                
            <form onSubmit={handleSubmit}>
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
                                {formEntry.type === 'text' && <input type='text' name={formEntry.name}  onChange={handleChange}></input>}
                                {formEntry.type === 'number' && <input className='text-end' type='number' name={formEntry.name} onChange={handleChange}></input>}
                                {formEntry.type === 'date' && <input type='date' name={formEntry.name} onChange={handleChange}/>}
                                {formEntry.type === 'group' && (
                                    <select name={formEntry.name} value={formData[formEntry.name]} onChange={handleChange}>
                                        <option disabled selected value=''>
                                            Select...
                                        </option>                                      
                                        {content[mainIndex].items[itemIndex].groups.map(group => (
                                            <option key={group} value={group}>
                                                {group}
                                            </option>
                                            ))}
                                    </select>
                                )}
                                {formEntry.type === 'account' && (
                                    <select name={formEntry.name} value={formData[formEntry.name]} onChange={handleChange}>
                                        <option disabled selected value=''>
                                            Select...
                                        </option>
                                        {mockStore.assets.investments.overall.entries.sort((a, b) => a.title.localeCompare(b.title)).map(entry => (
                                        <option key={entry.id} value={entry.title}>
                                            {entry.title}
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

