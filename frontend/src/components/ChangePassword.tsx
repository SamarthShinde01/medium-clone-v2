import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "./Button";
import { Label } from "../components/Label";
import { Input } from "../components/Input";

export const ChangePassword = () => {
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	return (
		<div className="bg-white shadow-lg rounded-lg overflow-hidden mt-3">
			<form>
				<div className="flex items-center p-6 space-x-6">
					{/* <img className="w-24 h-24 rounded-full object-cover border-2 border-gray-300" /> */}
					<div>
						<h1 className="text-4xl font-bold text-gray-900">
							Change Password
						</h1>
					</div>
				</div>

				<div className="p-6 space-y-6">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div>
							<Label labelText="Password" />
							<Input
								type="password"
								value={password}
								placeholder="Enter Passwords"
							/>
						</div>
						<div>
							<Label labelText="Confirm Password" />
							<Input
								type="password"
								value={confirmPassword}
								placeholder="Enter Confirm Password"
							/>
						</div>
					</div>

					<div className="flex justify-end">
						<Button buttonText="Update Profile" type="submit" />
					</div>
				</div>
			</form>
		</div>
	);
};
