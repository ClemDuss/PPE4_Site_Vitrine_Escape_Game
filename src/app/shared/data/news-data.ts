import { News } from '../models/news';

export const newsData: News[] = [
    new News(
        1,
        'Avant Noël',
        new Date('2018-12-21 12:02:00'),
        new Date('2018-12-21 12:02:00'),
        'C\'est une belle description que je vois là',
        true
    ),
    new News(
        2,
        'Avant Noël',
        new Date('2018-12-21 12:02:00'),
        new Date('2018-12-21 12:02:00'),
        'C\'est une belle description que je vois là',
        true
    ),
    new News(
        3,
        'Avant Noël',
        new Date('2020-05-06 12:02:00'),
        new Date('2020-05-06 12:02:00'),
        'C\'est une belle description que je vois là',
        false
    ),
    new News(
        4,
        'Avant Noël',
        new Date('2020-05-06 12:02:00'),
        new Date('2020-05-06 12:02:00'),
        'C\'est une belle description que je vois là',
        false
    ),
    new News(
        5,
        'Avant Noël',
        new Date('2018-12-21 12:02:00'),
        new Date('2020-05-05 12:02:00'),
        'C\'est une belle description que je vois là',
        true
    ),
];