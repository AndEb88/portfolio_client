import {useParams, useOutletContext} from 'react-router-dom';
import {useState} from 'react';

import content from '../utils/content';
import mockStore from '../utils/mockStore';


function Edit() {

    const [mainIndex, itemIndex, form] = useOutletContext();
    const {block, id} = useParams();
    
    
    let entry = mockStore[mainIndex][itemIndex]
        .find(currentBlock => currentBlock.block === block)
        .entries.find(currentEntry => currentEntry.id == id);

    const [formData, setFormData] = useState(entry);

    const handleChange = (event) => {
        const {name, value, type, checked} = event.target;
        if (type === 'checkbox') {
            setFormData((prevFormData) => ({
              ...prevFormData,
              [name]: checked,
            }));
          } else {
            setFormData((prevFormData) => ({
              ...prevFormData,
              [name]: value,
            }));
          }
        //dont forget freeze! set lastUpdate to 31.12.then
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Process form data
      };

    return(         
        <div className='container-fluid content' id='edit'>
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <div className='form-container'>                    
                    {content[mainIndex].items[itemIndex].editForm.map((formEntry, index) => (
                        <div key={formEntry.name} className={`row form-row ${formEntry.accent && 'accent-color'} ${formEntry.margin && 'big-margin'} ${formEntry.bold && 'big-font'}`}>
                            <div className='col-5'>
                                <p>{formEntry.title}</p>
                            </div>
                            <div className='col-1 text-center'>
                                <p>{formEntry.operator}</p>
                            </div>
                            <div className='col-5 text-end'>
                                {formEntry.type === 'text' && <input type='text' name={formEntry.name} value={formData[formEntry.name]}></input>}
                                {formEntry.type === 'number' && <input className='text-end' type='number' name={formEntry.name} value={formData[formEntry.name]} onChange={handleChange}></input>}
                                {formEntry.type === 'display' && <p name={formEntry.name}>{formData[formEntry.name]}</p>}
                                {formEntry.type === 'date' && <input type='date' name={formEntry.name} value={formData[formEntry.name]} onChange={handleChange}/>}
                                {formEntry.type === 'group' && (
                                    <select name={formEntry.name} value={formData[formEntry.name]} onChange={handleChange}>
                                        {content[mainIndex].items[itemIndex].groups.map(group => 
                                            <option key={group} value={group} selected={(group === formData[formEntry.name]) ? true : false}>
                                                {group}
                                            </option>
                                        )}
                                    </select>)}
                                {formEntry.type === 'account' && (
                                    <select name={formEntry.name} value={formData[formEntry.name]} onChange={handleChange}>
                                        {mockStore[2][2].find(currentBlock => currentBlock.block === block).entries.sort((a, b) => a.title.localeCompare(b.title)).map(entry => 
                                            <option key={entry.id}value={entry.title} selected={(entry.title === formData[formEntry.name]) ? true : false}>
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
                                    <label className='form-check-label' for='freeze-switch'>Freeze</label>
                                    <input name='frozen' checked={formData.frozen} className='form-check-input' type='checkbox' role='switch' id='freeze-switch'/>
                                </div>
                            </div>
                        </div>}                                              
                </div>
                <div className='row form-row d-flex justify-content-center'>
                    <button className='form-button' type='submit'>Save</button>
                </div>   
            </form>              
        </div> 
    );
}

export default Edit;
