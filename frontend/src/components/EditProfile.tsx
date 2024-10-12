import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Label } from "../components/Label";
import { Input } from "../components/Input";
import { toast } from "react-toastify";
import { Spinner } from "./Spinner";
import {
	useProfileQuery,
	useUpdateProfileMutation,
} from "@/slices/userApiSlices";

export const EditProfile = () => {
	const { data: profile } = useProfileQuery({});

	const [name, setName] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [image, setImage] = useState<File | null>(null);
	const [bio, setBio] = useState<string>("");

	useEffect(() => {
		if (profile) {
			setName(profile.name || "");
			setUsername(profile.username || "");
			setImage(profile.image ? new File([], profile.image) : null); // Adjust if needed
			setBio(profile.bio || "");
		}
	}, [profile]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImage(e.target.files[0]); // Save the selected file
		}
	};

	const [updateProfile, { isLoading }] = useUpdateProfileMutation();

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData(); // Create FormData for file upload
		formData.append("name", name);
		formData.append("username", username);
		formData.append("bio", bio);
		if (image) {
			formData.append("image", image); // Append image file if selected
		}

		try {
			const res = await updateProfile(formData).unwrap();
			console.log(res);
			setName(res.data.name);
			setUsername(res.data.username);
			setBio(res.data.bio);
			setImage(res.data.image);
			toast.success("Profile Updated successfully");
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	};

	return (
		<div className="bg-white shadow-lg rounded-lg overflow-hidden">
			<form onSubmit={submitHandler}>
				<div className="flex items-center p-6 space-x-6">
					{/* <img className="w-24 h-24 rounded-full object-cover border-2 border-gray-300" /> */}
					<div>
						<h1 className="text-4xl font-bold text-gray-900">
							Edit {name?.split(" ")[0] || ""} Profile
						</h1>
					</div>
				</div>

				<div className="p-6 space-y-6">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div>
							<Label labelText="Full Name" />
							<Input
								type="text"
								value={name}
								placeholder="Enter Full Name"
								onChange={setName}
							/>
						</div>
						<div>
							<Label labelText="User Name" />
							<Input
								type="email" // Change from email to text for usernames
								value={username}
								placeholder="Enter User Name"
								onChange={setUsername}
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div>
							<Label labelText="Edit Picture" />
							{/* <Input type="file" onChange={handleImageChange} /> */}
							<input
								type="file"
								onChange={handleImageChange}
								className="w-full bg-gray-300 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-gray-600 focus:bg-transparent focus:border-gray-500 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							/>
						</div>
						<div>
							<Label labelText="Bio" />
							<textarea
								placeholder="Bio"
								value={bio}
								onChange={(e) => setBio(e.target.value)}
								className="w-full bg-gray-300 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-gray-600 focus:bg-transparent focus:border-gray-500 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							/>
						</div>
					</div>
					<div className="flex justify-end">
						{isLoading ? (
							<Spinner />
						) : (
							<Button buttonText="Update Profile" type="submit" />
						)}
					</div>
				</div>
			</form>
		</div>
	);
};
