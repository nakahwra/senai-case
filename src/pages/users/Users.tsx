import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { PageContainer, Spinner, Table } from "../../components";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { handleDelete } from "../../utils/handleDelete";

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

  const deleteUser = useMutation(
    async (id: number) => {
      const response = await api.delete(`/user/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
      onError: (err) => {
        console.error(err.message);
      },
    }
  );

  return (
    <PageContainer
      title="Usuários"
      buttonText="Criar usuário"
      redirectPath="/users/create"
      icon={<FaPlus size={14} />}
    >
      <div
        className={`${
          (isLoading || deleteUser.isLoading || error) &&
          "flex justify-center items-center"
        } bg-slate-800 rounded-xl min-h-[250px] mt-8 p-8`}
      >
        {isLoading || deleteUser.isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="font-semibold text-red-500">Error fetching users</p>
        ) : (
          <Table headers={["ID", "Username", "Email", ""]}>
            <tbody>
              {data.map((user: User) => (
                <tr
                  key={user.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.id}
                  </td>
                  <td className="px-4 py-3">{user.username}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="flex items-center justify-end px-4 py-3 ">
                    <Link
                      to={`${user.id}`}
                      className="px-4 py-3 transition-colors duration-150 hover:text-indigo-600"
                    >
                      <FaPencilAlt />
                    </Link>

                    <div
                      className="px-4 py-3 transition-colors duration-150 cursor-pointer hover:text-red-600"
                      onClick={() => {
                        handleDelete(user.id, deleteUser);
                      }}
                    >
                      <FaTrash />
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

export default Users;
