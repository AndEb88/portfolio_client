import content from '../utils/content';
import mockStore from '../utils/mockStore';

import {NavLink, useParams, useOutletContext} from 'react-router-dom';


function Create() {

    const [mainIndex, itemIndex, context] = useOutletContext();
    const {block} = useParams();

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
                <div id='create-container'>
                    {content[mainIndex].items[itemIndex].createForm.map((formEntry, index) => (
                        <div key={formEntry.name} className={`row edit-row ${formEntry.accent && 'edit-row-accent'} ${formEntry.margin && 'edit-row-margin'} ${formEntry.bold && 'edit-row-bold'}`}>
                            <div className='col-5'>
                                <p>{formEntry.title}</p>
                            </div>
                            <div className='col-1 text-center'>
                                <p>{formEntry.operator}</p>
                            </div>
                            <div className='col-5 text-end'>
                                {formEntry.type === 'text' && <input type='text' name={formEntry.name} onChange={handleChange}></input>}
                                {formEntry.type === 'number' && <input className='text-end' type='number' name={formEntry.name} onChange={handleChange}></input>}
                                {formEntry.type === 'date' && <input type='date' name={formEntry.name} onChange={handleChange}/>}
                                {formEntry.type === 'group' && (
                                    <select name={formEntry.name} value='' onChange={handleChange}>
                                        <option disabled selected value='default'>
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
                                    <select name={formEntry.name} value='' onChange={handleChange}>
                                        <option disabled selected value='default'>
                                            Select...
                                        </option>
                                        {mockStore[2][2].find(currentBlock => currentBlock.block === block).entries.sort((a, b) => a.title.localeCompare(b.title)).map(entry => (
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
                    <div className='row edit-row d-flex justify-content-center edit-row-bold'>
                        <button className='createButton' type='submit'>Create</button>
                    </div>
            </form>
        </div>
    );
}

export default Create;

