import { Courses } from "../data/models";
import { flattenDeep, map, size } from "lodash";
import { ResponsiveBoxPlot } from "@nivo/boxplot";
import { mean, standardDeviation } from "simple-statistics";
import { groupGrades } from "../util";
import { theme } from "../util/theme";

export function GradesBoxPlot(props: { data: Courses | null }) {
  const statted = flattenDeep(
    map(groupGrades(props.data), (termData, term) => {
      return map(termData, (courseOffering: any) => {
        const grades = (courseOffering && courseOffering.grades) || [];

        const n = size(grades);

        if (n <= 0) {
          return [];
        }

        const mu = mean(grades);
        const sd = standardDeviation(grades);

        return map(grades, (grade) => {
          return {
            group: term,
            subgroup: courseOffering.instructor || "Unknown",
            mu,
            sd,
            n,
            value: grade,
          };
        });
      });
    }),
  );

  const margin = 35;

  return (
    <div style={{ width: "100%", height: 400 }}>
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
          legend: "",
          legendOffset: 36,
        }}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendOffset: 0,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: -40,
        }}
        colors={{ scheme: "nivo" }}
        borderRadius={2}
        borderWidth={2}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.3]],
        }}
        medianWidth={2}
        medianColor={{
          from: "color",
          modifiers: [["darker", 0.3]],
        }}
        whiskerEndSize={0.6}
        whiskerColor={{
          from: "color",
          modifiers: [["darker", 0.3]],
        }}
        motionConfig="stiff"
        legends={[
          {
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemWidth: 60,
            itemHeight: 20,
            itemsSpacing: 3,
            itemTextColor: "#ffffff",
            itemDirection: "left-to-right",
            symbolSize: 20,
            symbolShape: "square",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#ffffff",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
