import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("http://localhost:5001/auth/dashboard", {
          withCredentials: true,
        });
        if (res.data.valid) {
          alert(res.data.message);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };

    fetchDashboard();
  }, [navigate]);

  return <div className="text-5xl font-bold">DashBoard Welcome</div>;
}

export default DashBoard;
