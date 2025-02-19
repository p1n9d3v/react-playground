import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';
import { en, Faker } from '@faker-js/faker';

export const faker = new Faker({
    locale: [en],
});

export type MockCardData = {
    id: string;
    name: string;
    email: string;
    imgUrl: string;
};
const infiniteScrollMockData = Array.from({ length: 100 }, (_, i) => ({
    id: `id-${i}`,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    imgUrl: faker.image.url(),
}));

export const worker = setupWorker(
    http.get('/api/infinite-scroll', ({ request }) => {
        const url = new URL(request.url);
        const page = Number(url.searchParams.get('page')) || 1;
        const pageSize = 10; // 페이지당 아이템 수

        // 페이지에 따른 데이터 슬라이싱
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedData = infiniteScrollMockData.slice(start, end);

        return HttpResponse.json(paginatedData);
    }),
);
