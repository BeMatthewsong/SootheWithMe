'use server';

import { revalidatePath } from 'next/cache';

export async function revalidate(url: string) {
  revalidatePath(url);
}
