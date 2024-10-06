import { Appbar } from "@/components/Appbar";
import { ChangePassword } from "@/components/ChangePassword";
import { EditProfile } from "@/components/EditProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Profile = () => {
	return (
		<>
			<Appbar />
			<div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
				<Tabs defaultValue="profile" className="w-full ">
					<TabsList className="w-80 gap-5 mb-4">
						<TabsTrigger value="profile" className="w-full">
							Edit Profile
						</TabsTrigger>
						<TabsTrigger value="password" className="w-full">
							Change Password
						</TabsTrigger>
					</TabsList>
					<TabsContent value="profile">
						<EditProfile />
					</TabsContent>
					<TabsContent value="password">
						<ChangePassword />
					</TabsContent>
				</Tabs>
			</div>
		</>
	);
};
