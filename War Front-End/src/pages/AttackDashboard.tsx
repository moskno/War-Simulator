import React, { useEffect, useState } from "react";
import api from "../api/api";
import Socket from "../utils/socket";

interface Missile {
  name: string;
  speed: number;
}

const AttackDashboard: React.FC = () => {
  const [missiles, setMissiles] = useState<Missile[]>([]);
  const [targetRegion, setTargetRegion] = useState("North");
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const fetchMissiles = async () => {
      try {
        const response = await api.get("api/attack/missiles");
        setMissiles(response.data);
      } catch (error) {
        console.error("Error fetching missiles:", error);
      }
    };

    fetchMissiles();

    Socket.on("message", (message: string) => {
      setNotifications((prev) => [...prev, message]);
    });

    return () => {
      Socket.off("message");
    };
  }, []);


  const handleLaunch = async (missileName: string) => {
    try {
      const response = await api.post("api/attack/launch", {
        missileName,
        targetRegion,
      });
      setNotifications((prev) => [...prev, response.data.message]);
    } catch (error) {
      console.error("Launch failed:", error);
    }
  };

  return (
    <div>
      <h2>Attack Dashboard</h2>
      <label>
        Target Region:
        <select
          value={targetRegion}
          onChange={(e) => setTargetRegion(e.target.value)}
        >
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="Center">Center</option>
          <option value="West Bank">West Bank</option>
        </select>
      </label>
      <ul>
        {missiles.map((missile) => (
          <li key={missile.name}>
            {missile.name} - Speed: {missile.speed}
            <button
              onClick={() => handleLaunch(missile.name)}
              style={{ marginLeft: "10px" }}
            >
              Launch
            </button>
          </li>
        ))}
      </ul>
      <h3>Notifications:</h3>
      <ul>
        {notifications.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default AttackDashboard;
