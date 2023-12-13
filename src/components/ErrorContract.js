import React, { useState, useEffect, useContext, useRef } from "react";
import { Item } from "./Item";
import { Grid } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import { useContext } from "react";

import { PhatContractContext } from '../context/PhatContractProvider';
import { ContractContext } from '../context/AstarContractProvider';

export default function ErrorContract() {
  const {phatContract} = useContext(PhatContractContext)
  const {contract} = useContext(ContractContext)

    if (!(contract && phatContract)) return <>
      <Grid item xs={12} >
          <Item>
          <ErrorIcon color={'error'} sx={{display:'inline', float:'left'}} fontSize='large'/><h2 style={{marginTop: '5px', paddingLeft: '42px'}}>Error with contract</h2>
            <p>the dApp can't connect to the following contract: </p>
            <ul>
            {!contract ? <li>Astar Smart Contract</li>:<></>}
            {!phatContract ? <li>Phala Phat Contract</li>:<></>}
            </ul>
          </Item> 
        </Grid> 
    </>
  }