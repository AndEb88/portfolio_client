import {useParams, useOutletContext} from 'react-router-dom';
import {useState} from 'react';

import content from '../utils/content';
import mockStore from '../utils/mockStore';


function Edit() {

    const [mainIndex, itemIndex, context] = useOutletContext();
    const {block, id} = useParams();
    
    
    let entry = mockStore[mainIndex][itemIndex]
        .find(currentBlock => currentBlock.block === block)
        .entries.find(currentEntry => currentEntry.id == id);

    const [formData, setFormData] = useState(entry);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
        //dont forget freeze!
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Process form data
      };

    return(         
        <div class='container-fluid content'>
            <form onSubmit={handleSubmit}>
                <div id='edit-container'>                    
                    {content[mainIndex].items[itemIndex].editForm.map((formEntry, index) => (
                        <div key={index} class={`row edit-row ${formEntry.accent && 'edit-row-accent'} ${formEntry.margin && 'edit-row-margin'} ${formEntry.bold && 'edit-row-bold'}`}>
                            <div class='col-5'>
                                <p>{formEntry.title}</p>
                            </div>
                            <div class='col-1 text-center'>
                                <p>{formEntry.operator}</p>
                            </div>
                            <div class='col-5 text-end'>
                                {formEntry.type === 'text' && <input type='text' name={formEntry.value} value={formData[formEntry.value]} onChange={handleChange}></input>}
                                {formEntry.type === 'number' && <input type='number' name={formEntry.value} value={formData[formEntry.value]} onChange={handleChange}></input>}
                                {formEntry.type === 'display' && <p name={formEntry.value}>{formData[formEntry.value]}</p>}
                                {formEntry.type === 'date' && <input type='date' name={formEntry.value} value={formData[formEntry.value]} onChange={handleChange}/>}
                                {formEntry.type === 'group' && (
                                    <select name={formEntry.value} value={formData[formEntry.value]} onChange={handleChange}>
                                        {content[mainIndex].items[itemIndex].groups.map(group => 
                                            <option value={group} selected={(group === formData[formEntry.value]) ? true : false}>
                                                {group}
                                            </option>
                                        )}
                                    </select>)}
                                {formEntry.type === 'account' && (
                                    <select name={formEntry.value} value={formData[formEntry.value]} onChange={handleChange}>
                                        {mockStore[2][2].find(currentBlock => currentBlock.block === block).entries.sort((a, b) => a.title.localeCompare(b.title)).map(entry => 
                                            <option value={entry.title} selected={(entry.title === formData[formEntry.value]) ? true : false}>
                                                {entry.title}
                                            </option>
                                        )}
                                    </select>)}
                            </div>
                            <div class='col-1'>
                                <p>{formEntry.unit}</p>
                            </div>                 
                        </div>
                    ))}
                    {content[mainIndex].items[itemIndex].freeze && 
                        <div class='row edit-row'>
                            <div class='col-12'>
                                <div class=' form-check form-switch d-flex align-items-center edit-row-bold'>
                                    <label class="form-check-label" for="freeze-switch">Freeze</label>
                                    <input class="form-check-input" type="checkbox" role="switch" id="freeze-switch"/>
                                </div>
                            </div>
                        </div>}                                              
                </div>
                <div class='row edit-row d-flex justify-content-center'>
                    <button class='saveButton' type='submit'>Save</button>
                </div>   
            </form>              
        </div> 
    );
}

export default Edit;
