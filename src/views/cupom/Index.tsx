import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Create  from './Create';
import List  from './List';


function Index() {
    return (
        <>
            <Routes>
                <Route path="/listar" element={<List />} />
                <Route path="/cobrar" element={<Create />} />
            </Routes>
        </>
    )
}
export default Index;