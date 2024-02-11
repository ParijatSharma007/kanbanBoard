import DashBoards from './DashBoards'
import ItemCards from './ItemCards'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DragDropContext} from '@hello-pangea/dnd'
import { ContextInterface, DndState } from '@/typescript/interfaces/dnd-interfaces'
import { dragLogic } from '@/helperFunctions/dndLogics'
import { DropResult } from '@hello-pangea/dnd'
import PendingTaskAdder from './PendingTaskAdder'
import { useSelector } from 'react-redux'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase.config'
import { useRouter } from 'next/router'

const KanbanBoard= () => {
  const router = useRouter()
  const [todo, setTodo] = useState<DndState>({
    pending : [],
    resolve : [],
    reject : []
  })
  
  const userData : ContextInterface = useSelector((state : any) => state.userData)
  const [prevTodo, setPrevTodo] = useState<DndState>({
    pending: [],
    resolve: [],
    reject: [],
  });
  const auth = window.localStorage.getItem("UID")
  useEffect(() => {
    const getTodo = async() =>{
      if(auth){
        const userDocRef = doc(db, "users", auth)
        const userDocSnap = await getDoc(userDocRef)
        if(userDocSnap.exists()){
          setTodo(userDocSnap.data().todo)
        }
      }
    }
    getTodo()
  }, [auth])
  if(!auth){
    return router.push('/signin')
  }

  console.log(userData);
  

  


  const onDragEnd = async(result : DropResult) => {
    if(result.destination){
      const newTodo = dragLogic(result.source, result.destination, todo)
      setPrevTodo(todo)
      setTodo(newTodo)
      try{
        const userRef = collection(db, 'users')
        await setDoc(doc(userRef, auth), {
          name : userData.name,
          email : userData.email,
          todo : {...newTodo}
        })
      }catch(err){
        console.log(err);
        setTodo(prevTodo)
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box display={"flex"} flexDirection={"column"}>
        <Box
          sx={{
            "& .MuiInputBase-root": {
              height: "90%",
            },
            border: 1,
            padding: "10px",
            height: "100%",
            width: "70%",
            borderRadius: "16px",
            borderWidth: " 3px",
            borderColor: "#7393B3",
          }}
          display={"flex"}
          flexDirection={"row"}
        >
          <DashBoards borderColor="blue" droppableId="pending">
            {todo.pending.map((context, idx) => (
              <ItemCards
                dragableId={"pending dropable : " + idx}
                index={idx}
                key={"pending dropable : " + idx}
              >
                {context}
              </ItemCards>
            ))}
          </DashBoards>
          <DashBoards borderColor="green" droppableId="resolve">
            {todo.resolve.map((context, idx) => (
              <ItemCards
                dragableId={"resolve dropable :" + idx}
                index={idx}
                key={"resolve dropable :" + idx}
              >
                {context}
              </ItemCards>
            ))}
          </DashBoards>
          <DashBoards borderColor="red" droppableId="reject">
            {todo.reject.map((context, idx) => (
              <ItemCards
                dragableId={"reject dropable :" + idx}
                index={idx}
                key={"reject dropable :" + idx}
              >
                {context}
              </ItemCards>
            ))}
          </DashBoards>
        </Box>
        <Box>
          <PendingTaskAdder
            passingUserinput={(value) =>
              setTodo({ ...todo, pending: [...todo.pending, value] })
            }
          />
        </Box>
      </Box>
    </DragDropContext>
  );
}

export default KanbanBoard
