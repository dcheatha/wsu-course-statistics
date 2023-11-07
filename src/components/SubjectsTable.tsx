import React, { useState, useEffect } from 'react';
import { join, map, round } from 'lodash';
import { Subjects } from '../data/models';
import { fetchSubjects } from '../data/dataFetch';
import { Subject } from '../data/models';

export function AllSubjectsTable() {
  const [data, setData] = useState<Subjects | null>(null);

  useEffect(() => {
    async function fetchData() {
      const subjects = await fetchSubjects();
      setData(subjects);
    }

    fetchData();
  }, []);

  const rows = map(data?.items, (item) => <AllSubjectsRow subject={item} />);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Subject</th>
          <th scope="col"># of Courses Offered</th>
          <th scope="col">Course Drop Rate</th>
          <th scope="col">Campuses</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

export function AllSubjectsRow(props: { subject: Subject; }) {
  const { subject } = props;

  const dropRate = (subject.total_dropped || 0) / (subject.total_headcount || 1);
  const roundedDropRate = round(dropRate * 100, 2);

  return (
    <tr>
      <td>{subject.subject}</td>
      <td>{subject.courses_offered}</td>
      <td>{roundedDropRate}%</td>
      <td>{join(subject.campuses, ", ")}</td>
    </tr>
  );
}

