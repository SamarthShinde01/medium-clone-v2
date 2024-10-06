interface labelType {
	labelText: string;
}

export const Label = ({ labelText }: labelType) => {
	return (
		<label className="leading-7 font-medium text-sm text-gray-800">
			{labelText}
		</label>
	);
};
