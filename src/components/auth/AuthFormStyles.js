import styled from 'styled-components';

export const Container = styled.div`
    background-color: #000;
    color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
    margin: auto;
    text-align: center;
    margin-top: 2rem;
`;

export const Form = styled.form`
    display:flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem
`;

export const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-center;
    text-align: center;
    gap: 0.5rem;
    width: 100%;
`;

export const Input = styled.input`
    padding: 0.8rem;
    border: 1px solid #ffd700;
    background-color: #000;
    color: white;
    border-radius: 4px;
    outline: none;
    width: 98%;

    &:focus{
    border-color: #007BFF;
    }
`;

export const Button = styled.button`
    background-color: #007BFF;
    color: white;
    padding: 0.8rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;

    &:hover{
        background-color: #0056b3;
    }
`;

export const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 5px;
    color: white;
`;

export const ErrorMessage = styled.p`
    color: red;
`;
export const SuccessMessage = styled.p`
    color: green;
`;