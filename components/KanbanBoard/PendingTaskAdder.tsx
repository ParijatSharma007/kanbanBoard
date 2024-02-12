import React, { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'

interface ItextField {
    passingUserinput : (e :string) => void,
}

const PendingTaskAdder = ({passingUserinput} : ItextField) => {
  const [userInput, setUserInput] = useState<string>("")
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false)
  const onChangeHandler = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(e.target.value && e.target.value.length !== 0){
        setBtnDisabled(true)
    }
    else{
        setBtnDisabled(false)
    }
    setUserInput(e.target.value)
  }
  
const addTask =() => {
    passingUserinput(userInput)
    setUserInput("")
    setBtnDisabled(false)
  }

  return (
    <Box
    flexDirection={'column'}>
        <TextField
        sx={{
          border:"1px solid #000",
          borderRadius:"10px",
          "& .MuiInputBase-root" : {
            height : "150px",
            width : "200px",
            bottom : "50"
          },
          position : 'relative',
        
          
        }}
          onChange={onChangeHandler}
          value={userInput}
        />
        <Button disabled={!btnDisabled} 
        onClick={addTask}
        sx={{
            '& .MuiInputBase-root' : {
                height : "20px",
                
            },
            
        }}
        >ADD TASK</Button>

    </Box>
  )
}

export default PendingTaskAdder
