import { useEffect, useState } from "react";
import { Button } from "./Button";
import { FormHeading } from "./FormHeading";
import { Label } from "./Label";
import { Input } from "./Input";
import { setCredentials } from "@/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "@/slices/userApiSlices";

export const SignUpForm = () => {
	const [name, setName] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.auth);
	const [signupApi, { isLoading }] = useSignupMutation();

	useEffect(() => {
		if (userInfo) {
			navigate("/");
		}
	}, [navigate, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();
	};

	return (
		<div className="flex flex-col h-screen justify-center">
			<div className="flex justify-center">
				<div className="w-1/2">
					<FormHeading
						heading="Sign Up"
						link={{
							link: "/signin",
							linkHeading: "Already have an account ? ",
							linkText: "Sign In",
						}}
					/>
					<form onSubmit={submitHandler} method="POST">
						<div className="mt-2 pt-2 flex flex-col">
							<div className="mt-4">
								<Label labelText="Name" />
								{/* <Input placeholder="Enter your name" /> */}
								<Input
									placeholder="Enter your name"
									type="text"
									onChange={(e) => setName(e.target.value)}
								/>
							</div>

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

							<Button buttonText="Sign Up" type="submit" />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
