import styled from 'styled-components';

export const Container = styled.div`
    background-color: #1A1A1A;  /* Gris oscuro */
    color: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); /* Sombra más suave */
    width: 350px; /* Menor ancho para un diseño más compacto */
    margin: auto;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.8rem; /* Menor espacio entre los campos */
    margin-top: 1rem;
`;

export const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;  /* Alineación más limpia */
    gap: 0.5rem;
    width: 100%;
`;

export const Input = styled.input`
    padding: 0.8rem;
    border: 1px solid #444; /* Borde más oscuro */
    background-color: #2A2A2A;  /* Fondo más oscuro para el input */
    color: white;
    border-radius: 4px;
    outline: none;
    width: 100%; /* Asegurarse que ocupe todo el ancho del contenedor */

    &:focus {
        border-color: #FFD700; /* Amarillo al enfocarse */
    }
`;

export const Button = styled.button`
    background-color: #2A2A2A;  
    color: white;
    padding: 0.8rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;

    &:hover {
        background-color: #444; 
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
    margin-top: 1rem;
    color: #FF6347;  /* Rojo más suave */
`;

export const SuccessMessage = styled.p`
    color: #32CD32;  /* Verde más suave */
`;

export const CaptchaContainer = styled.div`
    margin-top: 1rem;
    display: flex;
    justify-content: center;  /* Centrado del reCAPTCHA */
    width: 100%;
    margin-bottom: 1rem; /* Separación entre captcha y botón */
`;
