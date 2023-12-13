import TeamCard from './TeamCard';
import * as React from 'react';
import Box from '@mui/material/Box';

import avatar_arno from "../images/avatar_arno.jpg"
import avatar_guigou from "../images/avatar_guigou.png"

export default function Team(){
    return <>
    <h2>The team</h2>
    <p>Also know as "Team Lucky", Guigou and Arno are both passionated by web3 and have a strong desire to explore the all the possibilities offered by decentralized applications. you can find them in a lot of different places among the paraverse...</p>
    <p>They have developed the Lucky dApp (<a href="https://lucky.substrate.fi">https://lucky.substrate.fi</a>), a no-loss lottery built on top of dApp Staking in Astar Network.</p>
    <Box>
        <TeamCard 
            name="Guigou"
            title="Application architect"
            avatar={avatar_guigou}
            description="GuiGou is application architect in Web 2 and works more and more in web3. As a technical ambassador for Astar and ambassador for Phala, he promotes the ink! smart contracts via some tutorials (https://polkaverse.com/11143) and replies about the technical questions on ink! smart contracts via Astar's discord."
            x="GuiGou12358"
            discord="779385192812380221"
            github="Guigou12358"
            telegram="guigou12358"   
        />

        <TeamCard 
            name="Arno"
            title="Software engineer"
            avatar={avatar_arno}
            description="Arno is a software engineer and web developer. He is ambassador for Polkadot, Phala Network and Talisman Sentinel. his desire to build decentralized applications and his thirst for knowledge about web3 led him to travel many roads on the way to Dotsama, and to upgrade his skills with web3 development"
            x="test_ut"
            discord="705085891709894756"
            github="arnobase"
            telegram="arnobaze"   
        />
        </Box>
    </>
}