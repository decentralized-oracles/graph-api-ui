export const DAPP_NAME = "Decentralized Oracles - Graph API";

export const DEFAULT_NETWORKS = {
  astar: "shibuya",
  phala: "poc6",
}

export const SS58_PREFIX = {
  astar:5,
  shiden:5,
  shibuya:5,
  substrate:42,
  rococo:42,
  westend:42,
  polkadot:0,
  kusama:2
};

export const CONTRACT_PALLET_NETWORK = {
  astar: "substrate",
  shiden: "westend",
  shibuya: "rococo"
};

export const NETWORK_TOKENS = {
  astar:"ASTR",
  shiden:"SDN",
  shibuya:"SBY"
};

export const TOKEN_DECIMALS = {
  ASTR: 18,
  SDN: 18,
  SBY: 18
};

export const PROVIDER_ENDPOINTS = {
  astar:"wss://rpc.astar.network",
  shiden:"wss://shiden.api.onfinality.io/ws?apikey=53bc7e7e-1dbf-4272-af42-66c42a474c30",
  shibuya:"wss://shibuya-rpc.dwellir.com",
}

export const SMART_CONTRACT_ADDRESS = {
  shibuya:  "ZYCntk8NQqoFuurYykJeK6q6PSjc6G5CwzqvQmobygp7k2p",
};

export const PHALA_PROVIDER_ENDPOINTS = {
  poc6: "wss://poc6.phala.network/ws"
}
export const PHAT_CONTRACT_ID = {
  poc6: "0xa6c5baac29ef1e1bdfd6a5d2172d5cd85e4351497f7bd2b1a33c8c7be8b53feb"
}

import astar_contract_metadata from "./graph_api_consumer.json"
export const ORACLE_CONTRACT_ABI_METADATA = {
  shibuya:  astar_contract_metadata,
};
import phat_contract_metadata from "./js_offchain_rollup.json"
export const PHAT_CONTRACT_METADATA = {
  poc6:  phat_contract_metadata,
};
