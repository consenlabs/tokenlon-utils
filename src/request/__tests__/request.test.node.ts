import { rpcAsync } from '../index'
import Axios from 'axios'

jest.mock('axios')

const data = {
  name: 'tokenlon',
  amount: 1,
  side: 'sell',
  source: 'imToken',
  result: {
    lonBanlance: 100,
    power: 1.2,
  },
}
const requestUrl = 'https://api.dev.tokenlon.im/v1/referral/pool/shares'

describe('rpcAsync', () => {
  it('should return data if call rpcAsync', async () => {
    ;(Axios.post as jest.Mock).mockResolvedValue({ data })
    const res = await rpcAsync(requestUrl, 'market.getPrice', {
      chainType: 'ETHEREUM',
    })
    expect(res).toBe(data.result)
  })
  it('should catch error if call rpcAsync throw error', async () => {
    ;(Axios.post as jest.Mock).mockRejectedValue({ err: 'error' })
    await rpcAsync(requestUrl, 'market.getPrice', {
      chainType: 'ETHEREUM',
    }).catch((err) => {
      expect(err).toBeTruthy()
    })
  })
})
