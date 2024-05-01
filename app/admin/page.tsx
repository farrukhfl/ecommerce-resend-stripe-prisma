import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatter";
import React from "react";

// The function begins by calling db.order.aggregate({...}), which seems to be an aggregation query on the order collection/table of a database. This query calculates the sum of pricePaidInCents and counts the number of records.
// It awaits the result of this aggregation query using the await keyword, indicating that it's an asynchronous operation and the function will wait for the result before proceeding.
// Once the data is fetched, it constructs and returns an object with two properties:
// amount: This property calculates the total sales amount by dividing the sum of pricePaidInCents by 100 (assuming pricePaidInCents is in cents). If data._sum.pricePaidInCents is undefined or null, it defaults to 0 to prevent errors.
// numberOfSales: This property simply returns the count of records obtained from the aggregation.

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });
  return {
    amout: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);
  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  };

  //   The function uses Promise.all() to concurrently fetch data from two asynchronous operations: counting users and aggregating order data.
  //   db.user.count() fetches the count of users from the database.
  //   db.order.aggregate({...}) aggregates data from the orders collection/table. It calculates the sum of pricePaidInCents from orders.
  //   Once both promises are resolved, the results are destructured into userCount and orderData.
  //   The function then returns an object with two properties:
  //   userCount: The count of users fetched from the database.
  // //   averageValuePerUser: This property calculates the average value per user. If there are no users (userCount === 0), it returns 0 to avoid division by zero. Otherwise, it calculates the average value by dividing the total sum of pricePaidInCents by the number of users (userCount). It also divides by 100 to convert cents to dollars.
}

async function getProductData(){
    const [activeCount, inactiveCount] = await Promise.all([
        db.product.count({where: {isAvailableForPurchase: true}}),
        db.product.count({where: {isAvailableForPurchase: false}})

    ])
    return {activeCount, inactiveCount}
}


export default async function AdminDashboard() {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData()
  ]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        //   this format Number and currency is imported from Libs and that code just give "," and "$" signs
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amout)}
      />
      <DashboardCard
        title="Customers"
        subtitle={`${formatCurrency(
          userData.averageValuePerUser
        )} Average Value`}
        body={formatNumber(userData.userCount)}
      />

      <DashboardCard
        title="Active Products"
        subtitle={`${formatCurrency(
          productData.inactiveCount
        )} Inactive`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  );
}
type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardDescription>{subtitle}</CardDescription>
      <CardContent>{body}</CardContent>
    </Card>
  );
}
