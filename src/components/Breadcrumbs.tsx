import { isNil } from "lodash"
import { Link } from "react-router-dom"

interface BreadcrubsProps {
    subject?: string | undefined;
    catalogNo?: string | undefined;
}

export default function Breadcrumbs( props: BreadcrubsProps)
{
    const { subject, catalogNo } = props;

    const path = [
        <li className="breadcrumb-item">
            <Link to={`/`}>
                All Subjects
            </Link>
        </li>
    ]

    if ( !isNil( subject )) {
        path.push(
            <li className="breadcrumb-item">
                <Link to={`/subject/${subject}`}>
                    {subject}
                </Link>
            </li>
        )
    }

    if ( !isNil( catalogNo )) {
        path.push(
            <li className="breadcrumb-item">
                <Link to={`/course/${subject}/${catalogNo}`}>
                    {catalogNo}
                </Link>
            </li>
        )
    }

    return <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            {path}
        </ol>
  </nav>
}