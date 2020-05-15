import { Review } from '../models/review';
import { User } from '../models/user';

export const ReviewsData: Review[] = [
    new Review(
        new User(1, 'clem@mail.com', 'clem', 'duss'),
        new Date('2020-04-25 12:00:00'),
        2,
        0,
        'It was a good game !'
    ),
    new Review(
        new User(2, 'clem@mail.com', 'clem', 'duss'),
        new Date('2020-04-25 12:00:00'),
        2,
        1,
        'It was a good game !'
    ),
    new Review(
        new User(3, 'clem@mail.com', 'clem', 'duss'),
        new Date('2020-04-25 12:00:00'),
        2,
        2,
        'It was a good game !'
    ),
    new Review(
        new User(4, 'clem@mail.com', 'clem', 'duss'),
        new Date('2020-04-25 12:00:00'),
        2,
        3,
        'It was a good game !'
    ),
    new Review(
        new User(5, 'clem@mail.com', 'clem', 'duss'),
        new Date('2020-04-25 12:00:00'),
        2,
        4,
        'It was a good game !'
    ),
    new Review(
        new User(6, 'clem@mail.com', 'clem', 'duss'),
        new Date('2020-04-25 12:00:00'),
        2,
        5,
        'It was a good game !'
    ),
]