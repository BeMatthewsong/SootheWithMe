// 마이 페이지 - 내가 만든 모임

import { createQueryKeys } from '@lukemorales/query-key-factory';

export const created = createQueryKeys('created', {
  all: null,
  detail: (createdBy: string) => ({ queryKey: [createdBy] }),
});
