import { Img } from '@/types/api/img';
import { Problem } from '@/types/api/problem';
import { Response } from '@/types/response';

export async function fetchData(
	problemId: string
): Promise<Response<(Img & Problem)[]>> {
	const res = await fetch(`http://localhost:3000/api/game/${problemId}`);
	const data = await res.json();
	return data;
}
