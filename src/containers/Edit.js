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
                    {content[mainIndex].items[itemIndex].editForm.map((item, index) => (
                        <div key={index} class={`row edit-row ${item.accent && 'edit-row-accent'} ${item.margin && 'edit-row-margin'} ${item.bold && 'edit-row-bold'}`}>
                            <div class='col-5'>
                                <p>{item.title}</p>
                            </div>
                            <div class='col-1 text-center'>
                                <p>{item.operator}</p>
                            </div>
                            <div class='col-5 text-end'>
                                {item.type === 'text' && <input type='text' name={item.value} value={formData[item.value]} onChange={handleChange}></input>}
                                {item.type === 'number' && <input type='number' name={item.value} value={formData[item.value]} onChange={handleChange}></input>}
                                {item.type === 'display' && <p name={item.value}>{formData[item.value]}</p>}
                                {item.type === 'date' && <input type='date' name={item.value} value={formData[item.value]} onChange={handleChange}/>}
                                {item.type === 'group' && <select name={item.value} value={formData[item.value]} onChange={handleChange}>{content[mainIndex].items[itemIndex].groups.map(group => <option value={group} selected={(group === entry[item.value]) ? true : false}>{group}</option>)}</select>}
                                {item.type === 'account' && <select>{mockStore[2][2].find(currentBlock => currentBlock.block === block).entries.sort((a, b) => a.title.localeCompare(b.title)).map(entry => <option>{entry.title}</option>)}</select>}
                            </div>
                            <div class='col-1'>
                                <p>{item.unit}</p>
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
