import axios from "axios"
import { OperationItem } from "../models/operation"

export interface OperationInfo {
    name: string
}

export const fetchOperations = async () => {
    const { data } = await axios.get<OperationItem[]>(`http://localhost:3001/operation`)
    return data
}

export const postOperation = async (operation: OperationInfo) => {
    const { data: newRow } = await axios.post<OperationItem>(`http://localhost:3001/operation`, operation)
    return newRow
}

export const deleteOperation = async (id: number) => {
    return await axios.delete(`http://localhost:3001/operation/${id}`)
}