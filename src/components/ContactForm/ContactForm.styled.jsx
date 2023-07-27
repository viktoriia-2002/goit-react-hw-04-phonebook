import styled from 'styled-components';

export const Form = styled.form`
//   margin-left: 50px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const Input = styled.input`
  max-width: 100px;
  width: 100%;
  margin-top: 7px;
`;

export const Button = styled.button`
  cursor: pointer;
  padding: 4px 10px;
  background-color: white;
  transition-duration: 0.4s;
  border-radius: 5px;
  border: 1px solid;

  &:hover {
    background-color: rgb(43, 159, 243);
  }
`;
