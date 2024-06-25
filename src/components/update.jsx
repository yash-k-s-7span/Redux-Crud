import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/user-details-slice';

const Update = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [updateData, setUpdateData] = useState({});
    const [initialData, setInitialData] = useState({});
    const { users, loading } = useSelector((state) => state.app);

    useEffect(() => {
        if (id && users) {
            const singleUser = users.find((element) => element.id === id);
            setUpdateData(singleUser || {});
            setInitialData(singleUser || {});
        }
    }, [id, users]);

    const newData = (e) => {
        setUpdateData({
            ...updateData,
            [e.target.name]: e.target.value
        });
    };

    const hasChanged = () => {
        return JSON.stringify(initialData) !== JSON.stringify(updateData);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateUser(updateData));
        if (updateData !== "" && updateData) {
            navigate('/read');
        }
    };

    if (loading) {
        return <h2 className='text-2xl px-4 py-4'>Loading</h2>;
    }

    return (
        <div className="p-4">
            <h2 className="my-2 text-xl font-semibold">Edit the data</h2>
            <form className="w-full max-w-lg mx-auto my-5" onSubmit={handleUpdate}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={updateData.name || ""}
                        onChange={newData}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={updateData.email || ""}
                        onChange={newData}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
                    <input
                        type="number"
                        name="age"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={updateData.age || ""}
                        onChange={newData}
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        className="mr-2 leading-tight"
                        name="gender"
                        value="Male"
                        type="radio"
                        checked={updateData.gender === 'Male'}
                        onChange={newData}
                        required
                    />
                    <label className="text-gray-700">Male</label>
                </div>
                <div className="mb-4">
                    <input
                        className="mr-2 leading-tight"
                        name="gender"
                        value="Female"
                        type="radio"
                        checked={updateData.gender === 'Female'}
                        onChange={newData}
                    />
                    <label className="text-gray-700">Female</label>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={!hasChanged()}
                >
                    Update
                </button>
            </form>
        </div>
    );
}

export default Update;
