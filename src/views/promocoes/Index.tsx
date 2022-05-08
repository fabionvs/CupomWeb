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
                <Route path="/" element={<List />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </>
    )
}
export default Index;