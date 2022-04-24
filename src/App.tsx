import React, {useState} from 'react';
import ColorPaletteDialog from "./components/ColorPaletteDialog/ColorPaletteDialog";
import ColorPaletteDialogProps from "./components/ColorPaletteDialog/ColorPaletteDialogProps";
import ColorPaletteDialogHandler from "./components/ColorPaletteDialog/ColorPaletteDialogHandler";
import {HSLColor} from "react-color";
import ColorItemList from "./components/ColorItemList/ColorItemList";
import ColorUtils from "./utils/ColorUtils";
import {
    AppBar, Box, Container,
    createTheme,
    CssBaseline,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App: React.FC = () => {
    // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    const [colors, setColors] = useState<HSLColor[]>([])

    const colorPaletteDialogHandler: ColorPaletteDialogHandler = {
        onClose(color: HSLColor) {
            const utils = new ColorUtils()
            setColors(utils.decomposeColor(color))
        }
    }
    const colorPaletteDialogProps: ColorPaletteDialogProps = {open: false, handler: colorPaletteDialogHandler}

    return <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <Paper elevation={0}>
                <CssBaseline />
                <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography>
                        HSL slicer
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Box>
                    <Box>
                        <ColorPaletteDialog {...colorPaletteDialogProps}/>
                    </Box>
                </Toolbar>
                </AppBar>
                <Container maxWidth="sm" sx={{p: 2}}>
                    <Grid container spacing={5} className="App">
                        <Grid item xs={12}>
                            <ColorItemList colors={colors} />
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </ThemeProvider>
    </ColorModeContext.Provider>
}

export default App;
