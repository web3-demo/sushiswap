import { getAddress } from '@ethersproject/address'
import { Native } from '@sushiswap/currency'
import { formatPercent } from '@sushiswap/format'
import { Button, Chip, Currency, Link, Typography } from '@sushiswap/ui'
import { FC } from 'react'

import { Pair } from '../../.graphclient'
import { useTokensFromPair } from '../../lib/hooks'
import { ICON_SIZE } from '../Table'

interface PairQuickHoverTooltipProps {
  row: Pair
}

export const PairQuickHoverTooltip: FC<PairQuickHoverTooltipProps> = ({ row }) => {
  const { token0, token1 } = useTokensFromPair(row)

  return (
    <div className="flex flex-col p-2 !pb-0">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <Currency.IconList iconWidth={ICON_SIZE} iconHeight={ICON_SIZE}>
              <Currency.Icon currency={token0} />
              <Currency.Icon currency={token1} />
            </Currency.IconList>
            <div className="flex flex-col">
              <Typography variant="sm" weight={500} className="flex gap-1 text-slate-50">
                {token0.symbol} <span className="text-slate-500">/</span> {token1.symbol}
              </Typography>
              <Typography variant="xxs" className="text-slate-400">
                SushiSwap Farm
              </Typography>
            </div>
          </div>
          <Typography variant="xs" weight={600} className="flex gap-1.5 items-end text-slate-400">
            <Chip color="gray" size="sm" label="Classic" />
            Fee 0.3%
          </Typography>
        </div>
        <Typography variant="sm" weight={700} className="flex gap-3 text-slate-50">
          <span className="text-slate-400">APY:</span> {formatPercent(row.apr / 100)}
        </Typography>
      </div>
      {/*<hr className="my-3 border-t border-slate-200/10" />*/}
      {/*<div className="flex flex-col gap-1.5">*/}
      {/*  <Typography variant="xs" className="mb-1 text-slate-500">*/}
      {/*    Reward Emission*/}
      {/*  </Typography>*/}
      {/*  <div className="flex items-center gap-2">*/}
      {/*    <Currency.Icon currency={token0} width={18} height={18} />*/}
      {/*    <Typography variant="sm" weight={700} className="text-slate-50">*/}
      {/*      <span>420 {token0.symbol}</span> <span className="font-normal text-slate-300">per day</span>*/}
      {/*    </Typography>*/}
      {/*  </div>*/}
      {/*  <div className="flex items-center gap-2">*/}
      {/*    <Currency.Icon currency={token1} width={18} height={18} />*/}
      {/*    <Typography variant="sm" weight={700} className="text-slate-50">*/}
      {/*      <span>420 {token1.symbol}</span> <span className="font-normal text-slate-300">per day</span>*/}
      {/*    </Typography>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="flex justify-end gap-2 mt-4 mb-2">
        <Link.External
          className="w-full !no-underline"
          href={`/pool/add?token0=${
            Native.onChain(row.chainId).wrapped.address === getAddress(row.token0.id)
              ? Native.onChain(row.chainId).symbol
              : getAddress(row.token0.id)
          }&token1=${
            Native.onChain(row.chainId).wrapped.address === getAddress(row.token1.id)
              ? Native.onChain(row.chainId).symbol
              : getAddress(row.token1.id)
          }&chainId=${row.chainId}`}
        >
          <Button size="sm" fullWidth disabled>
            Deposit
          </Button>
        </Link.External>
      </div>
    </div>
  )
}
