import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@radix-ui/react-tooltip";
interface TooltipTypes {
	children: React.ReactNode;
	text: string;
}

export const TooltipForIcons = ({ children, text }: TooltipTypes) => {
	return (
		<div>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>{children}</TooltipTrigger>
					<TooltipContent className="border rounded text-white bg-slate-800 px-2 border-slate-500">
						<p>{text}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
};
