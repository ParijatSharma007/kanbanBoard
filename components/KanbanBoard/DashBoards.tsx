import { Droppable } from '@hello-pangea/dnd'
import { Container, Box } from '@mui/material'
import React from 'react'

interface Children {
    children : JSX.Element | JSX.Element[] | null | undefined
    borderColor : string
    droppableId : string
}

const DashBoards = ({children, borderColor, ...props} : Children) => {
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
            
        }}>
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