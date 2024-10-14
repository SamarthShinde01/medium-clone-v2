import { Outlet } from "react-router-dom";
import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import { ToastContainer } from "react-toastify";
function App() {
	return (
		<>
			<ToastContainer />
			<Outlet />
			<div className="mt-10 pt-10 flex justify-center">
				<p className="text-slate-400">Code by Sa marth Shinde</p>
			</div>
		</>
	);
}

export default App;
