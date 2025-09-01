import { useEffect, useState } from "react";
import { View, Text, FlatList, useWindowDimensions } from "react-native";
import products from "../assets/products.json";
import { useMemo } from "react";

import ProductListItem from "../components/Product_listItem";
import { Button, ButtonText } from "../components/ui/button";

export default function HomeScreen() {
  const { width } = useWindowDimensions();

  // calculate columns
  const numColumns = width > 700 ? 4 : 2;

  // create a key that changes with numColumns
  const listKey = useMemo(() => `list-${numColumns}`, [numColumns]);

  return (
    <FlatList
      key={listKey}
      data={products}
      numColumns={numColumns}
      className=""
      contentContainerClassName="gap-2   max-w-[960px] mx-auto w-full"
      columnWrapperClassName="gap-2"
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
}
