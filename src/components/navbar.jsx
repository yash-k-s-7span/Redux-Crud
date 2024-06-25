/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavBar = () => {
    const allusers = useSelector((state) => state.app.users);
    const [searchData, setSearchData] = useState("");

    return (
        <div>
            <nav className="bg-gray-100 py-4 shadow">
                <div className="container mx-auto flex justify-between items-center">
                    <h4 className="text-lg font-bold">REDUX</h4>
                    <div className="flex items-center space-x-4">
                        <ul className="flex space-x-4">
                            <li>
                                <Link to="/" className="text-gray-700 hover:text-gray-900">
                                    Create Post
                                </Link>
                            </li>
                            <li>
                                <Link to="/read" className="text-gray-700 hover:text-gray-900">
                                    All Post ({allusers.length})
                                </Link>
                            </li>
                        </ul>
                        <input
                            className="form-input w-64 border rounded-md px-4 py-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchData}
                            onChange={(e) => setSearchData(e.target.value)}
                        />
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
