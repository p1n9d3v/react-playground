import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';
import { infiniteScrollMockData } from './mock-card';

export const worker = setupWorker(
    http.get('/api/infinite-scroll', ({ request }) => {
        const url = new URL(request.url);
        const page = Number(url.searchParams.get('page')) || 1;
        const pageSize = 10;

        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedData = infiniteScrollMockData.slice(start, end);

        return HttpResponse.json(paginatedData);
    }),
);
