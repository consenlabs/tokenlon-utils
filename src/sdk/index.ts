const imToken = typeof window !== 'undefined' ? window['imToken'] : null

const getEthereumAccounts = (): Promise<string[]> => {
  return window.ethereum && window.ethereum.enable()
}
function getAccounts(): Promise<string[]> {
  return window.imToken && imToken.callPromisifyAPI
    ? imToken.callPromisifyAPI('ethereum.enable')
    : window.ethereum.enable()
}
const personalSign = (address: string, message: string) => {
  return imToken.callPromisifyAPI('transaction.personalSign', {
    address,
    message,
  })
}
function setTitle(title: string) {
  imToken.callPromisifyAPI('navigator.setTitle', title).catch((_e) => {
    console.log(_e)
  })
}
function approveAndSwap(payload) {
  return imToken.callPromisifyAPI('ethereum.approveAndSwap', payload)
}
export {
  getEthereumAccounts,
  getAccounts,
  personalSign,
  setTitle,
  approveAndSwap,
}
