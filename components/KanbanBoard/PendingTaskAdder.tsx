import React, { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'

interface ItextField {
    passingUserinput : (e :string) => void
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
const a  = null;
const b = Number(a)
const addTask =() => {
    passingUserinput(userInput)
    setUserInput("")
    setBtnDisabled(false)
}

  return (
    <Box 
    display={'flex'}
    flexDirection={'column'}
    sx={{
        justifyContent : "center",
        alignItems : 'center'
    }}>
        <TextField
          onChange={onChangeHandler}
          value={userInput}
        />
        <Button disabled={!btnDisabled} 
        onClick={addTask}
        sx={{
            '& .MuiInputBase-root' : {
                height : "300px"
            }
        }}
        >ADD TASK</Button>

    </Box>
  )
}

export default PendingTaskAdder
