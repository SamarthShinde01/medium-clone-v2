import { ClipLoader } from "react-spinners";

const override = {
	display: "block",
	margin: "auto ",
};

export const Spinner = () => {
	const loading = true;
	return (
		<ClipLoader
			color="blue"
			loading={loading}
			cssOverride={override}
			size={100}
			aria-label="Loading Spinner"
			data-testid="loader"
		/>
	);
};
