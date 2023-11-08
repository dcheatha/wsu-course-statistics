import { Courses } from "../data/models";
import { fromPairs, isNil, map, merge, size, uniq } from "lodash";
import { ResponsiveBar } from "@nivo/bar";
import { groupGrades } from "../util";
import { theme } from "../util/theme";


export function PopulationSteamChart(props: { data: Courses | null; }) {
    const instructors = uniq(map(props.data?.courses, (course) => course.instructor || 'Unknown'));

    let data = map(groupGrades(props.data), (termData, term) => {
        return map(termData, (courseData) => {
            // @ts-ignore
            const grades = courseData && courseData.grades || [];

            if (isNil(courseData.instructor)) { return {}; }

            return {
                term,
                [courseData.instructor]: size(grades)
            };
        });
    });

    const defaults = fromPairs(map(instructors, (str) => [str, 0]));
    const mergedData = map(data, (datum) => merge({}, ...[defaults, ...datum]));


    const margin = 35;
    return <div style={{ width: '100%', height: 400 }}><ResponsiveBar
        theme={theme}
        margin={{ top: margin, right: 160, bottom: margin, left: margin }}
        data={mergedData}
        indexBy={'term'}
        groupMode="grouped"
        keys={instructors}
        enableGridX={true}
        enableGridY={false}
        //   fillOpacity={0.9}
        borderColor={{ theme: 'background' }}
        //   offsetType="diverging"
        //   order="descending"
        //   curve="basis"
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
                dataFrom: 'keys',
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
        ]} />
    </div>;
}
