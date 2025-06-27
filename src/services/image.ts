export const storeImageMeta = async (imgId: string | null) => {
	try {
		await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/resultSave?img_id=${imgId}`,
			{
				method: 'POST',
			}
		);
		console.log('✅ 결과 이미지 저장 완료');
		return { status: 'success' };
	} catch (error) {
		console.error('❌ 결과 이미지 저장 실패:', error);
		return { status: 'error' };
	}
};

export const fetchResultImg = async (imgId: string | null) => {
	if (!imgId) return;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/resultImg?img_id=${imgId}`
		);
		const json = await res.json();
		console.log('이미지json', json.data);

		return json.data;
	} catch (err) {
		console.error('결과 이미지를 불러오는 데 실패했습니다.', err);
	}
};
