import "@/global.css";
import { Stack } from "expo-router";
import { Link } from "expo-router";
import { Text } from "@/components/ui/text";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import {Icon} from '@component/ui/icon'
import { ShoppingCart, User } from "lucide-react-native";
import { useCart } from "@/store/cartStore";
import { Pressable, View } from "react-native";
import { useAuth } from "@/store/authStore";

//create a client
const queryClient = new QueryClient();
export default function RootLayout() {
  const cartItemsNum = useCart((state: any) => state.items.length);

  const isLogedIn = useAuth((s: any) => !!s.token);

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack
          screenOptions={{
            headerTitleAlign: "center",
            headerRight: () =>
              cartItemsNum > 0 && (
                <Link href={"/cart"} asChild>
                  <Pressable className="flex-row gap-2">
                    <ShoppingCart size={24} color="black" />
                    <Text>{cartItemsNum}</Text>
                  </Pressable>
                </Link>
              ),
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Shop",
              headerLeft: () =>
                !isLogedIn && (
                  <Link href={"/login"} asChild>
                    <Pressable className="flex-row gap-2">
                      <User size={24} color="black" />
                    </Pressable>
                  </Link>
                ),
            }}
          />
          <Stack.Screen name="product/{id}" options={{ title: "product" }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
