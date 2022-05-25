import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import useAuditFormLocalStorage from "../hooks/useAuditFormLocalStorage";
import AuditLogInfo from "./AuditLogInfo";

const initialFormData = () => ({
    name: "",
    city: "",
    site_desc: "",
    lat: "",
    lng: "",
    createdAt: null,
    updatedAt: null
});

const initialFormState = () => ({
    name: false,
    city: false,
    site_desc: false,
    lat: false,
    lng: false
});
export default function AuditLogForm() {
    const { data, loading, error, setData, setLoading } = useAuditFormLocalStorage(initialFormData());
    const [values, setValues] = useState(data);
    const [isInvalid, setIsInvalid] = useState(initialFormState());
    const [isSuccessAlertOpened, setIsSuccessAlertOpened] = useState(false);
    const handleValueChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const validate = () => {
        let isValid = true;
        const new_validateStatus = {};
        Object.entries(values).forEach(([key, val]) => {
            new_validateStatus[key] = !val;
            if (!val && key !== "createdAt" && key !== "updatedAt") {
                isValid = false;
            }
        });
        setIsInvalid(new_validateStatus);
        return isValid;
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }
        setLoading(true);
        const createdUpdatedDate = {};
        if (!values.createdAt) {
            createdUpdatedDate.createdAt = new Date().toString();
        }
        createdUpdatedDate.updatedAt = new Date().toString();
        const _newValues = {
            ...values,
            ...createdUpdatedDate
        };
        setValues(_newValues);
        console.log(_newValues);
        // fake api call
        setTimeout(() => {
            setData(_newValues);
            setLoading(false);
            setIsSuccessAlertOpened(true);
            setTimeout(() => {
                setValues(initialFormData());
            }, 100);
        }, 2000);
    };
    const handleFormCancel = (event) => {
        event.preventDefault();
        const { createdAt, updatedAt, ...resetValues } = initialFormData();
        setIsInvalid(initialFormState());
        setValues({
            ...resetValues,
            createdAt: values.createdAt,
            updatedAt: values.updatedAt
        });
    };

    useEffect(() => {
        setValues(data);
    }, [data]);

    return (
        <Box>
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div>
                <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
                    <Button variant="outlined" startIcon={<SaveIcon />} onClick={handleFormSubmit}>
                        Save
                    </Button>
                    <Button variant="outlined" startIcon={<CloseIcon />} sx={{ color: "gray", borderColor: "gray", "&:hover": { borderColor: "darkgray" } }} onClick={handleFormCancel}>
                        Cancel
                    </Button>
                </Stack>
                <Divider />
            </div>
            <div>
                <p>Site Id: 1</p>
                <Box mb={3}>
                    <TextField label="Name" fullWidth error={isInvalid.name} name="name" value={values.name} onChange={handleValueChange} />
                </Box>

                <Box mb={3}>
                    <TextField label="Jurisdiction/City/Region" error={isInvalid.city} name="city" value={values.city} onChange={handleValueChange} fullWidth inputProps={{ style: { height: 50 } }} />
                </Box>
                <Box mb={3}>
                    <TextField label="Site Description" name="site_desc" error={isInvalid.site_desc} value={values.site_desc} onChange={handleValueChange} fullWidth inputProps={{ style: { height: 50 } }} />
                </Box>
                <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
                    <TextField label="Latitude" name="lat" value={values.lat} type="number" error={isInvalid.lat} onChange={handleValueChange} />
                    <TextField label="Longitute" name="lng" value={values.lng} type="number" error={isInvalid.lng} onChange={handleValueChange} />
                </Stack>
            </div>
            <AuditLogInfo createdAt={values.createdAt} updatedAt={values.updatedAt} />

            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isSuccessAlertOpened}>
                <Snackbar open={isSuccessAlertOpened} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={() => setIsSuccessAlertOpened(false)}>
                    <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
                        Audit log saved successfully.
                    </Alert>
                </Snackbar>
            </Backdrop>
        </Box>
    );
}
