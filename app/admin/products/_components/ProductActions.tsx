'use client'
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { deleteProduct, toggleProductAvailablity } from "../../_actions/products";
import { useRouter } from "next/navigation";

export function ActiveToggleDropDownItem({
  id,
  isAvailableForPurchase,
}: {
  id: string;
  isAvailableForPurchase: boolean;
}) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    return(
        <DropdownMenuItem disabled={isPending} onClick={()=> {startTransition(async()=> {
            await toggleProductAvailablity(id, !isAvailableForPurchase)
            router.refresh()
        })}}>
            {isAvailableForPurchase ? "Deactive" : "Activate"}
        </DropdownMenuItem>
    )
}

export function DeleteDropDownItem({
    id,
    disabled,
  }: {
    id: string;
    disabled: boolean;
  }) {
      const [isPending, startTransition] = useTransition()
      const router = useRouter()
      return(
          <DropdownMenuItem disabled={disabled || isPending} onClick={()=> {startTransition(async()=> {
              await deleteProduct(id)
              router.refresh()
          })}}>
              Delete
          </DropdownMenuItem>
      )
  }
  