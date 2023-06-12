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
        description: 'Investments description...',      
        items: [
            {
                route: 'overview', 
                title: 'Overview', 
                edit: false, 
                create: false, 
                add: false
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
                    {title: 'Group', operator: '', type: 'group', unit: '', bold: true},
                    {title: 'Title', operator: '', type: 'text', unit: '', bold: true},
                    {title: 'Last Update', operator: '', type: 'display', unit: '', margin: true, bold: true},
                    {title: 'Closing Balance', operator: '', type: 'text', unit: '€', margin: true},
                ],
                createForm: [
                    {title: 'Group', operator: '', type: 'group', unit: '', bold: true},
                    {title: 'Title', operator: '', type: 'text', unit: '', margin: true, bold: true},
                    {title: 'Closing Balance', operator: '', type: 'text', unit: '€', margin: true},
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
                    {title: 'Group', operator: '', type: 'group', unit: '', bold: true},
                    {title: 'Title', operator: '', type: 'text', unit: '', bold: true},
                    {title: 'Last Update', operator: '', type: 'display', unit: '', margin: true, bold: true},
                    {title: 'Closing Balance', operator: '', type: 'text', unit: '€'},
                    {title: 'Withheld Taxes', operator: '+', type: 'text', unit: '€'},
                    {title: 'Bonus & Payback', operator: '-', type: 'text', unit: '€'},
                    {title: 'Transfers', operator: '-', type: 'display', unit: '€'},
                    {title: 'Opening Balance', operator: '-', type: 'display', unit: '€'},
                    {title: 'Gross Profit', operator: '=', type: 'display', unit: '€', accent: true},
                    {title: 'Due Taxes', operator: '-', type: 'display', unit: '€'},
                    {title: 'Bonus & Payback', operator: '+', type: 'display', unit: '€'},
                    {title: 'Net Profit', operator: '=', type: 'display', unit: '€', margin: true, accent: true},
                ],
                createForm: [
                    {title: 'Group', operator: '', type: 'group', unit: '', bold: true},
                    {title: 'Title', operator: '', type: 'text', unit: '', margin: true, bold: true},
                ],
            }, 
            {
                route: 'transfers',
                title: 'Transfers', 
                edit: true, 
                create: true, 
                add: true,
                editForm: [
                    {title: 'Account', operator: '', type: 'accounts', unit: '', margin: true, bold: true},
                    {title: 'Date', operator: '', type: 'date', unit: ''},
                    {title: 'Amount', operator: '', type: 'text', unit: '€', margin: true},
                ],
                createForm: [
                    {title: 'Account', operator: '', type: 'accounts', unit: '', margin: true, bold: true},
                    {title: 'Date', operator: '', type: 'date', unit: ''},
                    {title: 'Amount', operator: '', type: 'text', unit: '€', margin: true},
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
                    {title: 'Group', operator: '', type: 'group', unit: '', bold: true},
                    {title: 'Title', operator: '', type: 'text', unit: '', margin: true, bold: true},
                    {title: 'Amount Monthly', operator: '', type: 'text', unit: '€'},
                    {title: 'Amount Yearly', operator: '', type: 'text', unit: '€', margin: true},
                    {title: 'Amount Monthly', operator: '', type: 'text', unit: '€'},
                    {title: 'Amount Yearly', operator: '', type: 'text', unit: '€', margin: true},
                ],
                createForm: [
                    {title: 'Group', operator: '', type: 'group', unit: '', bold: true},
                    {title: 'Title', operator: '', type: 'text', unit: '', margin: true, bold: true},
                    {title: 'Amount Monthly', operator: '', type: 'text', unit: '€'},
                    {title: 'Amount Yearly', operator: '', type: 'text', unit: '€', margin: true},
                    {title: 'Amount Monthly', operator: '', type: 'text', unit: '€'},
                    {title: 'Amount Yearly', operator: '', type: 'text', unit: '€', margin: true},
                ],
            }, 
            {
                route: 'pension', 
                title: 'Pension', 
                edit: true, 
                create: true, 
                add: true,
                editForm: [
                    {title: 'Title', operator: '', type: 'text', unit: '', margin: true, bold: true},
                    {title: 'Guaranteed Amount', operator: '', type: 'text', unit: '€'},                    
                    {title: 'Expected Amount', operator: '', type: 'text', unit: '€'},
                    {title: 'Expected Growth', operator: '', type: 'text', unit: '%', margin: true},
                ],
                createForm: [
                    {title: 'Title', operator: '', type: 'text', unit: '', margin: true, bold: true},
                    {title: 'Guaranteed Amount', operator: '', type: 'text', unit: '€'},                    
                    {title: 'Expected Amount', operator: '', type: 'text', unit: '€'},
                    {title: 'Expected Growth', operator: '', type: 'text', unit: '%', margin: true},
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