import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GroupSelect = () => {
  const [groups, setGroups] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setGroups(selected);
  };

  const handleSubmit = () => {
    // クエリパラメータで複数グループを渡す例
    const params = groups
      .map((g) => `group=${encodeURIComponent(g)}`)
      .join("&");
    navigate(`/aiueo?${params}`);
  };

  return (
    <div>
      <select multiple value={groups} onChange={handleChange}>
        <option value="A">グループA</option>
        <option value="B">グループB</option>
        <option value="C">グループC</option>
      </select>
      <button onClick={handleSubmit}>決定</button>
    </div>
  );
};

export default GroupSelect;
