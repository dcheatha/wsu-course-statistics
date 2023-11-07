import { useParams } from 'react-router';

export default function SubjectOverviewPage()
{
    const { subject } = useParams();
    return (
        <div>
            <h1>
                Overview for Subject {subject}
            </h1>
        </div>
    )
}