export type Problem = {
	problem_id: number;
	name: string;
	description: string;
	images: {
		img_id: number;
		img_url: string;
	}[];
};
