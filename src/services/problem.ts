const createProblem = async (formData: FormData) => {
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

export default createProblem;
