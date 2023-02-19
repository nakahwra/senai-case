import { useState } from "react";
import { useQuery } from "react-query";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { PageContainer, Spinner, Table } from "../components";
import { api } from "../services/api";

type Report = {
  id: number;
  environment_id: number;
  mac_address: string;
  class: string;
  created_at: string;
};

function Dashboard() {
  const [selectedData, setSelectedData] = useState<Report[] | null>(null);

  const { data, isLoading, error } = useQuery(
    "dashboard",
    async () => {
      try {
        const { data } = await api.get("/dashboard/100/");

        return data.reports;
      } catch (err) {
        console.error(err.message);
      }
    },
    { cacheTime: 0 }
  );

  let formattedData: { year: string; occurrence: number }[];
  if (data) {
    const reduce = data.reduce((acc, obj) => {
      const year = new Date(obj.created_at).getFullYear();
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {});

    formattedData = Object.keys(reduce).map((year) => ({
      year,
      occurrence: reduce[year],
    }));
  }

  async function handleClick(selected: any) {
    if (selected.year) {
      try {
        const { data } = await api.get(`/dashboard/100/0/0/${selected.year}`);

        const frmt = data.map((report) => ({
          id: parseInt(report.id),
          environment_id: report.environmentId,
          mac_address: report.macAddress,
          class: report.class,
          created_at: new Intl.DateTimeFormat("pt-br").format(
            new Date(report.createdAt)
          ),
        }));

        setSelectedData(frmt);
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  return (
    <>
      <PageContainer title="Dashboard">
        <div
          className={`${
            (isLoading || error) && "flex justify-center items-center"
          } text-center rounded-xl min-h-[250px] mt-8 p-8`}
        >
          <div className="m-auto w-fit">
            {isLoading ? (
              <Spinner />
            ) : (
              <BarChart width={600} height={300} data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="occurrence"
                  fill="#4f46e5"
                  onClick={handleClick}
                />
              </BarChart>
            )}
          </div>
        </div>
      </PageContainer>
      <PageContainer title="Ocorrências">
        <div className={`bg-slate-800 rounded-xl min-h-[250px] mt-8 p-8`}>
          <Table headers={["id", "environment", "mac", "classes", "date"]}>
            <tbody>
              {selectedData?.map((report) => (
                <tr
                  key={report.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td scope="row" className="px-4 py-3 text-slate-400">
                    {report.id}
                  </td>
                  <td scope="row" className="px-4 py-3">
                    {report.environment_id}
                  </td>
                  <td scope="row" className="px-4 py-3">
                    {report.mac_address}
                  </td>
                  <td scope="row" className="px-4 py-3">
                    {report.class}
                  </td>
                  <td scope="row" className="px-4 py-3">
                    {report.created_at}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </PageContainer>
    </>
  );
}

export default Dashboard;
