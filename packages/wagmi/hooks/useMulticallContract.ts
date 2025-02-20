import { ChainId } from '@sushiswap/chain'
import UniswapInterfaceMulticallArtifact from '@uniswap/v3-periphery/artifacts/contracts/lens/UniswapInterfaceMulticall.sol/UniswapInterfaceMulticall.json'
import { useContract, useProvider } from 'wagmi'

import type { UniswapInterfaceMulticall } from '../typechain'

export const MULTICALL_ADDRESS: Record<number, string> = {
  [ChainId.ETHEREUM]: '0x1F98415757620B543A52E61c46B32eB19261F984',
  [ChainId.ROPSTEN]: '0x1F98415757620B543A52E61c46B32eB19261F984',
  [ChainId.RINKEBY]: '0x1F98415757620B543A52E61c46B32eB19261F984',
  [ChainId.GÖRLI]: '0x1F98415757620B543A52E61c46B32eB19261F984',
  [ChainId.KOVAN]: '0x1F98415757620B543A52E61c46B32eB19261F984',
  [ChainId.POLYGON]: '0x1F98415757620B543A52E61c46B32eB19261F984',
  [ChainId.ARBITRUM]: '0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB',
  [ChainId.MOONBEAM]: '0x34c471ddceb20018bbb73f6d13709936fc870acc',
  [ChainId.AVALANCHE]: '0x8C0F842791F03C095b6c633759224FcC9ACe68ea',
  [ChainId.BSC]: '0x47A307e3167820daf22a377D777371753758f59c',
  [ChainId.FANTOM]: '0xB1395e098c0a847CC719Bcf1Fc8114421a9F8232',
  [ChainId.CELO]: '0x3d0B3b816DC1e0825808F27510eF7Aa5E3136D75',
  [ChainId.HARMONY]: '0xaAB49386BFcB605F853763Ea382B91C9c83b9Ac5',
  [ChainId.MOONRIVER]: '0x8C8BF5Dea280A1eC68219D66E8A21E60585830F5',
  [ChainId.GNOSIS]: '0x2B75358D07417D4e895c952Ca84A44E63AEBE3Dd',
  [ChainId.TELOS]: '0x64e1E895866B3126f8f2E2912B475FDB35b2F315',
  [ChainId.FUSE]: '0x393B6DC9B00E18314888678721eC0e923FC5f49D',
  [ChainId.OKEX]: '0x8C8BF5Dea280A1eC68219D66E8A21E60585830F5',
  [ChainId.HECO]: '0x64e1E895866B3126f8f2E2912B475FDB35b2F315',
  [ChainId.PALM]: '0x4d4A0D45a98AE8EC25b359D93A088A87BC9eF70b',
  [ChainId.OPTIMISM]: '0x1F98415757620B543A52E61c46B32eB19261F984',
}

export const getMulticallContractConfig = (chainId: number | undefined) => ({
  addressOrName: chainId ? MULTICALL_ADDRESS[chainId] : '',
  contractInterface: UniswapInterfaceMulticallArtifact.abi,
})

export function useMulticallContract(chainId: number): UniswapInterfaceMulticall {
  return useContract<UniswapInterfaceMulticall>({
    ...getMulticallContractConfig(chainId),
    signerOrProvider: useProvider({ chainId }),
  })
}
