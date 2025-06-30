'use server';

import { revalidatePath } from 'next/cache';

export async function revalidatePageByPath(path: string) {
	try {
		revalidatePath(path, 'page');
		return { ok: true };
	} catch (error) {
		console.error('캐시 무효화 실패:', error);
		return { ok: false };
	}
}
