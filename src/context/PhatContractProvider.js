import React, { useState, useEffect, useContext } from "react";
import { PhalaApiContext } from "./PhalaApiProvider";
import { Keyring } from "@polkadot/api";
import { types } from "@phala/sdk";
import { PinkContractPromise, OnChainRegistry, signCertificate } from '@phala/sdk'
import { PHAT_CONTRACT_METADATA, PHAT_CONTRACT_ID, DEFAULT_NETWORKS } from "../lib/constants";
import { AppContext } from "../context/ContextProvider";

export const PhatContractContext = React.createContext();

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const PhatContractProvider = ({ children }) => {

  const [phatContract,setContract]=useState()
  const [cert,setCert]=useState()
  const {api} = useContext(PhalaApiContext)

  const { alice } = useContext(AppContext);

  useEffect(()=>{
    if (!phatContract) {
      const connectContract = async ()=> {
        try {
          const contractId = "0x004b7258cc439f164f85484d68970a9ebe64b398214b791e90fdb1c10bba22db";
          const vrf_oracle_phat = PHAT_CONTRACT_METADATA[DEFAULT_NETWORKS["phala"]]
          const phatRegistry = await OnChainRegistry.create(api)
          const abi = JSON.parse(JSON.stringify(vrf_oracle_phat))
          const contractKey = await phatRegistry.getContractKey(contractId)
          //console.log("contractKey",contractKey)
          
          const contract = new PinkContractPromise(api, phatRegistry, abi, contractId, contractKey)
          
          const pair = new Keyring({ type: 'sr25519' }).addFromUri("//Alice")
          setCert(await signCertificate({ api, pair }))
          setContract(contract)
          
          console.log("Phat Contract loaded successfully");
        } 
        catch (err) {
            console.log("Error in Phat contract loading",err);
            throw err;
        }
      }
      if (api && alice) {
        connectContract()
      }
    }
  },[api, alice])

  async function phat_query_feedData(data) {
    if (api && phatContract) {
        let result;
        let output;
        try {
            //console.log("--------------------")
            console.log("Phat QUERY feedData")
            //console.log("data:",data)
            result = await phatContract.query.feedData(alice.address,{cert},data);
            //console.log('result:', result.output.toHuman())
            //let resultString = result.output.toHuman() as Object
            let res = result?.output?.toHuman()
        if (res?.Ok?.Ok) {
            console.log("Phat OK",res.Ok.Ok)
            output = {state:"Ok",res:res.Ok.Ok}
            return output
        }
        else {
            console.log("Phat ERROR",res.Ok?.Err)
            output = {state:"Err",res:res.Ok?.Err}
            return output
        }
        
        } catch (error) {
            console.log("Error in rollup: \"",error, "\" - Please try again")
            output = {state:"Err",res:"Error in rollup: "+error}
            return output
        }
    } else {
      await delay(1000)
    }
  }

  // const delay = ms => new Promise(res => setTimeout(res, ms));
  // await delay(1000) // ex d'utilisation pour 1s

  return (
    <PhatContractContext.Provider
      value={{
        phatContract,
        phat_query_feedData
      }}
    >
      {children}
    </PhatContractContext.Provider>
  );
};