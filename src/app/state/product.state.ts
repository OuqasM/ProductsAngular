export enum DataStateEnum {
    LOADING,
    LOADED,
    ERROR
}

export enum ActionEventType {
    ALL,
    SELECTED,
    AVAILABLE,
    NEW,
    SEARCH,
    DELETE,
    SELECT,
    EDIT
}

export interface ActionEvent {
    type : ActionEventType,
    data : any
}

export interface AppDataState<T>{
    dataState ?: DataStateEnum,
    data ?: T,
    errorMessage  ?:string
}