import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Course, CourseEnrollmentByInstructorInfo, Courses } from "../data/models";
import { fetchCourse } from "../data/dataFetch";
import { Dictionary, first, forEach, groupBy, has, isNil, map, reverse, round, size, some, sortBy, union, uniq } from "lodash";
import Breadcrumbs from "../components/Breadcrumbs";
import { CourseTable } from "../components/CourseTable";
import { ResponsiveBump } from "@nivo/bump";

export default function CourseOverviewPage()
{
    const { subject, catalogNo } = useParams();


    const [courseData, setCourseData] = useState<Courses | null>(null);

    useEffect(() => {
        async function fetchData() {
            const subjects = await fetchCourse(subject || "CPT_S", catalogNo || "121");
            setCourseData(subjects);
        }

        fetchData();
    }, []);

    const title = first(courseData?.courses)?.title || "Loading...";

    return <div>
        <Breadcrumbs subject={subject} catalogNo={catalogNo}/>
        <h1>{subject} {catalogNo} — {title}</h1>

        <h2>Stats</h2>
        <h3>Drop Rate</h3>
        <DropRateBump data={courseData}/>

        <h2>All Known Historical Offerings</h2>
        { courseData && <CourseTable data={courseData} />}
    </div>
}

export function DropRateBump( props: { data: Courses | null })
{
   const data = computeDropRateBumpData(props.data);
   return <div style={{width: "100%", height: 200 + 50 * size(data)}}>
    <ResponsiveBump
        theme={theme}
        data={data}
        colors={{ scheme: 'spectral' }}
        lineWidth={3}
        activeLineWidth={6}
      axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: 32
      }}
      axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Drop Rate',
          legendPosition: 'middle',
          legendOffset: -40,
          format: '.00%',
      }}
      margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
    />
    </div>
}


interface EnrollmentBumpData {
  total_headcount: number;
  total_dropped: number;
  course_ids: number[];
}

function computeDropRateBumpData(coursedata: Courses | null) {
  const groupedByInstructor = groupEnrollmentByInstructor(coursedata);

  const offeredTimes = uniq(map(coursedata?.courses, (course) => `${course.year}-${course.semester}`));

  const data = map(groupedByInstructor, (instructorData, instructor) => {
    return {
      id: instructor,
      data: computeDropRateBumpDataForInstructor(offeredTimes, instructorData)
    }
  });

  console.log(data)
  return data;
}


function computeDropRateBumpDataForInstructor(offeredTimes: string[], instructorData: Record<string, EnrollmentBumpData>) {
  const data: { x: string, y: number | null }[] = map(instructorData, (yearSemesterData, yearSemester) => {

    const { total_dropped, total_headcount } = yearSemesterData;

    return {
      x: yearSemester,
      y: round(total_dropped / total_headcount, 2) + (Math.random() / 100)
    }
  });


    for (const offeredTime of offeredTimes) {
      if ( !some(data, { x: offeredTime})) {
        data.push( { x: offeredTime, y: null } )
      }
    }


  return sortBy(data, (datum) => datum.x);
}


function groupEnrollmentByInstructor(coursedata: Courses | null): Record<string, Record<string, EnrollmentBumpData>> {
  if (isNil(coursedata)) {
    return {};
  }

  const data: CourseEnrollmentByInstructorInfo[] = coursedata?.stats.enrollment_by_instructor || [];
  const groupedData: Dictionary<CourseEnrollmentByInstructorInfo[]> = groupBy(data, 'instructor');
  const result: Record<string, Record<string, EnrollmentBumpData>> = {};

  forEach(groupedData, (courses, instructor) => {

    result[instructor] = {};

    forEach(courses, (course) => {
      const yearSemester = `${course.year}-${course.semester}`;

      result[instructor][yearSemester] = course;
    });
  });

  return result;
}


const theme = {
  "background": "#ffffff",
  "text": {
      "fontSize": 11,
      "fill": "#333333",
      "outlineWidth": 0,
      "outlineColor": "transparent"
  },
  "axis": {
      "domain": {
          "line": {
              "stroke": "#777777",
              "strokeWidth": 1
          }
      },
      "legend": {
          "text": {
              "fontSize": 12,
              "fill": "#333333",
              "outlineWidth": 0,
              "outlineColor": "transparent"
          }
      },
      "ticks": {
          "line": {
              "stroke": "#777777",
              "strokeWidth": 1
          },
          "text": {
              "fontSize": 11,
              "fill": "#333333",
              "outlineWidth": 0,
              "outlineColor": "transparent"
          }
      }
  },
  "grid": {
      "line": {
          "stroke": "#dddddd",
          "strokeWidth": 1
      }
  },
  "legends": {
      "title": {
          "text": {
              "fontSize": 11,
              "fill": "#333333",
              "outlineWidth": 0,
              "outlineColor": "transparent"
          }
      },
      "text": {
          "fontSize": 11,
          "fill": "#333333",
          "outlineWidth": 0,
          "outlineColor": "transparent"
      },
      "ticks": {
          "line": {},
          "text": {
              "fontSize": 10,
              "fill": "#333333",
              "outlineWidth": 0,
              "outlineColor": "transparent"
          }
      }
  },
  "annotations": {
      "text": {
          "fontSize": 13,
          "fill": "#333333",
          "outlineWidth": 2,
          "outlineColor": "#ffffff",
          "outlineOpacity": 1
      },
      "link": {
          "stroke": "#000000",
          "strokeWidth": 1,
          "outlineWidth": 2,
          "outlineColor": "#ffffff",
          "outlineOpacity": 1
      },
      "outline": {
          "stroke": "#000000",
          "strokeWidth": 2,
          "outlineWidth": 2,
          "outlineColor": "#ffffff",
          "outlineOpacity": 1
      },
      "symbol": {
          "fill": "#000000",
          "outlineWidth": 2,
          "outlineColor": "#ffffff",
          "outlineOpacity": 1
      }
  },
  "tooltip": {
      "container": {
          "background": "#ffffff",
          "fontSize": 12
      },
      "basic": {},
      "chip": {},
      "table": {},
      "tableCell": {},
      "tableCellValue": {}
  }
}