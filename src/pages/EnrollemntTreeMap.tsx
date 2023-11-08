import { filter, map, reject, size, sum } from "lodash";
import { theme } from "../util/theme";
import { ResponsiveTreeMap } from "@nivo/treemap";
import { quantile } from "simple-statistics";

export interface EnrollmentTreeMapProps {
  data: {
    id: string;
    value: number;
  }[];
  onClick: (id: string) => void;
}

export function EnrollemntTreeMap(props: EnrollmentTreeMapProps) {
  const chartData = { id: 'WSU', children: props.data };

  const minValueToDisplay = size(chartData.children) > 0 ? quantile(map(chartData.children, 'value'), 0.25) : 0;
  const sumOfValuesTooSmallToDisplay = sum(map(reject(chartData.children, (item) => item.value > minValueToDisplay), 'value'));

  chartData.children = filter(chartData.children, (item) => item.value > minValueToDisplay);

  const otherId = 'Other';
  chartData.children.push({ id: otherId, value: sumOfValuesTooSmallToDisplay });

  return <ResponsiveTreeMap
    theme={theme}
    data={chartData}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    label={(node) => `${node.id}`}
    valueFormat={" >-.2s"}
    tile="binary"
    nodeOpacity={1}
    leavesOnly={true}
    innerPadding={2}
    borderWidth={0}
    onClick={({ id }) => {
      if (id !== otherId) {
        props.onClick(id);
      }
    }} />;
}
