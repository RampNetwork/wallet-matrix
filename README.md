# Wallet Matrix

Wallet Matrix is an easy tool to test cross-compatibility between various Ethereum wallets.

Expect it to break randomly - the code is pretty much hackathon quality.

Feel free to fork it, share it or contribute code / ideas.

Huge thanks to Noah Zinsmeister from Uniswap for developing web3-react that made making this easy. Much of this project's code is also forked from web3-react's codesandbox demo.

| Wallet providers / signing methods  |    eth_sign    | eth_sign with prefix (personal_sign) |   eth_signTypedData  |
|-------------------------------------|:--------------:|:------------------------------------:|:--------------------:|
| Coinbase Wallet ->                  | Not supported  | Supported                            | Not supported        |
| Trust Wallet ->                     | Supported      | Supported                            | Not supported        |
| Opera Wallet ->                     | Supported      | Supported                            | Support coming soon  |
| MetaMask ->                         | Supported      | Supported                            | Supported            |
| Fortmatic ->                        | Not supported  | Supported                            | Supported            |
| Portis ->                           | Not supported  | Supported                            | Supported            |
| Ledger ->                           | Not supported  | Supported                            | Not Supported        |
