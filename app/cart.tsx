import { useCart } from "@/store/cartStore";
import { Box } from "@/components/ui/box";
import { FlatList } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { ButtonText } from "@/components/ui/button";
import { Redirect } from "expo-router";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/api/oders";

export default function CartScrean() {
  const items = useCart((state: any) => state.items);
  const resetCart = useCart((state: any) => state.resetCart);

  const createOrderMutation = useMutation({
    mutationFn: () =>
      createOrder(
        items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        }))
      ),
    onSuccess: (data) => {
      console.log("Order created:", data);
    },
    onError: (error) => {
      console.error("Order creation failed:", error);
    },
  });

  const onCheckout = async () => {
    // Send order toserver
    resetCart();
    router.push("/");
  };

  return (
    <FlatList
      data={items}
      contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto p-2"
      renderItem={({ item }) => (
        <HStack className="bg-white p-3">
          <VStack>
            <Text bold>{item.product.name}</Text>
            <Text> ${item.product.price}</Text>
          </VStack>

          <Text>{item.quantity}</Text>
        </HStack>
      )}
      ListFooterComponent={() => (
        <Button onPress={onCheckout}>
          <ButtonText>Checkout</ButtonText>
        </Button>
      )}
    />
  );
}
