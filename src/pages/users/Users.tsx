import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { PageContainer, Spinner } from "../../components";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

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

  const handleDelete = async (id: number) => {
    const shouldDelete = confirm(
      "Tem certeza que deseja excluir este usuário?"
    );

    if (shouldDelete) await deleteUser.mutateAsync(id);
  };

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
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-3" />
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
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.id}
                    </td>
                    <td className="px-4 py-3">{user.username}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="flex justify-end">
                      <Link
                        to={`${user.id}`}
                        className="px-6 py-4 transition-colors duration-150 hover:text-indigo-600"
                      >
                        <FaPencilAlt />
                      </Link>

                      <div
                        className="px-6 py-4 transition-colors duration-150 cursor-pointer hover:text-red-600"
                        onClick={() => {
                          handleDelete(user.id);
                        }}
                      >
                        <FaTrash />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageContainer>
  );
}

export default Users;
