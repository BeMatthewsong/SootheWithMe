import { mergeQueryKeys } from '@lukemorales/query-key-factory';
import { created } from './mypage/created';
import { joined } from './mypage/joined';
import { writableReview } from './mypage/writableReview';
import { reviews } from './review/review';

export const queries = mergeQueryKeys(created, reviews, joined, writableReview);
