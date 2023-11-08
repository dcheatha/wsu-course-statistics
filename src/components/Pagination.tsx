import { map } from "lodash";
import { Courses } from "../data/models";

export interface PaginationProps {
    limitedCourseData: {
        courseData: Courses | null;
        pages: string[];
    };
    page: number;
    setPage: (page: number) => void;
}

export function Pagination(props: PaginationProps) {
    const { limitedCourseData, page, setPage } = props;
    const pagenationPages = map(limitedCourseData.pages, (pageName, idx) => {
        const classNames = `page-item ${idx === page ? "active" : ""}`;
        return <li className={classNames}>
            <a className="page-link" href="#" onClick={() => setPage(idx)}>{pageName}</a>
        </li>;
    });

    return <nav className="align-middle">
        <ul className="pagination m-0">
            {pagenationPages}
        </ul>
    </nav>;
}
