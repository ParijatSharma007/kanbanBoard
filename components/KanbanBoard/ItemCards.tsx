import React from 'react'
import { Typography, Box } from '@mui/material'
import { Draggable, DraggableProvided } from '@hello-pangea/dnd'
import DeleteIcon from '@mui/icons-material/Delete';
interface IItemCards {
    children : string | JSX.Element | JSX.Element[]
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
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box>
          <DeleteIcon sx={{color:"red", padding:"0px 200px"}}/>
          </Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Draggable>
  );
}

export default ItemCards
