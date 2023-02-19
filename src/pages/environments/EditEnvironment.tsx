import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { FormControl } from "../../components";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

type InputType = {
  name?: string;
  mac_addresses?: string;
  classes?: string;
};

type EnvironmentFormData = {
  name: string;
  mac_addresses: string[];
  classes: string[];
};

function EditEnvironment() {
  const navigate = useNavigate();

  const createUser = useMutation(
    async (monitoring: EnvironmentFormData) => {
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

  return (
    <div className="max-w-screen-xl p-8 m-auto">
      <h1 className="text-2xl font-semibold">Criar usuário</h1>
      <div className="bg-slate-800 rounded-xl min-h-[250px] mt-8 p-8">
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
      </div>
    </div>
  );
}

export default EditEnvironment;
