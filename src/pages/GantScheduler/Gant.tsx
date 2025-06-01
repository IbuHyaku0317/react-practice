import { useState } from "react";
import Calendar from "react-calendar";
import "./ScheduleTimeline.css";
import { CurrencyBitcoin, PlayLesson } from "@mui/icons-material";
import toISOStringWithTimezone from "./JTZ";

// start_time, end_time を "YYYY-MM-DD HH:MM" 形式に統一
const plans = [
  {
    id: 1,
    group: "A",
    curriculum: "債券数学",
    location: "セミB",
    start_time: "2025-06-01 09:30",
    end_time: "2025-06-01 18:00",
    teacher: "百田",
    color: "#ff0000",
  },
  {
    id: 2,
    group: "B",
    curriculum: "React-hands-on + generative AI",
    location: "セミC",
    start_time: "2025-06-01 03:30",
    end_time: "2025-06-01 12:00",
    teacher: "百田",
    color: "#ff0000",
  },
  {
    id: 3,
    group: "A",
    curriculum: "朝会",
    location: "セミB",
    start_time: "2025-06-02 09:00",
    end_time: "2025-06-02 09:30",
    teacher: "百田",
    color: "#ff0000",
  },
  {
    id: 4,
    group: "A",
    curriculum: "あいうえおあいうえお",
    location: "セミB",
    start_time: "2025-06-03 09:00",
    end_time: "2025-06-03 09:30",
    teacher: "百田",
    color: "#ff0000",
  },
];

const MyCalendar = () => {
  const [value, setValue] = useState<Date>(new Date());
  const [activeStartDate, setActiveStartDate] = useState<Date>(new Date());

  // 指定日付の予定をすべて返す
  function findPlansByDate(dateStr: string) {
    return plans.filter((p) => p.start_time.startsWith(dateStr));
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
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // "YYYY-MM-DD" 形式で日付を取得
  const todayStr = toISOStringWithTimezone(today).slice(0, 10);
  const tomorrowStr = toISOStringWithTimezone(tomorrow).slice(0, 10);

  const todayPlan = plans.find((p) => p.start_time.startsWith(todayStr));
  const futurePlans = plans.filter((p) => p.start_time.slice(0, 10) > todayStr);

  const nextDate =
    futurePlans.length > 0
      ? futurePlans.map((p) => p.start_time.slice(0, 10)).sort()[0]
      : null;

  // 選択中の日付の予定リスト
  const selectedDateStr = toISOStringWithTimezone(value).slice(0, 10);
  const selectedPlans = findPlansByDate(selectedDateStr);

  const nextDayPlans = nextDate
    ? plans.filter((p) => p.start_time.startsWith(nextDate))
    : [];

  return (
    <div
      className="calendar-flex-root"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "100vw",
        minHeight: "100vh",
        background: "#fafdff",
        padding: "40px 0",
        boxSizing: "border-box",
        gap: "48px",
      }}
    >
      {/* カレンダー（左側） */}
      <div style={{ width: "420px", minWidth: "350px", flexShrink: 0 }}>
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
              今日の会場：{todayPlan ? todayPlan.location : "なし"}
            </div>
          </div>
          <div className="tomorrow-info-box">
            <div className="tomorrow-curriculum">
              翌営業日のカリキュラム：
              {nextDayPlans.length > 0
                ? nextDayPlans.map((p, i) => (
                    <span key={i}>
                      {p.curriculum}
                      {i < nextDayPlans.length - 1 ? " / " : ""}
                    </span>
                  ))
                : "なし"}
            </div>
            <div className="tomorrow-place">
              翌営業日の会場：
              {nextDayPlans.length > 0
                ? nextDayPlans.map((p, i) => (
                    <span key={i}>
                      {p.location}
                      {i < nextDayPlans.length - 1 ? " / " : ""}
                    </span>
                  ))
                : "なし"}
            </div>
          </div>
        </div>
        <button onClick={handleToday}>今日</button>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Calendar
            value={value}
            onClickDay={handleClickDay}
            activeStartDate={activeStartDate}
            onActiveStartDateChange={handleActiveStartDate}
            tileClassName={getTileClassName}
          />
        </div>
      </div>
      {/* 右側：押下した日付の詳細予定 */}
      <div
        className="popup-content"
        style={{
          minWidth: "220px",
          maxWidth: "500px",
          minHeight: "250px",
          maxHeight: "400px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
          marginTop: "320px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "24px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            marginBottom: "12px",
          }}
        >
          日付：{value.toLocaleDateString()}({"日月火水木金土"[value.getDay()]})
        </div>
        {selectedPlans.length > 0 ? (
          selectedPlans
            .slice()
            .sort((a, b) => a.start_time.localeCompare(b.start_time))
            .map((plan, idx) => (
              <div key={idx} style={{ marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>
                  {plan.start_time.slice(11, 16)}~{plan.end_time.slice(11, 16)}
                </span>{" "}
                <span style={{ color: plan.color }}>{plan.curriculum}</span>
                <span>@{plan.location}</span>
              </div>
            ))
        ) : (
          <div>予定はありません</div>
        )}
      </div>
    </div>
  );
};

export default MyCalendar;
