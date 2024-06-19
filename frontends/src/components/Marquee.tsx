import Marquee from "react-fast-marquee";

interface MarqueesProps {
    list_announcement: string
}

const CustomMarquee = ({list_announcement}: MarqueesProps) => {
	return (
		<div className="flex items-center bg-[#FAAE2B] font-ibm-plex-mono-medium overflow-hidden border-b-2 border-t-2 border-black h-8">
			<Marquee>
				{list_announcement}
			</Marquee>
		</div>
	);
};

export default CustomMarquee;
