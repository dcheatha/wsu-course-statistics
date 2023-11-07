import { map } from 'lodash';
import { CourseSearchItem } from '../data/models';


export function CourseSearchTable(props: { data: CourseSearchItem[]; }) {
  let rows = map(props.data, (item, index) => (
    <CourseSearchRow key={index} item={item} />
  ));

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Subject</th>
          <th>Catalog Number</th>
          <th>Title</th>
          <th>Total Headcount</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}export function CourseSearchRow(props: { item: CourseSearchItem; }) {
  return (
    <tr>
      <td>{props.item.subject}</td>
      <td>{props.item.catalog_no}</td>
      <td>{props.item.title || 'N/A'}</td>
      <td>{props.item.total_headcount || 'N/A'}</td>
    </tr>
  );
}

