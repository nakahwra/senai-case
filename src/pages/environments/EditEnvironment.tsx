import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, Spinner } from "../../components";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

type InputType = {
  name?: string;
  mac_addresses?: string;
  classes?: string;
};

type EnvironmentFormData = {
  id?: number;
  name: string;
  mac_addresses: string[];
  classes: string[];
};

interface EditUserProps {
  edit?: boolean;
}

function EditEnvironment({ edit = false }: EditUserProps) {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    "monitoring",
    async () => {
      if (!edit) return;
      try {
        const { data } = await api.get(`/monitoring/${id}`);
        return data.monitoring;
      } catch (err) {
        const { response } = err as AxiosError;

        if (response?.status === 404) {
          navigate("/monitoring");
        }
      }
    },
    { cacheTime: 0 }
  );

  const createUser = useMutation(
    async (monitoring: EnvironmentFormData) => {
      if (edit && id) monitoring = { ...monitoring, id: Number(id) };

      const response = await api.post("/monitoring", {
        monitoring: {
          ...monitoring,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("monitoring");
      },
    }
  );

  const [inputs, setInputs] = useState<InputType>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatted = {
      name: inputs.name,
      mac_addresses: inputs.mac_addresses?.split(",").map((mac) => mac.trim()),
      classes: inputs.classes?.split(",").map((classes) => classes.trim()),
    };

    await createUser.mutateAsync(formatted as EnvironmentFormData);
    navigate("/environments");
  };

  useEffect(() => {
    if (data) {
      const filtered = Object.keys(data).filter((key) => key !== "id");

      filtered.forEach((key) => {
        setInputs((inputs) => ({
          ...inputs,
          [key]: key !== "name" ? data[key].join(", ") : data[key],
        }));
      });
    }
  }, [data]);

  return (
    <div className="max-w-screen-xl p-8 m-auto">
      <h1 className="text-2xl font-semibold">Criar usuário</h1>
      <div
        className={`${
          isLoading && "flex items-center justify-center w-full h-full"
        } bg-slate-800 rounded-xl min-h-[250px] mt-8 p-8`}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col items-end justify-between space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <FormControl
                label="Nome"
                name="name"
                inputType="text"
                value={inputs.name || ""}
                onChange={handleChange}
                required
              />
              <FormControl
                label="Endereços MAC"
                name="mac_addresses"
                inputType="text"
                value={inputs.mac_addresses || ""}
                onChange={handleChange}
                required
              />
            </div>
            <FormControl
              label="Classes"
              name="classes"
              inputType="text"
              value={inputs.classes || ""}
              onChange={handleChange}
              required
            />
            <input
              className="mt-8 w-full px-4 py-2 bg-indigo-600 font-semibold transition-colors duration-150 hover:bg-indigo-700 rounded-md sm:max-w-[150px] cursor-pointer"
              type="submit"
              value="Salvar"
            />
          </form>
        )}
      </div>
    </div>
  );
}

export default EditEnvironment;
