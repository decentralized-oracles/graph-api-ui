import React, { useEffect, useState } from "react";
import { Keyring } from '@polkadot/api'
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { DAPP_NAME } from "../lib/constants"

export const AppContext = React.createContext();

export const ContextProvider = ({ children }) => {
  
  const [dappName, setDappName] = useState(DAPP_NAME);
  const [alice, setAlice] = useState();
  const [globalUpdate,setGlobalUpdate] = useState(false)

  useEffect(()=>{
    const load = async () => {
      await cryptoWaitReady().catch(console.error);
      loadContext()
    }
    load().catch(console.error);
  },[])

  const loadContext = () => {
    const local_alice = new Keyring({ type: 'sr25519' }).addFromUri("//Alice")
    //("JSON",local_alice.toJson("alice"))
    setAlice(local_alice)
  }

  return (
    <AppContext.Provider
      value={{
        alice,  
        dappName, 
        globalUpdate,
        setGlobalUpdate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};