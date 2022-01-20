import 'bootstrap/dist/css/bootstrap.min.css';

import { ExternalProvider, Web3Provider } from "@ethersproject/providers";
import { Signer, ethers } from "ethers";

import { Voting, Voting__factory } from "../typechain/index";
import AddCandidate from "./components/AddCandidate";

import { Container } from 'react-bootstrap';
import Candidates from './components/Candidates';
import { useState } from 'react';

declare global {
  interface Window {
    ethereum: ExternalProvider;
    provider: Web3Provider;
    signer: Signer;
    ethers: object;
    voting: Voting;
  }
}

const ACCOUNT_KEY = "0x5e9F341A0114Db5955ba9458368da064ae4C6379";
const CONTRACT_ADDRESS = "0xAA89a8cd0e23b27135ADca9C1c7AF6269A998ACB";

function initProvider(): void {
  window.ethers = ethers;
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    window.provider = provider;
    window.signer = signer;

    const voting = new Voting__factory(window.signer).attach(CONTRACT_ADDRESS);
    window.voting = voting;
  }
}

export const App = () => {
  initProvider();
  const [candidates, setCandidates] = useState<string[]>([]);

  function add(name: string): void{
    candidates.push(name);
    setCandidates(candidates);
  }
  return <>
  <Container>
    <AddCandidate onAdd={add}  />
    <Candidates cands={candidates} />
  </Container>
  </>;
};
