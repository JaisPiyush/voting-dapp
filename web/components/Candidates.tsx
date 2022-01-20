import { useState } from "react";
import { Container } from "react-bootstrap";
import CandidateBar from "./CandidateBar";

const Candidates: React.FC<{cands: string[]}> = ({cands}) => {
  const [voted, setVoted] = useState<string>("");
  const [candidates, setCandidates] = useState<string[]>(cands);

  window.signer.getAddress().then((address) => {
      window.voting.getMyVote({from: address}).then((name) => {
          setVoted(name);
      });

      window.voting.getCandidates({from: address}).then((cands) => {
          setCandidates(cands);
      })
  })


  function onVoting(name: string): void{
      setVoted(name);
  }

  const candidateBars = candidates.map((value, index) => <CandidateBar name={value} key={index} voted={voted} onVoting={onVoting} />)
  return (
    <Container>
        {candidateBars}
    </Container>
  );
};

export default Candidates;
