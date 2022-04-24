import * as React from "react";

export default interface CopySnackbarHandler {
    handleClose(event?: React.SyntheticEvent | Event, reason?: string): void
}