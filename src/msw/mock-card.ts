import { customFaker } from './faker';

export type MockCardData = {
    id: string;
    name: string;
    email: string;
    imgUrl: string;
};

export const infiniteScrollMockData = Array.from({ length: 100 }, (_, i) => ({
    id: `id-${i}`,
    name: customFaker.person.fullName(),
    email: customFaker.internet.email(),
    imgUrl: customFaker.image.url(),
}));
