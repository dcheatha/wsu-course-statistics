import React, { useState, useEffect } from 'react';
import { join, map, round } from 'lodash';
import { Subjects } from '../data/models';
import { fetchAllSubjects } from '../data/dataFetch';
import { Subject } from '../data/models';
import { Link } from 'react-router-dom';

export interface AllSubjectsProps {
  data: Subjects | null;
}

export function AllSubjectsTable( props: AllSubjectsProps ) {
  const rows = map(props.data?.items, (item) => <AllSubjectsRow subject={item} />);

  return (
    <table className="table table-striped table-bordered">
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
      <td>
        <Link to={`/subject/${subject.subject}`}>
          {subject.subject}
        </Link>
      </td>
      <td>{subject.courses_offered}</td>
      <td>{roundedDropRate}%</td>
      <td>{join(subject.campuses, ", ")}</td>
    </tr>
  );
}

