import { Card } from '@/types/card';
import { Cursor } from '@/types/cursor';

export const createProblem = async (formData: FormData) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/problems`,
		{
			method: 'POST',
			body: formData,
		}
	);

	if (!response.ok) {
		throw new Error('Failed to create problem');
	}
	const data = await response.json();

	return data;
};

export const getProblemData = async (
	cursor?: Cursor
): Promise<{ data: Card[]; nextCursor: Cursor | null }> => {
	const params = new URLSearchParams();

	if (cursor) {
		params.append(
			'cursor_total_count',
			String(cursor.cursor_total_count ?? '')
		);
		params.append('cursor_count', String(cursor.cursor_count ?? ''));
		params.append('cursor_img_id', String(cursor.cursor_img_id ?? ''));
	}

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/main?${params.toString()}`,
		{
			method: 'GET',
		}
	);

	if (!response.ok) {
		throw new Error('문제 데이터를 불러오는 데 실패했습니다.');
	}

	const res = await response.json();

	const problemList = res.data.data;

	const parsed: Card[] = problemList.map((problem: any) => ({
		id: problem.problem_id,
		title: problem.name,
		description: problem.description,
		thumbNail_1: problem.images[0]?.img_url,
		thumbNail_2: problem.images[1]?.img_url,
	}));

	const last = problemList.at(-1);

	const nextCursor: Cursor | null = last
		? {
				cursor_total_count: last.total_count,
				cursor_count: last.count,
				cursor_img_id: last.img_id,
			}
		: null;

	return {
		data: parsed,
		nextCursor,
	};
};
