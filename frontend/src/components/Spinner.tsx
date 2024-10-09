import { useState } from "react";
import { ClipLoader } from "react-spinners";

const override = {
	display: "block",
	margin: "auto ",
};

export const Spinner = () => {
	let [loading, setLoading] = useState(true);
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
