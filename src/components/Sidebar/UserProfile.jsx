import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';

const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch user data from Redux state
    const { user } = useSelector((state) => state.auth);
    console.log(user);

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged out successful!');
        navigate("/");
    };

    return (
        <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
            <div className="flex flex-col items-center justify-center">
                <AccountCircleIcon sx={{ fontSize: "9rem" }} />
                
                {/* Display user's name if available */}
                <h1 className='py-5 text-2xl font-semibold'>
                    {user?.firstName || "User"} {user?.lastName}
                </h1>

                {/* Display user's email if available */}
                <p>Email: {user?.email || "Not Available"}</p>
                <p>Mobile: {user?.mobileNo || "Not Available"}</p>


                <Button
                    variant='contained'
                    onClick={handleLogout}
                    sx={{ margin: "2rem 0rem", background: "red" }}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default UserProfile;
