import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Create  from './Create';
import List  from './List';
import Edit  from './Edit';
function Index() {
    return (
        <>
            <Routes>
                <Route path="/" element={<List />} />
                <Route path="/cadastro" element={<Create />} />
                <Route path="/:id/editar" element={<Edit />} />
            </Routes>
        </>
    )
}
export default Index;