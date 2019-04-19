import React from 'react';
import { render } from 'react-dom';
import WalletConnectQRCodeModal from '@walletconnect/qrcode-modal';
import Web3Provider, { useWeb3Context, Web3Consumer } from 'web3-react';
import { ethers } from 'ethers';

import connectors from './connectors';
import { Web3Context } from 'web3-react/dist/context';

function handleSendAsyncResults(err: Error, res: any) {
  if (err) {
    console.error(err);
    alert(JSON.stringify(err, null, 4));
    return;
  }

  console.log(res);
  alert(JSON.stringify(res, null, 4));
}

function App() {
  return (
    <Web3Provider connectors={connectors} libraryName='ethers.js'>
      <div className='App'>
        <WalletMatrix />
      </div>
    </Web3Provider>
  );
}

function WalletMatrix() {
  const context = useWeb3Context();

  console.log(context);

  if (context.error) {
    console.error(context.error);
  }

  const [transactionHash, setTransactionHash] = React.useState();

  function sendTransaction() {
    const signer: any = context.library.getSigner();

    console.log(context);

    signer
      .sendTransaction({
        to: ethers.constants.AddressZero,
        value: ethers.utils.bigNumberify('0')
      })
      .then(({ hash }: { hash: string }) => {
        setTransactionHash(hash);
      });
  }

  async function ethSign(address: string | null | undefined) {
    const signer: any = context.library.getSigner();

    console.log(signer);

    if (!address) {
      console.log('Missing address');
      alert('Missing ETH address');
      return;
    }

    signer
      .provider
      ._sendAsync({
        "jsonrpc": "2.0",
        "from": address,
        "method": 'eth_sign',
        "id": 1,
        "params": [address, '0xdeadbeef']
      }, handleSendAsyncResults);
  }

  async function personalSign(address: string | null | undefined) {
    const signer: any = context.library.getSigner();

    console.log(signer);

    if (!address) {
      console.log('Missing address');
      alert('Missing ETH address');
      return;
    }

    signer
      .provider
      ._sendAsync({
        "jsonrpc": "2.0",
        "from": address,
        "method": 'personal_sign',
        "id": 1,
        "params": [address, '0xdeadbeef']
      }, handleSendAsyncResults);
  }

  async function signTypedData(address: string | null | undefined, connectorName: string | undefined) {
    const signer: any = context.library.getSigner();
    console.log(connectorName);
    const method = connectorName === 'MetaMask' ? 'eth_signTypedData_v3' : 'eth_signTypedData';

    console.log(signer);

    if (!address) {
      console.log('Missing address');
      alert('Missing ETH address');
      return;
    }

    console.log(address);

    const params = [
      address,
      JSON.stringify({
        "types": {
          "EIP712Domain": [
            {
              "name": "name",
              "type": "string"
            },
            {
              "name": "version",
              "type": "string"
            },
            {
              "name": "chainId",
              "type": "uint256"
            },
            {
              "name": "verifyingContract",
              "type": "address"
            }
          ],
          "Mail": [
            {
              "name": "contents",
              "type": "string"
            }
          ]
        },
        "primaryType": "Mail",
        "domain": {
          "name": "Ether Mail",
          "version": "1",
          "chainId": 4,
          "verifyingContract": address,
        },
        "message": {
          "contents": "Hello, Bob!"
        }
      })
    ];

    console.log(connectorName);

    signer
      .provider
      ._sendAsync({
        "jsonrpc": "2.0",
        "from": address,
        "method": method,
        "id": 1,
        "params": connectorName === 'MetaMask' ? params : params.reverse(),
      }, handleSendAsyncResults);
  }

  if (context.error) {
    console.error(context.error);
  }

  return (
    <React.Fragment>
      <h1>WalletMatrix</h1>

      <Web3ConsumerComponent />

      {context.error && <p>{context.error.toString()}</p>}

      {Object.keys(connectors).map(connectorName => (
        <button
          key={connectorName}
          disabled={context.connectorName === connectorName}
          onClick={() => context.setConnector(connectorName)}
        >
          Activate {connectorName}
        </button>
      ))}

      <br />
      <br />

      {(context.active || (context.error && context.connectorName)) && (
        <button onClick={() => context.unsetConnector()}>
          {context.active ? 'Deactivate Connector' : 'Reset'}
        </button>
      )}

      {context.active && context.account && !transactionHash && (
        <button onClick={sendTransaction}>Send Dummy Transaction</button>
      )}

      {context.active && context.account && !transactionHash && (
        <button onClick={() => ethSign(context.account)}>Eth sign</button>
      )}


      {context.active && context.account && !transactionHash && (
        <button onClick={() => personalSign(context.account)}>Personal sign</button>
      )}


      {context.active && context.account && !transactionHash && (
        <button onClick={() => signTypedData(context.account, context.connectorName)}>Sign typed data</button>
      )}

      {transactionHash && <p>{transactionHash}</p>}
    </React.Fragment>
  );
}

function Web3ConsumerComponent() {
  return (
    <Web3Consumer>
      {(context: Web3Context) => {
        const { active, connectorName, account, networkId } = context;
        return (
          active && (
            <React.Fragment>
              <p>Active Connector: {connectorName}</p>
              <p>Account: {account || 'None'}</p>
              <p>Network ID: {networkId}</p>
            </React.Fragment>
          )
        );
      }}
    </Web3Consumer>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
