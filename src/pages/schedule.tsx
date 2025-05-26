import { useNavigate } from "react-router-dom";
import { Box, styled, Button } from "@mui/material";
import { hour } from "./utils";
import { Title } from "@mui/icons-material";
import type { height } from "@mui/system";

const groups = ["A", "B", "C", "D", "E", "F", "G"];
const venews = ["セミA", "セミB", "セミC", "セミD", "セミA", "セミB", "セミE"];
export default function Schedule() {
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate("/excelLike")}>excelLike</Button>
      <Wrapper>
        <FirstGrid>
          <GroupGrid>
            <Header>グループ名</Header>
            {groups.map((group) => (
              <Group>{group}</Group>
            ))}
          </GroupGrid>
          <VenewGrid>
            <Header>会場名</Header>
            {venews.map((venew) => (
              <div>{venew}</div>
            ))}
          </VenewGrid>
          <HourGrid>
            {hour(24.5).map((time) => (
              <Hour>
                {Math.floor(time)}:{time % 1 == 0.5 ? "30" : "00"}
              </Hour>
            ))}
          </HourGrid>
        </FirstGrid>
      </Wrapper>
    </>
  );
}

const Wrapper = styled(Box)(({ theme }) => ({
  width: "150%",
  margin: 10,
}));

const FirstGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "80px 49px calc(100% - 50px)",
}));

const HourGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(49, 3fr) ",
  gap: "25px",
}));

const Header = styled(Box)<{ theme?: any }>(({ theme }) => ({
  fontWeight: "bold",
  textAlign: "left",
  paddingBottom: "8px",
}));

const GroupGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateRows: `repeat(20, ${theme.spacing(6)})`,
}));
const VenewGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateRows: `repeat(20, ${theme.spacing(6)})`,
}));

const Group = styled(Box)(() => ({
  borderLeft: "5px solid #dcdcdc",
}));

const Hour = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(3),
  textAlign: "center",
  position: "relative",

  "&::before": {
    position: "absolute",
    top: 30, // 縦線の開始位置（上端）
    left: "50%", // 要素の中央に配置
    content: '""',
    height: "40%", // 縦線の高さを要素いっぱいにする
    borderLeft: "1px solid black", // 縦線を追加
  },
}));
