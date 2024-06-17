interface MarqueeProps {
    list_announcement: String
}

const Marquee = ({list_announcement}: MarqueeProps) => {
	return (
		<div className="flex items-center bg-[#FAAE2B] font-ibm-plex-mono-medium overflow-hidden border-b-2 border-t-2 border-black h-8 text-nowrap">
			<p className="animate-marquee">
				{list_announcement}
			</p>
		</div>
	);
};

export default Marquee;
