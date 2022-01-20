import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface OnAdd{
  (name: string): void;
}

const AddCandidate: React.FunctionComponent<{onAdd?: OnAdd}> = ({onAdd}) => {
  const [value, setValue] = useState<string>("");

  function handleValueChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setValue(e.target.value);
  }

  function addCandidate(): void {
    if (value.length > 0) {
      window.signer.getAddress().then((address) => {
        window.voting
          .addCandidate(value, { from: address })
          .then((res) => {
            console.log(res);
            if(onAdd !== undefined){
              onAdd(value);
            }
          })
          .catch((err) => {
            console.error(err);
          });
        setValue("");
      });
    }
  }
  return (
    <Container className="mt-4 mb-4">
      <Form
        onSubmit={() => {
          console.log(value);
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Candidate Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={value}
            onChange={handleValueChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          onClick={() => {
            addCandidate();
          }}
        >
          Add Candidate
        </Button>
      </Form>
    </Container>
  );
};

export default AddCandidate;
