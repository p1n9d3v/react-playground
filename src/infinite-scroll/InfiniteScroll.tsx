import { useEffect, useRef, useState } from 'react';
import { MockCardData } from '../msw/browser';
import styles from './infinite-scroll.module.css';

const Card = (props: MockCardData) => {
    const { id, name, email, imgUrl } = props;

    return (
        <div id={id} className={styles.card}>
            <div>
                <img src={imgUrl} />
            </div>
            <h1>{name}</h1>
            <p>{email}</p>
        </div>
    );
};

export const InfiniteScroll = () => {
    const [datas, setDatas] = useState<MockCardData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const containerRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLDivElement>(null);

    const fetchData = async (pageNum: number) => {
        try {
            setIsLoading(true);

            const params = {
                page: pageNum.toString(),
            };
            const queryStr = new URLSearchParams(params).toString();
            const response = await fetch('/api/infinite-scroll?' + queryStr);
            const newData = await response.json();

            // 새로운 데이터가 없으면 hasMore를 false로 설정
            if (newData.length === 0) {
                setHasMore(false);
                return;
            }

            // 기존 데이터에 새로운 데이터 추가
            setDatas((prev) => {
                const mergedData = [...prev, ...newData];

                // 중복 제거 (id 기준)
                const uniqueData = Array.from(
                    new Map(mergedData.map((item) => [item.id, item])).values(),
                );

                return uniqueData;
            });
            setPage(pageNum + 1);
        } catch (error) {
            console.error('Fetching error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Intersection Observer 설정
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading && hasMore) {
                    console.log(page);
                    fetchData(page);
                }
            },
            {
                root: containerRef.current,
                threshold: 0.5,
            },
        );

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, [isLoading, hasMore, page]);

    return (
        <div ref={containerRef} className={styles.container}>
            {datas.map((data) => (
                <Card key={data.id} {...data} />
            ))}

            <div className={styles.target} ref={targetRef}></div>

            {isLoading && (
                <div className={styles.loading}>Loading more items...</div>
            )}
            {!hasMore && (
                <div className={styles.endMessage}>No more items to load</div>
            )}
        </div>
    );
};
