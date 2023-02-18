import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { FormControl } from "../../components";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

type InputType = {
  username?: string;
  email?: string;
  password?: string;
};

type UserFormData = {
  username: string;
  email: string;
  password: string;
};

function EditUser() {
  const navigate = useNavigate();

  const createUser = useMutation(
    async (user: UserFormData) => {
      const response = await api.post("/user", {
        user: {
          ...user,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
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
    await createUser.mutateAsync(inputs as UserFormData);
    navigate("/users");
  };

  return (
    <div className="max-w-screen-xl p-8 m-auto">
      <h1 className="text-2xl font-semibold">Criar usuário</h1>
      <div className="bg-slate-800 rounded-xl min-h-[250px] mt-8 p-8">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col items-end justify-between space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <FormControl
              label="Nome de usuário"
              name="username"
              inputType="text"
              value={inputs.username || ""}
              onChange={handleChange}
              required
            />
            <FormControl
              label="E-mail"
              name="email"
              inputType="email"
              value={inputs.email || ""}
              onChange={handleChange}
              required
            />
          </div>
          <FormControl
            label="Senha"
            name="password"
            inputType="password"
            value={inputs.password || ""}
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

export default EditUser;
