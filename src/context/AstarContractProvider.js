import React, { useState, useEffect, useContext } from "react";
import { Abi, ContractPromise } from "@polkadot/api-contract";
import { AstarApiContext } from "../context/AstarApiProvider";
import { AppContext } from "../context/ContextProvider";
import { ORACLE_CONTRACT_ABI_METADATA, SMART_CONTRACT_ADDRESS } from "../lib/constants";

export const ContractContext = React.createContext();

export const AstarContractProvider = ({ children }) => {

  // Contexts
  const { api, network } = useContext(AstarApiContext);
  const { alice } = useContext(AppContext);

  // states
  const [contract, setContract] = useState();

  useEffect(() => {
    if (api) loadContract();
  }, [api]);
  
  const loadContract = async () => {
    try { 
      const abi = new Abi(ORACLE_CONTRACT_ABI_METADATA[network], api.registry.getChainProperties());
      const contract = new ContractPromise(api, abi, SMART_CONTRACT_ADDRESS[network]);
      setContract(contract);
    } catch (error) {
      console.error("Error in Astar Contract", error);
    }
  };

  /**
   * Specific function 
   */
  const astar_query_getRequestMessageRaw = async (dappId) => {
    console.log("dappID",dappId)
    const { gasRequired, result, output, error } = await dryRun("getRequestMessageRaw",dappId);
    const res = { gasRequired, result, output, error }
    //if (res.result.isErr) console.log("asErr",res.result.asErr.data.toHuman())
    //if (res.result.isOk) console.log("asOk",res.result.asOk.data.toHuman())
    console.log("output",output.toHuman())
    return {state:res.result.isErr ? "Err" : "Ok",res:output.toHuman().Ok}
  }

  /**
   * Specific function 
   */
  const astar_query_getDappData = async (dappId) => {
    const { gasRequired, result, output, error } = await dryRun("getDappData",dappId);
    const res = { gasRequired, result, output, error }
    //if (res.result.isErr) console.log("asErr",res.result.asErr.data.toHuman())
    //if (res.result.isOk) console.log("asOk",res.result.asOk.data.toHuman())
    console.log("output",output.toHuman())
    return {state:res.result.isErr ? "Err" : "Ok",res:output.toHuman().Ok}
  }

  /**
   * Generic function dryRun
   */
  const dryRun = async(funcName,...args)=>{
    //console.log("dryRun: args",args)
    //console.log("sending DryRun on "+network+" for contract: ",rewardManagerContract.address.toString())
    // Get the initial gas WeightV2 using api.consts.system.blockWeights['maxBlock']
    const gasLimit = api.registry.createType(
      'WeightV2',
      api.consts.system.blockWeights['maxBlock']
    )
    // Query the contract message
    // This will return the gas required and storageDeposit to execute the message
    // and the result of the message
    //(contract.query)
    const contractPromise = contract.query[funcName](
      alice.address,
      {
        gasLimit: gasLimit
      },
      ...args
    )
    const abiIndex = contract.query[funcName].meta.index
    const { gasRequired, storageDeposit, result, output } = await contractPromise;

    // Check for errors
    let error = undefined
    if (result.isErr) {
      if (result.asErr.isModule) {
        const dispatchError = api.registry.findMetaError(result.asErr.asModule)
        error = dispatchError.docs.length ? dispatchError.docs.concat().toString() : dispatchError.name
      } else {
        error = result.asErr.toString()
      }
    }

    // Even if the result is Ok, it could be a revert in the contract execution
    if (result.isOk) {
      const flags = result.asOk.flags.toHuman()
      // Check if the result is a revert via flags
      if (flags.includes('Revert')) {
        //console.log("---Revert",flags)
        const type = contract.abi.messages[abiIndex].returnType // here 5 is the index of the message in the ABI
        //console.log("type",type)
        const typeName = type?.lookupName || type?.type || ''
        error = contract.abi.registry.createTypeUnsafe(typeName, [result.asOk.data]).toHuman()
        error = error ? error.Ok?.Err?.toString() : 'Revert'
      }
    }
    //console.log("DryRun error?:",error)
    return { gasRequired, storageDeposit, result, output, error }
  }

  return (
    <ContractContext.Provider
      value={{
        contract,
        astar_query_getRequestMessageRaw,
        astar_query_getDappData
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};