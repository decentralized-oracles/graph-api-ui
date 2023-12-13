import * as React from 'react';

import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import Team from './Team';
import DappOverview from './DappOverview';
import dappschema_svg from "../images/graphApiOracle.svg"
import { ApiStatus } from './ApiStatus';
import { Item } from './Item';

import ErrorContract from './ErrorContract';

export function Content() {



  return <>
     <Grid container spacing={4}>
        
        <Grid item xs={12} >
          <Item>
            <Box sx={{margin:"0", flexDirection: 'row-reverse' }} display={'flex'} >
              <ApiStatus context="phala" /><ApiStatus context="astar" />
            </Box>
            <h2>Graph API Oracle</h2>
            <p>This dApp demonstrates the ability of an ink! smart contract on Astar Network and a Phat Contract on Phala Network to interact with each other using Phat Offchain Rollup.</p>
            <p>In this example we display values from Astar dApp Staking, stored in a SubQuery index</p>
          </Item> 
        </Grid> 

        {/*<ErrorContract />*/}

        <Grid item xs={12} md={4} >
          <Item>
            <DappOverview 
              dappName={"Lucky"} 
              dappId={"zsv1gvepvmwfdshmwgczs4zyvmmwesbjwqjn4wdpuefrrpy"}
              imgLink={"https://firebasestorage.googleapis.com/v0/b/astarnetwork-a4924.appspot.com/o/astar-dapps%2FZSV1GVepvmWFdshMWgczS4zYvmmwEsBjWQjN4WDpUEFRRPy_lucky.png?alt=media&token=5dbe56dd-3855-445f-b0ea-5b514c3d18ed&_gl=1*147fcr5*_ga*Mjk3MTM2OTA1LjE2ODg0NTE5NTk.*_ga_CW55HF8NVT*MTY5NzQ2OTExOS40My4xLjE2OTc0NjkzMDkuMzguMC4w"}
            />
          </Item>
        </Grid>
        <Grid item xs={12} md={4} >
          <Item>
            <DappOverview 
              dappName={"Counter.ink"} 
              dappId={"ax7syz6epvzfyxcbi8gocuznxims64sfexpwakiemcgfvq5"}
              imgLink={"https://storage.googleapis.com/astarnetwork-a4924.appspot.com/astar-dapps%2Fax7Syz6epvzfyXCbi8goCUZNXims64SfexpWAkiEMcgFVq5_Logo_Counter_ink.png"}
            />
          </Item>
        </Grid>
        <Grid item xs={12} md={4} >
          <Item>
            <DappOverview 
              dappName={"SkyLab Corporation"} 
              dappId={"XRhquqkD8yxYNjQWNb3NGZ7ypxpNwxpA6hWAD3QBh4vTFJW"}
              imgLink={"https://storage.googleapis.com/astarnetwork-a4924.appspot.com/astar-dapps%2FXRhquqkD8yxYNjQWNb3NGZ7ypxpNwxpA6hWAD3QBh4vTFJW_skylabLogoDiscord_v01.jpg"}
            />
          </Item>
        </Grid>

        <Grid item xs={12} md={4} >
          <Item>
            <DappOverview 
              dappName={"I am xAlice"} 
              dappId={"1d10ceef0c43897aa9d16745bfbdeb49ebaf2b09"}
              imgLink={"https://storage.googleapis.com/astarnetwork-a4924.appspot.com/astar-dapps%2F0x1d10ceef0c43897aa9d16745bfbdeb49ebaf2b09_xalice_logo_512x512.png"}
            />
          </Item>
        </Grid>
        <Grid item xs={12} md={4} >
          <Item>
            <DappOverview 
              dappName={"apeXchimpz"} 
              dappId={"6d47349ce5bae5394730125e55f086d0c863f01f"}
              imgLink={"https://storage.googleapis.com/astarnetwork-a4924.appspot.com/astar-dapps%2F0x6d47349ce5bae5394730125e55f086d0c863f01f_apexchimpzlogo.jpg"}
            />
          </Item>
        </Grid>
        <Grid item xs={12} md={4} >
          <Item>
            <DappOverview 
              dappName={"Age Of Chronos"} 
              dappId={"74cc66cd0cf57bb2a0f237c89bcf8db92d3721a8"}
              imgLink={"https://storage.googleapis.com/astarnetwork-a4924.appspot.com/astar-dapps%2F0x74cc66cd0cf57bb2a0f237c89bcf8db92d3721a8_mmmm.png"}
            />
          </Item>
        </Grid>

       <Grid item xs={12} >
          <Item>
            <img src={dappschema_svg} style={{width:"100%"}}/>
            <p>Scenario described here is the communication between Ink! Smart Contract on Astar Network and Ink! Phat Contract on Phala Network:</p>
            <ul>
              <li>The Phat Contract GraphApiOracle (on Phala Network) queries the data from a graph api (subsquid, subquery or graph) and pushes the data into the Smart Contract GraphApiConsumer (on Astar Network)</li>
              <li>The Smart Contract GraphApiConsumer (on Astar Network) verifies the data and saves them to be displayed in the UI</li>
            </ul>
            <p>The Phat Contract and Ink! Smart Contract have been built with the Phat Offchain Rollup. The full documentation of this SDK can be found here: <a href="https://github.com/Phala-Network/phat-offchain-rollup">https://github.com/Phala-Network/phat-offchain-rollup</a></p>
          </Item> 
        </Grid> 
       
        <Grid item xs={12} >
          <Item>
            <Team />
          </Item>
        </Grid>
      </Grid>
  </>
}
/*

https://query.substrate.fi/dapps-staking-subquery-astar/

*/