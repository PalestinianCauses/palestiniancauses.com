// REVIEWED

import { Header } from "@/components/a-human-but-from-gaza/header";
import { getProduct } from "@/lib/shopify";

export default async function AHumanButFromGazaPage() {
  const product = await getProduct("a-human-but-from-gaza-e-book");
  if (!product) return null;

  return <Header product={product} />;
}
