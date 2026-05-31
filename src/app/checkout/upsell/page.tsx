import { redirect } from "next/navigation";

export default function UpsellRedirectPage() {
  redirect("/checkout/success");
}
