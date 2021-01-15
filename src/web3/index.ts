import { toBN, stripHexPrefix } from '../format'
import BN from 'bignumber.js'
import { Receipt, TokenAllowanceParams } from './types'
import { padLeft } from '../helper'

function _handleWeb3MethodCallback(web3Method, param?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    web3Method &&
      web3Method(param, (err, value) => {
        if (!err) {
          resolve(value)
        } else {
          reject(err)
        }
      })
  })
}
function getNonceAsync(address: string): Promise<number> {
  const web3 = window.web3
  return _handleWeb3MethodCallback(web3.eth.getTransactionCount, address)
}

function getEtherBalanceAsync(walletAddress: string) {
  const web3 = window.web3
  const { getBalance } = web3.eth
  return new Promise((resolve, reject) => {
    getBalance(walletAddress, 'latest', (err, data) => {
      if (err) return reject(err)
      resolve(toBN(data).toString(10))
    })
  })
}

function getGasPriceAsync(): Promise<BN> {
  const web3 = window.web3
  const { getGasPrice } = web3.eth
  return new Promise((resolve, reject) => {
    getGasPrice((err, gasPriceBN) => {
      if (!err) {
        resolve(toBN(gasPriceBN))
      } else {
        reject(err)
      }
    })
  })
}

function getBlockNumberAsync(): Promise<number> {
  const web3 = window.web3
  const { getBlockNumber } = web3.eth
  return new Promise((resolve, reject) => {
    getBlockNumber((err, blockNumber) => {
      if (!err) {
        resolve(blockNumber)
      } else {
        reject(err)
      }
    })
  })
}

function getTransactionReceiptAsync(hash: string): Promise<Receipt> {
  const web3 = window.web3
  const { getTransactionReceipt } = web3.eth
  return _handleWeb3MethodCallback(getTransactionReceipt, hash)
}

function personalSign(address: string, hexMsg: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const web3 = window.web3
    web3.eth.personal.sign(hexMsg, address, '', (err, txHash) => {
      if (!err) {
        resolve(txHash)
      } else {
        reject(err)
      }
    })
  })
}

function getTokenAllowance(params: TokenAllowanceParams): Promise<string> {
  const { walletAddress, contractAddress, spenderAddress } = params
  return new Promise((resolve, reject) => {
    const HEX_OF_GET_ALLOWANCE = 'dd62ed3e'
    const web3 = window.web3
    const data = `0x${HEX_OF_GET_ALLOWANCE}${padLeft(
      stripHexPrefix(walletAddress),
      64,
    )}${padLeft(stripHexPrefix(spenderAddress), 64)}`
    const params = { to: contractAddress, data }
    const method = web3.eth.call.bind(web3.eth)
    return method(params, (err, value) => {
      if (!err) {
        const allowance = value === '0x' ? '0' : toBN(value).toString(10)
        resolve(allowance)
      } else {
        console.warn(err)
        reject(err)
      }
    })
  })
}
export {
  personalSign,
  getNonceAsync,
  getEtherBalanceAsync,
  getGasPriceAsync,
  getBlockNumberAsync,
  getTokenAllowance,
  getTransactionReceiptAsync,
}
