import React from "react";
import ColorItemProps from "./ColorItemProps";
import {HSLColor} from "react-color";
import Button from "@mui/material/Button";
import CopySnackbar from "../CopySnackbar/CopySnackbar";
import {Box} from "@mui/material";
import CopySnackbarHandler from "../CopySnackbar/CopySnackbarHandler";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

function HSLToString(color?: HSLColor) {
    if (color) {
        return "hsl(" + Math.round(color.h) + " " + Math.round(color.s*100) + "% " + Math.round(color.l*100) + "%)"
    } else {
        return "hsl(0deg 0% 100%)"
    }
}

    function getTextColor(color?: HSLColor): string {
    if (color) {
        if (color.l >= 0.7) return "black"
        else return "white"
    } else return "inherit"
}

function normalizeHSL(color?: HSLColor): HSLColor {
    if (color) return {h: Math.round(color.h), s: Math.round(color.s*100), l: Math.round(color.l*100)}
    else return {h: 0, s: 0, l: 100}
}

// source https://stackoverflow.com/a/44134328
function HSLToHex(color: HSLColor): string {
    let h = color.h
    let s = color.s
    let l = color.l
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = (x: number) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}


export default function ColorItem(props: ColorItemProps) {
    const [snackBarIsOpen, setSnackBarIsOpen] = React.useState(false);
    const onClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setSnackBarIsOpen(!snackBarIsOpen)
        navigator.clipboard.writeText(HSLToHex(normalizeHSL(props.hsl)))
    }

    const copySnackbarHandler: CopySnackbarHandler = {
        handleClose(event?: React.SyntheticEvent | Event, reason?: string) {
            if (reason === 'clickaway') {
                return;
            }

            setSnackBarIsOpen(false);
        }
    }
    return <Box>
        <Button
        variant="outlined"
        style={{backgroundColor: HSLToString(props.hsl), color: getTextColor(props.hsl)}}
        fullWidth={true}
        onClick={onClickHandler}
        endIcon={<ContentCopyOutlinedIcon />}
        >
            {HSLToString(props.hsl)}
        </Button>
        <CopySnackbar isOpen={snackBarIsOpen} handler={copySnackbarHandler}/>
    </Box>
}
