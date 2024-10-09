import { useState } from "react";
import { Button } from "./Button";
import { FormHeading } from "./FormHeading";
import { Input } from "./Input";
import { Label } from "./Label";
import { setCredentials } from "@/slices/authSlice";
import { useSigninMutation } from "@/slices/userApiSlices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "./Spinner";

export const SignInForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const [signin, { isLoading }] = useSigninMutation();

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			if (!username || !password) {
				toast.warning("Please enter valid fields");
				return;
			}

			const res = await signin({ username, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			toast.success("Signed in successfully");
			navigate("/");
		} catch (err: any) {
			console.error(err?.message || err.error);
			toast.error(err?.message || err.error);
		}
	};

	return (
		<div className="flex flex-col h-screen justify-center">
			<div className="flex justify-center">
				<div className="w-1/2">
					<FormHeading
						heading="Sign In"
						link={{
							link: "/signup",
							linkHeading: "Dont have an account ? ",
							linkText: "Sign Up",
						}}
					/>
					<form onSubmit={submitHandler}>
						<div className="mt-2 pt-2 flex flex-col">
							<div className="mt-4">
								<label className="leading-7 font-medium text-sm text-gray-800">
									Email
								</label>
								<Label labelText="Email" />
								<Input
									type="email"
									placeholder="Enter your email"
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>

							<div className="mt-4">
								<Label labelText="Password" />
								<Input
									placeholder="Enter your password"
									type="password"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							{isLoading ? (
								<Spinner />
							) : (
								<Button buttonText="Sign In" type="submit" />
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
