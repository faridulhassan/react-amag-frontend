import { Container } from "@mui/material";
import "./App.css";
import AuditLogForm from "./components/AuditLogForm";

function App() {
    return (
        <div className="App">
            <Container sx={{ boxShadow: 2, my: 2, py: 3, borderRadius: 2 }}>
                <AuditLogForm />
            </Container>
        </div>
    );
}

export default App;
