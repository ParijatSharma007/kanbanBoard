import { DndState } from "@/typescript/interfaces/dnd-interfaces"
interface DraggableLocation {
  droppableId : string
  index : number
} 

export const dragLogic = (source : DraggableLocation, destination : DraggableLocation, todoState : DndState) => {
    
    if(!destination){
        return todoState
    }
    if(source.droppableId === destination.droppableId 
        && source.index === destination.index) return todoState

        
    let newTodo = {...todoState}
    
    const sourceCol = source.droppableId
    const destinationCol = destination.droppableId
    const sourceIdx = source.index
    const destinationIdx = destination.index

    const [draggedTodo] = newTodo[sourceCol as keyof DndState].splice(sourceIdx, 1)
    newTodo[destinationCol as keyof DndState].splice(destinationIdx, 0, draggedTodo)

    return newTodo
}