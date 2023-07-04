import {NavLink, useOutletContext} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect, PureComponent} from 'react';
import {PieChart, Pie, Sector, Cell, LabelList, ResponsiveContainer} from 'recharts';

import mockStore from '../utils/mockStore';
import accountIcons from '../icons/accountIcons'
import content, {colors} from '../utils/content';
import {sumIcon} from '../icons/svgIcons';
import {selectAssetsItem} from '../store/assetsSlice';
import {toAmount, toPercent} from '../utils/assetsFunctions';


function Display() {

    const [mainIndex, itemIndex, main, item, form, block] = useOutletContext();
    const editPath = 'edit/' + block + '/';
    const disableLink = (item === 'dashboard');

    const dispatch = useDispatch();
    const itemStore = useSelector(state => selectAssetsItem(state, item));
    const status = useSelector(state => state.assets.status);
    console.log(`current status = ${status}`);
    console.log(`current store = ${itemStore}`);



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
        let centerData = [];
        let innerData = [];
        let outerData = [];
        entries.forEach(currentEntry => {
            if (currentEntry.title === 'Liabilities'){
                centerData.push({
                    name: currentEntry.title,
                    value: - currentEntry.closingBalance,
                    class: 'liabilities-cell',
                });
            } else {
                innerData.push({
                    name: currentEntry.title,
                    value: currentEntry.closingBalance,
                    label: currentEntry.title,
                    class: 'closingBalance-cell',
                });
                outerData.push({
                    name: currentEntry.title ,
                    value: currentEntry.closingBalance - (currentEntry.netProfit ?? 0),
                    label: currentEntry.title,
                    class: 'openingBalance-cell',
                });
                outerData.push({
                    name: currentEntry.title + ' Profit',
                    value: currentEntry.netProfit ?? 0,
                    label: currentEntry.ROI ?? '',
                    class: 'netProfit-cell',
                });
            }
        })  
       
        return (
            <div className='row chart-row'>
                <ResponsiveContainer maxWidth="100%" height="100%">
                    <PieChart width={400} height={400}>
                        <Pie data={centerData} dataKey="value" cx="50%" cy="50%" outerRadius={40}>
                            {centerData.map((currentData, index) => (
                                <Cell className={currentData.class} key={`cell-${index}`}/>
                            ))}
                        </Pie>
                        <Pie data={innerData} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={60}>
                            <LabelList dataKey="label" position='outside'/>
                            {innerData.map((currentData, index) => (
                                <Cell className={currentData.class} key={`cell-${index}`}/>
                            ))}
                        </Pie>
                        <Pie data={outerData} dataKey="value" cx="50%" cy="50%" innerRadius={65} outerRadius={75} minAngle='1'>
                            <LabelList dataKey="label" position='outside'/>
                            {outerData.map((currentData, index) => (
                                <Cell className={currentData.class} key={`cell-${index}`}/>
                            ))}
                        </Pie>
  
                    </PieChart>
                </ResponsiveContainer>
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
                            <h4>{toAmount(entry.closingBalance)} <span className='unit'>€</span></h4>
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
                            <h4>{toPercent(entry.ROI, true)} <span className='unit'>%</span></h4>
                        </div>
                        <div className='row h-50 d-flex align-items-center'>
                            <h4>{toAmount(entry.netProfit, true)} <span className='unit'>€</span></h4>
                        </div>
                    </div>        
                    <div className='col-3 text-end'>
                          <div className='row d-flex align-items-center'>
                            <h4>{toAmount(entry.closingBalance)} <span className='unit'>€</span></h4>
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
                        <p>{toAmount(entry.amount)} <span className='unit'>€</span></p>
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
                        <p>{toAmount(entry.amountMonthly)} <span className='unit'>€</span></p>
                    </div>        
                    <div className='col-3 text-end d-flex align-items-center justify-content-end'>
                        <p>{toAmount(entry.amountYearly)} <span className='unit'>€</span></p>
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
                            <h4>{toAmount(entry.expected)} <span className='unit'>€</span></h4>
                        </div>
                    </div>          
                    <div className='col-3 text-end d-flex align-items-center justify-content-end'>
                        <h4>{toAmount(entry.amount)}<span className='unit'> €</span></h4>
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
                    {left && (<h4>{toAmount(left, true)}<span className='unit'> €</span></h4>)}
                </div>        
                <div className='col-3 text-end d-flex align-items-center justify-content-end'>
                    <h4>{toAmount(right)}<span className='unit'> €</span></h4>
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
            <div className='container-fluid content' id='display'>
                {assetsComponent}
            </div> 
        </>
    );
}

export default Display;