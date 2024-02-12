import React from 'react'
import { Box } from '@mui/material'
import { Draggable } from '@hello-pangea/dnd'

interface IItemCards {
    children : (JSX.Element|string)[] | JSX.Element | string
    dragableId : string
    index : number
}

const ItemCards = ({children, ...props} : IItemCards) => {
  return (
    <Draggable draggableId={props.dragableId} index={props.index}>
      {(provided, snapshot) => (
        <Box
          sx={{
            height: "70px",
            weight: "20%",
            padding: "7px",
            paddingTop: "12px",
            border: "1px solid orange",
            borderWidth: "2px",
            borderRadius: "16px",
            zIndex: "2",
            margin: "9px",
            backgroundColor: "white",
            overflow :"auto",
            opacity : '0.8'
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >{children}
        </Box>
      )}
    </Draggable>
  );
}

export default ItemCards
