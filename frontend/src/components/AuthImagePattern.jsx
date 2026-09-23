const AuthImagePattern = ({ title, subtitle }) => {
    return (
        <div className="hidden lg:flex justify-center items-center bg-base-200 p-12">
            <div className="max-w-md text-center">
                <div classname="grid grid-cols-3 gap-3 mb-8">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className={`aspect-square`}></div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AuthImagePattern;