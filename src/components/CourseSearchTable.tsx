import { map, size } from 'lodash';
import { CourseSearchItem } from '../data/models';
import { Link } from 'react-router-dom';


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
  const { item } = props;
  return (
    <tr>
      <td>
        <Link to={`/subject/${item.subject}`}>
          {item.subject}
        </Link>
      </td>
      <td>
        <Link to={`/course/${item.subject}/${item.catalog_no}`}>
          {item.catalog_no}
        </Link>
      </td>
      <td>
        <Link to={`/course/${item.subject}/${item.catalog_no}`}>
          {item.title || 'N/A'}
        </Link>
      </td>
      <td>{item.total_headcount || 'N/A'}</td>
    </tr>
  );
}

