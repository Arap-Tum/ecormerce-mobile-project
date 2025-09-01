import { ActivityIndicator, FlatList, useWindowDimensions } from "react-native";
import { Text } from "@/components/ui/text";
// import products from "../assets/products.json";
import { useMemo } from "react";

import ProductListItem from "../components/Product_listItem";
import { listProducts } from "@/api/products";

import { useQuery } from "@tanstack/react-query";

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: listProducts,
  });

  const { width } = useWindowDimensions();
  // calculate columns
  const numColumns = width > 700 ? 4 : 2;
  // create a key that changes with numColumns
  const listKey = useMemo(() => `list-${numColumns}`, [numColumns]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error Fetching Product </Text>;
  }
  return (
    <FlatList
      key={listKey}
      data={data}
      numColumns={numColumns}
      className=""
      contentContainerClassName="gap-2   max-w-[960px] mx-auto w-full"
      columnWrapperClassName="gap-2"
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
}
