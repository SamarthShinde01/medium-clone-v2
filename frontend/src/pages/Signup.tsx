import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";
import { MediumName } from "../components/MediumName";

export const Signup = () => {
	return (
		<div className="h-screen grid grid-cols-1 sm:grid-cols-2">
			<div>
				<div className="m-2 ml-4">
					<MediumName />
				</div>
				<Auth />
			</div>
			<div>
				<Quote />
			</div>
		</div>
	);
};
