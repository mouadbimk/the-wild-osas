import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as DeleteCabinApi } from "../../services/apiCabins";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    mutationFn: DeleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { deleteCabin, isDeleting };
}
