export const checkImageDuplicate = (files: File[]) => {
	const imageNames = files.map((file) => file.name.split('.')[0]);
	const uniqueImageNames = [...new Set(imageNames)];

	return imageNames.length !== uniqueImageNames.length;
};
