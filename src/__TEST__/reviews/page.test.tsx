import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/reviews', { waitUntil: 'networkidle' });

  test.slow();
});

// 페이지 정상 로드 확인
test('render title, score and reviews', async ({ page }) => {
  // Head 타이틀 확인
  await expect(page.getByRole('heading', { name: '모든 리뷰' })).toBeVisible();

  // Score 데이터가 최초 3.7인지 확인
  await expect(page.getByTestId('average-score')).toHaveText('3.7');

  // 최초 리뷰 데이터가 10개인지 확인 (서버사이드로 렌더링 된 데이터)
  await expect(page.getByTestId('review-item')).toHaveCount(10);
});

test.describe('change score data when clicked tab or chip', () => {
  test('average score is 5 When clicked WORKATION tab ', async ({ page }) => {
    await page.getByTestId('tab-WORKATION').click();

    const score = page.getByTestId('average-score');
    await score.waitFor();
    await expect(score).toHaveText('5');
  });

  test('average score is 3.7 When clicked DALLAEMFIT tab ', async ({
    page,
  }) => {
    await page.getByTestId('tab-DALLAEMFIT').click();

    const score = page.getByTestId('average-score');
    await score.waitFor();
    await expect(score).toHaveText('3.7');
  });

  test('average score is 3.5 When clicked OFFICE STRETCHING chip ', async ({
    page,
  }) => {
    await page.locator('span').getByText('오피스 스트레칭').click();

    const score = page.getByTestId('average-score');
    await score.waitFor();
    await expect(score).toHaveText('3.5');
  });

  test('average score is 5 When clicked MINDFULNESS chip ', async ({
    page,
  }) => {
    await page.locator('span').getByText('마인드풀니스').click();
    const score = page.getByTestId('average-score');
    await score.waitFor();
    await expect(score).toHaveText('5');
  });
});

// 지역 필터링 확인
// 현재 목데이터는 전부 건대입구 이기 때문에, 건대입구 필터링 시 10개, 다른 아이템은 0개가 되어야 함
test('filter reviews by location', async ({ page }) => {
  // 건대입구 필터링 시 리뷰 아이템이 10개인지 확인
  await page.getByTestId('filter-component').getByText('지역 전체').click();
  const filterOptions1 = page.locator('span').getByText('건대입구');
  await filterOptions1.waitFor({ state: 'visible' });
  await filterOptions1.click();

  expect(page.getByTestId('review-item')).toHaveCount(10);

  // 신림 필터링 시 리뷰 아이템이 0개인지 확인
  await page.getByTestId('filter-component').getByText('건대입구').click();
  const filterOptions2 = page.locator('span').getByText('신림');
  await filterOptions2.waitFor({ state: 'visible' });
  await filterOptions2.click();

  await expect(page.getByText('아직 리뷰가 없어요')).toBeVisible();
  const count = await page.getByTestId('review-item').count();
  expect(count).toBe(0);
});

// 무한스크롤 테스트
test('infinite scroll', async ({ page }) => {
  // 리뷰 아이템이 10개인지 확인
  await expect(page.getByTestId('review-item')).toHaveCount(10);

  // 스크롤 이벤트
  await page.getByTestId('hasMoreRef').scrollIntoViewIfNeeded();

  // 추가로 10개의 리뷰 아이템이 렌더링 되었는지 확인
  const item20th = page.getByTestId('review-item').nth(19);
  await item20th.waitFor({ state: 'visible' });

  await expect(page.getByTestId('review-item')).toHaveCount(20);
});

// 리뷰 아이템 클릭 시 상세 페이지로 이동 확인
test('move to detail page when clicked review item', async ({ page }) => {
  // 첫번째 리뷰 아이템 클릭 ( Gathering.id = 1 )
  await page.getByTestId('review-item').first().click();

  // 상세 페이지로 이동되었는지 확인
  await page.waitForURL(/gatherings\/1/);
});
