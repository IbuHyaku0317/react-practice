import { useState } from "react";
import Calendar from "react-calendar";
import "./ScheduleTimeline.css";
import { CurrencyBitcoin } from "@mui/icons-material";
import toISOStringWithTimezone from "./JTZ";

const plans = [
  {
    curriculum: "債券数学",
    place: "セミB",
    date: "2025-05-27",
    teacher: "百田",
  },
  {
    curriculum: "デリバティブ数学",
    place: "セミ",
    date: "2025-05-28",
    teacher: "百田",
  },
];

const MyCalendar = () => {
  const [value, setValue] = useState<Date>(new Date());
  const [activeStartDate, setActiveStartDate] = useState<Date>(new Date());
  const [popupDate, setPopupDate] = useState<Date | null>(null);

  const handleToday = () => {
    const today = new Date();
    setValue(today);
    setActiveStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const handleActiveStartDate = (args: any) => {
    if (args.activeStartDate) {
      setActiveStartDate(args.activeStartDate);
    }
  };

  const getTileClassName = ({ date }: { date: Date }) => {
    const day = date.getDay();
    if (day === 6) return "saturday"; // 土曜
    if (day === 0) return "sunday"; // 日曜（必要なら）
    return "";
  };

  const handleClickDay = (date: Date) => {
    setValue(date);
    setPopupDate(date);
  };

  const handleClosePopup = () => {
    setPopupDate(null);
  };

  const findPlanByDate = (dateStr: string) =>
    plans.find((p) => p.date === dateStr);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const todayStr = toISOStringWithTimezone(today).slice(0, 10);
  const tomorrowStr = toISOStringWithTimezone(tomorrow).slice(0, 10);

  const todayPlan = findPlanByDate(todayStr);
  const tomorrowPlan = findPlanByDate(tomorrowStr);

  return (
    <div className="calendar-center-root">
      <div className="today-date">
        今日の日付：{today.toLocaleDateString()}(
        {"日月火水木金土"[today.getDay()]})
      </div>
      <div style={{ display: "flex", gap: "32px", marginBottom: "24px" }}>
        <div className="today-info-box">
          <div className="today-curriculum">
            今日のカリキュラム：{todayPlan ? todayPlan.curriculum : "なし"}
          </div>
          <div className="today-place">
            今日の会場：{todayPlan ? todayPlan.place : "なし"}
          </div>
        </div>
        <div className="tomorrow-info-box">
          <div className="tomorrow-curriculum">
            明日のカリキュラム：
            {tomorrowPlan ? tomorrowPlan.curriculum : "なし"}
          </div>
          <div className="tomorrow-place">
            明日の会場：{tomorrowPlan ? tomorrowPlan.place : "なし"}
          </div>
        </div>
      </div>
      <button onClick={handleToday}>今日</button>
      <div style={{ width: "90vw", display: "flex", justifyContent: "center" }}>
        <Calendar
          value={value}
          onClickDay={handleClickDay}
          activeStartDate={activeStartDate}
          onActiveStartDateChange={handleActiveStartDate}
          tileClassName={getTileClassName}
        />
      </div>
      {popupDate && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div>
              日付：{popupDate.toLocaleDateString()}(
              {"日月火水木金土"[popupDate.getDay()]})
            </div>
            {(() => {
              const plan = findPlanByDate(
                toISOStringWithTimezone(popupDate).slice(0, 10)
              );
              return plan ? (
                <>
                  <div>カリキュラム：{plan.curriculum}</div>
                  <div>会場：{plan.place}</div>
                  <div>担当教員：{plan.teacher}</div>
                </>
              ) : (
                <>
                  <div>カリキュラム：無し</div>
                  <div>会場：無し</div>
                  <div>担当教員：</div>
                </>
              );
            })()}
            <button onClick={handleClosePopup}>閉じる</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
