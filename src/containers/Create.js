import content from '../utils/content';
import mockStore from '../utils/mockStore';

import {NavLink, useParams, useOutletContext} from 'react-router-dom';


function Create() {

    const [mainIndex, itemIndex, context] = useOutletContext();
    const {block} = useParams();

    const handleInputChange = (event) => {
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
        <>

            <div class='container-fluid content' id='create'>                
                <form onSubmit={handleSubmit}>
                    <div id='create-container'>
                        {content[mainIndex].items[itemIndex].createForm.map((item, index) => (
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
                                    {item.type === 'number' && <input type='number'></input>}
                                    {item.type === 'date' && <input type='date'/>}
                                    {item.type === 'group' && <select>{content[mainIndex].items[itemIndex].groups.map(group => <option>{group}</option>)}</select>}
                                    {item.type === 'account' && <select>{mockStore[2][2].find(currentBlock => currentBlock.block === block).entries.sort((a, b) => a.title.localeCompare(b.title)).map(entry => <option>{entry.title}</option>)}</select>}
                                </div>
                                <div class='col-1'>
                                    <p>{item.unit}</p>
                                </div>                 
                            </div>
                        ))}
                        </div>
                        <div class='row edit-row d-flex justify-content-center edit-row-bold'>
                            <button class='createButton' type='submit'>Create</button>
                        </div>
                </form>
            </div>
        </>
    );
}

export default Create;

