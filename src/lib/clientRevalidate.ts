'use server';

import { revalidatePath } from 'next/cache';

export async function clientRevalidate(url: string) {
  revalidatePath(url);
}
