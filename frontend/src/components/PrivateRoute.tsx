import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
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

export const PrivateRoute = () => {
	const userInfo = useSelector((state: RootState) => state.auth.userInfo);

	return userInfo ? <Outlet /> : <Navigate to="/signin" replace />;
};
