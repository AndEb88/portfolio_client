let mockAssets = {

    resources: [
        {block: '2020', id: 1, group: 'Cash', title: 'DKB Checking', date: '2020-12-31', closingBalance: 5109.16, frozen: true},
        {block: '2021', id: 1, group: 'Cash', title: 'DKB Checking', date: '2021-12-31', closingBalance: 7044.45, frozen: true},
        {block: '2022', id: 1, group: 'Cash', title: 'DKB Checking', date: '2022-12-31', closingBalance: 19794.12, frozen: true},
        {block: '2023', id: 1, group: 'Cash', title: 'DKB Checking', date: '2023-07-09', closingBalance: 743.18, frozen: false},
        {block: '2020', id: 2, group: 'Cash', title: 'DKB Credit', date: '2020-12-31', closingBalance: 0.00, frozen: true},
        {block: '2021', id: 2, group: 'Cash', title: 'DKB Credit', date: '2021-12-31', closingBalance: 206.20, frozen: true},
        {block: '2022', id: 2, group: 'Cash', title: 'DKB Credit', date: '2022-12-31', closingBalance: 564.91, frozen: true},
        {block: '2023', id: 2, group: 'Cash', title: 'DKB Credit', date: '2023-07-09', closingBalance: 346.91, frozen: false},
        {block: '2020', id: 3, group: 'Cash', title: 'DKB Savings', date: '2020-12-31', closingBalance: 4000.00, frozen: true},
        {block: '2021', id: 3, group: 'Cash', title: 'DKB Savings', date: '2021-12-31', closingBalance: 24000.00, frozen: true},
        {block: '2022', id: 3, group: 'Cash', title: 'DKB Savings', date: '2022-12-31', closingBalance: 8500.72, frozen: true},
        {block: '2023', id: 3, group: 'Cash', title: 'DKB Savings', date: '2023-10-15', closingBalance: 129400.58, frozen: false},
        {block: '2020', id: 4, group: 'Cash', title: 'Wallet', date: '2020-12-31', closingBalance: 6000, frozen: true},
        {block: '2021', id: 4, group: 'Cash', title: 'Wallet', date: '2021-12-31', closingBalance: 0, frozen: true},
        {block: '2022', id: 4, group: 'Cash', title: 'Wallet', date: '2022-12-31', closingBalance: 500, frozen: true},
        {block: '2023', id: 4, group: 'Cash', title: 'Wallet', date: '2023-07-09', closingBalance: 300, frozen: false},
        {block: '2020', id: 5, group: 'Liabilities', title: 'Mariana', date: '2020-12-31', closingBalance: 0, frozen: true},
        {block: '2021', id: 5, group: 'Liabilities', title: 'Mariana', date: '2021-12-31', closingBalance: -4000, frozen: true},
        {block: '2022', id: 5, group: 'Liabilities', title: 'Mariana', date: '2022-12-31', closingBalance: -9000, frozen: true},
        {block: '2023', id: 5, group: 'Liabilities', title: 'Mariana', date: '2023-10-15', closingBalance: -12000, frozen: false},
        {block: '2020', id: 6, group: 'Liabilities', title: 'Family', date: '2020-12-31', closingBalance: 0, frozen: true},
        {block: '2021', id: 6, group: 'Liabilities', title: 'Family', date: '2021-12-31', closingBalance: -50000, frozen: true},
        {block: '2022', id: 6, group: 'Liabilities', title: 'Family', date: '2022-12-31', closingBalance: -50000, frozen: true},
        {block: '2023', id: 6, group: 'Liabilities', title: 'Family', date: '2023-07-09', closingBalance: -200000, frozen: false},    
    ],

    investments: [
        {block: '2020', id: 1, group: 'Other', title: 'Allianz', date: '2020-12-31', closingBalance: 12362.24, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2020', id: 2, group: 'Other', title: 'Riester I', date: '2020-12-31', closingBalance: 8197.18, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2020', id: 3, group: 'Other', title: 'Riester II', date: '2020-12-31', closingBalance: 381.16, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2020', id: 4, group: 'Other', title: 'Bausparer', date: '2020-12-31', closingBalance: 21739.83, withheldTaxes: 89.24, bonus: 0, frozen: true},
        {block: '2020', id: 5, group: 'Stock Market', title: 'Scalable Capital', date: '2020-12-31', closingBalance: 86529.82, withheldTaxes: 3612.60, bonus: 445.67, frozen: true},
        {block: '2020', id: 6, group: 'P2P', title: 'Mintos', date: '2020-12-31', closingBalance: 5219, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2020', id: 7, group: 'P2P', title: 'RoboCash', date: '2020-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2020', id: 8, group: 'P2P', title: 'ViaInvest', date: '2020-12-31', closingBalance: 5228.11, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2020', id: 9, group: 'P2P', title: 'Peerberry', date: '2020-12-31', closingBalance: 5042.11, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2020', id: 10, group: 'P2P', title: 'Swaper', date: '2020-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2020', id: 11, group: 'P2P', title: 'Afranga', date: '2020-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2020', id: 12, group: 'P2P', title: 'EstateGuru', date: '2020-12-31', closingBalance: 5139.35, withheldTaxes: 0, bonus: 25.08, frozen: true},
        {block: '2020', id: 13, group: 'P2P', title: 'Debitum Network', date: '2020-12-31', closingBalance: 5074.49, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2020', id: 14, group: 'P2P', title: 'Reinvest24', date: '2020-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2020', id: 15, group: 'P2P', title: 'Bondster', date: '2020-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2020', id: 16, group: 'P2P', title: 'Esketit', date: '2020-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2020', id: 17, group: 'P2P', title: 'InRento', date: '2020-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2020', id: 18, group: 'P2P', title: 'Heavy Finance', date: '2020-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2020', id: 19, group: 'P2P', title: 'Lendermarket', date: '2020-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2020', id: 20, group: 'P2P', title: 'Crowdestor', date: '2020-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2021', id: 1, group: 'Other', title: 'Allianz', date: '2021-12-31', closingBalance: 14015.47, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2021', id: 2, group: 'Other', title: 'Riester I', date: '2021-12-31', closingBalance: 9021, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2021', id: 3, group: 'Other', title: 'Riester II', date: '2021-12-31', closingBalance: 1326, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2021', id: 4, group: 'Other', title: 'Bausparer', date: '2021-12-31', closingBalance: 26219.8, withheldTaxes: 107.91, bonus: 0, frozen: true},
        {block: '2021', id: 5, group: 'Stock Market', title: 'Scalable Capital', date: '2021-12-31', closingBalance: 122846, withheldTaxes: 564.61, bonus: 445.68, frozen: true},
        {block: '2021', id: 6, group: 'P2P', title: 'Mintos', date: '2021-12-31', closingBalance: 4241.29, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2021', id: 7, group: 'P2P', title: 'RoboCash', date: '2021-12-31', closingBalance: 10951.41, withheldTaxes: 0, bonus: 55.16, frozen: true},
        {block: '2021', id: 8, group: 'P2P', title: 'ViaInvest', date: '2021-12-31', closingBalance: 8381.86, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2021', id: 9, group: 'P2P', title: 'Peerberry', date: '2021-12-31', closingBalance: 10713.26, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2021', id: 10, group: 'P2P', title: 'Swaper', date: '2021-12-31', closingBalance: 6034.36, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2021', id: 11, group: 'P2P', title: 'Afranga', date: '2021-12-31', closingBalance: 6045.41, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2021', id: 12, group: 'P2P', title: 'EstateGuru', date: '2021-12-31', closingBalance: 8178.29, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2021', id: 13, group: 'P2P', title: 'Debitum Network', date: '2021-12-31', closingBalance: 5696.34, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2021', id: 14, group: 'P2P', title: 'Reinvest24', date: '2021-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2021', id: 15, group: 'P2P', title: 'Bondster', date: '2021-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2021', id: 16, group: 'P2P', title: 'Esketit', date: '2021-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2021', id: 17, group: 'P2P', title: 'InRento', date: '2021-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2021', id: 18, group: 'P2P', title: 'Heavy Finance', date: '2021-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2021', id: 19, group: 'P2P', title: 'Lendermarket', date: '2021-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2021', id: 20, group: 'P2P', title: 'Crowdestor', date: '2021-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2022', id: 1, group: 'Other', title: 'Allianz', date: '2022-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2022', id: 2, group: 'Other', title: 'Riester I', date: '2022-12-31', closingBalance: 9188, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2022', id: 3, group: 'Other', title: 'Riester II', date: '2022-12-31', closingBalance: 2018.68, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2022', id: 4, group: 'Other', title: 'Bausparer', date: '2022-12-31', closingBalance: 30875.58, withheldTaxes: 117.86, bonus: 117.86, frozen: true},
        {block: '2022', id: 5, group: 'Stock Market', title: 'Scalable Capital', date: '2022-12-31', closingBalance: 95922.88, withheldTaxes: 258.06, bonus: 180.00, frozen: true},
        {block: '2022', id: 6, group: 'P2P', title: 'Mintos', date: '2022-12-31', closingBalance: 601.24, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2022', id: 7, group: 'P2P', title: 'RoboCash', date: '2022-12-31', closingBalance: 25622.6, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2022', id: 8, group: 'P2P', title: 'ViaInvest', date: '2022-12-31', closingBalance: 9384.26, withheldTaxes: 14.17, bonus: 0, frozen: true},
        {block: '2022', id: 9, group: 'P2P', title: 'Peerberry', date: '2022-12-31', closingBalance: 13929.14, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2022', id: 10, group: 'P2P', title: 'Swaper', date: '2022-12-31', closingBalance: 8537.12, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2022', id: 11, group: 'P2P', title: 'Afranga', date: '2022-12-31', closingBalance: 8538.63, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2022', id: 12, group: 'P2P', title: 'EstateGuru', date: '2022-12-31', closingBalance: 6582.1, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2022', id: 13, group: 'P2P', title: 'Debitum Network', date: '2022-12-31', closingBalance: 6956.66, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2022', id: 14, group: 'P2P', title: 'Reinvest24', date: '2022-12-31', closingBalance: 2537.11, withheldTaxes: 0, bonus: 10, frozen: true},
        {block: '2022', id: 15, group: 'P2P', title: 'Bondster', date: '2022-12-31', closingBalance: 8561, withheldTaxes: 0, bonus: 76.06, frozen: true},
        {block: '2022', id: 16, group: 'P2P', title: 'Esketit', date: '2022-12-31', closingBalance: 7676, withheldTaxes: 0, bonus: 75, frozen: true},
        {block: '2022', id: 17, group: 'P2P', title: 'InRento', date: '2022-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2022', id: 18, group: 'P2P', title: 'Heavy Finance', date: '2022-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2022', id: 19, group: 'P2P', title: 'Lendermarket', date: '2022-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2022', id: 20, group: 'P2P', title: 'Crowdestor', date: '2022-12-31', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2023', id: 1, group: 'Other', title: 'Allianz', date: '2023-07-09', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2023', id: 2, group: 'Other', title: 'Riester I', date: '2023-07-09', closingBalance: 9588, withheldTaxes: 0, bonus: 0, frozen: false},
        {block: '2023', id: 3, group: 'Other', title: 'Riester II', date: '2023-07-09', closingBalance: 2818.68, withheldTaxes: 0, bonus: 0, frozen: false},
        {block: '2023', id: 4, group: 'Other', title: 'Bausparer', date: '2023-10-02', closingBalance: 0, withheldTaxes: 0, bonus: 0, frozen: true},
        {block: '2023', id: 5, group: 'Stock Market', title: 'Scalable Capital', date: '2023-11-27', closingBalance: 100417, withheldTaxes: 0, bonus: 0, frozen: false},
        {block: '2023', id: 6, group: 'P2P', title: 'Mintos', date: '2023-11-27', closingBalance: 9327, withheldTaxes: 0, bonus: 0, frozen: false},
        {block: '2023', id: 7, group: 'P2P', title: 'RoboCash', date: '2023-11-27', closingBalance: 26105, withheldTaxes: 0, bonus: 0, frozen: false},
        {block: '2023', id: 8, group: 'P2P', title: 'ViaInvest', date: '2023-11-27', closingBalance: 10420, withheldTaxes: 0, bonus: 0, frozen: false},
        {block: '2023', id: 9, group: 'P2P', title: 'Peerberry', date: '2023-11-27', closingBalance: 5929, withheldTaxes: 0, bonus: 0, frozen: false},
        {block: '2023', id: 10, group: 'P2P', title: 'Swaper', date: '2023-11-27', closingBalance: 9600, withheldTaxes: 0, bonus: 0, frozen: false},
        {block: '2023', id: 11, group: 'P2P', title: 'Afranga', date: '2023-11-27', closingBalance: 8456, withheldTaxes: 0, bonus: 0, frozen: false},
        {block: '2023', id: 12, group: 'P2P', title: 'EstateGuru', date: '2023-11-27', closingBalance: 5887, withheldTaxes: 0, bonus: 0, frozen: false},
        {block: '2023', id: 13, group: 'P2P', title: 'Debitum Network', date: '2023-11-27', closingBalance: 9746, withheldTaxes: 0, bonus: 0, frozen: false},
        {block: '2023', id: 14, group: 'P2P', title: 'Reinvest24', date: '2023-11-27', closingBalance: 2537.11, withheldTaxes: 0, bonus: 0, frozen: false},
        {block: '2023', id: 15, group: 'P2P', title: 'Bondster', date: '2023-11-27', closingBalance: 6234, withheldTaxes: 0, bonus: 0, frozen: false},
        {block: '2023', id: 16, group: 'P2P', title: 'Esketit', date: '2023-11-27', closingBalance: 6042, withheldTaxes: 0, bonus: 0, frozen: false},
        {block: '2023', id: 17, group: 'P2P', title: 'InRento', date: '2023-11-27', closingBalance: 5026, withheldTaxes: 0, bonus: 20, frozen: false},
        {block: '2023', id: 18, group: 'P2P', title: 'Heavy Finance', date: '2023-11-27', closingBalance: 9950, withheldTaxes: 0, bonus: 250, frozen: false},
        {block: '2023', id: 19, group: 'P2P', title: 'Lendermarket', date: '2023-11-27', closingBalance: 10702, withheldTaxes: 0, bonus: 75, frozen: false},
        {block: '2023', id: 20, group: 'P2P', title: 'Crowdestor', date: '2023-11-27', closingBalance: 100085, withheldTaxes: 0, bonus: 0, frozen: false},
    ],

    transfers: [
        {block: '2020', id: 1, group: 'Other', title: 'Allianz', amount: 11055.35, date: '2020-01-01'},
        {block: '2020', id: 2, group: 'Other', title: 'Bausparer', amount: 17308.22, date: '2020-01-01'},
        {block: '2020', id: 3, group: 'Stock Market', title: 'Scalable Capital', amount: 75000, date: '2020-01-01'},
        {block: '2020', id: 4, group: 'Other', title: 'Riester I', amount: 6121.9, date: '2020-01-01'},
        {block: '2020', id: 5, group: 'Other', title: 'Bausparer', amount: 4200, date: '2020-01-02'},
        {block: '2020', id: 6, group: 'Other', title: 'Riester I', amount: 400, date: '2020-01-02'},
        {block: '2020', id: 7, group: 'P2P', title: 'Mintos', amount: 1000, date: '2020-07-02'},
        {block: '2020', id: 8, group: 'Other', title: 'Riester I', amount: 1525, date: '2020-07-06'},
        {block: '2020', id: 9, group: 'P2P', title: 'EstateGuru', amount: 1000, date: '2020-07-17'},
        {block: '2020', id: 10, group: 'P2P', title: 'ViaInvest', amount: 1000, date: '2020-07-22'},
        {block: '2020', id: 11, group: 'P2P', title: 'Debitum Network', amount: 1000, date: '2020-07-23'},
        {block: '2020', id: 12, group: 'P2P', title: 'Mintos', amount: 4000, date: '2020-07-30'},
        {block: '2020', id: 13, group: 'P2P', title: 'Debitum Network', amount: 4000, date: '2020-08-03'},
        {block: '2020', id: 14, group: 'Stock Market', title: 'Scalable Capital', amount: -10000, date: '2020-08-03'},
        {block: '2020', id: 15, group: 'P2P', title: 'EstateGuru', amount: 4000, date: '2020-08-03'},
        {block: '2020', id: 16, group: 'P2P', title: 'ViaInvest', amount: 4000, date: '2020-08-03'},
        {block: '2020', id: 17, group: 'P2P', title: 'Peerberry', amount: 1000, date: '2020-11-17'},
        {block: '2020', id: 18, group: 'P2P', title: 'Peerberry', amount: 4000, date: '2020-11-24'},
        {block: '2020', id: 19, group: 'Other', title: 'Allianz', amount: 1152.49, date: '2020-12-01'},
        {block: '2020', id: 20, group: 'Other', title: 'Riester II', amount: 400, date: '2020-12-01'},
        {block: '2021', id: 21, group: 'Other', title: 'Bausparer', amount: 4200, date: '2021-01-02'},
        {block: '2021', id: 22, group: 'Other', title: 'Riester II', amount: 800, date: '2021-01-06'},
        {block: '2021', id: 23, group: 'Other', title: 'Riester I', amount: 400, date: '2021-01-26'},
        {block: '2021', id: 24, group: 'P2P', title: 'RoboCash', amount: 500, date: '2021-06-16'},
        {block: '2021', id: 25, group: 'P2P', title: 'Mintos', amount: -1500, date: '2021-06-18'},
        {block: '2021', id: 26, group: 'P2P', title: 'RoboCash', amount: 5000, date: '2021-06-21'},
        {block: '2021', id: 27, group: 'Stock Market', title: 'Scalable Capital', amount: 20000, date: '2021-08-04'},
        {block: '2021', id: 28, group: 'P2P', title: 'Peerberry', amount: 5000, date: '2021-11-02'},
        {block: '2021', id: 29, group: 'P2P', title: 'RoboCash', amount: 5000, date: '2021-11-02'},
        {block: '2021', id: 30, group: 'P2P', title: 'Afranga', amount: 6000, date: '2021-11-08'},
        {block: '2021', id: 31, group: 'P2P', title: 'Swaper', amount: 6000, date: '2021-11-08'},
        {block: '2021', id: 32, group: 'Stock Market', title: 'Scalable Capital', amount: 4000, date: '2021-11-29'},
        {block: '2021', id: 33, group: 'Other', title: 'Allianz', amount: 1211, date: '2021-12-01'},
        {block: '2021', id: 34, group: 'Stock Market', title: 'Scalable Capital', amount: 5000, date: '2021-12-02'},
        {block: '2021', id: 35, group: 'P2P', title: 'EstateGuru', amount: 2500, date: '2021-12-02'},
        {block: '2021', id: 36, group: 'P2P', title: 'ViaInvest', amount: 2500, date: '2021-12-02'},
        {block: '2022', id: 37, group: 'Other', title: 'Bausparer', amount: 4200, date: '2022-01-02'},
        {block: '2022', id: 38, group: 'Other', title: 'Riester I', amount: 400, date: '2022-01-02'},
        {block: '2022', id: 39, group: 'Other', title: 'Riester II', amount: 800, date: '2022-01-02'},
        {block: '2022', id: 40, group: 'P2P', title: 'Afranga', amount: 1500, date: '2022-01-10'},
        {block: '2022', id: 41, group: 'P2P', title: 'Debitum Network', amount: 2500, date: '2022-01-10'},
        {block: '2022', id: 42, group: 'P2P', title: 'RoboCash', amount: 4500, date: '2022-01-10'},
        {block: '2022', id: 43, group: 'P2P', title: 'Swaper', amount: 1500, date: '2022-01-10'},
        {block: '2022', id: 44, group: 'P2P', title: 'Mintos', amount: -2000, date: '2022-01-17'},
        {block: '2022', id: 45, group: 'P2P', title: 'Reinvest24', amount: 2500, date: '2022-01-17'},
        {block: '2022', id: 46, group: 'P2P', title: 'Bondster', amount: 5000, date: '2022-02-02'},
        {block: '2022', id: 47, group: 'Stock Market', title: 'Scalable Capital', amount: -2000, date: '2022-02-02'},
        {block: '2022', id: 48, group: 'P2P', title: 'Mintos', amount: -500, date: '2022-02-02'},
        {block: '2022', id: 49, group: 'P2P', title: 'Bondster', amount: 2500, date: '2022-02-25'},
        {block: '2022', id: 50, group: 'P2P', title: 'Mintos', amount: -350, date: '2022-02-25'},
        {block: '2022', id: 51, group: 'P2P', title: 'Reinvest24', amount: 500, date: '2022-02-25'},
        {block: '2022', id: 52, group: 'P2P', title: 'Mintos', amount: -200, date: '2022-03-29'},
        {block: '2022', id: 53, group: 'P2P', title: 'Reinvest24', amount: 500, date: '2022-03-29'},
        {block: '2022', id: 54, group: 'P2P', title: 'RoboCash', amount: 500, date: '2022-03-29'},
        {block: '2022', id: 55, group: 'P2P', title: 'EstateGuru', amount: -600, date: '2022-04-26'},
        {block: '2022', id: 56, group: 'P2P', title: 'Mintos', amount: -100, date: '2022-04-26'},
        {block: '2022', id: 57, group: 'P2P', title: 'RoboCash', amount: 2000, date: '2022-04-26'},
        {block: '2022', id: 58, group: 'P2P', title: 'RoboCash', amount: 5000, date: '2022-05-26'},
        {block: '2022', id: 59, group: 'P2P', title: 'Debitum Network', amount: -400, date: '2022-06-28'},
        {block: '2022', id: 60, group: 'P2P', title: 'EstateGuru', amount: -500, date: '2022-06-28'},
        {block: '2022', id: 61, group: 'P2P', title: 'Peerberry', amount: 1000, date: '2022-06-28'},
        {block: '2022', id: 62, group: 'P2P', title: 'Debitum Network', amount: -300, date: '2022-07-25'},
        {block: '2022', id: 63, group: 'Stock Market', title: 'Scalable Capital', amount: -300, date: '2022-07-25'},
        {block: '2022', id: 64, group: 'P2P', title: 'EstateGuru', amount: -200, date: '2022-07-25'},
        {block: '2022', id: 65, group: 'P2P', title: 'Peerberry', amount: 800, date: '2022-07-25'},
        {block: '2022', id: 66, group: 'P2P', title: 'Debitum Network', amount: -800, date: '2022-09-27'},
        {block: '2022', id: 67, group: 'Stock Market', title: 'Scalable Capital', amount: -100, date: '2022-09-27'},
        {block: '2022', id: 68, group: 'P2P', title: 'Esketit', amount: 1700, date: '2022-09-27'},
        {block: '2022', id: 69, group: 'P2P', title: 'EstateGuru', amount: -700, date: '2022-09-27'},
        {block: '2022', id: 70, group: 'P2P', title: 'Mintos', amount: -100, date: '2022-09-27'},
        {block: '2022', id: 71, group: 'P2P', title: 'Esketit', amount: 2000, date: '2022-10-25'},
        {block: '2022', id: 72, group: 'P2P', title: 'EstateGuru', amount: -100, date: '2022-10-25'},
        {block: '2022', id: 73, group: 'P2P', title: 'Mintos', amount: -200, date: '2022-10-25'},
        {block: '2022', id: 74, group: 'P2P', title: 'Reinvest24', amount: -1098, date: '2022-10-25'},
        {block: '2022', id: 75, group: 'Other', title: 'Allianz', amount: -12173, date: '2022-11-25'},
        {block: '2022', id: 76, group: 'P2P', title: 'Debitum Network', amount: -100, date: '2022-11-25'},
        {block: '2022', id: 77, group: 'P2P', title: 'Esketit', amount: 3800, date: '2022-11-25'},
        {block: '2022', id: 78, group: 'P2P', title: 'EstateGuru', amount: -100, date: '2022-11-25'},
        {block: '2022', id: 79, group: 'P2P', title: 'Mintos', amount: -300, date: '2022-11-25'},
        {block: '2023', id: 80, group: 'Other', title: 'Bausparer', amount: 4200, date: '2023-01-02'},
        {block: '2023', id: 81, group: 'P2P', title: 'Debitum Network', amount: -100, date: '2023-01-02'},
        {block: '2023', id: 82, group: 'P2P', title: 'EstateGuru', amount: -300, date: '2023-01-02'},
        {block: '2023', id: 83, group: 'P2P', title: 'Heavy Finance', amount: 7500, date: '2023-01-02'},
        {block: '2023', id: 84, group: 'P2P', title: 'InRento', amount: 2000, date: '2023-01-02'},
        {block: '2023', id: 85, group: 'P2P', title: 'Lendermarket', amount: 7500, date: '2023-01-02'},
        {block: '2023', id: 86, group: 'Other', title: 'Riester I', amount: 400, date: '2023-01-02'},
        {block: '2023', id: 87, group: 'Other', title: 'Riester II', amount: 800, date: '2023-01-02'},
        {block: '2023', id: 88, group: 'P2P', title: 'Debitum Network', amount: -700, date: '2023-01-24'},
        {block: '2023', id: 89, group: 'P2P', title: 'EstateGuru', amount: -100, date: '2023-01-24'},
        {block: '2023', id: 90, group: 'P2P', title: 'InRento', amount: 1000, date: '2023-01-24'},
        {block: '2023', id: 91, group: 'P2P', title: 'InRento', amount: 1000, date: '2023-02-09'},
        {block: '2023', id: 92, group: 'P2P', title: 'InRento', amount: 1000, date: '2023-02-14'},
        {block: '2023', id: 93, group: 'Stock Market', title: 'Scalable Capital', amount: -200, date: '2023-02-28'},
        {block: '2023', id: 94, group: 'P2P', title: 'Heavy Finance', amount: 2500, date: '2023-02-28'},
        {block: '2023', id: 95, group: 'P2P', title: 'Crowdestor', amount: 20000, date: '2023-04-03'},
        {block: '2023', id: 96, group: 'P2P', title: 'Debitum Network', amount: -750, date: '2023-04-03'},
        {block: '2023', id: 97, group: 'P2P', title: 'EstateGuru', amount: -100, date: '2023-04-03'},
        {block: '2023', id: 98, group: 'P2P', title: 'Mintos', amount: -100, date: '2023-04-03'},
        {block: '2023', id: 99, group: 'P2P', title: 'Peerberry', amount: -2150, date: '2023-04-03'},
        {block: '2023', id: 100, group: 'P2P', title: 'Crowdestor', amount: 60000, date: '2023-04-24'},
        {block: '2023', id: 101, group: 'Stock Market', title: 'Scalable Capital', amount: -20000, date: '2023-04-24'},
        {block: '2023', id: 102, group: 'P2P', title: 'EstateGuru', amount: -100, date: '2023-04-24'},
        {block: '2023', id: 103, group: 'Stock Market', title: 'Scalable Capital', amount: 10000, date: '2023-06-06'},
        {block: '2023', id: 104, group: 'Stock Market', title: 'Scalable Capital', amount: 30000, date: '2023-06-16'},
        {block: '2023', id: 105, group: 'P2P', title: 'Peerberry', amount: -1600, date: '2023-07-08'},
        {block: '2023', id: 106, group: 'P2P', title: 'Heavy Finance', amount: -300, date: '2023-07-08'},
        {block: '2023', id: 107, group: 'P2P', title: 'Bondster', amount: -200, date: '2023-07-08'},
        {block: '2023', id: 108, group: 'P2P', title: 'Debitum Network', amount: 2100, date: '2023-07-08'},
        {block: '2023', id: 109, group: 'P2P', title: 'EstateGuru', amount: -100, date: '2023-07-25'},
        {block: '2023', id: 110, group: 'P2P', title: 'Heavy Finance', amount: -100, date: '2023-07-25'},
        {block: '2023', id: 111, group: 'P2P', title: 'InRento', amount: -100, date: '2023-07-25'},
        {block: '2023', id: 112, group: 'P2P', title: 'Bondster', amount: -800, date: '2023-07-25'},
        {block: '2023', id: 113, group: 'P2P', title: 'Debitum Network', amount: 2000, date: '2023-07-08'},
        {block: '2023', id: 114, group: 'P2P', title: 'Peerberry', amount: -500, date: '2023-07-28'},
        {block: '2023', id: 115, group: 'P2P', title: 'Lendermarket', amount: 2000, date: '2023-08-07'},
        {block: '2023', id: 116, group: 'P2P', title: 'Bondster', amount: -1000, date: '2023-08-17'},
        {block: '2023', id: 117, group: 'P2P', title: 'Peerberry', amount: -500, date: '2023-08-17'},
        {block: '2023', id: 118, group: 'P2P', title: 'Heavy Finance', amount: -100, date: '2023-08-17'},
        {block: '2023', id: 119, group: 'P2P', title: 'Mintos', amount: 1500, date: '2023-08-17'},
        {block: '2023', id: 120, group: 'Stock Market', title: 'Scalable Capital', amount: -22000, date: '2023-09-04'},
        {block: '2023', id: 121, group: 'P2P', title: 'Mintos', amount: 3650, date: '2023-09-08'},
        {block: '2023', id: 122, group: 'P2P', title: 'Bondster', amount: -900, date: '2023-09-08'},
        {block: '2023', id: 123, group: 'P2P', title: 'Heavy Finance', amount: -250, date: '2023-09-08'},
        {block: '2023', id: 124, group: 'P2P', title: 'Peerberry', amount: -2500, date: '2023-09-08'},
        {block: '2023', id: 125, group: 'Other', title: 'Bausparer', amount: -36428.17, date: '2023-10-02'},
        {block: '2023', id: 126, group: 'P2P', title: 'Afranga', amount: -1100, date: '2023-10-26'},
        {block: '2023', id: 127, group: 'P2P', title: 'Bondster', amount: -200, date: '2023-10-26'},
        {block: '2023', id: 128, group: 'P2P', title: 'EstateGuru', amount: -150, date: '2023-10-26'},
        {block: '2023', id: 129, group: 'P2P', title: 'Peerberry', amount: -1200, date: '2023-10-26'},
        {block: '2023', id: 130, group: 'P2P', title: 'RoboCash', amount: -550, date: '2023-10-26'},
        {block: '2023', id: 131, group: 'P2P', title: 'Heavy Finance', amount: -300, date: '2023-10-26'},
        {block: '2023', id: 132, group: 'P2P', title: 'Mintos', amount: 3500, date: '2023-10-26'},
        {block: '2023', id: 133, group: 'P2P', title: 'Crowdestor', amount: 10000, date: '2023-11-10'},
        {block: '2023', id: 134, group: 'P2P', title: 'Crowdestor', amount: -1800, date: '2023-11-27'},
        {block: '2023', id: 135, group: 'P2P', title: 'Afranga', amount: -2300, date: '2023-11-27'},
        {block: '2023', id: 136, group: 'P2P', title: 'Bondster', amount: -200, date: '2023-11-27'},
        {block: '2023', id: 137, group: 'P2P', title: 'Esketit', amount: -2500, date: '2023-11-27'},
        {block: '2023', id: 138, group: 'P2P', title: 'InRento', amount: -100, date: '2023-11-27'},
        {block: '2023', id: 139, group: 'P2P', title: 'Peerberry', amount: -800, date: '2023-11-27'},
        {block: '2023', id: 140, group: 'P2P', title: 'RoboCash', amount: -2200, date: '2023-11-27'},
    ],

    expanses: [
        {block: 'Andi', id: 1, group: 'Income', title: 'Continental', amountYearly: 57264},
        {block: 'Andi', id: 2, group: 'Income', title: 'Rent NLB', amountYearly: 2040},
        {block: 'Andi', id: 3, group: 'Insurances', title: 'Riester I', amountYearly: -400},
        {block: 'Andi', id: 4, group: 'Insurances', title: 'Riester II', amountYearly: -800},
        {block: 'Andi', id: 5, group: 'Insurances', title: 'Liability Private', amountYearly: -80},
        {block: 'Andi', id: 6, group: 'Insurances', title: 'Fire NLB', amountYearly: -120},
        {block: 'Andi', id: 7, group: 'Insurances', title: 'Liability NLB', amountYearly: -80},
        {block: 'Andi', id: 8, group: 'Housing', title: 'Property Tax RB', amountYearly: -110},
        {block: 'Andi', id: 9, group: 'Housing', title: 'Property Tax NLB', amountYearly: -10},
        {block: 'Andi', id: 10, group: 'Housing', title: 'Utilities RB', amountYearly: -3360},
        {block: 'Andi', id: 11, group: 'Housing', title: 'GEZ', amountYearly: -210},
        {block: 'Andi', id: 12, group: 'Housing', title: 'Internet', amountYearly: -480},
        {block: 'Andi', id: 13, group: 'Housing', title: 'Phone', amountYearly: -480},
        {block: 'Andi', id: 14, group: 'Housing', title: 'Electricity', amountYearly: -720},
        {block: 'Andi', id: 15, group: 'Transport', title: 'Gasoline', amountYearly: -1200},
        {block: 'Andi', id: 16, group: 'Transport', title: 'Insurance', amountYearly: -700},
        {block: 'Andi', id: 17, group: 'Transport', title: 'Tax', amountYearly: -200},
        {block: 'Andi', id: 18, group: 'Transport', title: 'Leasing', amountYearly: -3960},
        {block: 'Andi', id: 19, group: 'Transport', title: 'Service & Repair', amountYearly: -500},
        {block: 'Andi', id: 20, group: 'Subscriptions', title: 'Spotify', amountYearly: -60},
        {block: 'Andi', id: 21, group: 'Subscriptions', title: 'Freeletics', amountYearly: -80},
        {block: 'Andi', id: 22, group: 'Subscriptions', title: 'DKB Travel', amountYearly: -84},
        {block: 'Andi', id: 23, group: 'Subscriptions', title: 'DKB Visa', amountYearly: -30},
        {block: 'Andi', id: 24, group: 'Subscriptions', title: 'Netflix', amountYearly: -120},
        {block: 'Andi', id: 25, group: 'Living', title: 'Grocery', amountYearly: -2400},
        {block: 'Andi', id: 26, group: 'Living', title: 'Vacation', amountYearly: -5000},
        {block: 'Andi', id: 27, group: 'Living', title: 'Savings', amountYearly: -24000},
        {block: 'Mariana', id: 28, group: 'Income', title: 'InStart', amountYearly: 22428},
        {block: 'Mariana', id: 29, group: 'Transport', title: 'Gasoline', amountYearly: -3000},
        {block: 'Mariana', id: 30, group: 'Living', title: 'Grocery', amountYearly: -1200},
        {block: 'Mariana', id: 31, group: 'Living', title: 'Vacation', amountYearly: -3000},
        {block: 'Mariana', id: 32, group: 'Living', title: 'Savings', amountYearly: -7200},
    ],

    pension: [
        {block: '2020', id: 1, group: 'Public', title: 'Statutory', date: '2020-12-31', amount: 2340, expected: 5692.13, ROI: 2.5, frozen: true},
        {block: '2020', id: 2, group: 'Private', title: 'Allianz', date: '2020-12-31', amount: 222.24, expected: 644.11, ROI: 3, frozen: true},
        {block: '2020', id: 3, group: 'Private', title: 'Riester I', date: '2020-12-31', amount: 130, expected: 418.36, ROI: 3.3, frozen: true},
        {block: '2020', id: 4, group: 'Private', title: 'Riester II', date: '2020-12-31', amount: 46.67, expected: 150.19, ROI: 3.3, frozen: true},
        {block: '2021', id: 1, group: 'Public', title: 'Statutory', date: '2021-12-31', amount: 2930, expected: 6953.49, ROI: 2.5, frozen: true},
        {block: '2021', id: 2, group: 'Private', title: 'Allianz', date: '2021-12-31', amount: 229.63, expected: 646.15, ROI: 3, frozen: true},
        {block: '2021', id: 3, group: 'Private', title: 'Riester I', date: '2021-12-31', amount: 131.14, expected: 408.55, ROI: 3.3, frozen: true},
        {block: '2021', id: 4, group: 'Private', title: 'Riester II', date: '2021-12-31', amount: 92.7, expected: 288.8, ROI: 3.3, frozen: true},
        {block: '2022', id: 1, group: 'Public', title: 'Statutory', date: '2022-12-31', amount: 3400, expected: 7872.1, ROI: 2.5, frozen: true},
        {block: '2022', id: 2, group: 'Private', title: 'Allianz', date: '2022-12-31', amount: null, expected: null, ROI: null, frozen: true},
        {block: '2022', id: 3, group: 'Private', title: 'Riester I', date: '2022-12-31', amount: 131.48, expected: 395.07, ROI: 3.3, frozen: true},
        {block: '2022', id: 4, group: 'Private', title: 'Riester II', date: '2022-12-31', amount: 93.2, expected: 279.57, ROI: 3.3, frozen: true},
        {block: '2022', id: 5, group: 'Employer', title: 'Conti+', date: '2022-12-31', amount: null, expected: 739, ROI: 5, frozen: true},
        {block: '2023', id: 1, group: 'Public', title: 'Statutory', date: '2023-01-31', amount: 3760, expected: 8493.28, ROI: 2.5, frozen: false},
        {block: '2023', id: 2, group: 'Private', title: 'Allianz', date: '2023-01-31', amount: null, expected: null, ROI: null, frozen: false},
        {block: '2023', id: 3, group: 'Private', title: 'Riester I', date: '2023-01-31', amount: null, expected: null, ROI: 3.3, frozen: false},
        {block: '2023', id: 4, group: 'Private', title: 'Riester II', date: '2023-01-31', amount: null, expected: null, ROI: 3.3, frozen: false},
        {block: '2023', id: 5, group: 'Employer', title: 'Conti+', date: '2023-01-31', amount: null, expected: null, ROI: 5, frozen: false},
        
    ],

}

export default mockAssets;
    