import { ChainMap, ChainMetadata, ProtocolType } from '@hyperlane-xyz/sdk';
import { optimismgoerli } from '@hyperlane-xyz/sdk/dist/consts/chainMetadata';

// import { chainMetadata } from '@hyperlane-xyz/sdk';
// A map of chain names to ChainMetadata
export const chains: ChainMap<ChainMetadata> = {
  // ----------- Add your chains here -----------------
  optimismgoerli,
  zoratest: {
    name: 'zoratest',
    protocol: ProtocolType.Ethereum,
    // basegoerli default chain id
    chainId: 999,
    nativeToken: {
      name: 'Ether',
      symbol: 'GETH',
      decimals: 18,
    },
    rpcUrls: [
      {
        http: 'https://testnet.rpc.zora.co/',
      },
    ],
    // You can set overrides for transaction fields here
    // transactionOverrides: {
    //   gasLimit: 1000000
    // },
  },
  // --------------------------------------------------
  // You can also override the default chain metadata (completely)
  // ethereum: {
  //   ...chainMetadata.ethereum,
  //   publicRpcUrls: [
  //     {
  //       http: 'my.custom.rpc.url',
  //     }
  //   ],
  // }
};
