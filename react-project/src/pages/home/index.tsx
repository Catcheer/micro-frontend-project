import { useEffect, useRef ,useState} from "react";
import { Card, Row, Col, Typography } from "antd";
import * as echarts from "echarts";
import { useSelector } from "react-redux";
import { selectSetting } from "@/store/settingSlice.js";
import { dashboardOverview, studentStatistics } from "@/api/dashboard";

const { Title, Text } = Typography;

interface OverviewData {
  totalClasses: number;
  totalStudents: number;
  totalSubjects: number;
  totalTeachers: number;
}

interface StudentStatisticsData {
  classStudent: Array<{
    className: string;
    studentCount: number;
  }>;
  genderDistribution: Array<{
    gender: string;
    totalStudents: number;
  }>;
}


function Home() {
  const chartRef1 = useRef<HTMLDivElement>(null);
  const chartRef2 = useRef<HTMLDivElement>(null);

  let chart1= useRef<any>(null);
  let chart2= useRef<any>(null);



  const { navTopHight } = useSelector(selectSetting);


  const [overviewData, setOverviewData] = useState<OverviewData>({
    totalClasses: 0,
    totalStudents: 0,
    totalSubjects: 0,
    totalTeachers: 0,
  });
  const [studentStatisticsData, setStudentStatisticsData] = useState<StudentStatisticsData>({
    classStudent: [],
    genderDistribution: [],
  });



  useEffect(() => {
    dashboardOverview().then(res => {
      setOverviewData(res)
    })
    _studentStatistics()
  }, [])


  const _studentStatistics = () => {
    studentStatistics().then(res => {
      setStudentStatisticsData(res)
      // setStudentStatisticsData(echartsData)
    })
  }


  useEffect(() => {
    const newData1 = {
      xAxis: {
        data: studentStatisticsData.classStudent.map(item => item.className),
      },
      series: [
        {
          data: studentStatisticsData.classStudent.map(item => item.studentCount),
        }
      ],
    }

    const newData2 = {
      series: [
        {
          data: studentStatisticsData.genderDistribution.map(item => {
            if(item.gender === '1'){
              return {
                value: item.totalStudents,
                name: '男',
              }
            }else{
              return {
                value: item.totalStudents,
                name: '女',
              }
            }
          }),
        }
      ],
    }
    if (chart2?.current) {
      chart2?.current.setOption(newData2)
    }
    if (chart1?.current) {
     
      chart1?.current.setOption(newData1)
    }

    
      
  }, [studentStatisticsData])


  useEffect(() => {
   

    const option1 = {
      title: {
        text: "学生分布",
        left: "left",
        textStyle: { color: "#333", fontSize: 16 },
      },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: [],
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
          data: [],
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

    //鼠标hover时 显示数值 和 百分比

    const option2 = {
      title: {
        text: '学生按性别分布',
      
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '学生按性别分布',
          type: 'pie',
          radius: '60%',
          data: [
            { value: 1048, name: '男' },
            { value: 735, name: '女' },
            
          ],
         
        }
      ]
    };

    

    if (chartRef1.current) {
      chart1.current = echarts.init(chartRef1.current);
      chart1.current?.setOption(option1);
    }

    if (chartRef2.current) {
      chart2.current = echarts.init(chartRef2.current);
      chart2.current.setOption(option2);
    }

    const handleResize = () => {
      chart1?.current.resize();
      chart2?.current.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      chart1?.current.dispose();
      chart2?.current.dispose();
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
            <div className="mt-4 text-3xl font-semibold">{overviewData.totalStudents}</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Text type="secondary">总班级数</Text>
            <div className="mt-4 text-3xl font-semibold">{overviewData.totalClasses}</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Text type="secondary">总教师数</Text>
            <div className="mt-4 text-3xl font-semibold">{overviewData.totalTeachers}</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Text type="secondary">总科目数</Text>
            <div className="mt-4 text-3xl font-semibold">{overviewData.totalSubjects}</div>
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
          <Card title="学生按性别分布" style={{ minHeight: 360 }}>
            <div ref={chartRef2} style={{ width: "100%", height: 280 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
