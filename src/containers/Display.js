import {NavLink} from 'react-router-dom';
import {useState} from 'react';

import Header from './Header'
import mockStore from '../utils/mockStore';
import accountIcons from '../icons/accountIcons'
import content from '../utils/content';
import {sumIcon} from '../icons/svgIcons';


function Display({mainIndex, itemIndex}) {

    const currentDate = new Date();    
    const currentYear = currentDate.getFullYear();

    const blockList = mockStore[mainIndex][itemIndex].map(currentBlock => currentBlock.block);

    let defaultBlock = {
        value: blockList[0], 
        index: 0,
        max: blockList.length - 1,
        list: blockList
    };

    const [block, setBlock] = useState(defaultBlock);

    const toggleBlockLeft = () => {
        setBlock(prevBlock => {
            const newIndex = prevBlock.index - 1;
            return {
                ...prevBlock,
                value: prevBlock.list[newIndex],
                index: newIndex
            };
        });
    };

    const toggleBlockRight = () => {
        setBlock(prevBlock => {
            const newIndex = prevBlock.index + 1;
            return {
                ...prevBlock,
                value: prevBlock.list[newIndex],
                index: newIndex
            };
        });
    };


    //implement when passing fetchd data to store...
    function findIcon(account){
        let index = accountIcons.findIndex(icon => account.title === icon.title);
        if(index === -1) {
            index = accountIcons.findIndex(icon => account.group === icon.title); 
        }
        return accountIcons[index].source;        
    }
    //...until here
    
    let blockIndex = 0;
    let assetsComponent = (<h2>Path did not match!</h2>);

    switch (itemIndex){
        case 0: //Overview            
            break;

        case 1: //Resources
            blockIndex = mockStore[mainIndex][itemIndex].findIndex(currentBlock => currentBlock.block === block.value);
            //if current year is not found, it has to be created
            const resourcesBlock = mockStore[mainIndex][itemIndex][blockIndex];
            const resourcesComponent = content[mainIndex].items[itemIndex].groups.map(group => {
                const groupTitleComponent = createHeadlineComponent(group); 
                const groupItemsComponent = resourcesBlock.entries
                    .filter(account => account.group === group)
                    .map(account => createResourcesComponent(account));                               
                return (<>{groupTitleComponent}{groupItemsComponent}</>);          
            });
            const resourcesSumComponent = createBigSumComponent(null, resourcesBlock.closingBalance);
            assetsComponent = (<>{resourcesComponent}{resourcesSumComponent}</>)
            break;

        case 2: //Investments
            blockIndex = mockStore[mainIndex][itemIndex].findIndex(currentBlock => currentBlock.block === block.value);
            //if current year is not found, it has to be created
            const investmentsBlock = mockStore[mainIndex][itemIndex][blockIndex]; 
            const investmentsComponent = content[mainIndex].items[itemIndex].groups.map(group => {
                const groupTitleComponent = createHeadlineComponent(group); 
                const groupItemsComponent = investmentsBlock.entries
                    .filter(account => account.group === group)
                    .map(account => createInvestmentsComponent(account));                               
                return (<>{groupTitleComponent}{groupItemsComponent}</>);          
            });
            const investmentsSumComponent = createBigSumComponent(investmentsBlock.accumulatedNetProfit, investmentsBlock.closingBalance, true);
            assetsComponent = (<>{investmentsComponent}{investmentsSumComponent}</>)
            break;

        case 3: // Transfers
            blockIndex = mockStore[mainIndex][itemIndex].findIndex(currentBlock => currentBlock.block === block.value);
            //if current year is not found, it has to be created
            const transfersBlock = mockStore[mainIndex][itemIndex][blockIndex];     
            const transfersComponent = transfersBlock.entries.map(transfer => {return createTransfersComponent(transfer);});
            const transfersSumComponent = createBigSumComponent(null, transfersBlock.amount);
            assetsComponent = (<>{transfersComponent}{transfersSumComponent}</>)
            break;

        case 4: //Expanses
            blockIndex = mockStore[mainIndex][itemIndex].findIndex(currentBlock => currentBlock.block === block.value);
            //if current year is not found, it has to be created
            const expansesBlock = mockStore[mainIndex][itemIndex][blockIndex];
            const expansesComponent = content[mainIndex].items[itemIndex].groups.map(group => {
                const groupTitleComponent = createHeadlineComponent(group); 
                const groupItemsComponent = expansesBlock.entries
                    .filter(expanse => expanse.group === group)
                    .map(expanse => createExpansesComponent(expanse));                               
                return (<>{groupTitleComponent}{groupItemsComponent}</>);          
            }); 
            const expaneseSumComponent = createBigSumComponent(expansesBlock.amountMonthly, expansesBlock.amountYearly);
            assetsComponent = (<>{expansesComponent}{expaneseSumComponent}</>)
            break;

        case 5: //Pension
            blockIndex = mockStore[mainIndex][itemIndex].findIndex(currentBlock => currentBlock.block === block.value);
            //if current year is not found, it has to be created
            const pensionsBlock = mockStore[mainIndex][itemIndex][blockIndex];            
            const pensionsComponent = pensionsBlock.entries.map(account => {return createPensionsComponent (account);});
            const pensionsSumComponent = createBigSumComponent(pensionsBlock.expected, pensionsBlock.amount);
            assetsComponent = (<>{pensionsComponent}{pensionsSumComponent}</>)
         break;
    }
    
    

    function createResourcesComponent (account){
        return (
            <NavLink to={'edit/' + block.value + '/' + account.id} state={{item: account, block: block.value}} className='nav-link'>      
                <div class='row content-row'>
                    <div class='col-6 d-flex align-items-center'>
                        <img src={findIcon(account)}/>
                        <h3>{account.title}</h3>
                    </div>
                    <div class='col-6 text-end'>
                          <div class='row d-flex align-items-center'>
                            <h4>{account.closingBalance} <span class='unit'>€</span></h4>
                        </div>
                    </div>
                </div>
            </NavLink>
        );
    }

    function createInvestmentsComponent (account){
        return (
            <NavLink to={'edit/' + block.value + '/' + account.id} state={{item: account, block: block.value}} className='nav-link'>      
                <div class='row content-row'>
                    <div class='col-6 d-flex align-items-center'>
                        <img src={findIcon(account)}/>
                        <h3>{account.title}</h3>
                    </div>
                    <div class='col-3 text-end'>
                        <div class='row h-50 d-flex align-items-center'>
                            <h4>{account.accumulatedROI} <span class='unit'>%</span></h4>
                        </div>
                        <div class='row h-50 d-flex align-items-center'>
                            <h4>+{account.accumulatedNetProfit} <span class='unit'>€</span></h4>
                        </div>
                    </div>        
                    <div class='col-3 text-end'>
                        <div class='row h-50 d-flex align-items-center'>
                            <h4>{account.ROI} <span class='unit'>%</span></h4>
                        </div>
                        <div class='row h-50 d-flex align-items-center'>
                            <h4>{account.closingBalance} <span class='unit'>€</span></h4>
                        </div>
                    </div>
                </div>
            </NavLink>
        );
    }

    function createTransfersComponent (transfer){
        return (
            <NavLink to={'edit/' + block.value + '/' + transfer.id} state={{item: transfer, block: block.value}} className='nav-link'>      
                <div class='row content-row small-row'>
                    <div class='col-5 d-flex align-items-center'>
                        <p>{transfer.title}</p>
                    </div>
                    <div class='col-4 text-end d-flex align-items-center justify-content-end'>
                        <p>{transfer.date}</p>
                    </div>        
                    <div class='col-3 text-end d-flex align-items-center justify-content-end'>
                        <p>{transfer.amount} <span class='unit'>€</span></p>
                    </div>
                </div>
            </NavLink>
        );
    }

    function createExpansesComponent (expanse){
        return (
            <NavLink to={'edit/' + block.value + '/' + expanse.id} state={{item: expanse, block: block.value}} className='nav-link'>      
                <div class='row content-row small-row'>
                    <div class='col-6 d-flex align-items-center'>
                        <p>{expanse.title}</p>
                    </div>
                    <div class='col-3 text-end d-flex align-items-center justify-content-end'>
                        <p>{expanse.amountMonthly} <span class='unit'>€</span></p>
                    </div>        
                    <div class='col-3 text-end d-flex align-items-center justify-content-end'>
                        <p>{expanse.amountYearly} <span class='unit'>€</span></p>
                    </div>
                </div>
            </NavLink>
        );
    }

    function createSmallSumComponent (left, right){
        return (
            <div class='row content-row small-row sum-row'>
                <div class='col-6 d-flex align-items-center'>
                    <h4>Sum</h4>
                </div>
                <div class='col-3 text-end d-flex align-items-center justify-content-end'>
                    {left && (<p>{left}<span class='unit'> €</span></p>)}
                </div>        
                <div class='col-3 text-end d-flex align-items-center justify-content-end'>
                    <p>{right}<span class='unit'> €</span></p>
                </div>
            </div>
        );
    }

    function createBigSumComponent (left, right, plus){
        return (    
            <div class='row content-row sum-row'>
                <div class='col-6 d-flex align-items-center'>
                    <h3>Sum</h3>
                </div>
                <div class='col-3 text-end d-flex align-items-center justify-content-end'>
                    {left && (<h4>{plus && '+'}{left}<span class='unit'> €</span></h4>)}
                </div>        
                <div class='col-3 text-end d-flex align-items-center justify-content-end'>
                    <h4>{right}<span class='unit'> €</span></h4>
                </div>
            </div>
        );
    }

    function createHeadlineComponent (headline){
        return (
            <div class='row content-row headline-row'>
                <div class='col-12 d-flex align-items-center'>
                    <h3>{headline}</h3>
                </div>
            </div>
        );
    }

    function createPensionsComponent (account){
        return (
            <NavLink to={'edit/' + block.value + '/' + account.id} state={{item: account, block: block.value}} className='nav-link'>      
                <div class='row content-row'>
                    <div class='col-6 d-flex align-items-center'>
                        <img src={findIcon(account)}/>
                        <h3>{account.title}</h3>
                    </div>
                    <div class='col-3 text-end d-flex align-items-center justify-content-end'>
                        <h4>{account.expected}<span class='unit'> €</span></h4>
                    </div>        
                    <div class='col-3 text-end d-flex align-items-center justify-content-end'>
                        <h4>{account.amount}<span class='unit'> €</span></h4>
                    </div>
                </div>
            </NavLink>
        );
    }
   
    return(
        <>
            <Header mainIndex={mainIndex} itemIndex={itemIndex} block={block} toggleBlockLeft={toggleBlockLeft} toggleBlockRight={toggleBlockRight}/> 
            <div class='container-fluid content' id='display'>
                {assetsComponent} 
            </div> 
        </>
    );
}

export default Display;