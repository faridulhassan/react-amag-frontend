import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useState } from "react";
import Divider from "@mui/material/Divider";

const initialFormValues = () => ({
    name: "",
    city: "",
    site_desc: "",
    lat: "",
    lng: ""
});
export default function AuditLogForm() {
    const [values, setValues] = useState(initialFormValues());
    const [createdInfo, setCreatedInfo] = useState({
        name: "",
        date: "",
        time: ""
    });
    const [updatedInfo, setUpdatedInfo] = useState({
        name: "",
        date: "",
        time: ""
    });
    const handleValueChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(values);
    };
    const handleFormCancel = (event) => {
        event.preventDefault();
        setValues(initialFormValues());
        console.log(values);
    };
    return (
        <Box>
            <div>
                <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
                    <Button variant="outlined" startIcon={<SaveIcon />} onClick={handleFormSubmit}>
                        Save
                    </Button>
                    <Button variant="outlined" startIcon={<CloseIcon />} sx={{ color: "gray", borderColor: "gray" }} onClick={handleFormCancel}>
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
                <Stack spacing={2} direction="row">
                    <TextField label="Latitude" name="lat" value={values.lat} onChange={handleValueChange} />
                    <TextField label="Longitute" name="lng" value={values.lng} onChange={handleValueChange} />
                </Stack>
            </div>
            <Box sx={{ bgcolor: "#F2F2F2", color: "text.secondary", px: 2, py: 1.5, mt: 2 }}>
                <Typography variant="h6" component="h6" sx={{ fontWeight: "medium" }}>
                    Audit Log
                </Typography>
                <Divider sx={{ my: 1 }} />
                <div>Created by Simon on 2/1/2020, 12:00:00 AM </div>
                <div>Updated by Nandita on 1/12/2021, 11:00:50 PM</div>
            </Box>
        </Box>
    );
}
