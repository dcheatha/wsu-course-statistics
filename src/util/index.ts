import { chain, groupBy, isNil, keys, map, round, size, times, uniq, values } from "lodash";
import { Courses } from "../data/models";


export function dropRate(headcount: number | undefined, dropped: number | undefined): string
{
    const dropRate = (dropped || 0) / (headcount || 1);
    const roundedDropRate = round(dropRate * 100, 1);
    return `${roundedDropRate}%`;
}

export function CourseDataInstructorLimiter(courseData: Courses | null, page: number): { courseData: Courses | null; pages: string[]; } {
    const instructors = uniq(map(courseData?.courses, (course) => course.instructor || 'Unknown'));

    if (size(instructors) <= 8 || isNil(courseData)) {
        return {
            courseData,
            pages: [],
        };
    }

    const courseDataYears = keys(groupBy(courseData?.courses, (courseGrade) => courseGrade.year));


    const groupedCourseData = values(groupBy(courseData?.courses, (courseGrade) => courseGrade.year));
    const groupedGradeData = values(groupBy(courseData?.stats.grades_by_instructor, (courseGrade) => courseGrade.year));

    return {
        courseData: {
            ...courseData,
            courses: groupedCourseData[page],
            stats: {
                ...courseData.stats,
                grades_by_instructor: groupedGradeData[page],
            }
        },
        pages: courseDataYears,
    };
}

export function groupGrades(data: Courses | null) {
    return chain(data?.stats.grades_by_instructor)
        .groupBy((courseGrade) => `${courseGrade.year}-${courseGrade.semester}`)
        .mapValues(
            (yearSemesterGroup) => chain(yearSemesterGroup)
                .groupBy('instructor')
                .map((data) => {

                    // @ts-ignore
                    return chain(data)
                        .reduce((accumulator, cur) => {
                            const nextValue = {
                                ...accumulator,
                                // @ts-ignore
                                grades: accumulator && accumulator.grades || []
                            };

                            nextValue.grades = [...nextValue.grades, ...times(cur.headcount, () => cur.grade)];
                            return nextValue;
                        })
                        .omit(['grade', 'headcount'])
                        .value();
                })
                .value()
        )
        .value();
}

