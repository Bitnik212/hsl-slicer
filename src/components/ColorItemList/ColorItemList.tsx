import React from "react";
import ColorItem from "../ColorItem/ColorItem";
import ColorItemListProps from "./ColorItemListProps";
import {Grid} from "@mui/material";

function ColorItemList (props: ColorItemListProps) {
    return <Grid container spacing={1}>
        {props.colors.map( hsl => (<Grid key={Math.round(hsl.l*100)} item xs={12}><ColorItem  hsl={hsl} /></Grid>) )}
    </Grid>
}

export default ColorItemList;
