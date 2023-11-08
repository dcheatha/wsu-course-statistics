import { useState, useEffect } from "react";
import { AllSubjectsTable } from "../components/AllSubjectsTable";
import { fetchAllSubjects } from "../data/dataFetch";
import { Subjects } from "../data/models";
import { filter, map, reject, size, sum } from "lodash";
import { ResponsivePie } from "@nivo/pie";
import { theme } from "../util/theme";
import { ResponsiveTreeMap } from "@nivo/treemap";
import { quantile } from "simple-statistics";
import { useNavigate } from "react-router-dom";

export default function AllSubjectsPage()
{
  const [allSubjectsData, setData] = useState<Subjects | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchData() {
      const subjects = await fetchAllSubjects();
      setData(subjects);
    }

    fetchData();
  }, []);


  const chartData = { id: 'wsu', children: map( allSubjectsData?.items, (subject) => { 
    return { 
      id: subject.subject || "", 
      value: subject.total_headcount || 0} 
    }
  ),
  }

  const tooSmalLValue = size(chartData.children) > 0 ? quantile(map(chartData.children, 'value'), 0.25) : 0;

  const tooSmall = sum(map(reject( chartData.children, (item) => item.value > tooSmalLValue ), 'value'));
  chartData.children = filter( chartData.children, (item) => item.value > tooSmalLValue );
  const otherSubjectsId = 'Other Subjects';
  chartData.children.push({ id: otherSubjectsId, value: tooSmall });

  const onClickTreeMap = ({ id }: { id: string }) => {
    if (id !== otherSubjectsId) {
      navigate(`/subject/${id}`);
    }
  }

  const enrollmentTreeMap = <ResponsiveTreeMap
    theme={theme}
    data={chartData}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    label={(node) => `${node.id}`}
    valueFormat={" >-.2s"}
    tile="binary"
    nodeOpacity={1}
    leavesOnly={true}
    innerPadding={2}
    borderWidth={0}
    onClick={onClickTreeMap}
  />

    return <div>
        <h1>All Subjects</h1>
        <div style={{ width: '100%', height: 600 }}>
          {enrollmentTreeMap}
        </div>
        <AllSubjectsTable data={allSubjectsData}/>
    </div>
}