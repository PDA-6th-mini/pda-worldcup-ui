import { Card } from '@/types/card';
import { Problem } from '@/types/problem';

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

export const getProblemData = async (): Promise<Card[]> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/main`);
	const responseBody = await response.json();

	const parsed: Card[] = responseBody.data.map((problem: Problem) => {
		const images = problem.images;

		const data: Card = {
			id: problem.problem_id,
			title: problem.name,
			description: problem.description,
			thumbNail_1: images[0].img_url,
			thumbNail_2: images[1].img_url,
		};
		return data;
	});
	return parsed;
};
