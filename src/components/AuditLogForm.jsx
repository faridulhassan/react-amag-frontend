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
export default function AuditLogForm() {
    const { data, loading, error, setData, setLoading } = useAuditFormLocalStorage();
    const [values, setValues] = useState({});
    const handleValueChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };
    useEffect(() => {
        setValues(data);
    }, [data]);
    const handleFormSubmit = (event) => {
        event.preventDefault();

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
        // fake api call
        setTimeout(() => {
            setData(_newValues);
            console.log(_newValues);
            setLoading(false);
        }, 2000);
    };
    const handleFormCancel = (event) => {
        event.preventDefault();
        setValues(initialFormData());
        console.log(values);
    };
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
                    <TextField label="Name" fullWidth error={false} name="name" value={values.name} onChange={handleValueChange} />
                </Box>

                <Box mb={3}>
                    <TextField label="Jurisdiction/City/Region" name="city" value={values.city} onChange={handleValueChange} fullWidth inputProps={{ style: { height: 50 } }} />
                </Box>
                <Box mb={3}>
                    <TextField label="Site Description" name="site_desc" value={values.site_desc} onChange={handleValueChange} fullWidth inputProps={{ style: { height: 50 } }} />
                </Box>
                <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
                    <TextField label="Latitude" name="lat" value={values.lat} onChange={handleValueChange} />
                    <TextField label="Longitute" name="lng" value={values.lng} onChange={handleValueChange} />
                </Stack>
            </div>
            <AuditLogInfo createdAt={values.createdAt} updatedAt={values.updatedAt} />
        </Box>
    );
}
