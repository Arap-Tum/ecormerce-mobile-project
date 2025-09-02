import { useState } from "react";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { FormControl } from "@/components/ui/form-control";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
// import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useMutation } from "@tanstack/react-query";
import { login, signup } from "@/api/auth";
import { useAuth } from "@/store/authStore";
import { Redirect } from "expo-router";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setUser = useAuth((s) => s.setUser);
  const setToken = useAuth((s) => s.setToken);
  const isLogedIn = useAuth((s) => !!s.token);

  const loginMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      console.log("success");

      if (data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
      }
    },
    onError: () => {
      console.log("Error");
    },
  });

  const signupMutation = useMutation({
    mutationFn: () => signup(email, password),
    onSuccess: (data) => {
      console.log("success", data);
    },
    onError: (error) => {
      console.error("Error in mutation", error);
    },
  });

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  if (isLogedIn) {
    return <Redirect href={"/"} />;
  }

  return (
    <FormControl className="p-4 rouded-lg max-w-[500px] border border-outline-200 rounded-lg w-full bg-white m-2 mx-auto ">
      <VStack className="gap-4">
        <Heading className="text-typography-900">Login</Heading>
        <VStack space="xs">
          <Text className="text-typography-500">Email</Text>
          <Input>
            <InputField value={email} onChangeText={setEmail} type="text" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="text-typography-500">Password</Text>
          <Input className="text-center">
            <InputField
              value={password}
              onChangeText={setPassword}
              type={showPassword ? "text" : "password"}
            />
            <InputSlot className="pr-3" onPress={handleState}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
        </VStack>
        <HStack space="sm">
          <Button
            className="ml-auto flex-1"
            variant="outline"
            onPress={() => signupMutation.mutate()}
          >
            <ButtonText>Sign Up</ButtonText>
          </Button>
          <Button className="flex-1" onPress={() => loginMutation.mutate()}>
            <ButtonText>Sign In </ButtonText>
          </Button>
        </HStack>
      </VStack>
    </FormControl>
  );
}
