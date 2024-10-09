import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Label } from "../components/Label";
import { Input } from "../components/Input";
import { useFetchProfile } from "@/hooks/userHooks";
import { toast } from "react-toastify";
import axios from "axios";
import { Spinner } from "./Spinner";

export const EditProfile = () => {
	const { profile } = useFetchProfile();
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [image, setImage] = useState(null);
	const [bio, setBio] = useState("");
	const [loading, setLoading] = useState(false);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		if (profile) {
			setName(profile.name || "");
			setUsername(profile.username || "");
			setImage(profile.image || ""); // Save initial image URL if available
			setBio(profile.bio || "");
		}
	}, [reload]);

	const handleImageChange = (e) => {
		setImage(e.target.files[0]); // Save the selected file
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		const formData = new FormData(); // Create FormData for file upload
		formData.append("name", name);
		formData.append("username", username);
		formData.append("bio", bio);
		if (image) {
			formData.append("image", image); // Append image file if selected
		}

		try {
			const userInfo = JSON.parse(localStorage.getItem("userInfo"));
			setLoading(true);

			const res = await axios.put(
				"https://backend.samarthsshinde.workers.dev/api/v1/users/profile",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: userInfo.token,
					},
				}
			);

			// Immediately update the local state with the response data
			setName(res.data.name);
			setUsername(res.data.username);
			setBio(res.data.bio);
			setImage(res.data.image); // Optionally update if new image URL is returned

			toast.success("Profile Updated successfully");
			setReload(true);
		} catch (err: any) {
			console.error(err?.message || err.error);
			toast.error("Failed to update profile");
		} finally {
			setLoading(false);
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
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div>
							<Label labelText="User Name" />
							<Input
								type="email" // Change from email to text for usernames
								value={username}
								placeholder="Enter User Name"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div>
							<Label labelText="Edit Picture" />
							<Input type="file" onChange={handleImageChange} />
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
						{loading ? (
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
