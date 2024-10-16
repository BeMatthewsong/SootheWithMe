export async function register() {
  if (
    process.env.PLAYWRIGHT_TEST === 'true' &&
    process.env.NEXT_RUNTIME === 'nodejs'
  ) {
    const { server } = await import('./msw/server');
    server.listen();
  }
}
