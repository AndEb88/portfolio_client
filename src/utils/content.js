const content = [
    {
        route: 'about', 
        title: 'About',
        items: [
            {route: 'cv', title: 'CV', edit: true, create: true, add: true}, 
            {route: 'skills', title: 'Skills', edit: true, create: true, add: true}, 
            {route: 'bio', title: 'Bio', edit: true, create: true, add: true}, 
            {route:'showoff', title: 'Show Off', edit: false, create: false, add: false}, 
            {route: 'changelog', title: 'Change Log', edit: false, create: false, add: false}
        ],
        description: 'About description...'
    },
    
    {
        route: 'cheatsheets',
        title: 'Cheatsheets',
        items: [
            {route: 'bash', title: 'Bash', edit: false, create: false, add: false}, 
            {route: 'git', title: 'Git', edit: false, create: false, add: false}, 
            {route: 'html', title: 'HTML', edit: false, create: false, add: false}, 
            {route: 'css', title: 'CSS', edit: false, create: false, add: false}, 
            {route: 'javascript', title: 'Java Script', edit: false, create: false, add: false}, 
            {route: 'frontend', title: 'Front-End', edit: false, create: false, add: false}, 
            {route: 'backend', title: 'Back-End', edit: false, create: false, add: false}, 
            {route: 'fullstack', title: 'Full-Stack', edit: false, create: false, add: false}
        ],
        description: 'Cheatsheets description...'
    },

    {
        route: 'assets', 
        title: 'Assets',
        firstYear: 2018,
        taxRates: [
            {since: 2022, rate: 0.26380},
            {since: 2018, rate: 0.27820}
        ],
        description: 'Investments description...',      
        items: [
            {
                route: 'overview', 
                title: 'Overview', 
                edit: false, 
                create: false, 
                add: false,
                groups: ['Resources', 'Investments']
            }, 
            {
                route: 'resources', 
                title: 'Resources', 
                edit: true, 
                create: true, 
                add: true,
                freeze: true,
                groups: ['Cash', 'Liabilities'],
                editForm: [
                    {values: 'group', title: 'Group', operator: '', type: 'group', unit: '', bold: true},
                    {value: 'title', title: 'Title', operator: '', type: 'text', unit: '', bold: true, margin: true},
                    {value: 'closingBalance', title: 'Closing Balance', operator: '', type: 'number', unit: '€', margin: true},
                ],
                createForm: [
                    {value: 'group', title: 'Group', operator: '', type: 'group', unit: '', bold: true},
                    {value: 'title', title: 'Title', operator: '', type: 'text', unit: '', margin: true, bold: true},
                    {value: 'closingBalance', title: 'Closing Balance', operator: '', type: 'number', unit: '€', margin: true},
                ],
            }, 
            {
                route: 'investments', 
                title: 'Investments', 
                edit: true, 
                create: true, 
                add: true,
                freeze: true, 
                groups: ['P2P', 'Stock Market', 'Other'],
                editForm: [
                    {value: 'group', title: 'Group', operator: '', type: 'group', unit: '', bold: true},
                    {value: 'title', title: 'Title', operator: '', type: 'text', unit: '', bold: true},
                    {value: 'lastUpdate', title: 'Last Update', operator: '', type: 'display', unit: '', margin: true, bold: true},
                    {value: 'closingBalance', title: 'Closing Balance', operator: '', type: 'number', unit: '€'},
                    {value: 'withheldTaxes', title: 'Withheld Taxes', operator: '+', type: 'number', unit: '€'},
                    {value: 'bonus', title: 'Bonus & Payback', operator: '-', type: 'number', unit: '€'},
                    {value: 'transfers', title: 'Transfers', operator: '-', type: 'number', unit: '€'},
                    {value: 'openingBalance', title: 'Opening Balance', operator: '-', type: 'number', unit: '€'},
                    {value: 'grossProfit', title: 'Gross Profit', operator: '=', type: 'number', unit: '€', accent: true},
                    {value: 'dueTaxes', title: 'Due Taxes', operator: '-', type: 'number', unit: '€'},
                    {value: 'bonus', title: 'Bonus & Payback', operator: '+', type: 'number', unit: '€'},
                    {value: 'netProfit', title: 'Net Profit', operator: '=', type: 'number', unit: '€', margin: true, accent: true},
                ],
                createForm: [
                    {value: 'group', title: 'Group', operator: '', type: 'group', unit: '', bold: true},
                    {value: 'title', title: 'Title', operator: '', type: 'text', unit: '', margin: true, bold: true},
                    {value: 'closingBalance', title: 'Closing Balance', operator: '', type: 'number', unit: '€', margin: true},
                ],
            }, 
            {
                route: 'transfers',
                title: 'Transfers', 
                edit: true, 
                create: true, 
                add: true,
                //title requires a select with all investment accounts available in this year
                editForm: [
                    {value: 'title', title: 'Title', operator: '', type: 'account', unit: '', margin: true, bold: true},
                    {value: 'date', title: 'Date', operator: '', type: 'date', unit: ''},
                    {value: 'amount', title: 'Amount', operator: '', type: 'number', unit: '€', margin: true},
                ],
                createForm: [
                    {value: 'title', title: 'Title', operator: '', type: 'account', unit: '', margin: true, bold: true},
                    {value: 'date', title: 'Date', operator: '', type: 'date', unit: ''},
                    {value: 'amount', title: 'Amount', operator: '', type: 'number', unit: '€', margin: true},
                ],
            }, 
            {
                route: 'expanses', 
                title: 'Expanses', 
                edit: true, 
                create: true, 
                add: true,
                groups: ['Income', 'Insurances', 'Housing', 'Subscriptions', 'Transport', 'Living'],
                editForm: [
                    {value: 'group', title: 'Group', operator: '', type: 'group', unit: '', bold: true},
                    {value: 'title', title: 'Title', operator: '', type: 'text', unit: '', margin: true, bold: true},
                    {value: 'amountMonthly', title: 'Amount Monthly', operator: '', type: 'number', unit: '€'},
                    {value: 'amountYearly', title: 'Amount Yearly', operator: '', type: 'number', unit: '€', margin: true},
                ],
                createForm: [
                    {value: 'group', title: 'Group', operator: '', type: 'group', unit: '', bold: true},
                    {value: 'title', title: 'Title', operator: '', type: 'text', unit: '', margin: true, bold: true},
                    {value: 'amountMonthly', title: 'Amount Monthly', operator: '', type: 'number', unit: '€'},
                    {value: 'amountYearly', title: 'Amount Yearly', operator: '', type: 'number', unit: '€', margin: true},
                ],
            }, 
            {
                route: 'pension', 
                title: 'Pension', 
                edit: true, 
                create: true, 
                add: true,
                editForm: [
                    {value: 'title', title: 'Title', operator: '', type: 'text', unit: '', margin: true, bold: true},
                    {value: 'amount', title: 'Guaranteed Amount', operator: '', type: 'text', unit: '€'},                    
                    {value: 'expected', title: 'Expected Amount', operator: '', type: 'text', unit: '€'},
                    {value: 'ROI', title: 'Expected Growth', operator: '', type: 'text', unit: '%', margin: true},
                ],
                createForm: [
                    {value: 'title', title: 'Title', operator: '', type: 'text', unit: '', margin: true, bold: true},
                    {value: 'amount', title: 'Guaranteed Amount', operator: '', type: 'text', unit: '€'},                    
                    {value: 'expected', title: 'Expected Amount', operator: '', type: 'text', unit: '€'},
                    {value: 'ROI', title: 'Expected Growth', operator: '', type: 'text', unit: '%', margin: true},
                ],
            }
        ],
    },

    {
        route: 'foobar', 
        title: 'Foo Bar',
        items: [
            {route: 'foobar', title: 'Foo Bar', edit: false, create: false, add: false}, 
            {route: 'foobar', title: 'Fooo Bar', edit: false, create: false, add: false}
        ],
        description: 'Foo Bar description...'
    }
]

export default content;