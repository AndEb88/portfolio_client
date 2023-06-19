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
                    {name: 'group', title: 'Group', operator: '', type: 'group', unit: '', bold: true},
                    {name: 'title', title: 'Title', operator: '', type: 'text', unit: '', bold: true, margin: true},
                    {name: 'closingBalance', title: 'Closing Balance', operator: '', type: 'number', unit: '€', margin: true},
                ],
                createForm: [
                    {name: 'group', title: 'Group', operator: '', type: 'group', unit: '', bold: true},
                    {name: 'title', title: 'Title', operator: '', type: 'text', unit: '', margin: true, bold: true},
                    {name: 'closingBalance', title: 'Closing Balance', operator: '', type: 'number', unit: '€', margin: true},
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
                    {name: 'group', title: 'Group', operator: '', type: 'group', unit: '', bold: true},
                    {name: 'title', title: 'Title', operator: '', type: 'text', unit: '', bold: true},
                    {name: 'lastUpdate', title: 'Last Update', operator: '', type: 'display', unit: '', margin: true},
                    {name: 'closingBalance', title: 'Closing Balance', operator: '', type: 'number', unit: '€'},
                    {name: 'withheldTaxes', title: 'Withheld Taxes', operator: '+', type: 'number', unit: '€'},
                    {name: 'bonus', title: 'Bonus & Payback', operator: '-', type: 'number', unit: '€'},
                    {name: 'transfers', title: 'Transfers', operator: '-', type: 'display', unit: '€'},
                    {name: 'openingBalance', title: 'Opening Balance', operator: '-', type: 'display', unit: '€'},
                    {name: 'grossProfit', title: 'Gross Profit', operator: '=', type: 'display', unit: '€', accent: true},
                    {name: 'dueTaxes', title: 'Due Taxes', operator: '-', type: 'display', unit: '€'},
                    {name: 'bonus', title: 'Bonus & Payback', operator: '+', type: 'display', unit: '€'},
                    {name: 'netProfit', title: 'Net Profit', operator: '=', type: 'display', unit: '€', margin: true, accent: true},
                ],
                createForm: [
                    {name: 'group', title: 'Group', operator: '', type: 'group', unit: '', bold: true},
                    {name: 'title', title: 'Title', operator: '', type: 'text', unit: '', margin: true, bold: true},
                    {name: 'closingBalance', title: 'Closing Balance', operator: '', type: 'number', unit: '€', margin: true},
                ],
            }, 
            {
                route: 'transfers',
                title: 'Transfers', 
                edit: true, 
                create: true, 
                add: true,
                // groups must be calculated dynamically depending on set year
                // therefore transfer groups are retrieved 'ad hoc' from selected block in store
                editForm: [
                    {name: 'title', title: 'Title', operator: '', type: 'account', unit: '', margin: true, bold: true},
                    {name: 'date', title: 'Date', operator: '', type: 'date', unit: ''},
                    {name: 'amount', title: 'Amount', operator: '', type: 'number', unit: '€', margin: true},
                ],
                createForm: [
                    {name: 'title', title: 'Title', operator: '', type: 'account', unit: '', margin: true, bold: true},
                    {name: 'date', title: 'Date', operator: '', type: 'date', unit: ''},
                    {name: 'amount', title: 'Amount', operator: '', type: 'number', unit: '€', margin: true},
                ],
            }, 
            {
                route: 'expanses', 
                title: 'Expanses', 
                edit: true, 
                create: true, 
                groups: ['Income', 'Insurances', 'Housing', 'Subscriptions', 'Transport', 'Living'],
                editForm: [
                    {name: 'group', title: 'Group', operator: '', type: 'group', unit: '', bold: true},
                    {name: 'title', title: 'Title', operator: '', type: 'text', unit: '', margin: true, bold: true},
                    {name: 'amountMonthly', title: 'Amount Monthly', operator: '', type: 'number', unit: '€'},
                    {name: 'amountYearly', title: 'Amount Yearly', operator: '', type: 'number', unit: '€', margin: true},
                ],
                createForm: [
                    {name: 'group', title: 'Group', operator: '', type: 'group', unit: '', bold: true},
                    {name: 'title', title: 'Title', operator: '', type: 'text', unit: '', margin: true, bold: true},
                    {name: 'amountMonthly', title: 'Amount Monthly', operator: '', type: 'number', unit: '€'},
                    {name: 'amountYearly', title: 'Amount Yearly', operator: '', type: 'number', unit: '€', margin: true},
                ],
            }, 
            {
                route: 'pension', 
                title: 'Pension', 
                year: 2055,
                edit: true, 
                create: true, 
                freeze: true,
                editForm: [
                    {name: 'title', title: 'Title', operator: '', type: 'text', unit: '', margin: true, bold: true},
                    {name: 'amount', title: 'Guaranteed Amount', operator: '', type: 'text', unit: '€'},                    
                    {name: 'expected', title: 'Expected Amount', operator: '', type: 'text', unit: '€'},
                    {name: 'ROI', title: 'Expected Growth', operator: '', type: 'text', unit: '%', margin: true},
                ],
                createForm: [
                    {name: 'title', title: 'Title', operator: '', type: 'text', unit: '', margin: true, bold: true},
                    {name: 'amount', title: 'Guaranteed Amount', operator: '', type: 'text', unit: '€'},                    
                    {name: 'expected', title: 'Expected Amount', operator: '', type: 'text', unit: '€'},
                    {name: 'ROI', title: 'Expected Growth', operator: '', type: 'text', unit: '%', margin: true},
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