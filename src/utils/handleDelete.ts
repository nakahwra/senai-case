import { UseMutationResult } from "react-query";

export const handleDelete = async (
  id: number,
  mutation: UseMutationResult<void, unknown, number, unknown>
) => {
  const shouldDelete = confirm("Tem certeza que deseja excluir?");

  if (shouldDelete) await mutation.mutateAsync(id);
};
