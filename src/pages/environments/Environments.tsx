import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { PageContainer, Spinner, Table } from "../../components";
import { api } from "../../services/api";

type Environment = {
  id: number;
  name: string;
  mac_addresses: string[];
  classes: string[];
};

function Environments() {
  const { data, isLoading, error } = useQuery("monitoring", async () => {
    try {
      const { data } = await api.get("/monitoring");
      console.log("data", data);

      return data.monitorings;
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <PageContainer
      title="Ambientes de Monitoramento"
      buttonText="Criar novo"
      redirectPath="/environments/create"
      icon={<FaPlus />}
    >
      <div
        className={`${
          (isLoading || error) && "flex justify-center items-center"
        } bg-slate-800 rounded-xl min-h-[250px] mt-8 p-8`}
      >
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="font-semibold text-red-500">Error fetching users</p>
        ) : (
          <Table headers={["ID", "Name", "MAC", "Classes", ""]}>
            <tbody>
              {data.map((monitoring: Environment) => (
                <tr
                  key={monitoring.id}
                  className="bg-gray-800 border-b border-gray-700 text-slate-200"
                >
                  <td scope="row" className="px-4 py-3 text-slate-400">
                    {monitoring.id}
                  </td>
                  <td scope="row" className="px-4 py-3">
                    {monitoring.name}
                  </td>
                  <td scope="row" className="px-4 py-3">
                    {monitoring.mac_addresses.map((mac) => (
                      <span className="block">{mac}</span>
                    ))}
                  </td>
                  <td scope="row" className="px-4 py-3">
                    {monitoring.classes.join(", ")}
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    <div className="flex items-center justify-end">
                      <Link
                        to={`${monitoring.id}`}
                        className="px-4 py-3 transition-colors duration-150 hover:text-indigo-600"
                      >
                        <FaPencilAlt />
                      </Link>

                      <div
                        className="px-4 py-3 transition-colors duration-150 cursor-pointer hover:text-red-600"
                        // onClick={() => {
                        //   handleDelete(user.id);
                        // }}
                      >
                        <FaTrash />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </PageContainer>
  );
}

export default Environments;
