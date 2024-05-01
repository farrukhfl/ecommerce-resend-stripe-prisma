import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";

type PurchaseRecieptEmailProps = {
  product: {
    name: string;
    imagePath: string;
    description: string
  };
  order: { id: string; createdAt: Date; pricePaidInCents: number };
  downloadVerificationId: string;
};
PurchaseRecieptEmail.PreviewProps = {
  product: {
    name: "Product Name",
    description: "Some description",
    imagePath:
      "/products/b9343a68-1ac4-474b-b6ff-3df83e069d4b-c38a6afdf6027bcb2cbe49b5c5fa79c7.jpg",
  },

  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 10000,
  },
  downloadVerificationId: crypto.randomUUID(),
} satisfies PurchaseRecieptEmailProps;
export default function PurchaseRecieptEmail({
  product,
  order,
  downloadVerificationId,
}: PurchaseRecieptEmailProps) {
  return (
    <Html>
      <Preview>Download {product.name} and view reciept</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Purchase Reciept</Heading>
            <OrderInformation
              order={order}
              product={product}
              downloadVerificationId={downloadVerificationId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
