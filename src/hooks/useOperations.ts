import React, { useEffect, useState } from "react"
import axios from 'axios'
import { OperationItem } from "../models/operation"
import io from "socket.io-client"
import { OperationInfo, deleteOperation, fetchOperations, postOperation } from "../utils/operationsAPI"

const socket = io("http://localhost:3001")

export const useOperations = () => {
    const [operations, setOperations] = useState<OperationItem[]>([])

    const fetchData = async () => {
        const operations = await fetchOperations()
        setOperations(operations)
    }

    const addOperation = async (operation: OperationInfo) => {
        const newRow = await postOperation(operation)
        setOperations([...operations, newRow])
    }

    useEffect(() => {
        fetchData()
    }, [])


    socket.on("receiveMessage", (operation: OperationItem) => {
        const operationToUpdate = operations.find(({ id }) => id === operation.id)
        if (!operationToUpdate) {
            setOperations([...operations, operation])
            return
        }
    });

    const onOperationCreate = (name: string) => {
        addOperation({ name })
    }

    const onDelete = async (idx: number) => {
        await deleteOperation(idx)
        fetchData()
    }

    return {
        operations,
        onOperationCreate,
        onDelete
    }
}