import {useParams} from 'react-router-dom';

import Header from './Header';
import content from '../utils/content';
import mockStore from '../utils/mockStore';

//also add group and title - but how?

function Edit({mainIndex, itemIndex, context}) {
    
    const {id} = useParams();
    console.log('log' + id);
    const year = id.slice(0, 4);
    const accountId = id.slice(4);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
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
        <>
            <Header mainIndex={mainIndex} itemIndex={itemIndex} context={context}/>
            
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
                                    {item.type === 'text' && <input type='text'></input>}
                                    {item.type === 'display' && <p>Display</p>}
                                    {item.type === 'date' && <input type='date'/>}
                                    {item.type === 'group' && <select>{content[mainIndex].items[itemIndex].groups.map(group => <option>{group}</option>)}</select>}
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
        </>
    );
}

export default Edit;
