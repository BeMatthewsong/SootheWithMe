// msw 라이브러리의 브라우저 환경에서 사용하는 worker를 설정
// playwright 시 사용되지 않는 것으로 추정되나, 확실하지 않으므로 삭제하지 않음
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
