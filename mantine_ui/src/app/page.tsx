import { data } from '@/uitls/data';
import { AreaChart } from '@mantine/charts';

export default function Home() {
  return (
    <AreaChart
    h={300}
    data={data}
    dataKey="date"
    type="percent"
    series={[
      { name: 'Apples', color: 'indigo.6' },
      { name: 'Oranges', color: 'blue.6' },
      { name: 'Tomatoes', color: 'teal.6' },
    ]}
  />
  )
}
