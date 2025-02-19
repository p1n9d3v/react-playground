import { Link } from 'react-router';

export const Home = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/pagination">Pagination</Link>
                </li>
            </ul>
        </div>
    );
};
