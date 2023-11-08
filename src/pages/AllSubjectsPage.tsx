import { useState, useEffect } from "react";
import { AllSubjectsTable } from "../components/AllSubjectsTable";
import { fetchAllSubjects } from "../data/dataFetch";
import { Subjects } from "../data/models";
import { map, size } from "lodash";
import { ResponsivePie } from "@nivo/pie";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { EnrollemntTreeMap } from "./EnrollemntTreeMap";
import { sum } from "simple-statistics";

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

  const numCourses = sum(map( allSubjectsData?.items, (subject) => subject.courses_offered || 0));
  const numHeadcount = sum(map( allSubjectsData?.items, (subject) => subject.total_headcount || 0));

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

        <div className="row shadow-sm py-3 bg-black rounded-bottom">
          <h2>Loaded {numCourses} courses with {numHeadcount} total enrollments</h2>
          <div className="pt-1" style={{ width: '100%', height: 600 }}>
            {enrollmentTreeMap}
          </div>
        </div>



        <div className="row pt-3 bg-dark-subtle">
          <h2>Subjects (n={size(allSubjectsData?.items)})</h2>
          <AllSubjectsTable data={allSubjectsData}/>
        </div>
    </div>
}
