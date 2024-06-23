const Footer = () => {
    return (
        <footer className="bg-[#E1E1E1] text-black h-8 flex items-center justify-center border-t border-black">
            <p className="text-xs sm:text-base font-ibm-plex-mono-medium">&copy; {new Date().getFullYear()} - made with 💙 from SIPTATIF DEV.</p>
        </footer>
    );
}

export default Footer;