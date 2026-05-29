// Chart colour palette.
//
// chart1..chart10 (see tailwind.config.cjs) form one smooth 10-stop gradient that runs
// primary -> secondary -> tertiary. If we used them in gradient order, a chart with only
// 3 series would get the first three near-identical mint shades. So we deal them out
// interleaved: the three anchor hues first (primary, secondary, tertiary), then the next
// variant of each, and so on — giving any small chart maximally distinct colours.
const colors = [
  'chart1', 'chart5', 'chart10', // primary,     secondary,   tertiary
  'chart2', 'chart6', 'chart9',  // primary +1,  secondary +1, tertiary +1
  'chart3', 'chart7', 'chart8',  // primary +2,  secondary +2, tertiary +2
  'chart4'                       // primary +3
];

export default colors;
