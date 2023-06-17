import {NavLink, useOutletContext} from 'react-router-dom';
import {useState} from 'react';

import mockStore from '../utils/mockStore';
import accountIcons from '../icons/accountIcons'
import content from '../utils/content';
import {sumIcon} from '../icons/svgIcons';


function Display() {

    const [mainIndex, itemIndex, main, item, context, block] = useOutletContext();
    
    let blockIndex = mockStore[mainIndex][itemIndex].findIndex(currentBlock => currentBlock.block === block.value);
    //if current year is not found, it has to be created
    const itemBlock = mockStore[mainIndex][itemIndex][blockIndex];

    let itemComponent = (<>(no data available)</>);
    let sumComponent = (<>(no data available)</>);

    switch (itemIndex){
        case 0: //Overview 
            itemComponent = content[mainIndex].items[itemIndex].groups.map(group => {
                const groupTitleComponent = createHeadlineComponent(group); 
                const groupItemsComponent = itemBlock.entries
                    .filter(account => account.group === group)
                    .map(account => {
                        if(group === content[2].items[1].title) return createResourceComponent(account);
                        if(group === content[2].items[2].title) return createInvestmentComponent(account);
                    });                              
                return (<>{groupTitleComponent}{groupItemsComponent}</>);          
            });
            sumComponent = createSumComponent(itemBlock.netProfit, itemBlock.closingBalance, true);       
            break;

        case 1: //Resources
            itemComponent = content[mainIndex].items[itemIndex].groups.map(group => {
                const groupTitleComponent = createHeadlineComponent(group); 
                const groupItemsComponent = itemBlock.entries
                    .filter(account => account.group === group)
                    .map(account => createResourceComponent(account));                               
                return (<>{groupTitleComponent}{groupItemsComponent}</>);          
            });
            sumComponent = createSumComponent(null, itemBlock.closingBalance);
            break;

        case 2: //Investments
            itemComponent = content[mainIndex].items[itemIndex].groups.map(group => {
                const groupTitleComponent = createHeadlineComponent(group); 
                const groupItemsComponent = itemBlock.entries
                    .filter(account => account.group === group)
                    .map(account => createInvestmentComponent(account));                               
                return (<>{groupTitleComponent}{groupItemsComponent}</>);          
            });
            sumComponent = createSumComponent(itemBlock.netProfit, itemBlock.closingBalance, true);
            break;

        case 3: // Transfers
            itemComponent = itemBlock.entries.map(transfer => createTransferComponent(transfer));
            sumComponent = createSumComponent(null, itemBlock.amount);
            break;

        case 4: //Expanses
            itemComponent = content[mainIndex].items[itemIndex].groups.map(group => {
                const groupTitleComponent = createHeadlineComponent(group); 
                const groupItemsComponent = itemBlock.entries
                    .filter(expanse => expanse.group === group)
                    .map(expanse => createExpanseComponent(expanse));                               
                return (<>{groupTitleComponent}{groupItemsComponent}</>);          
            }); 
            sumComponent = createSumComponent(itemBlock.amountMonthly, itemBlock.amountYearly);
            break;

        case 5: //Pension        
            itemComponent = itemBlock.entries.map(account => createPensionComponent (account));
            sumComponent = createSumComponent(itemBlock.expected, itemBlock.amount);
         break;
    }

    const assetsComponent = (<>{itemComponent}{sumComponent}</>);
    
    function createHeadlineComponent (headline){ 
        return (
            <div class='row content-row headline-row'>
                <div class='col-12 d-flex align-items-center'>
                    <h3>{headline}</h3>
                </div>
            </div>
        );
    }    

    function createResourceComponent (entry){ 
        return (
            <NavLink to={'edit/' + block.value + '/' + entry.id} className='nav-link'>      
                <div class='row content-row'>
                    <div class='col-6 d-flex align-items-center'>
                        <img src={findIcon(entry)}/>
                        <h3>{entry.title}</h3>
                    </div>
                    <div class='col-6 text-end'>
                          <div class='row d-flex align-items-center'>
                            <h4>{entry.closingBalance} <span class='unit'>€</span></h4>
                        </div>
                    </div>
                </div>
            </NavLink>
        );
    }

    function createInvestmentComponent (entry){ 
        return (
            <NavLink to={'edit/' + block.value + '/' + entry.id} className='nav-link'>      
                <div class='row content-row'>
                    <div class='col-6 d-flex align-items-center'>
                        <img src={findIcon(entry)}/>
                        <h3>{entry.title}</h3>
                    </div>
                    <div class='col-3 text-end'>
                        <div class='row h-50 d-flex align-items-center'>
                            <h4>{entry.ROI} <span class='unit'>%</span></h4>
                        </div>
                        <div class='row h-50 d-flex align-items-center'>
                            <h4>+{entry.netProfit} <span class='unit'>€</span></h4>
                        </div>
                    </div>        
                    <div class='col-3 text-end'>
                        <div class='row h-50 d-flex align-items-center'>
                            <h4>{entry.totalROI} <span class='unit'>%</span></h4>
                        </div>
                        <div class='row h-50 d-flex align-items-center'>
                            <h4>{entry.closingBalance} <span class='unit'>€</span></h4>
                        </div>
                    </div>
                </div>
            </NavLink>
        );
    }

    function createTransferComponent (entry){
        return (
            <NavLink to={'edit/' + block.value + '/' + entry.id} className='nav-link'>      
                <div class='row content-row small-row'>
                    <div class='col-5 d-flex align-items-center'>
                        <p>{entry.title}</p>
                    </div>
                    <div class='col-4 text-end d-flex align-items-center justify-content-end'>
                        <p>{entry.date}</p>
                    </div>        
                    <div class='col-3 text-end d-flex align-items-center justify-content-end'>
                        <p>{entry.amount} <span class='unit'>€</span></p>
                    </div>
                </div>
            </NavLink>
        );
    }

    function createExpanseComponent (entry){
        return (
            <NavLink to={'edit/' + block.value + '/' + entry.id} className='nav-link'>      
                <div class='row content-row small-row'>
                    <div class='col-6 d-flex align-items-center'>
                        <p>{entry.title}</p>
                    </div>
                    <div class='col-3 text-end d-flex align-items-center justify-content-end'>
                        <p>{entry.amountMonthly} <span class='unit'>€</span></p>
                    </div>        
                    <div class='col-3 text-end d-flex align-items-center justify-content-end'>
                        <p>{entry.amountYearly} <span class='unit'>€</span></p>
                    </div>
                </div>
            </NavLink>
        );
    }

    function createPensionComponent (entry){
        return (
            <NavLink to={'edit/' + block.value + '/' + entry.id} className='nav-link'>      
                <div class='row content-row'>
                    <div class='col-6 d-flex align-items-center'>
                        <img src={findIcon(entry)}/>
                        <h3>{entry.title}</h3>
                    </div>
                    <div class='col-3 text-end d-flex align-items-center justify-content-end'>
                        <h4>{entry.expected}<span class='unit'> €</span></h4>
                    </div>        
                    <div class='col-3 text-end d-flex align-items-center justify-content-end'>
                        <h4>{entry.amount}<span class='unit'> €</span></h4>
                    </div>
                </div>
            </NavLink>
        );
    }

    function createSumComponent (left, right, plus){
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

    function findIcon(account){
        let index = accountIcons.findIndex(currentIcon => account.title === currentIcon.title);
        if(index === -1) {
            index = accountIcons.findIndex(currentIcon => account.group === currentIcon.title); 
        }
        return accountIcons[index].source;        
    }
   
    return(
        <>
            <div class='container-fluid content' id='display'>
                {assetsComponent} 
            </div> 
        </>
    );
}

export default Display;