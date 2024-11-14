import React, { useEffect, useState } from "react";
import api from "../api/api";
import Socket from "../utils/socket";

interface DefenseSystem {
  name: string;
  interceptionSpeed: number;
  amount: number;
}

const DefenseDashboard: React.FC = () => {
  const [defenseSystems, setDefenseSystems] = useState<DefenseSystem[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const fetchDefenseSystems = async () => {
      try {
        const response = await api.get("api/defense/systems");
        setDefenseSystems(response.data);
      } catch (error) {
        console.error("Error fetching defense systems:", error);
      }
    };

    fetchDefenseSystems();

    Socket.on("message", (message: string) => {
      setNotifications((prev) => [...prev, message]);
    });

    return () => {
      Socket.off("message");
    };
  }, []);

  const handleIntercept = async (systemName: string) => {
    try {
      const response = await api.post("api/defense/intercept", { systemName });
      setNotifications((prev) => [...prev, response.data.message]);
    } catch (error) {
      console.error("Interception failed:", error);
    }
  };

  return (
    <div>
      <h2>Defence Dashboard</h2>
      <ul>
        {defenseSystems.map((system) => (
          <li key={system.name}>
            {system.name} - Available: {system.amount}
            <button
              onClick={() => handleIntercept(system.name)}
              disabled={system.amount <= 0}
              style={{ marginLeft: "10px" }}
            >
              Intercept
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

export default DefenseDashboard;
