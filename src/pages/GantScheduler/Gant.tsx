import { useState } from "react";
import Calendar from "react-calendar";
import "./ScheduleTimeline.css";
import { CurrencyBitcoin } from "@mui/icons-material";
import toISOStringWithTimezone from "./JTZ";

const plans = [
  {
    curriculum: "朝会",
    place: "セミB",
    date: "2025-05-27",
    startTime: "9:00",
    endTime: "9:30",
    teacher: "百田",
    color: "#ff0000",
  },
  {
    curriculum: "債券数学",
    place: "セミB",
    date: "2025-05-27",
    startTime: "9:30",
    endTime: "18:00",
    teacher: "百田",
    color: "#ff0000",
  },

  {
    curriculum: "デリバティブ数学",
    place: "セミC",
    date: "2025-05-28",
    startTime: "9:30",
    endTime: "18:00",
    teacher: "百田",
  },
];

const MyCalendar = () => {
  const [value, setValue] = useState<Date>(new Date());
  const [activeStartDate, setActiveStartDate] = useState<Date>(new Date());
  const [popupDate, setPopupDate] = useState<Date | null>(null);

  function findLongestPlanByDate(dateStr: string) {
    // 指定日付の予定をすべて抽出
    const dayPlans = plans.filter(
      (p) => p.date === dateStr && p.startTime && p.endTime
    );
    if (dayPlans.length === 0)
      return plans.find((p) => p.date === dateStr) || null;

    // 時間差（分）を計算
    const getMinutes = (time: string) => {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m;
    };

    // 最大時間差の予定を返す
    return dayPlans.reduce((max, plan) => {
      const diff = getMinutes(plan.endTime) - getMinutes(plan.startTime);
      const maxDiff = getMinutes(max.endTime) - getMinutes(max.startTime);
      return diff > maxDiff ? plan : max;
    });
  }

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

  // const findPlanByDate = (dateStr: string) =>
  //   plans.find((p) => p.date === dateStr);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const todayStr = toISOStringWithTimezone(today).slice(0, 10);
  const tomorrowStr = toISOStringWithTimezone(tomorrow).slice(0, 10);

  const todayPlan = findLongestPlanByDate(todayStr);
  const tomorrowPlan = findLongestPlanByDate(tomorrowStr);

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
      <div style={{ width: "95vw", display: "flex", justifyContent: "center" }}>
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
              const plan = findLongestPlanByDate(
                toISOStringWithTimezone(popupDate).slice(0, 10)
              );
              return plan ? (
                <>
                  <div>
                    カリキュラム：
                    <span style={{ color: plan.color ?? "#000" }}>
                      {plan.curriculum}
                    </span>
                  </div>
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
