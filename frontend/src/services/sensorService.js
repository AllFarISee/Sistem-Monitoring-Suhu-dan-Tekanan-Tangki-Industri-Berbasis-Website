import axios from "axios";

const API = "http://localhost:3000/api/sensor";

export const getLatestSensor = async () => {
    const res = await axios.get(`${API}/latest`);
    return res.data;
};

export const getSensorHistory = async () => {
    const res = await axios.get(`${API}/history`);
    return res.data;
};