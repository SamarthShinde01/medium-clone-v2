import { useEffect, useState } from "react";
import axios from "axios";

interface UpdateProfileType {
	name: string;
	username: string;
	image: string;
	bio: string;
}

export const useFetchProfile = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [profile, setProfile] = useState({});

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userInfo = JSON.parse(localStorage.getItem("userInfo"));

				const res = await axios.get(
					"https://backend.samarthsshinde.workers.dev/api/v1/users/profile",
					{
						headers: {
							Authorization: userInfo.token,
						},
					}
				);

				if (res) {
					setProfile(res.data);
				}
			} catch (err: any) {
				console.error(err?.message || err.error);
			} finally {
				setLoading(false); // Moved inside fetchUser
			}
		};

		fetchUser();
	}, []); // Added dependency array to avoid infinite loop

	return { loading, profile };
};

//update user profile hook
export const useUpdateProfile = ({
	name,
	username,
	image,
	bio,
}: UpdateProfileType) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [profile, setProfile] = useState({});

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userInfo = JSON.parse(localStorage.getItem("userInfo"));

				const res = await axios.put(
					"https://backend.samarthsshinde.workers.dev/api/v1/users/profile",
					{ name, username, bio, image },
					{
						headers: {
							Authorization: userInfo.token,
						},
					}
				);

				if (res) {
					setProfile(res.data);
				}
			} catch (err: any) {
				console.error(err?.message || err.error);
			} finally {
				setLoading(false); // Moved inside fetchUser
			}
		};

		fetchUser();
	}, []); // Added dependency array to avoid infinite loop

	return { loading, profile };
};
