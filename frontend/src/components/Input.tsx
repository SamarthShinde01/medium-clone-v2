interface InputType {
	type?: string;
	placeholder: string;
	value?: string;
	onChange: (data: string) => void;
}

export const Input = ({
	type = "text",
	placeholder,
	onChange,
	value,
}: InputType) => {
	return (
		<input
			type={type}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
			className="w-full bg-gray-300 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-gray-600 focus:bg-transparent focus:border-gray-500 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
		/>
	);
};
