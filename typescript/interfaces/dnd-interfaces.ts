
export interface IUsersData {
    name : string,
    email : string,
    todo : DndState
}

export interface DndState {
    pending : string[]
    resolve : string[]
    reject : string[]
}

export interface ContextInterface extends IUsersData {
    uid : string
}