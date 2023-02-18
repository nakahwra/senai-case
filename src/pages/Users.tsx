import { FaPencilAlt } from "react-icons/fa";
import { useQuery } from "react-query";
import { Spinner } from "../components";
import { api } from "../services/api";

type User = {
  id: number;
  username: string;
  email: string;
};

function Users() {
  const { data, isLoading, error } = useQuery("users", async () => {
    try {
      const { data } = await api.get("/user");
      return data.users;
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <div className="max-w-screen-xl p-8 m-auto">
      <h1 className="text-2xl font-semibold">Usuários</h1>
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
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {data.map((user: User) => (
                  <tr
                    key={user.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.id}
                    </td>
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="flex justify-end px-6 py-4">
                      <FaPencilAlt />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
