import { Route, Routes } from 'react-router';
import { Pagination } from './pagination/Pagination';
import { Home } from './Home';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pagination" element={<Pagination />} />
        </Routes>
    );
}

export default App;
