import { Outlet } from "react-router-dom";
import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import { ToastContainer } from "react-toastify";
function App() {
	return (
		<>
			<ToastContainer />
			<Outlet />
		</>
	);
}

export default App;
