import {
  personalSign,
  getNonceAsync,
  getEtherBalanceAsync,
  getGasPriceAsync,
  getBlockNumberAsync,
} from '../index'
import BN from 'bignumber.js'

const address1 = '0x6B030f453e7E0F1447601EE757947286A60B0122'

describe('getNonceAsync', () => {
  it('should return nonce number if cb not any err', async () => {
    const nonce1 = 1222123
    ;(global as any).web3 = {
      eth: {
        getTransactionCount: jest.fn().mockImplementationOnce((address, cb) => {
          cb('', nonce1)
        }),
      },
    }
    const value = await getNonceAsync(address1)
    expect(value).toBe(nonce1)
  })
  it('should return throw error if cb return err', async () => {
    const nonce1 = 1222123
    ;(global as any).web3 = {
      eth: {
        getTransactionCount: jest.fn().mockImplementationOnce((address, cb) => {
          cb('error message', nonce1)
        }),
      },
    }
    await getNonceAsync(address1).catch((e) => {
      expect(e).toEqual('error message')
    })
  })
})

describe('getEtherBalanceAsync', () => {
  it('should return string data if cb not return err', async () => {
    ;(global as any).web3 = {
      eth: {
        getBalance: jest.fn().mockImplementation((address, latest, cb) => {
          cb('', '11234333.00000001')
        }),
      },
    }
    const data = await getEtherBalanceAsync(address1)
    expect(data).toBe('11234333.00000001')
  })
  it('should return error message if cb  return err', async () => {
    ;(global as any).web3 = {
      eth: {
        getBalance: jest.fn().mockImplementation((address, latest, cb) => {
          cb('error message', '0')
        }),
      },
    }
    await getEtherBalanceAsync(address1).catch((e) => {
      expect(e).toEqual('error message')
    })
  })
})

describe('getGasPriceAsync', () => {
  it('should return BigNumber data if not return error', async () => {
    ;(global as any).web3 = {
      eth: {
        getGasPrice: jest.fn().mockImplementation((cb) => {
          cb('', '111')
        }),
      },
    }
    const data = await getGasPriceAsync()
    expect(data).toBeInstanceOf(BN)
  })
})

describe('getBlockNumberAsync', () => {
  const blockNumber = 1222123
  it('should return block number if cb not any err', async () => {
    ;(global as any).web3 = {
      eth: {
        getBlockNumber: jest.fn().mockImplementation((cb) => {
          cb('', blockNumber)
        }),
      },
    }
    const value = await getBlockNumberAsync()
    expect(value).toBe(blockNumber)
  })
  it('should return throw error if cb return err', async () => {
    ;(global as any).web3 = {
      eth: {
        getBlockNumber: jest.fn().mockImplementation((cb) => {
          cb('error message', blockNumber)
        }),
      },
    }
    await getBlockNumberAsync().catch((e) => {
      expect(e).toEqual('error message')
    })
  })
})

describe('personalSign', () => {
  it('should return txHash if call person.sign', async () => {
    const txHash = '0xccsdcscdcdscdscscscsdc'
    const hexMsg = 'xzkjadghsfssafdsgbsad'
    ;(global as any).web3 = {
      eth: {
        personal: {
          sign: jest.fn().mockImplementation((hexMsg, address, empty, cb) => {
            cb('', txHash)
          }),
        },
      },
    }
    expect(await personalSign(address1, hexMsg)).toBe(txHash)
  })
  it('should return error if call person.sign get error', async () => {
    const txHash = '0xccsdcscdcdscdscscscsdc'
    const hexMsg = 'xzkjadghsfssafdsgbsad'
    ;(global as any).web3 = {
      eth: {
        personal: {
          sign: jest.fn().mockImplementation((hexMsg, address, empty, cb) => {
            cb('error', txHash)
          }),
        },
      },
    }
    await personalSign(address1, hexMsg).catch((e) => {
      expect(e).toBe('error')
    })
  })
})
