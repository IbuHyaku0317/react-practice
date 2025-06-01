import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GroupSelect = () => {
  const [group, setGroup] = useState("A");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/aiueo");
  };

  return (
    <div>
      <select value={group} onChange={(e) => setGroup(e.target.value)}>
        <option value="A">グループA</option>
        <option value="B">グループB</option>
        <option value="C">グループC</option>
      </select>
      <button onClick={handleSubmit}>決定</button>
    </div>
  );
};

export default GroupSelect;
