import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Course, CourseEnrollmentByInstructorInfo, Courses } from "../data/models";
import { fetchCourse } from "../data/dataFetch";
import { Dictionary, chain, find, first, flatten, flattenDeep, forEach, fromPairs, groupBy, has, isNil, map, mapValues, merge, reduce, repeat, reverse, round, size, some, sortBy, times, truncate, union, uniq } from "lodash";
import Breadcrumbs from "../components/Breadcrumbs";
import { CourseTable } from "../components/CourseTable";
import { ResponsiveBoxPlot } from '@nivo/boxplot'
import _ from "lodash";
import { max, mean, median, min, standardDeviation } from "simple-statistics";
import { ResponsiveStream } from "@nivo/stream";


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

        <Tabs tabs={[
          {
            name: 'Grade Distrubution',
            component: <GradesBoxPlot data={courseData}/>,
          },
          {
            name: 'Drop Rate',
            component: <div>Todo</div>,
          },
          {
            name: 'Instructor Allocation',
            component: <PopulationSteamChart data={courseData}/>,
          }
        ]} />

        <h2>All Known Historical Offerings</h2>
        { courseData && <CourseTable data={courseData} />}
    </div>
}

export interface Tab
{
  name: string,
  component: JSX.Element,
}

export function Tabs( props: { tabs: Tab[] }) 
{
  const { tabs } = props;
  const [active, setActive] = useState(first(tabs)?.name);

  const renderedTabs = map( tabs, ( tab ) => <li key={tab.name} className="nav-item" onClick={() => { setActive( tab.name )}}>
    <a className={"nav-link " + (tab.name === active ? "active" : "")} aria-current="page">{tab.name}</a>
  </li>
  )

  const foundTab = find(tabs, (tab) => tab.name == active);

  return <div>
    <ul className="nav justify-content-center nav-underline">
      {renderedTabs}
    </ul>
    {foundTab && foundTab.component}
  </div>
}

function groupGrades(data: Courses | null)
{
  return chain(data?.stats.grades_by_instructor)
  .groupBy((courseGrade) => `${courseGrade.year}-${courseGrade.semester}`)
  .mapValues(
    (yearSemesterGroup) => chain(yearSemesterGroup)
                            .groupBy('instructor')
                            .map((data) => 
                            {

                              // @ts-ignore
                            return chain(data)
                                  .reduce((accumulator, cur) => {
                              const nextValue = {
                                ...accumulator,
                                // @ts-ignore
                                grades: accumulator && accumulator.grades || []
                              }

                              nextValue.grades = [...nextValue.grades, ...times(cur.headcount, () => cur.grade)]
                              return nextValue;
                            })
                            .omit([ 'grade', 'headcount' ])
                            .value()
                            })
                            .value()
  )
  .value();
}

export function PopulationSteamChart( props: { data: Courses | null })
{
  const instructors = uniq(map( props.data?.courses, (course) => course.instructor || 'Unknown'))

  let data = map( groupGrades(props.data), (termData, term) => {
    return map( termData, (courseData) => { 
      // @ts-ignore
      const grades = courseData && courseData.grades || [];

      if (isNil(courseData.instructor)) { return {} }

      return {
        [courseData.instructor]: size(grades) 
      }
    } )
  });

  const defaults = fromPairs(map(instructors, (str) => [str, 0]));
  console.log(defaults)
  const mergedData = map( data, (datum) => merge({}, ...[defaults, ...datum]))

  console.log(mergedData)



  const margin = 35;
  return <div style={{ width: '100%', height: 400 }}><ResponsiveStream
  theme={theme}
  margin={{ top: margin, right: 160, bottom: margin, left: margin }}
  data={mergedData}
  keys={instructors}
  enableGridX={true}
  enableGridY={false}
  fillOpacity={0.9}
  borderColor={{ theme: 'background' }}
  offsetType="diverging"
  order="descending"
  curve="basis"
  axisTop={null}
  axisLeft={{
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: '',
    legendOffset: -40
}}
  legends={[
    {
        anchor: 'right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemWidth: 60,
        itemHeight: 20,
        itemsSpacing: 3,
        itemTextColor: '#ffffff',
        itemDirection: 'left-to-right',
        symbolSize: 20,
        symbolShape: 'square',
        effects: [
            {
                on: 'hover',
                style: {
                    itemTextColor: '#ffffff'
                }
            }
        ]
    }
]}
/>
</div>
}


export function GradesBoxPlot( props: { data: Courses | null })
{
  const statted = flattenDeep(map(groupGrades(props.data), (termData, term) => {
    return map(termData, (courseOffering: any) => {
        const grades = courseOffering && courseOffering.grades || [];

        const n = size(grades);

        if (n <= 0 ) {
          return [];
        }

        const mu = mean(grades);
        const sd = standardDeviation(grades);

      return map(grades, (grade) => {
        return {
          group: term,
          subgroup: courseOffering.instructor || "Unknown",
          mu, sd, n,
          value: grade,
        }
      })
    })
  }));

  const margin = 35;

  return <div style={{ width: '100%', height: 400 }}>
    <ResponsiveBoxPlot
    theme={theme}
        data={statted}
        margin={{ top: margin, right: 160, bottom: margin, left: margin }}
        quantiles={[0, 0.25, 0.5, 0.75, 1]}
        minValue={0}
        layout="vertical"
        maxValue={4}
        subGroupBy="subgroup"
        padding={0}
        innerPadding={0}
        enableGridX={true}
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36
        }}
        axisRight={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 0
        }}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: -40
        }}
        colors={{ scheme: 'nivo' }}
        borderRadius={2}
        borderWidth={2}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.3
                ]
            ]
        }}
        medianWidth={2}
        medianColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.3
                ]
            ]
        }}
        whiskerEndSize={0.6}
        whiskerColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.3
                ]
            ]
        }}
        motionConfig="stiff"
        legends={[
            {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemWidth: 60,
                itemHeight: 20,
                itemsSpacing: 3,
                itemTextColor: '#ffffff',
                itemDirection: 'left-to-right',
                symbolSize: 20,
                symbolShape: 'square',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#ffffff'
                        }
                    }
                ]
            }
        ]}
    />
    </div>
}

const theme = {
  "background": "#212529",
  "text": {
      "fontSize": 11,
      "fill": "#ffffff",
      "outlineWidth": 0,
      "outlineColor": "transparent"
  },
  "axis": {
      "domain": {
          "line": {
              "stroke": "#ffffff",
              "strokeWidth": 1
          }
      },
      "legend": {
          "text": {
              "fontSize": 12,
              "fill": "#fffff",
              "outlineWidth": 0,
              "outlineColor": "transparent"
          }
      },
      "ticks": {
          "line": {
              "stroke": "#ffffff",
              "strokeWidth": 1
          },
          "text": {
              "fontSize": 11,
              "fill": "#ffffff",
              "outlineWidth": 0,
              "outlineColor": "transparent"
          }
      }
  },
  "grid": {
      "line": {
          "stroke": "#ffffff",
          "strokeWidth": 1
      }
  },
  "legends": {
      "title": {
          "text": {
              "fontSize": 11,
              "fill": "#ffffff",
              "outlineWidth": 0,
              "outlineColor": "transparent"
          }
      },
      "text": {
          "fontSize": 11,
          "fill": "#ffffff",
          "outlineWidth": 0,
          "outlineColor": "transparent"
      },
      "ticks": {
          "line": {},
          "text": {
              "fontSize": 10,
              "fill": "#ffffff",
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
          "background": "#000000",
          "fontSize": 12
      },
      "basic": {},
      "chip": {},
      "table": {},
      "tableCell": {},
      "tableCellValue": {}
  }
}