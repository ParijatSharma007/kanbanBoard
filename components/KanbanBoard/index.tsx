import DashBoards from './DashBoards'
import ItemCards from './ItemCards'
import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DragDropContext} from '@hello-pangea/dnd'
import { DndState } from '@/typescript/interfaces/dnd-interfaces'
import { dragLogic } from '@/helperFunctions/dndLogics'
import { DropResult } from '@hello-pangea/dnd'
import PendingTaskAdder from './PendingTaskAdder'
import { useRouter } from 'next/router'
import DeleteIcon from '@mui/icons-material/Delete';
import { getBoard, updateTask, setTask } from '@/apiCalls/fireBase'

const KanbanBoard= () => {
  const router = useRouter()
  const [auth,setAuthId]=useState<string|null|undefined>(null)
  const [todo, setTodo] = useState<DndState>({
    pending : [],
    resolve : [],
    reject : []
  })
  const [prevTodo, setPrevTodo] = useState<DndState>({
    pending: [],
    resolve: [],
    reject: [],
  });
  
  useEffect(() => {
    const uid = window.localStorage.getItem("UID")
    if(!uid){
      router.push('/signin')
    }
    setAuthId(uid)
    const loadDoc = async(uid : string) => {
      console.log(uid);
      const {error, data} = await getBoard(uid)
      console.log(error, data);
      
      if(!error){
        setTodo(data as DndState)
      }}
      if(uid){
        loadDoc(uid)
      }   
    }, [router])
  
  const addNewTodo = async(value : string) => {
    setPrevTodo(todo)
    setTodo({ ...todo, pending: [...todo.pending, value] })
    if(auth){
      const {error} = await updateTask(auth, [...todo.pending,value], "pending")
      if(error){
        setTodo(prevTodo)
      }
    }
  }

  const onDragEnd = async(result : DropResult) => {
    if(result.destination){
      const newTodo = dragLogic(result.source, result.destination, todo)
      setPrevTodo(todo)
      setTodo(newTodo)
      if(auth){
        const {error} = await setTask(auth, newTodo)
        if(error){
          setTodo(prevTodo)
        }
      }
    }
  }

  const deleteHandler = (col : string, idx : number) => {
    const testTodo = todo
    testTodo[col as keyof DndState].splice(idx, 1) 
    setPrevTodo(todo)
    setTodo(testTodo)
    try{
      if(auth){
        updateTask(auth, testTodo[col as keyof DndState], col)
      }else{
        setTodo(prevTodo)
      }
    }catch(err){
      setTodo(prevTodo)
    }
  }


  return (
    
    <DragDropContext onDragEnd={onDragEnd}>
      <Box>
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
              backgroundColor : '#D7BDE2'
            }}
            display={"flex"}
            flexDirection={"row"}
          >
            <DashBoards borderColor="blue" backgroundColor='#4884E8 '
            droppableId="pending" title='PENDING'>
              {todo.pending.map((context, idx) => (
                <ItemCards
                  dragableId={"pending dropable : " + idx}
                  index={idx}
                  key={"pending dropable : " + idx}
                >
                  {context}
                  <Box>
                    <DeleteIcon 
                    sx={{color:"red", 
                    position : "static", 
                    paddingTop : "17px"}}
                    onClick={() => deleteHandler("pending", idx)} 
                    />
                  </Box>
                </ItemCards>
              ))}
            </DashBoards>
            <DashBoards borderColor="green" backgroundColor='#63E848 '
            droppableId="resolve" title='RESOLVE'>
              {todo.resolve.map((context, idx) => (
                <ItemCards
                  dragableId={"resolve dropable :" + idx}
                  index={idx}
                  key={"resolve dropable :" + idx}
                >
                  {context}
                  <Box>
                    <DeleteIcon 
                    sx={{color:"red", 
                    position : "static", 
                    paddingTop : "17px"}}
                    onClick={() => deleteHandler("resolve", idx)} 
                    />
                  </Box>
                </ItemCards>
              ))}
            </DashBoards>
            <DashBoards borderColor="red" backgroundColor='#E84848'
            droppableId="reject" title='REJECT'>
              {todo.reject.map((context, idx) => (
                <ItemCards
                  dragableId={"reject dropable :" + idx}
                  index={idx}
                  key={"reject dropable :" + idx}
                >
                  {context}
                  <Box>
                    <DeleteIcon 
                    sx={{color:"red", 
                    position : "static", 
                    paddingTop : "17px"}}
                    onClick={() => deleteHandler("reject", idx)} 
                    />
                  </Box>
                </ItemCards>
              ))}
            </DashBoards>
          </Box>
          <Box sx={{
            position : 'relative',
            left : '75%',
            zIndex : "1000"
          }}>
            <PendingTaskAdder
              passingUserinput={addNewTodo}
            />
          </Box>
        </Box>
    </DragDropContext>
  );
}

export default KanbanBoard
