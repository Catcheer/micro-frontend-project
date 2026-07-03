import { useEffect, useRef } from "react";
import { Card, Row, Col, Typography } from "antd";
import * as echarts from "echarts";
import { useSelector } from "react-redux";
import { selectSetting } from "@/store/settingSlice.js";

const { Title, Text } = Typography;

function Home() {
  const chartRef1 = useRef<HTMLDivElement>(null);
  const chartRef2 = useRef<HTMLDivElement>(null);
  const { navTopHight } = useSelector(selectSetting);

  useEffect(() => {
    const summaryData = [
      { name: "总学生数", value: 1258, color: "#3366FF" },
      { name: "本周签到率", value: 96.3, color: "#22C55E" },
      { name: "在校班级", value: 24, color: "#F59E0B" },
      { name: "待审批请假", value: 8, color: "#EC4899" },
    ];

    const option1 = {
      title: {
        text: "学生分布",
        left: "left",
        textStyle: { color: "#333", fontSize: 16 },
      },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级"],
        axisLine: { lineStyle: { color: "#999" } },
      },
      yAxis: {
        type: "value",
        axisLine: { lineStyle: { color: "#999" } },
      },
      series: [
        {
          name: "学生数",
          type: "bar",
          data: [210, 185, 205, 195, 190, 173],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#4F46E5" },
              { offset: 1, color: "#3B82F6" },
            ]),
          },
          barWidth: "40%",
        },
      ],
    };

    const option2 = {
      title: {
        text: "月度缺勤趋势",
        left: "left",
        textStyle: { color: "#333", fontSize: 16 },
      },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: ["1月", "2月", "3月", "4月", "5月", "6月"],
        axisLine: { lineStyle: { color: "#999" } },
      },
      yAxis: {
        type: "value",
        axisLine: { lineStyle: { color: "#999" } },
      },
      series: [
        {
          name: "缺勤人次",
          type: "line",
          smooth: true,
          data: [18, 24, 16, 12, 20, 15],
          lineStyle: { color: "#EF4444" },
          itemStyle: { color: "#EF4444" },
        },
      ],
    };

    let chart1: echarts.ECharts | null = null;
    let chart2: echarts.ECharts | null = null;

    if (chartRef1.current) {
      chart1 = echarts.init(chartRef1.current);
      chart1.setOption(option1);
    }

    if (chartRef2.current) {
      chart2 = echarts.init(chartRef2.current);
      chart2.setOption(option2);
    }

    const handleResize = () => {
      chart1?.resize();
      chart2?.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      chart1?.dispose();
      chart2?.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="px-6 py-4" style={{ minHeight: `calc(100vh - ${(navTopHight || 0)+60}px)` }}>
      <Title level={3}>管理系统看板</Title>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Text type="secondary">总学生数</Text>
            <div className="mt-4 text-3xl font-semibold">1,258</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Text type="secondary">本周签到率</Text>
            <div className="mt-4 text-3xl font-semibold">96.3%</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Text type="secondary">在校班级</Text>
            <div className="mt-4 text-3xl font-semibold">24</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Text type="secondary">待审批请假</Text>
            <div className="mt-4 text-3xl font-semibold">8</div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-6">
        <Col span={12}>
          <Card title="学生按年级分布" style={{ minHeight: 360 }}>
            <div ref={chartRef1} style={{ width: "100%", height: 280 }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="月度缺勤趋势" style={{ minHeight: 360 }}>
            <div ref={chartRef2} style={{ width: "100%", height: 280 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
