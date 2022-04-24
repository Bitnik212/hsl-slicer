import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import React from "react";
import ColorPaletteDialogProps from "./ColorPaletteDialogProps";
import Button from "@mui/material/Button";
import "react-color-palette/lib/css/styles.css";
import {ChromePicker, ColorResult} from 'react-color';

export default function ColorPaletteDialog(props: ColorPaletteDialogProps) {
    const [open, setOpen] = React.useState(props.open);
    const [color, setColor] = React.useState({h: 0, s: 0, l: 100});

    const showDialogHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setOpen(!open);
        if (open) props.handler?.onClose(color);
    }

    const colorChangeHandler = (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(color.hsl)
    }

    return <div>
        <Button variant="contained" onClick={showDialogHandler}>выбрать цвет</Button>
        <Dialog open={open}>
            <DialogTitle>Выберите базовый цвет</DialogTitle>
            <DialogContent dividers>
                <ChromePicker color={color}  onChange={colorChangeHandler} />
            </DialogContent>
            <DialogActions>
                <Button onClick={showDialogHandler}>
                    Выбрать
                </Button>
            </DialogActions>
        </Dialog>
    </div>

}

