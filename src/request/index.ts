import Axios from 'axios'
import _ from 'lodash'
import { padLeft } from '../helper'
import { toBN, stripHexPrefix } from '../format'
const Eth = require('ethjs')

const rpcAsync = async (url, method, params, opts = {}) => {
  const data = {
    jsonrpc: '2.0',
    id: 1,
    method,
    params,
  }
  try {
    const res = await Axios.post(url, data, opts)
    return _.get(res, 'data.result')
  } catch (error) {
    throw new Error(`null response ${url} ${JSON.stringify(params)}`)
  }
}

function getTokenBalanceAsync(
  walletAddress: string,
  contractAddress: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const web3 = window.web3
    const HEX_OF_BALANCE_OF = '70a08231'
    const data = `0x${HEX_OF_BALANCE_OF}${padLeft(
      stripHexPrefix(walletAddress),
      64,
    )}`
    const params = { to: contractAddress, data }
    const method = web3.eth.call.bind(web3.eth)
    return method(params, (err, value) => {
      if (!err) {
        const balance = value === '0x' ? '0' : toBN(value).toString(10)
        resolve(balance)
      } else {
        console.warn(err)
        reject(err)
      }
    })
  })
}

function getTokenBalanceByProvider(
  walletAddress: string,
  contractAddress: string,
): Promise<string> {
  const provider = 'https://eth-mainnet.token.im'
  const eth = new Eth(new Eth.HttpProvider(provider))
  const HEX_OF_BALANCE_OF = '70a08231'
  const data = `0x${HEX_OF_BALANCE_OF}${padLeft(
    stripHexPrefix(walletAddress),
    64,
  )}`
  const params = { to: contractAddress, data }
  return eth.call(params).then((value) => {
    const balance = value === '0x' ? '0' : toBN(value).toString(10)
    return balance
  })
}
export { rpcAsync, getTokenBalanceAsync, getTokenBalanceByProvider }
