import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";


interface OnVote{
    (name: string): void;
}

interface CandidateBarProps {
    name: string;
    voted: string;
    onVoting?: OnVote;
}





const CandidateBar: React.FunctionComponent<CandidateBarProps> = ({voted="", name, ...props}: CandidateBarProps) => {

    const [votes, setVotes] = useState(0);

    window.voting.getCandidateVotes(name).then((res) =>{
        setVotes(res.toNumber());
    }).catch((err) => {
        setVotes(0);
    })


    function vote(): void{
        window.signer.getAddress().then((address) => {
            window.voting.vote(name, {from: address});
            setVotes(votes + 1);
            if(props.onVoting != undefined){
                props.onVoting(name);
            }
        })
    }


    const button = voted === "" ? <Row> {votes} <Button onClick={() => {vote()}}>Vote</Button></Row>: <Row>{votes}</Row>

    const textColor = voted === name? "text-success": "";

    return (
        <Row className="border p-2 rounded">
            <Col xs={16} md={10} className={textColor}>
                {name}
            </Col>
            <Col xs={2} md={2}>
                {button}
            </Col>
        </Row>
    )
}

export default CandidateBar;