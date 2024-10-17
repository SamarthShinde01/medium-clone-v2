import { useState } from "react";
import { Button } from "./Button";
import { FormHeading } from "./FormHeading";
import { Label } from "./Label";
import { Input } from "./Input";
import { setCredentials } from "@/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "@/slices/userApiSlices";
import { Spinner } from "./Spinner";
import { toast } from "react-toastify";

export const SignUpForm = () => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(""); // State to hold error messages

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [signupApi, { isLoading }] = useSignupMutation();

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		// Reset error before new submission
		setError("");

		// Check for empty fields
		if (!name || !username || !password) {
			setError("All fields are required.");
			return;
		}

		try {
			const res = await signupApi({ name, username, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			toast.success("Signed Up Successfully");
			navigate("/");
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message || "Signup failed. Please try again.");
			}
		}
	};

	return (
		<div className="flex flex-col justify-center min-h-screen p-4 sm:p-8">
			<div className="flex justify-center">
				<div className="w-full max-w-md">
					<FormHeading
						heading="Sign Up"
						link={{
							link: "/signin",
							linkHeading: "Already have an account?",
							linkText: "Sign In",
						}}
					/>
					{error && <div className="text-red-500 mb-4">{error}</div>}{" "}
					{/* Error message display */}
					<form onSubmit={submitHandler}>
						<div className="mt-2 pt-2 flex flex-col">
							<div className="mt-4">
								<Label labelText="Name" />
								<Input
									placeholder="Enter your name"
									type="text"
									value={name} // Bind input value
									onChange={setName}
								/>
							</div>

							<div className="mt-4">
								<Label labelText="Email" />
								<Input
									type="email"
									placeholder="Enter your email"
									value={username} // Bind input value
									onChange={setUsername}
								/>
							</div>

							<div className="mt-4">
								<Label labelText="Password" />
								<Input
									placeholder="Enter your password"
									type="password"
									value={password} // Bind input value
									onChange={setPassword}
								/>
							</div>
							{isLoading ? (
								<Spinner />
							) : (
								<Button buttonText="Sign Up" type="submit" />
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
