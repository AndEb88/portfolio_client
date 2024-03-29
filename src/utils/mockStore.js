
let mockStore = { //also block key will be available in each entry (because returned by database)
    about: {
        cv: {},
        skills: {},
        bio: {},
        showOff: {},
        changeLog: {},
    },

    cheatsheets: {},

    assets: {
        // accounts: [..], // dynamically generated

        overview: {
            overall: {
                netProfit: 600,
                closingBalance: 151000,
                entries: [
                    {group: 'Resources', title: 'Cash', closingBalance: 25000.00},
                    {group: 'Resources', title: 'Liabilities', closingBalance: 10000.00},
                    {group: 'Investments', title: 'P2P', ROI: 12.3, closingBalance: 81000.00, netProfit: 3},
                    {group: 'Investments', title: 'Stock Market', ROI: 12.3, closingBalance: 8000.00, netProfit: 1},
                    {group: 'Investments', title: 'Other', ROI: 12.3, closingBalance: 8000.00, netProfit: 2},
                ]
            },

            '2023': {
                netProfit: 6,
                closingBalance: 151000,
                entries: [
                    {group: 'Resources', title: 'Cash', closingBalance: 25000.00},
                    {group: 'Resources', title: 'Liabilities', closingBalance: 10000.00},
                    {group: 'Investments', title: 'P2P', ROI: 12.3, closingBalance: 81000.00, netProfit: 3},
                    {group: 'Investments', title: 'Stock Market', ROI: 12.3, closingBalance: 8000.00, netProfit: 1},
                    {group: 'Investments', title: 'Other', ROI: 12.3, closingBalance: 8000.00, netProfit: 2},
                ]
            },

            '2022': {
                netProfit: 600,
                closingBalance: 15100,
                entries: [
                    {group: 'Resources', title: 'Cash', closingBalance: 25000.00},
                    {group: 'Resources', title: 'Liabilities', closingBalance: 10000.00},
                    {group: 'Investments', title: 'P2P', ROI: 12.3, closingBalance: 81000.00, netProfit: 3},
                    {group: 'Investments', title: 'Stock Market', ROI: 12.3, closingBalance: 8000.00, netProfit: 1},
                    {group: 'Investments', title: 'Other', ROI: 12.3, closingBalance: 8000.00, netProfit: 2},
                ]
            },
        },  

        resources: {
            '2023': {
                closingBalance: -5000,
                entries: [
                    {id: 1, group: 'Cash', title: 'DKB Checking', frozen: false, closingBalance: 5000.00, openingBalance: 1, difference: 2},
                    {id: 2, group: 'Cash', title: 'DKB Savings', frozen: false, closingBalance: 10000.00, openingBalance: 1, difference: 2},
                    {id: 3, group: 'Liabilities', title: 'Family', frozen: false, closingBalance: -10000.00, openingBalance: 1, difference: 2},
                    {id: 4, group: 'Liabilities', title: 'Mariana', frozen: false, closingBalance: -10000.00, openingBalance: 1, difference: 2}
                ]
            },
            
            '2022': {
                closingBalance: -500,
                entries: [
                    {id: 1, group: 'Cash', title: 'DKB Checking', frozen: true, closingBalance: 500.00, openingBalance: 1, difference: 2},
                    {id: 2, group: 'Cash', title: 'DKB Savings', frozen: true, closingBalance: 1000.00, openingBalance: 1, difference: 2},
                    {id: 3, group: 'Liabilities', title: 'Family', frozen: true, closingBalance: -1000.00, openingBalance: 1, difference: 2},
                    {id: 4, group: 'Liabilities', title: 'Mariana', frozen: true, closingBalance: -1000.00, openingBalance: 1, difference: 2}
                ]
            },
        },

        investments: {
            overall: {
                netProfit: 7000,
                closingBalance: 51000,
                entries: [
                    {id: 1, group: 'P2P', title: 'Robocash', lastUpdate: '2023-04-20', ROI: 13.3, closingBalance: 25000.00, withheldTaxes: 1, bonus: 2, transfers: 3, openingBalance: 0, grossProfit: 50, dueTaxes: 6, netProfit: 7},
                    {id: 2, group: 'P2P', title: 'Peerberry', lastUpdate: '2023-04-30', ROI: 12.3, closingBalance: 10000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 40, dueTaxes: 0, netProfit: 0},
                    {id: 3, group: 'Stock Market', title: 'Scalable Capital', lastUpdate: '2023-04-30', ROI: 12.3, closingBalance: 81000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit: 0},
                    {id: 4, group: 'Other', title: 'Riester I', lastUpdate: '2023-04-30', ROI: 12.3, closingBalance: 8000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit: 0},
                ]
            },
            
            '2023': {
                taxRate: 0.26380, 
                netProfit: 7,
                closingBalance: 51000,
                entries: [
                    {id: 1, group: 'P2P', title: 'Robocash', lastUpdate: '2023-04-20', frozen: false, ROI: 13.3, closingBalance: 25000.00, withheldTaxes: 1, bonus: 2, transfers: 3, openingBalance: 4, grossProfit: 5, dueTaxes: 6, netProfit: 7},
                    {id: 2, group: 'P2P', title: 'Peerberry', lastUpdate: '2023-04-30', frozen: false, ROI: 12.3, closingBalance: 10000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit: 0},
                    {id: 3, group: 'Stock Market', title: 'Scalable Capital', lastUpdate: '2023-04-30', frozen: false, ROI: 12.3, closingBalance: 81000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit: 0},
                    {id: 4, group: 'Other', title: 'Riester I', lastUpdate: '2023-04-30', frozen: false, ROI: 12.3, closingBalance: 8000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit: 0},
                ]
            },
            
            '2022': {
                taxRate: 0.26380,
                netProfit: 6,
                closingBalance: 42000,
                entries: [               
                    {id: 1, group: 'P2P', title: 'Robocash', lastUpdate: '2022-04-30', frozen: true, ROI: 13.1, closingBalance: 23000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit: 0},
                    {id: 2, group: 'P2P', title: 'Peerberry', lastUpdate: '2022-04-30', frozen: true, ROI: 12.5, closingBalance: 9000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit: 6},
                    {id: 3, group: 'Stock Market', title: 'Scalable Capital', lastUpdate: '2022-04-30', frozen: true, ROI: 12.1, closingBalance: 82000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit: 0},
                    {id: 4, group: 'Other', title: 'Riester I', lastUpdate: '2022-04-30', frozen: true, ROI: 12.2, closingBalance: 7000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit: 0},
                ]
            }
        },
  
        transfers: {
            '2023': {
                amount: 10500,
                entries: [            
                    {id: 1, title: 'Peerberry', amount: 100, date: '2023-04-30'},
                    {id: 2, title: 'Scalable Capital', amount: 10000, date: '2023-01-20'},
                    {id: 3, title: 'Riester I', amount: 400, date: '2023-01-01'},
                ]
            },
            
            '2022': {
                amount: 20400,
                entries: [
                    {id: 1, title: 'Peerberry', amount: 200, date: '2022-04-30'},
                    {id: 2, title: 'Scalable Capital', amount: 20000, date: '2022-01-20'},
                    {id: 3, title: 'Riester I', amount: 200, date: '2022-01-01'},
                ]
            }
        },
       
        expanses: {
            Andi:{
                amountMonthly: 5770,
                amountYearly: 69240,
                entries: [            
                    {id: 1, group: 'Insurances', title: 'Liability', amountMonthly: -10, amountYearly: -120},
                    {id: 2, group: 'Housing', title: 'Electricity', amountMonthly: -60, amountYearly: -720},
                    {id: 3, group: 'Income', title: 'Continental', amountMonthly: 4000, amountYearly: 48000},
                    {id: 4, group: 'Living', title: 'Vacation', amountMonthly: -100, amountYearly: -1200},
                    {id: 5, group: 'Living', title: 'Grocery', amountMonthly: -60, amountYearly: -720},
                ]
            },
            
            Mariana: {
                amountMonthly: 577,
                amountYearly: 6924,
                entries: [            
                    {id: 1, group: 'Insurances', title: 'Liability', amountMonthly: -1, amountYearly: -12},
                    {id: 2, group: 'Housing', title: 'Electricity', amountMonthly:  -6, amountYearly: -72},
                    {id: 3, group: 'Living', title: 'Vacation', amountMonthly: -10, amountYearly: -120},
                    {id: 4, group: 'Living', title: 'Grocery', amountMonthly: -6, amountYearly: -72},
                    {id: 5, group: 'Income', title: 'InStart', amountMonthly: 200, amountYearly: 2400},
                ]
            },
        },       

        pension: {
            '2023': {
                amount: 3840,
                expected: 7140,
                entries: [
                    {id: 1, group: 'Private', title: 'Riester I', frozen: false, amount: 140, expected: 340, ROI: 3},
                    {id: 2, group: 'Public', title: 'Statuatory', frozen: false, amount: 3700, expected: 6800, ROI: 3}
                ]
            },

            '2022': {
                amount: 3840,
                expected: 7100,
                entries: [
                    {id: 1, group: 'Private', title: 'Riester I', frozen: true, amount: 140, expected: 300, ROI: 3},
                    {id: 2, group: 'Public', title: 'Statuatory', frozen: true, amount: 3700, expected: 6800, ROI: 3}
                ]
            }
        }
    },

    foobar: {},
}

export default mockStore;
