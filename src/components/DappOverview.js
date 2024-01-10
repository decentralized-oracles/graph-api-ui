import React, { useState, useEffect, useContext, useRef } from "react";
import Box from '@mui/material/Box';
import SyncIcon from '@mui/icons-material/Sync';
import CircularProgress from '@mui/material/CircularProgress';
import { PhatContractContext } from "../context/PhatContractProvider";
import { ContractContext } from "../context/AstarContractProvider"
import { AppContext } from "../context/ContextProvider";
import { formatTokenBalance } from "../lib/formatTokenBalance";
import dayjs from 'dayjs';

export default function DappOverview(props) {

    const [totalStake,setTotalStake] = useState(0);
    const [nbStaker,setNbStaker] = useState(0);
    const [updated,setUpdated] = useState(0);
    const [loading,setLoading] = useState(false);

    const [res3,setRes3] = useState()

    const {phat_query_feedData, phatContract} = useContext(PhatContractContext)
    const {astar_query_getRequestMessageRaw,astar_query_getDappData, contract} = useContext(ContractContext)
    const {globalUpdate,setGlobalUpdate} = useContext(AppContext)

    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    useEffect(()=>{
        const doQuery = async () => {
            const _res3 = await astar_query_getDappData(props.dappId);
            setRes3(_res3)
        }
        if (contract) {
            //console.log("contract",contract)
            doQuery()
        }
    },[contract])

    useEffect(()=>{
        if(res3){
            const stake = res3.res?.dappStats?.totalStake.replace(/,/g, '')
            setTotalStake(formatTokenBalance(stake,"ASTR",18));
            setNbStaker(res3.res?.dappStats?.nbStakers);
            const lastUpdate = res3.res?.lastUpdate.replace(/,/g, '')
            setUpdated(dayjs(Number(lastUpdate)).format('YYYY/MM/DD - HH:mm:ss'))
        }
    },[res3])
    
    const refreshData = async ()=>{
        setLoading(true)
        setGlobalUpdate(true)
        const _queryTime = await waitPhat()
        await waitAstar(_queryTime)     
        setLoading(false)   
        setGlobalUpdate(false)
    }

    const waitPhat = async ()=> {
        const _res1 = await astar_query_getRequestMessageRaw(props.dappId)
        let _res2
        let phatOk = false
        let n = 0
        while (!phatOk) {
            console.log("phat",n++)
            _res2 = await phat_query_feedData(_res1.res)
            console.log("_res2",_res2)
            phatOk = _res2?.state === "Ok"
        }
        const _queryTime = dayjs().valueOf()
        return _queryTime
    }

    const waitAstar = async (_queryTime)=> {
        let majTime = undefined;
        let _res3 = undefined;
        let n = 0;
        await delay(1000)
        console.log("wait phat")
        while ((majTime === undefined || majTime < _queryTime) && n<30 ) {
            console.log(n++)
            await delay(1000) // wait 1s
            _res3 = await astar_query_getDappData(props.dappId);
            majTime = _res3?.res?.lastUpdate.replace(/,/g, '');
            //console.log(majTime,_queryTime)
        }
        setRes3(_res3)
    }
    const enabled = (!loading && !globalUpdate && phatContract && contract)
    return <>
        <div style={{opacity: !loading && globalUpdate ? "0.3" : "1"}}>
            <img src={props.imgLink} style={{width:"40px", height:"40px", backgroundColor:"#FFF",borderRadius:10, float:"right"}}/>
            <h3>{props.dappName}</h3>
            <Box sx={{margin:"0 0 15px 0"}}>
                
                <SyncIcon 
                fontSize="large" 
                style={{cursor:enabled?'pointer':'not-allowed'}} 
            
                onClick={()=>{if (enabled) refreshData()}}
                color={enabled?"success":"disabled"}
                sx={{display:loading ? "none" : "inline-block"}}
                />
                <CircularProgress size={"1.5em"} sx={{mx:0.7, my:0.67, width:"25px", height:"25px", display: loading ? "inline-block" : "none"}} />
            </Box>
            <Box><span>Stake: </span>{totalStake}</Box>
            <Box><span>Nb Staker: </span>{nbStaker}</Box>
            <Box><span>Updated: </span>{updated}</Box>
        </div>
    </>
}
