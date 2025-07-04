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
	cached = false,
	cursor?: Cursor
): Promise<{ data: Card[]; nextCursor: Cursor | null }> => {
	const params = new URLSearchParams();

	if (cursor) {
		params.append('cursor_problem_id', String(cursor.cursor_problem_id ?? ''));
	}

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/main?${params.toString()}`,
		{
			method: 'GET',
			next: cached
				? {
						revalidate: 60,
					}
				: undefined,
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

	const last = res.data.nextCursor;

	const nextCursor: Cursor | null = last
		? {
				cursor_problem_id: last.cursor_problem_id,
			}
		: null;

	return {
		data: parsed,
		nextCursor,
	};
};
