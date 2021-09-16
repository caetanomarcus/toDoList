import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import postit from '../assets/postit.png'

const GlobalStyle = createGlobalStyle`
    body{
        margin:0;
        padding: 0;
        box-sizing: border-box;
       
    }
`;

const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    text-align: center;
    margin: 3rem;
    font-size: 3rem;
    color: #CD50FA;
    position: relative;

    ::after{
        content: '';
        width: 160px;
        height: 8px;
        border-top: solid 1px #7705A1;
        border-bottom: solid 1px #7705A1;
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%)
    }
`;

const Main = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 75%;
`;

const InputTasks = styled.form`
    width: 20vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    padding: 5px;
    position: relative;

    /* ::after{
        content: '';
        width: 5px;
        height: 200px;
        border-left: solid #CD50FA 3px;
        border-right: solid #CD50FA 3px;
        position: absolute;
        right: 0;
        top: 25%;
        
    } */
`;

const TaskTitle = styled.h2`
    margin: 2rem;
    color: #CD50FA;
`;

const Input = styled.input`
    margin: 2rem;
    outline: none;
    border: double 3px #CD50FA;
    border-radius: 2px;

    ::placeholder{
        color: #590479;
    }

    :focus{
        background: #CD50FA;
        color: #fff;
    }

    :focus::placeholder{
        color: #edebe6;
    }

   
`;

const AddTask = styled.button`
    background: #1a1919;
    border-style: none;
    color: #edebe6;
    width: 90px;
    height: 40px;
    padding: 2px;
    border-radius: 5px;
    box-shadow: inset 3rem 0 28px  #CD50FA, 2px 2px 5px  #3D0B37;
    cursor: pointer;
    font-size: 14.5px;
    transition: box-shadow ease-in-out 2s;

    :active{
        transform: scale(.95);
    }

    :hover{
        
        box-shadow: inset 90px 0 #CD50FA, 2px 2px 5px  #3D0B37;
    }
`;

const DisplayedTasks = styled.div`
   
    /* border: solid red 1px; */
    width: 80vw;
    margin: 2rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-top: double #CD50FA 5px;
    border-radius: 2px;
`;

const SecondTitle = styled.h2`
    margin: 2rem;
    color: #CD50FA;
`;

const TaskList = styled.div `
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

const Postit = styled.div `
    width: 150px;
    height: 150px;
    background-image: url(${postit});
    background-repeat: no-repeat;
    background-size: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotate(${props => props.rotate});
    position: relative;
    margin: 1.5rem;
    padding: 5px;
`;

const PostitText = styled.p `
    width: 78%;
    text-align: center;
    color: #590479 ;
    font-weight: bold;
    
`;

const PostitClose = styled.button `
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    color: red;
    font-size: 12px;
    font-weight: bold;
    top: 15%;
    right: 2%;
`;

const ToDo = () => {
    const [task, setTask] = useState();
    const [taskList, setTaskList] = useState([]);

    const generateRandomPostits = () => {
        const randomNumber = Math.floor(Math.random() * 11);
        const randomOperation = Math.floor(Math.random() * 2);

        return `${randomOperation === 0? "-" : "+"}${randomNumber}deg`
    };

    const addItems = (e) => {
        e.preventDefault();
        setTaskList([...taskList, { task: task, id: new Date(), rotate: generateRandomPostits() }]);
        setTask('')
    };

    const removeItem = (id) => {
        const newList = taskList.filter(item => id !== item.id);
        setTaskList(newList);
    };

    

    return (
        <Container>
            <GlobalStyle />
            <Title>ToDo List</Title>
            <Main>
                <InputTasks>
                    <TaskTitle>Escreva aqui suas tarefas ;)</TaskTitle>
                    <Input
                        value={task}
                        onChange={e => setTask(e.target.value)}
                        type='text'
                        placeholder="digite sua tarefa"
                        maxLength= '65' 
                        />
                    <AddTask
                        onClick={addItems}
                    >Adicionar</AddTask>
                </InputTasks>
                <DisplayedTasks>
                    <SecondTitle>Suas tarefas</SecondTitle>
                    <TaskList>
                        {taskList.map( task => <Postit rotate={task.rotate}>
                            <PostitText>{task.task}</PostitText>
                            <PostitClose
                            onClick={() => removeItem(task.id)}
                            >X</PostitClose>
                        </Postit>)}
                    </TaskList>
                </DisplayedTasks>
            </Main>
        </Container>
    )
}

export default ToDo;