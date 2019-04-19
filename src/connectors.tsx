import { Connectors } from 'web3-react';
import TrezorConnector from '@web3-react/trezor';
import FortmaticConnector from '@web3-react/fortmatic';
import PortisConnector from '@web3-react/portis';

const {
  InjectedConnector,
  NetworkOnlyConnector,
  LedgerConnector,
} = Connectors;

const supportedNetworkURLs = {
  1: 'https://mainnet.infura.io/v3/60ab76e16df54c808e50a79975b4779f',
  4: 'https://rinkeby.infura.io/v3/60ab76e16df54c808e50a79975b4779f'
};

const defaultNetwork = 1;

const MetaMask = new InjectedConnector({
  supportedNetworks: [1, 4]
});

const Injected = new InjectedConnector({
  supportedNetworks: [1, 4]
});

const Infura = new NetworkOnlyConnector({
  providerURL: supportedNetworkURLs[1]
});

const Trezor = new TrezorConnector({
  supportedNetworkURLs,
  defaultNetwork,
  manifestEmail: 'maciej@ramp.network',
  manifestAppUrl: 'https://localhost:3000'
});

const Ledger = new LedgerConnector({
  supportedNetworkURLs,
  defaultNetwork
});

const Fortmatic = new FortmaticConnector({
  apiKey: 'pk_test_FC2B76C7C6BDE823',
  logoutOnDeactivation: false
});

const Portis = new PortisConnector({
  dAppId: 'e61b30af-0d80-43ba-baec-5165d8b5ba70',
  network: 'mainnet'
});

export default {
  MetaMask,
  Infura,
  Trezor,
  Ledger,
  Fortmatic,
  Portis,
  Injected,
};
