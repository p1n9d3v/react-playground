import { Route, Routes } from 'react-router';
import { Pagination } from './pagination/Pagination';
import { Home } from './Home';
import { InfiniteScroll } from './infinite-scroll/InfiniteScroll';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pagination" element={<Pagination />} />
            <Route path="/infinite-scroll" element={<InfiniteScroll />} />
        </Routes>
    );
}

export default App;
