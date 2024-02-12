import { Droppable } from '@hello-pangea/dnd'
import { Container, Box, Typography } from '@mui/material'
import React from 'react'

interface Children {
    children : JSX.Element | JSX.Element[] | null | undefined
    borderColor : string
    droppableId : string
    title : string,
    backgroundColor : string
}

const DashBoards = ({children, borderColor,backgroundColor, ...props} : Children) => {
  return (
      <Droppable droppableId={props.droppableId}>
        {(provided, snapshot) => (
        <Container 
        ref={provided.innerRef}
        sx={{
            height : "700px",
            width : "27%",
            border : 1,
            padding : "6px",
            borderRadius : "16px",
            overflow : "auto",
            display : "block",
            borderWidth : '3px',
            borderColor : {borderColor},
            backgroundColor : {backgroundColor}
        }}>
          <Typography variant='h5' sx={{textAlign : 'center'}}>{props.title}</Typography>
          <hr/>
            <Box>
                {children}
            </Box>
          {provided.placeholder}
        </Container>
        )}
      </Droppable>
  )
}

export default DashBoards