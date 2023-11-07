import { map, size } from 'lodash';
import { CourseSearchItem } from '../data/models';


export function CourseSearchTable(props: { data: CourseSearchItem[]; }) {
  let rows = map(props.data, (item, index) => (
    <CourseSearchRow key={index} item={item} />
  ));
  
  if ( size( rows ) <= 0 ) {
    return null;
  }

  return (
    <div>
      Search Results (n = {size( rows ) || 0})

      <table className="table table-striped table-bordered">
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
    </div>
  );
}

export function CourseSearchRow(props: { item: CourseSearchItem; }) {
  return (
    <tr>
      <td>{props.item.subject}</td>
      <td>{props.item.catalog_no}</td>
      <td>{props.item.title || 'N/A'}</td>
      <td>{props.item.total_headcount || 'N/A'}</td>
    </tr>
  );
}

