export const fetchRatioData = async (problemId: number) => {
	try {
		console.log('요청 problemId:', problemId);
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/result-ratio/${problemId}`
		);
		const json = await res.json();
		const problemName = json.data.problem_name;
		const resultArray = json.data.result;

		const cntArray = resultArray.map((item: any) => item.cnt);
		const nameArray = resultArray.map((item: any) => item.img_name);

		return { problemName, cntArray, nameArray };
	} catch (err) {
		console.error('도넛 차트 데이터를 불러오는 데 실패했습니다.', err);
		return { problemName: '', cntArray: [], nameArray: [] };
	}
};
