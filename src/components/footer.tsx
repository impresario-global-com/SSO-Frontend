const Footer = () => {
    return (
        <div className="footer flex gap-4 justify-between items-center p-4 bg-gray-800 text-white">
            <div className="left-section">
                <p>© Copyright 2024 | All Rights Reserved | Legal Company - IMGlobal Media Private Limited</p>
            </div>
            <div className="right-section flex gap-4">
                <a
                    href="/terms-of-use"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                >
                    Terms of Use
                </a>
                <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                >
                    Privacy Policy
                </a>
            </div>
        </div>
    );
};

export default Footer;
