
const Footer = () => {
    return (
      <footer className="bg-gray-700 text-white py-4 text-center mt-16">
        <div className="flex items-center justify-center text-sm h-[8rem] tracking">
          © {new Date().getFullYear()} EatsNow. All rights reserved.
        </div>
      </footer>
    );
  }
export default Footer;