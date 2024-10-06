import { Link } from "react-router-dom";

interface FormType {
	heading: string;
	link: {
		linkHeading: string;
		linkText: string; // This prop is defined but not used; consider using it if needed
		link: string;
	};
}

export const FormHeading = ({
	heading,
	link: { linkHeading, linkText, link },
}: FormType) => {
	return (
		<div className="px-10">
			<div className="text-3xl text-center font-extrabold">{heading}</div>
			<div className="mt-1 text-slate-400">
				{linkHeading}
				<Link className="font-semibold underline text-black" to={link}>
					{linkText}
				</Link>
			</div>
		</div>
	);
};
