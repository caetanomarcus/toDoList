import React, { useState, useEffect } from "react";
import styled from "styled-components";


const Container = styled.div`
    width: 35vw;
    height: 45vh;
    background-color: #fff;
    padding: 1rem;
   display: flex;
   align-items: center;
   justify-content: center;

`;

const AlertText = styled.p`
    color: #CD50FA;
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
    opacity: 1;

`


const Alert = () => {

    return (
        <Container>
            <AlertText>Poxa! Você já tem 5 tarefas, não é melhor terminar uma e depois adicionar mais? Não se sobrecarregue! </AlertText>
        </Container>
    )
}

export default Alert