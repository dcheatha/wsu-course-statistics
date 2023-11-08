import { useState, useEffect } from "react";
import { AllSubjectsTable } from "../components/AllSubjectsTable";
import { fetchAllSubjects } from "../data/dataFetch";
import { Subjects } from "../data/models";
import { map, size } from "lodash";
import { ResponsivePie } from "@nivo/pie";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { EnrollemntTreeMap } from "./EnrollemntTreeMap";

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


  const treeMapData =  map( allSubjectsData?.items, (subject) => { 
    return { 
      id: subject.subject || "", 
      value: subject.total_headcount || 0} 
    }
  )

  const onClickTreeMap = (id: string) => {
      navigate(`/subject/${id}`);
  }

  const enrollmentTreeMap = <EnrollemntTreeMap data={treeMapData} onClick={onClickTreeMap} />

    return <div>
        <h2>Enrollment-Based Subject TreeMap</h2>
        <div style={{ width: '100%', height: 600 }}>
          {enrollmentTreeMap}
        </div>

        <br/>
        <h2>Subjects (n={size(allSubjectsData?.items)})</h2>
        <AllSubjectsTable data={allSubjectsData}/>
    </div>
}
