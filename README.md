# Wallet Matrix

Demo: [click here](https://web3-wallet-matrix.surge.sh)

Wallet Matrix is an easy tool to test cross-compatibility between various Ethereum wallets.

Just activate a provider, click a button corresponding to the method you want to check and see the output - either error or result. All outputs are logged to the console as well.

Expect it to break randomly - the code is pretty much hackathon quality.

Feel free to fork it, share it or contribute code / ideas.

Huge thanks to [Noah Zinsmeister](https://twitter.com/noahZinsmeister) from [Uniswap](https://twitter.com/UniswapExchange) for developing [web3-react](https://github.com/NoahZinsmeister/web3-react) that made making this easy. Much of this project's code is also forked from [web3-react's codesandbox demo](https://codesandbox.io/s/6v5nrq2nqw).

## Wallets tested so far

| Wallet providers / signing methods  |    eth_sign    | eth_sign with prefix (personal_sign) |   eth_signTypedData  |
|-------------------------------------|:--------------:|:------------------------------------:|:--------------------:|
| Coinbase Wallet ->                  | Not supported  | Supported                            | Not supported        |
| Trust Wallet ->                     | Supported      | Supported                            | Not supported        |
| Opera Wallet ->                     | Supported      | Supported                            | Support coming soon  |
| MetaMask ->                         | Supported      | Supported                            | Supported            |
| Fortmatic ->                        | Not supported  | Supported                            | Supported            |
| Portis ->                           | Not supported  | Supported                            | Supported            |
| Ledger ->                           | Not supported  | Supported                            | Not Supported        |
