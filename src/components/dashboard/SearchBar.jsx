const SearchBar = ({ searchTerm, setSearchTerm }) => {
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="relative w-full max-w-md mx-4">
            <div className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16l-4-4m0 0l4-4m-4 4h16"
                    />
                </svg>
            </div>
        </div>
    );
}