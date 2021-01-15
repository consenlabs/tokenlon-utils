export type Receipt = {
  // 32 Bytes - hash of the block where this transaction was in.
  blockHash: string
  // block number where this transaction was in.
  blockNumber: number
  // 32 Bytes - hash of the transaction.
  transactionHash: string
  // integer of the transactions index position in the block.
  transactionIndex: number
  // 20 Bytes - address of the sender.
  from: string
  // 20 Bytes - address of the receiver. null when its a contract creation transaction.
  to: string
  // The total amount of gas used when this transaction was executed in the block.
  cumulativeGasUsed: number
  // The amount of gas used by this specific transaction alone.
  gasUsed: number
  // 20 Bytes - The contract address created, if the transaction was a contract creation, otherwise null.
  contractAddress: string
  // Array of log objects, which this transaction generated.
  logs: Array<object>

  status?: undefined | null | string | 0 | 1
}
export type TokenAllowanceParams = {
  walletAddress: string
  contractAddress: string
  spenderAddress: string
}
