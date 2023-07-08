import peerberryIcon from './accounts/peerberry.jpg';
import p2pIcon from './accounts/p2p.png';
import stockMarketIcon from './accounts/stockMarket.png';
import otherIcon from './accounts/other.png';
import scalableCapitalIcon from './accounts/scalableCapital.png';
import cashIcon from './accounts/cash.jpg';
import liabilitiesIcon from './accounts/liabilities.jpg';
import pensionIcon from './accounts/pension.png';

// PNG 120x120 or convert to SVG
// find icons by pressing Ctrl + U on site and searching favicon
// or take a screenshot and edit PNG with Paint 3D (Seitenverhältnis sperren, Bildgröße mit Zeichenbereich anpassen, zuschneiden 1:1)
// and make the white background (for default icons) transparent: https://onlinepngtools.com/create-transparent-png

const accountIcons = [
    {title: 'P2P', source: p2pIcon},
    {title: 'Stock Market', source: stockMarketIcon},
    {title: 'Other', source: otherIcon},
    {title: 'Peerberry', source: peerberryIcon},
    {title: 'Scalable Capital', source: scalableCapitalIcon},
    {title: 'Liabilities', source: liabilitiesIcon},
    {title: 'Cash', source: cashIcon},
    {title: 'Private', source: pensionIcon},
    {title: 'Public', source: pensionIcon},
    {title: 'Employer', source: pensionIcon},
]

export default accountIcons;