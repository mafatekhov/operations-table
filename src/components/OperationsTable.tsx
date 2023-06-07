
import React, { memo, useState } from "react"
import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import SyncIcon from '@mui/icons-material/Sync'
import CreateOperationDialog, { CreateOperationFormData } from "./CreateOperationModal"
import { useOperations } from "../hooks/useOperations"
import { Status } from "../models/status"


const useStyles = makeStyles(() => ({
    action: {
        cursor: 'pointer'
    },
    container: {
        padding: '16px'
    }
}))


const statusIconsMap = {
    [Status.READY]: (<DoneIcon style={{ color: 'green' }} />),
    [Status.FAILED]: (<CloseIcon style={{ color: 'red' }} />),
    [Status.RUNNING]: (<SyncIcon style={{ color: 'blue' }} />)
}


export const OperationsTable: React.FC = () => {
    const classes = useStyles()

    const [open, setOpen] = useState<boolean>(false)

    const { operations, onOperationCreate, onDelete } = useOperations()

    const openModal = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const onCreate = ({ name }: CreateOperationFormData) => {
        onOperationCreate(name)
        setOpen(false)
    }


    return (
        <Grid
            container
            direction="column"
            spacing={2}
            className={classes.container}
        >
            <Grid item alignSelf="flex-end">
                <Button onClick={openModal}>Create</Button>
            </Grid>
            <Grid item>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Operation</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {operations.length > 0 ? operations.map((row, idx) => (
                                <TableRow
                                    key={`${row.name}-${idx}`}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{statusIconsMap[row.status]}</TableCell>
                                    <TableCell>
                                        {row.status === Status.RUNNING ? ('N/A') :
                                            (<DeleteOutlineOutlinedIcon
                                                onClick={() => onDelete(row.id)}
                                                className={classes.action}
                                            />)}
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell>No data</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <CreateOperationDialog isOpen={open} handleClose={handleClose} onOperationCreate={onCreate} />
            </Grid>
        </Grid>
    )
}