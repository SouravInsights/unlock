import { networks } from '@unlock-protocol/networks'

export interface Options {
  amount?: number
  address?: string
  network: number
}

interface Price {
  decimals: number
  symbol: string
  price: number
  timestamp: number
  confidence: number
}

export async function defiLammaPrice({
  network,
  address,
  amount = 1,
}: Options) {
  const networkConfig = networks[network]
  if (!network) {
    return {}
  }
  const items: string[] = []
  const coingecko = `coingecko:${networkConfig.nativeCurrency?.coingecko}`
  const mainnetTokenAddress = networkConfig.tokens?.find(
    (item) => item.address?.toLowerCase() === address?.toLowerCase()
  )?.mainnetAddress

  if (mainnetTokenAddress) {
    items.push(`ethereum:${mainnetTokenAddress}`)
  }

  if (address) {
    items.push(`${networkConfig.chain}:${address}`)
  }

  if (!address && coingecko) {
    items.push(coingecko)
  }

  const endpoint = `https://coins.llama.fi/prices/current/${items.join(',')}`
  const response = await fetch(endpoint)

  if (!response.ok) {
    return {}
  }

  const json: Record<'coins', Record<string, Price>> = await response.json()
  const item = Object.values(json.coins).filter(
    (item) => item.confidence > 0.95
  )[0]

  if (!item) {
    return {}
  }

  return {
    ...item,
    priceInAmount: item.price * amount,
  }
}
