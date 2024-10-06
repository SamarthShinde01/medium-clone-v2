import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "./Button";
import { Label } from "../components/Label";
import { Input } from "../components/Input";

export const EditProfile = () => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");

	return (
		<div className="bg-white shadow-lg rounded-lg overflow-hidden">
			<form>
				<div className="flex items-center p-6 space-x-6">
					{/* <img className="w-24 h-24 rounded-full object-cover border-2 border-gray-300" /> */}
					<div>
						<h1 className="text-4xl font-bold text-gray-900">
							Edit User Profile
						</h1>
					</div>
				</div>

				<div className="p-6 space-y-6">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div>
							<Label labelText="Full Name" />
							<Input value={name} type="text" placeholder="Enter Full Name" />
						</div>
						<div>
							<Label labelText="User name" />
							<Input
								type="email"
								value={username}
								placeholder="Enter User name"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div>
							<Label labelText="Edit Picture" />

							<Input type="file" />
						</div>
						<div>
							<Label labelText="Edit Picture" />
							<textarea
								type="textarea"
								placeholder={"Bio"}
								className="w-full bg-gray-300 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-gray-600 focus:bg-transparent focus:border-gray-500 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
