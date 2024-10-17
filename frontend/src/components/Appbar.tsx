import profile from "@/assets/images/profile.jpg";
import { Link, useNavigate } from "react-router-dom";
import { MediumName } from "./MediumName";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Upload,
	SaveIcon,
	LogOutIcon,
	LucideUserPen,
	LogInIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/slices/authSlice";
import { toast } from "react-toastify";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useLogoutMutation } from "@/slices/userApiSlices";

interface AuthState {
	userInfo: {
		id: string;
		name: string;
		email: string;
	} | null;
	token: string | null;
	isAuthenticated: boolean;
}

interface RootState {
	auth: AuthState;
}

interface UserTypes {
	id: string;
	name: string;
	username: string;
}

interface UserInfoType {
	token: string;
	user: UserTypes;
}

export const Appbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [logoutApi, { isLoading }] = useLogoutMutation();

	const userInfo = useSelector(
		(state: RootState) => state.auth.userInfo
	) as UserInfoType | null;

	const logOutHandler = async () => {
		await logoutApi({}).unwrap();
		dispatch(logout());
		toast.success("Logged out successfully");
		navigate("/");
	};

	return (
		<div className="border-b-2 py-1 border-gray-200 px-10 flex justify-between ">
			<div className="flex items-center gap-4">
				<Link to="/blogs">
					<div className="text-xl font-bold">
						<MediumName />
					</div>
				</Link>
			</div>
			<div className="flex items-center gap-3">
				<button
					onClick={() => {
						if (userInfo) {
							navigate("/publish");
						} else {
							navigate("/signin");
						}
					}}
					className="relative mr-2 px-5 h-7 w-28 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
				>
					<span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-green-600 group-hover:w-full ease"></span>
					<span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-green-600 group-hover:w-full ease"></span>
					<span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-green-600 group-hover:h-full ease"></span>
					<span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-green-600 group-hover:h-full ease"></span>
					<span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-green-900 opacity-0 group-hover:opacity-100"></span>
					<span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
						Publish
					</span>
				</button>

				<Sheet>
					{userInfo ? (
						<SheetTrigger>
							<Avatar className="w-9 h-9 focus:outline-none">
								<AvatarImage src={profile} />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</SheetTrigger>
					) : (
						<Link to={"/signin"}>
							<Avatar className="w-9 h-9 focus:outline-none">
								<AvatarImage src={profile} />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</Link>
					)}

					<SheetContent>
						<SheetHeader>
							<SheetTitle className="text-3xl font-sans font-bold mb-5">
								{userInfo?.user?.name || "Anonymous"}
							</SheetTitle>
							<div className="border-b border-gray-300 my-2"></div>
							<Link to={"/settings"} className="flex items-center gap-4 pb-1">
								<LucideUserPen />
								<SheetTitle className="text-2xl font-sans font-light">
									Account Settings
								</SheetTitle>
							</Link>
							<div className="border-b border-gray-300 my-2"></div>
							<Link
								to={"/blogs/uploaded"}
								className="flex items-center gap-4 pb-1"
							>
								<Upload />
								<SheetTitle className="text-2xl font-sans font-light">
									Uploaded Posts
								</SheetTitle>
							</Link>
							<Link
								to={"/blogs/saved"}
								className="flex items-center gap-4 pb-1"
							>
								<SaveIcon />
								<SheetTitle className="text-2xl font-sans font-light">
									Saved Posts
								</SheetTitle>
							</Link>

							<div className="border-b border-gray-300 my-2"></div>

							{userInfo &&
								(isLoading ? (
									<div className="flex items-center gap-4 pb-1">
										<LogOutIcon />
										<SheetTitle className="text-2xl font-sans font-light hover:cursor-pointer">
											Logging Out
										</SheetTitle>
									</div>
								) : (
									<div
										onClick={logOutHandler}
										className="flex items-center gap-4 pb-1"
									>
										<LogOutIcon />
										<SheetTitle className="text-2xl font-sans font-light hover:cursor-pointer">
											Logout
										</SheetTitle>
									</div>
								))}

							{!userInfo && (
								<div
									onClick={() => navigate("/signin")}
									className="flex items-center gap-4 pb-1"
								>
									<LogInIcon />
									<SheetTitle className="text-2xl font-sans font-light hover:cursor-pointer">
										Sign In
									</SheetTitle>
								</div>
							)}
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
};
