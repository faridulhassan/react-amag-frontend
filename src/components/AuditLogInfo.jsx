import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import moment from "moment";

export default function AuditLogInfo(props) {
    return (
        <Box sx={{ bgcolor: "#F2F2F2", color: "text.secondary", px: 2, py: 1.5, mt: 2 }}>
            <Typography variant="h6" component="h6" sx={{ fontWeight: "medium" }}>
                Audit Log
            </Typography>
            <Divider sx={{ my: 1 }} />
            {props.createdAt && <div>Created by Simon on {moment(new Date(props.createdAt)).format("YYYY-MM-DD hh:mm:ss A")} </div>}
            {props.updatedAt && <div>Updated by Nandita on {moment(new Date(props.updatedAt)).format("YYYY-MM-DD hh:mm:ss A")}</div>}
        </Box>
    );
}
