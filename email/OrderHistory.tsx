import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Tailwind,
  } from "@react-email/components";
  import { OrderInformation } from "./components/OrderInformation";
import React from "react";
  
  type OrderHistoryEmailProps = {
    orders:{
        id: string
        pricePaidInCents: number
        createdAt: Date
        downloadVerificationId: string
        product: {
            name: string;
            imagePath: string;
            description: string
          };
        }[]
    }
   
  OrderHistoryEmail.PreviewProps = {
    orders:[
        {   id: crypto.randomUUID(),
            createdAt: new Date(),
            pricePaidInCents: 10000,
            downloadVerificationId: crypto.randomUUID(),
            product: {
                name: "Product Name",
                description: "Some description",
                imagePath:
                  "/products/b9343a68-1ac4-474b-b6ff-3df83e069d4b-c38a6afdf6027bcb2cbe49b5c5fa79c7.jpg",
              },
            
        },
        {   id: crypto.randomUUID(),
            createdAt: new Date(),
            pricePaidInCents: 2000,
            downloadVerificationId: crypto.randomUUID(),
            product: {
                name: "Product Name 2",
                description: "Some other description",
                imagePath:
                  "/products/e4dcb4cd-302e-4923-963e-6e3a6cc894bd-437554857_752371583695793_1826199576978897603_n.jpg",
              },
            
        }
    ]
    
  } satisfies OrderHistoryEmailProps;
  export default function OrderHistoryEmail({
    orders,
  }: OrderHistoryEmailProps) {
    return (
      <Html>
        <Preview>Order History and Download</Preview>
        <Tailwind>
          <Head />
          <Body className="font-sans bg-white">
            <Container className="max-w-xl">
              <Heading>Order History</Heading>


              {orders.map((order, index)=> (
                <React.Fragment key={order.id}>
                <OrderInformation
                key={order.id}
                order={order}
                product={order.product}
                downloadVerificationId={order.downloadVerificationId}
              />
              {index < orders.length - 1 && <Hr />}
                            </React.Fragment>

              ))}
              
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  }
  