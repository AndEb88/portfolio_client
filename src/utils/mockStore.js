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

    //important: maintain each account in all blocks
    //but do NOT display if closingBalance & openingBalance (etc.) is 0

        [], //overview

        [ //resources
            {
                block: '2023',
                closingBalance: -5000,
                entries: [
                    {id: 101, group: 'Cash', title: 'DKB Checking', frozen: false, closingBalance: 5000.00},
                    {id: 102, group: 'Cash', title: 'DKB Savings', frozen: false, closingBalance: 10000.00},
                    {id: 103, group: 'Liabilities', title: 'Family', frozen: false, closingBalance: -10000.00},
                    {id: 104, group: 'Liabilities', title: 'Mariana', frozen: false, closingBalance: -10000.00}
                    ]
                },
            {
                block: '2022',
                closingBalance: -500,
                entries: [
                    {id: 101, group: 'Cash', title: 'DKB Checking', frozen: true, closingBalance: 500.00},
                    {id: 102, group: 'Cash', title: 'DKB Savings', frozen: true, closingBalance: 1000.00},
                    {id: 103, group: 'Liabilities', title: 'Family', frozen: true, closingBalance: -1000.00},
                    {id: 104, group: 'Liabilities', title: 'Mariana', frozen: true, closingBalance: -1000.00}
                    ]
                }
            ],

        [ 
            {
                block: '2023',
                taxRate: 0.26380, 
                accumulatedNetProfit: 9234,
                closingBalance: 51000,
                entries: [
                    {id: 200, group: 'P2P', title: 'Robocash', lastUpdate: '2023-04-20', frozen: false, accumulatedROI: 13.1, accumulatedNetProfit: 4000.0, ROI: 13.3, closingBalance: 25000.00, withheldTaxes: 1, bonus: 2, transfers: 3, openingBalance: 4, grossProfit: 5, dueTaxes: 6, netProfit: 7},
                    {id: 201, group: 'P2P', title: 'Peerberry', lastUpdate: '2023-04-30', frozen: false, accumulatedROI: 12.4, accumulatedNetProfit: 3000, ROI: 12.3, closingBalance: 10000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit: 0},
                    {id: 202, group: 'Stock Market', title: 'Scalable Capital', lastUpdate: '2023-04-30', frozen: false, accumulatedROI: 6.1, accumulatedNetProfit: 12000, ROI: 12.3, closingBalance: 81000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit: 0},
                    {id: 203, group: 'Other', title: 'Riester I', lastUpdate: '2023-04-30', frozen: false, accumulatedROI: 4.1, accumulatedNetProfit: 400, ROI: 12.3, closingBalance: 8000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit: 0},
                ]
            },
            {
                block: '2022', 
                taxRate: 0.26380,
                accumulatedNetProfit: 6234,
                closingBalance: 42000,
                entries: [               
                    {id: 200, group: 'P2P', title: 'Robocash', lastUpdate: '2022-04-30', frozen: true, accumulatedROI: 13.2, accumulatedNetProfit: 3000, ROI: 13.1, closingBalance: 23000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit:0},
                    {id: 201, group: 'P2P', title: 'Peerberry', lastUpdate: '2022-04-30', frozen: true, accumulatedROI: 12.5, accumulatedNetProfit: 2000, ROI: 12.5, closingBalance: 9000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit:0},
                    {id: 202, group: 'Stock Market', title: 'Scalable Capital', lastUpdate: '2022-04-30', frozen: true, accumulatedROI: 5.1, accumulatedNetProfit: 9000, ROI: 12.1, closingBalance: 82000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit:0},
                    {id: 203, group: 'Other', title: 'Riester I', lastUpdate: '2022-04-30', frozen: true, accumulatedROI: 4.3, accumulatedNetProfit: 320, ROI: 12.2, closingBalance: 7000.00, withheldTaxes: 0, bonus: 0, transfers: 0, openingBalance: 0, grossProfit: 0, dueTaxes: 0, netProfit:0},
                ]
            }
        ],

        
        [ //transfers
            {
                block: '2023',
                amount: 10500,
                entries: [            
                    {id: 201001, title: 'Peerberry', amount: 100, date: '2023-04-30'},
                    {id: 202001, title: 'Scalable Capital', amount: 10000, date: '2023-01-20'},
                    {id: 203001, title: 'Riester I', amount: 400, date: '2023-01-01'},
                ]
            },
            {
                block: '2022',
                amount: 20400,
                entries: [
                    {id: 201001, title: 'Peerberry', amount: 200, date: '2022-04-30'},
                    {id: 202001, title: 'Scalable Capital', amount: 20000, date: '2022-01-20'},
                    {id: 203001, title: 'Riester I', amount: 200, date: '2022-01-01'},
                ]
            }
        ],
       
        [ //expanses
            {
                block: 'Andi',
                amountMonthly: 5770,
                amountYearly: 69240,
                entries: [            
                    {id: 301, group: 'Insurances', title: 'Liability', amountMonthly: -10, amountYearly: -120},
                    {id: 301, group: 'Housing', title: 'Electricity', amountMonthly: -60, amountYearly: -720},
                    {id: 302, group: 'Income', title: 'Continental', amountMonthly: 4000, amountYearly: 48000},
                    {id: 303, group: 'Living', title: 'Vacation', amountMonthly: -100, amountYearly: -1200},
                    {id: 304, group: 'Living', title: 'Grocery', amountMonthly: -60, amountYearly: -720},
                ]
            },
            {
                block: 'Mariana',
                amountMonthly: 577,
                amountYearly: 6924,
                entries: [            
                    {id: 301, group: 'Insurances', title: 'Liability', amountMonthly: -1, amountYearly: -12},
                    {id: 301, group: 'Housing', title: 'Electricity', amountMonthly:  -6, amountYearly: -72},
                    {id: 303, group: 'Living', title: 'Vacation', amountMonthly: -10, amountYearly: -120},
                    {id: 304, group: 'Living', title: 'Grocery', amountMonthly: -6, amountYearly: -72},
                    {id: 305, group: 'Income', title: 'InStart', amountMonthly: 200, amountYearly: 2400},
                    ]
            },
        ],       

        [ //pension
            {
                block: '2023',
                amount: 3840,
                expected: 7140,
                entries: [
                    {id: 405, group: 'Pension', title: 'Riester I', frozen: false, amount: 140, expected: 340, ROI: 3},
                    {id: 406, group: 'Pension', title: 'Statuatory', frozen: false, amount: 3700, expected: 6800, ROI: 3}
                    ]
            },
            {
                block: '2022',
                amount: 3840,
                expected: 7100,
                entries: [
                    {id: 405, group: 'Pension', title: 'Riester I', frozen: false, amount: 140, expected: 300, ROI: 3},
                    {id: 406, group: 'Pension', title: 'Statuatory', frozen: false, amount: 3700, expected: 6800, ROI: 3}
                    ]
            }
        ]
    ],

    [ //foobar

    ]
]

export default mockStore;