import { useParams } from "react-router-dom";

export default function CourseOverviewPage()
{
    const { subject, catalogNo } = useParams();

    return <div>
        {subject} {catalogNo}
    </div>
}