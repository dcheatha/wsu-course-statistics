import { useState, useEffect } from "react";
import { AllSubjectsTable } from "../components/AllSubjectsTable";
import { fetchAllSubjects } from "../data/dataFetch";
import { Subjects } from "../data/models";

export default function AllSubjectsPage()
{
  const [allSubjectsData, setData] = useState<Subjects | null>(null);

  useEffect(() => {
    async function fetchData() {
      const subjects = await fetchAllSubjects();
      setData(subjects);
    }

    fetchData();
  }, []);



    return <div>
        <h1>All Subjects</h1>
        <AllSubjectsTable data={allSubjectsData}/>
    </div>
}