import React from "react"
import { Button, Dialog, Grid, TextField, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useForm } from "react-hook-form";

interface CreateOperationDialogProps {
    isOpen: boolean
    handleClose: () => void
    onOperationCreate: (data: CreateOperationFormData) => void
}

export interface CreateOperationFormData {
    name: string
}

const useStyles = makeStyles(() => ({
    closeDialog: {
        color: '#808080',
        cursor: 'pointer'
    },
    title: {
        width: 'auto',
        height: '50px',
    },
    wrapper: {
        minWidth: '300px',
        minHeight: '300px',
        padding: '10px'
    },
    dialogActions: {
        height: '50px',
    },
    error: {
        color: 'red'
    }
}))

const CreateOperationDialog: React.FC<CreateOperationDialogProps> = ({ isOpen, handleClose, onOperationCreate }) => {
    const classes = useStyles()

    const { register, handleSubmit, formState: { errors } } = useForm<CreateOperationFormData>()

    const onSubmit = (data: CreateOperationFormData) => {
        onOperationCreate(data)
    }

    return (
        <Dialog onClose={handleClose} open={isOpen}>
            <Grid container className={classes.wrapper} justifyContent="center" spacing={2}>
                <Grid container item className={classes.title} justifyContent="space-between">
                    <Typography variant="h5">Create Operation</Typography>
                    <Grid item alignSelf="center">
                        <CloseOutlinedIcon className={classes.closeDialog} onClick={handleClose} />
                    </Grid>
                </Grid>
                <Grid item>
                    <form>
                        <Grid container direction="column">
                        <TextField label="Name" variant="standard" {...register("name", { required: true })} />
                        {errors.name && (
                            <Typography variant="caption" className={classes.error}>
                                Name is required
                            </Typography>)
                        }

                        </Grid>
                    </form>
                </Grid>
                <Grid
                    container
                    item
                    className={classes.dialogActions}
                    alignSelf="end"
                >
                    <Button onClick={handleSubmit(onSubmit)}>Create</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default CreateOperationDialog