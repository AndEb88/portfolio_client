import {NavLink, useOutletContext} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect, PureComponent} from 'react';
import {PieChart, Pie, Sector, Cell, LabelList, ResponsiveContainer} from 'recharts';

import mockStore from '../utils/mockStore';
import accountIcons from '../icons/accountIcons'
import content, {colors} from '../utils/content';
import {sumIcon} from '../icons/svgIcons';
import {selectAssetsItem} from '../store/assetsSlice';
import {toAmountElement, toPercentElement} from '../utils/assetsFunctions';
import {color} from 'd3-color';


function Display() {

    const [mainIndex, itemIndex, main, item, form, block] = useOutletContext();
    const editPath = 'edit/' + block + '/';
    const disableLink = (item === 'dashboard');

    const dispatch = useDispatch();
    const itemStore = useSelector(state => selectAssetsItem(state, item));
    const status = useSelector(state => state.assets.status);

    //if current year is not found, it has to be created!
    let itemComponent = (<h1>no item data available</h1>);
    let sumComponent = (<h1>no sum data available</h1>);
    let pieChartComponent = (<></>);

    switch(status){
        case 'error':

            break;
            
        case 'loading':

            break;

        case 'idle':
            const itemBlock = itemStore[block];
            switch (itemIndex){
                case 0: //Dashboard 
                    let pieData = [];
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
                    sumComponent = createSumComponent(itemBlock.netProfit, itemBlock.closingBalance);
                    pieChartComponent = createPieChartComponent(itemBlock.entries);    
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
                    sumComponent = createSumComponent(itemBlock.netProfit, itemBlock.closingBalance);
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
                        return groupItemsComponent.length > 0 ? (<>{groupTitleComponent}{groupItemsComponent}</>) : null;       
                    }); 
                    sumComponent = createSumComponent(itemBlock.amountMonthly, itemBlock.amountYearly);
                    break;
        
                case 5: //Pension        
                    itemComponent = itemBlock.entries.map(account => createPensionComponent (account));
                    sumComponent = createSumComponent(itemBlock.expected, itemBlock.amount);
                 break;
            }
            break;
    }


    const assetsComponent = (
        <>
            {itemComponent}
            {sumComponent}
            {pieChartComponent}
        </>
    );
 
    function createHeadlineComponent (headline){ 
        return (
            <div key={headline} className='row content-row headline-row'>
                <div className='col-12 d-flex align-items-center'>
                    <h3>{headline}</h3>
                </div>
            </div>
        );
    } 
    
    function createPieChartComponent (entries){
        // let centerData = [];
        // let innerData = [];
        // let outerData = [];
        // entries.forEach(currentEntry => {
        //     if (currentEntry.title === 'Liabilities'){
        //         centerData.push({
        //             name: currentEntry.title,
        //             value: - currentEntry.closingBalance,
        //             class: 'overlay-cell',
        //         });
        //     } else {
        //         innerData.push({
        //             name: currentEntry.title,
        //             value: currentEntry.closingBalance,
        //             label: currentEntry.title,
        //             class: 'balance-cell',
        //         });
        //         outerData.push({
        //             name: currentEntry.title ,
        //             value: currentEntry.closingBalance - (currentEntry.netProfit ?? 0),
        //             label: currentEntry.title,
        //             class: 'invisible-cell',
        //         });
        //         outerData.push({
        //             name: currentEntry.title + ' Profit',
        //             value: currentEntry.netProfit ?? 0,
        //             label: currentEntry.ROI ?? '',
        //             class: 'profit-cell',
        //         });
        //     }
        // })  
       
        return (
            <div className='row chart-row'>
                {/* <ResponsiveContainer maxWidth="100%" height="100%">
                    <PieChart width={400} height={400}>
                        <Pie data={centerData} dataKey="value" cx="50%" cy="50%" outerRadius={100}>
                            {centerData.map((currentData, index) => (
                                <Cell className={currentData.class} key={`cell-${index}`}/>
                            ))}
                        </Pie>
                        <Pie data={innerData} dataKey="value" cx="50%" cy="50%" innerRadius={10} outerRadius={80} fill={colors.accentColor} stroke={colors.backgroundColor}>
                            <LabelList dataKey="label" position='outside' stroke='none'/>
                            {innerData.map((currentData, index) => (
                                <Cell className={currentData.class} key={`cell-${index}`}/>
                            ))}
                        </Pie>
                        <Pie data={outerData} dataKey="value" cx="50%" cy="50%" innerRadius={110} outerRadius={115} minAngle='1' fill={colors.highlightColor} stroke='none'>
                            <LabelList dataKey="label" position='end' fill='red'/>
                            {outerData.map((currentData, index) => (
                                <Cell className={currentData.class} key={`cell-${index}`} fill={colors.accentColor}/>
                            ))}
                        </Pie>
  
                    </PieChart>
                </ResponsiveContainer> */}
            </div>
        );
    }    

    function createResourceComponent (entry){ 
        return (
            <NavLink to={disableLink ? null : editPath + entry.id} key={entry.id} className={disableLink && 'nav-link-disabled'}> 
                <div className='row content-row'>
                    <div className='col-6 d-flex align-items-center'>
                        <img src={findIcon(entry)}/>
                        <h3>{entry.title}</h3>
                    </div>
                    <div className='col-6 text-end'>
                          <div className='row d-flex align-items-center'>
                            <h4>{toAmountElement(entry.closingBalance)} <span className='unit'>€</span></h4>
                        </div>
                    </div>
                </div>
            </NavLink>
        );
    }

    function createInvestmentComponent (entry){ 
        return (
            <NavLink to={disableLink ? null : editPath + entry.id} key={entry.id} className={disableLink && 'nav-link-disabled'}> 
                <div className='row content-row'>
                    <div className='col-6 d-flex align-items-center'>
                        <img src={findIcon(entry)}/>
                        <h3>{entry.title}</h3>
                    </div>
                    <div className='col-3 text-end'>
                        <div className='row h-50 d-flex align-items-center'>
                            <h4>{toPercentElement(entry.ROI, true)} <span className='unit'>%</span></h4>
                        </div>
                        <div className='row h-50 d-flex align-items-center'>
                            <h4>{toAmountElement(entry.netProfit, true)} <span className='unit'>€</span></h4>
                        </div>
                    </div>        
                    <div className='col-3 text-end'>
                          <div className='row d-flex align-items-center'>
                            <h4>{toAmountElement(entry.closingBalance)} <span className='unit'>€</span></h4>
                        </div>
                    </div>
                </div>
            </NavLink>
        );
    }

    function createTransferComponent (entry){
        return (
            <NavLink to={editPath + entry.id} key={entry.id}>      
                <div className='row content-row small-row'>
                    <div className='col-5 d-flex align-items-center'>
                        <p>{entry.title}</p>
                    </div>
                    <div className='col-4 text-end d-flex align-items-center justify-content-end'>
                        <p>{entry.date}</p>
                    </div>        
                    <div className='col-3 text-end d-flex align-items-center justify-content-end'>
                        <p>{toAmountElement(entry.amount)} <span className='unit'>€</span></p>
                    </div>
                </div>
            </NavLink>
        );
    }

    function createExpanseComponent (entry){
        return (
            <NavLink to={editPath + entry.id} key={entry.id}>      
                <div className='row content-row small-row'>
                    <div className='col-6 d-flex align-items-center'>
                        <p>{entry.title}</p>
                    </div>
                    <div className='col-3 text-end d-flex align-items-center justify-content-end'>
                        <p>{toAmountElement(entry.amountMonthly)} <span className='unit'>€</span></p>
                    </div>        
                    <div className='col-3 text-end d-flex align-items-center justify-content-end'>
                        <p>{toAmountElement(entry.amountYearly)} <span className='unit'>€</span></p>
                    </div>
                </div>
            </NavLink>
        );
    }

    function createPensionComponent (entry){
        return (
            <NavLink to={editPath + entry.id} key={entry.id}>      
                <div className='row content-row'>
                    <div className='col-6 d-flex align-items-center'>
                        <img src={findIcon(entry)}/>
                        <h3>{entry.title}</h3>
                    </div>
                    <div className='col-3 text-end'>
                        <div className='row h-50 d-flex align-items-center'>
                            <h4>{entry.ROI} <span className='unit'>%</span></h4>
                        </div>
                        <div className='row h-50 d-flex align-items-center'>
                            <h4>{toAmountElement(entry.expected)} <span className='unit'>€</span></h4>
                        </div>
                    </div>          
                    <div className='col-3 text-end d-flex align-items-center justify-content-end'>
                        <h4>{toAmountElement(entry.amount)}<span className='unit'> €</span></h4>
                    </div>
                </div>
            </NavLink>
        );
    }

    function createSumComponent (left, right){
        return (    
            <div className='row content-row sum-row'>
                <div className='col-6 d-flex align-items-center'>
                    <h3>Sum</h3>
                </div>
                <div className='col-3 text-end d-flex align-items-center justify-content-end'>
                    {left && (<h4>{toAmountElement(left, true)}<span className='unit'> €</span></h4>)}
                </div>        
                <div className='col-3 text-end d-flex align-items-center justify-content-end'>
                    <h4>{toAmountElement(right)}<span className='unit'> €</span></h4>
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
        <div className='container-fluid content' id='display'>
            {assetsComponent}
        </div> 
    );
}

export default Display;