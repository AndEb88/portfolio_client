# Getting Started with Create React App and Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# To Do

- Bug: still tax rate till 2018 is applied!!!
- SEO
- stacked area chart (rechart) for dashboard
- stacked area chart for investments/edit
- progressive web app
- responsiveness
- clean up unused imports and variables

# Hints

## Resources
- Resources/ Cash: retrieve closing balance by downloading transfers .csv from bank and deduce transfers accordingly from current balance (calculate backwards!)
- Also archive all transfers (Checking, Credit, Savings)

## Investments
- Investments/ Stock Market: enter saved taxes from Freibetrag to bonus AND paid taxes (Freibetrag will be considered in due taxes but then added as bonus)
- Investments/ Stock Market: (only new) Verlustverrechnungstöpfe are added to withheld taxes (but may not be added any more when claimed later on!)
- Investments/ Stock Market: balance is equal gross investment amount, which also includes due taxes from previous years (due taxes are deduced from profit within calculated year, so next year only new profits will be considered); when realizing profits, the entire amount of withheld taxes is added to profit and only current year's due taxes are deduced
- Investments/ P2P: extract profit from tax statement and derive closing balance accordingly
- Investments/ Other / Allianz: closing balance = 'garantierte einmalige Kapitalzahlung bei Kündigung zum 01.09. des Folgejahres' (Services/ Kündigung) or (Postfach/ Bestätigung) in November of the following year
- Investments/ Other/ Riester I: closing balance = 'Gesamtleistung bei Tod' (Services/ Tod) or 'Altersvorsorgevermögen Stand am 31.12.' (Postfach/ Auskunft) in January (I) or June (II) of the following year

## Pension
- Pension/ Statutory: amount = 'bei 1% Anpassungssatz'
- Pension/ Allianz: amount = 'Garantierente' (Postfach/ Bestätigung) in November of the following year
- Pension/ Riester I: amount = 'monatliche, erreichte garantierte Rente' (Postfach/ Auskunft) in January of the following year 
- Pension/ Riester II: amount = 'monatliche, erreichte garantierte Rente' (Postfach/ Auskunft) in June of the following year 
- Pension/ Conti+: expected = ... (Hochrechnungen/ ContiPLUS) with 2% yearly salary increase
- For others expected = 0 by default - has to be calculated based on ROI in 'assetsSlice'




