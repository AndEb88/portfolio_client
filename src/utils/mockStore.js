const mockStore = [

    [ //about
        [], //cv
        [], //skills
        [], //bio
        [], //showOff
        [] //changeLog
    ],

    [ //cheatsheets

    ],

    [ //assets
        [], //overview

        [ //resources
            {
                year: 2023,
                closingBalance: -5000,
                accounts: [
                    {id: 101, group: 'Cash', title: 'DKB Checking', date: new Date(2023, 4, 30), frozen: false, closingBalance: 5000.00},
                    {id: 102, group: 'Cash', title: 'DKB Savings', date: new Date(2023, 4, 30), frozen: false, closingBalance: 10000.00},
                    {id: 103, group: 'Liabilities', title: 'Family', date: new Date(2023, 4, 30), frozen: false, closingBalance: -10000.00},
                    {id: 104, group: 'Liabilities', title: 'Mariana', date: new Date(2023, 4, 30), frozen: false, closingBalance: -10000.00}
                    ]
                },
            {
                year: 2022,
                closingBalance: -5000,
                accounts: [
                    {id: 101, group: 'Cash', title: 'DKB Checking', date: new Date(2022, 12, 31), frozen: true, closingBalance: 5000.00},
                    {id: 102, group: 'Cash', title: 'DKB Savings', date: new Date(2022, 12, 31), frozen: true, closingBalance: 10000.00},
                    {id: 103, group: 'Liabilities', title: 'Family', date: new Date(2022, 12, 31), frozen: true, closingBalance: -10000.00},
                    {id: 104, group: 'Liabilities', title: 'Mariana', date: new Date(2022, 12, 31), frozen: true, closingBalance: -10000.00}
                    ]
                }
            ],

        [ 
            {
                year: 2023,
                tax: 0.26380, //apply also for NEW years
                accumulatedNetProfit: 9234,
                closingBalance: 51000,
                accounts: [
                    {id: 200, group: 'P2P', title: 'Robocash', date: new Date(2023, 4, 30), frozen: false, accumulatedROI: 13.1, accumulatedNetProfit: 4000, ROI: 13.3, closingBalance: 25000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit:0},
                    {id: 201, group: 'P2P', title: 'Peerberry', date: new Date(2023, 4, 30), frozen: false, accumulatedROI: 12.4, accumulatedNetProfit: 3000, ROI: 12.3, closingBalance: 10000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit:0},
                    {id: 202, group: 'Stock Market', title: 'Scalable Capital', date: new Date(2023, 4, 30), frozen: false, accumulatedROI: 6.1, accumulatedNetProfit: 12000, ROI: 12.3, closingBalance: 81000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit:0},
                    {id: 203, group: 'Other', title: 'Riester I', date: new Date(2023, 4, 30), frozen: false, accumulatedROI: 4.1, accumulatedNetProfit: 400, ROI: 12.3, closingBalance: 8000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit:0},
                ]
            },
            {
                year: 2022, 
                tax: 0.26380, //before 2022: 27.8200
                accumulatedNetProfit: 6234,
                closingBalance: 42000,
                accounts: [               
                    {id: 200, group: 'P2P', title: 'Robocash', date: new Date(2022, 12, 31), frozen: true, accumulatedROI: 13.2, accumulatedNetProfit: 3000, ROI: 13.1, closingBalance: 23000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit:0},
                    {id: 201, group: 'P2P', title: 'Peerberry', date: new Date(2022, 12, 31), frozen: true, accumulatedROI: 12.5, accumulatedNetProfit: 2000, ROI: 12.5, closingBalance: 9000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit:0},
                    {id: 202, group: 'Stock Market', title: 'Scalable Capital', date: new Date(2022, 12, 31), frozen: true, accumulatedROI: 5.1, accumulatedNetProfit: 9000, ROI: 12.1, closingBalance: 82000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit:0},
                    {id: 203, group: 'Other', title: 'Riester I', date: new Date(2022, 12, 31), frozen: true, accumulatedROI: 4.3, accumulatedNetProfit: 320, ROI: 12.2, closingBalance: 7000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit:0},
                ]
            }
        ],

        
        [ //transfers
            {
                year: 2023,
                amount: 10500,
                transfers: [            
                    {id: 201001, title: 'Peerberry', amount: 100, date: '2023-04-30'},
                    {id: 202001, title: 'Scalable Capital', amount: 10000, date: '2023-01-20'},
                    {id: 203001, title: 'Riester I', amount: 400, date: '2023-01-01'},
                ]
            },
            {
                year: 2022,
                amount: 20400,
                transfers: [
                    {id: 201001, title: 'Peerberry', amount: 200, date: '2022-04-30'},
                    {id: 202001, title: 'Scalable Capital', amount: 20000, date: '2022-01-20'},
                    {id: 203001, title: 'Riester I', amount: 200, date: '2022-01-01'},
                ]
            }
        ],
       
        { //expanses
            amountMonthly: 5770,
            amountYearly: 69240,
            amountMonthlySec: 577,
            amountYearlySec: 6924,
            expanses: [            
                {id: 301, group: 'Insurances', title: 'Liability', amountMonthly: -10, amountYearly: -120, amountMonthlySec: -1, amountYearlySec: -12},
                {id: 301, group: 'Housing', title: 'Electricity', amountMonthly: -60, amountYearly: -720, amountMonthlySec: -6, amountYearlySec: -72},
                {id: 302, group: 'Income', title: 'Continental', amountMonthly: 4000, amountYearly: 48000, amountMonthlySec: 400, amountYearlySec: 4800},
                {id: 303, group: 'Living', title: 'Vacation', amountMonthly: -100, amountYearly: -1200, amountMonthlySec: -10, amountYearlySec: -120},
                {id: 304, group: 'Living', title: 'Grocery', amountMonthly: -60, amountYearly: -720, amountMonthlySec: -6, amountYearlySec: -72},
                {id: 305, group: 'Income', title: 'InStart', amountMonthly: 2000, amountYearly: 24000, amountMonthlySec: 200, amountYearlySec: 2400},
            ]
        },       

        [ //pension
            {
                year: 2023,
                amount: 3840,
                expected: 7140,
                accounts: [
                    {id: 405, group: 'Pension', title: 'Riester I', frozen: false, year: 0, amount: 140, expected: 340, ROI: 3},
                    {id: 406, group: 'Pension', title: 'Statuatory', frozen: false, year: 0, amount: 3700, expected: 6800, ROI: 3}
                    ]
            },
            {
                year: 2022,
                amount: 3840,
                expected: 7100,
                accounts: [
                    {id: 405, group: 'Pension', title: 'Riester I', frozen: false, year: 0, amount: 140, expected: 300, ROI: 3},
                    {id: 406, group: 'Pension', title: 'Statuatory', frozen: false, year: 0, amount: 3700, expected: 6800, ROI: 3}
                    ]
            }
        ]
    ],

    [ //foobar

    ]
]

export default mockStore;