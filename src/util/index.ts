import { round } from "lodash";


export function dropRate(headcount: number | undefined, dropped: number | undefined): string
{
    const dropRate = (dropped || 0) / (headcount || 1);
    const roundedDropRate = round(dropRate * 100, 1);
    return `${roundedDropRate}%`;
}