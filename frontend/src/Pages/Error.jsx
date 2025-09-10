import { useNavigate } from "react-router-dom";

const ErrorPage = () => {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const handleNaviagtion =()=>{
        if(user.role=="user"){
            navigate("/");
        }
        else{
            navigate("/admin");
        }
        
    }
    return (
        <>
            <div className="flex items-center justify-center flex-col">
                <img src="/Error.png" />
                <p className="text-6xl md:font-bold text-orange-400 mt-4 font-sans">ERROR</p>
                <p className="text-3xl md:font-semibold text-orange-400 mt-3 font-sans">Page Not Found</p>
                <button className="text-xl mt-8 bg-yellow-500 rounded-full p-3 pr-8 pl-8" onClick={handleNaviagtion}>Back to HomePage</button>
            </div>

        </>
    )
}

export default ErrorPage;