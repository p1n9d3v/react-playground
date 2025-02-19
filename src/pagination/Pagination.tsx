import { useState } from 'react';
import styles from './pagination.module.css';

interface DataItem {
    id: number;
    name: string;
    email: string;
}

const PAGINATION_CONFIG = {
    ITEMS_PER_PAGE: 5,
    VISIBLE_PAGES: 5,
} as const;

const datas: DataItem[] = Array.from({ length: 112 }, (_, i) => ({
    id: i,
    name: `Name ${i}`,
    email: `email${i}@example.com`,
}));

export const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(
        datas.length / PAGINATION_CONFIG.ITEMS_PER_PAGE,
    );
    const currentGroup = Math.ceil(
        currentPage / PAGINATION_CONFIG.VISIBLE_PAGES,
    );
    const startPage = (currentGroup - 1) * PAGINATION_CONFIG.VISIBLE_PAGES + 1;
    const endPage = Math.min(
        startPage + PAGINATION_CONFIG.VISIBLE_PAGES - 1,
        totalPages,
    );

    const startIndex = (currentPage - 1) * PAGINATION_CONFIG.ITEMS_PER_PAGE;
    const endIndex = startIndex + PAGINATION_CONFIG.ITEMS_PER_PAGE;
    const currentItems = datas.slice(startIndex, endIndex);

    const pageNumbers = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i,
    );

    const handlePageChange = (pageNumber: number) => {
        if (currentPage === pageNumber) return;
        setCurrentPage(pageNumber);
    };

    const handlePrev = () => {
        setCurrentPage((prev) => Math.max(1, prev - 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    };

    return (
        <div className={styles.container}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((data) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.pagination}>
                <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className={styles.navigationButton}
                >
                    Prev
                </button>

                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        type="button"
                        onClick={() => handlePageChange(number)}
                        className={`${styles.pageButton} ${
                            currentPage === number ? styles.active : ''
                        }`}
                    >
                        {number}
                    </button>
                ))}

                <button
                    type="button"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={styles.navigationButton}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
