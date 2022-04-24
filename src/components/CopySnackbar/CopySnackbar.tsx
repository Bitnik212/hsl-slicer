import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import {Alert} from "@mui/material";
import CopySnackbarProps from "./CopySnackbarProps";

export default function CopySnackbar (props: CopySnackbarProps) {

    return <Snackbar open={props.isOpen} autoHideDuration={6000} onClose={props.handler?.handleClose}>
        <Alert onClose={props.handler?.handleClose} severity="info" sx={{ width: '100%' }}>
            Цвет скопирован
        </Alert>
    </Snackbar>
}
