import React, { useState, useRef, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import postit from '../assets/postit.png';
import edit from '../assets/editing.png';
import check from '../assets/check.png';
import Alert from "./modals/Alert";

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
    filter: ${props => props.haveModal? 'blur(4px)': 'none' };
   

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

    @media(max-width: 768px){
        flex-direction: column;
        align-items: center;
    }
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

    @media(max-width: 768px){
       width: 80%;
    }
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
    width: 80vw;
    margin: 2rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-top: double #CD50FA 5px;
    border-radius: 2px;

    @media(max-width: 768px){
        width: 100%;
    }
`;

const SecondTitle = styled.h2`
    margin: 2rem;
    color: #CD50FA;
`;

const TaskList = styled.div `
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
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
   

    :hover button{
        display: block;
    }
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
    display: none;
`;


const ContainerModal = styled.div `
    width: 40vw;
    height: 50vh;
    background-color: #fff;
    box-shadow: 2px 2px 5px 1px gray;
    /* padding: 1rem; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;


`;

const PostitEdit = styled.button `
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    color: red;
    font-size: 12px;
    font-weight: bold;
    bottom: 18px;
    right: 0;
    display: none;
`

const EditButton = styled.img `
    width: 20px;
`;

const CheckButton = styled.img `
    width: 20px;
`

const ButtonClose = styled.button `
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    color: red;
    font-size: 16px;
    font-weight: bold;
    top: 2%;
    right: 1%;
`;

const EditInput = styled.input `
    width: 80%;
    border: solid 2px #590479;
    border-radius: 3px;
    outline-color: #590479;
`;

const ToDo = () => {
    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('toDos')) || []);
    const [openModal, setOpenModal] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [textEditable, setTextEditable] = useState('');

    const inputEl = useRef()

    const generateRandomPostits = () => {
        const randomNumber = Math.floor(Math.random() * 11);
        const randomOperation = Math.floor(Math.random() * 2);

        return `${randomOperation === 0? "-" : "+"}${randomNumber}deg`
    };

    const addItems = (e) => {
        e.preventDefault();
        if(task !== ''){
            if(taskList.length < 5){
                const willreturn = [...taskList, { task: task, id: Date.now(), rotate: generateRandomPostits() }];
        localStorage.setItem('toDos', JSON.stringify(willreturn));
        setTaskList(willreturn);
        setTask('')
            }

            if (taskList.length === 5){
                setOpenModal(true);
            }
        }
        
    };

    const removeItem = (id) => {
        const newList = taskList.filter(item => id !== item.id);
        localStorage.setItem('toDos', JSON.stringify(newList))
        setTaskList(newList);
    };

    const generateModal = (modal) => {

        const handleClick = () => {
            setOpenModal(false)
        }
        return (
        <ContainerModal>
            <ButtonClose onClick={handleClick} >X</ButtonClose>
            {modal}
        </ContainerModal>
            
        )
    };

    const HandleClickEditing = (id) => {
        setIsEditable(id);
    };

    const handleCliclConfirmEdit = (id) => {        
        const editedTask =  taskList.map( item => {
            if(id === item.id){
                item.task = textEditable !== ''? textEditable: item.task

                return item
            }

            return item
        });
        setTaskList(editedTask)
        setIsEditable(0)
        localStorage.setItem('toDos', JSON.stringify(editedTask))
        setTextEditable('')
    }

    useEffect(() => {
       if(isEditable){
        inputEl.current.focus()
       }
    },[isEditable])

    return (
        <>
            <Container haveModal={openModal} >
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
                        disabled={openModal}
                        />
                    <AddTask
                        onClick={addItems}
                        disabled={openModal}
                    >Adicionar</AddTask>
                </InputTasks>
                <DisplayedTasks>
                    <SecondTitle>Suas tarefas</SecondTitle>
                    <TaskList>
                        {taskList.map( task => <Postit rotate={task.rotate}>
                            <PostitText
                            >{isEditable === task.id
                            ? <EditInput 
                            type='text' 
                            maxLength= '65' 
                            onChange={e => setTextEditable(e.target.value)}
                            ref={inputEl}
                            /> 
                            : task.task}
                            </PostitText>
                            <PostitClose
                            onClick={() => removeItem(task.id)}
                            disabled={openModal}
                            >X</PostitClose>
                            {isEditable === task.id
                            ? <CheckButton 
                            src={check} 
                            onClick={() => handleCliclConfirmEdit(task.id)}
                            />
                            : <PostitEdit> 
                                <EditButton 
                                onClick={ (e)=> HandleClickEditing(task.id, e)} 
                                src={edit} 
                            />
                            </PostitEdit>
                            }
                        </Postit>)}
                    </TaskList>
                </DisplayedTasks>
            </Main>
            
        </Container>
        {openModal && generateModal(<Alert />)}
        </>
    )
}

export default ToDo;