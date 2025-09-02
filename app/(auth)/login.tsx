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

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  return (
    <FormControl className="p-4 rouded-lg max-w-[500px] border border-outline-200 rounded-lg w-full bg-white m-2 mx-auto ">
      <VStack className="gap-4">
        <Heading className="text-typography-900">Login</Heading>
        <VStack space="xs">
          <Text className="text-typography-500">Email</Text>
          <Input>
            <InputField type="text" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="text-typography-500">Password</Text>
          <Input className="text-center">
            <InputField type={showPassword ? "text" : "password"} />
            <InputSlot className="pr-3" onPress={handleState}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
        </VStack>
        <HStack space="sm">
          <Button className="ml-auto flex-1" variant="outline">
            <ButtonText>Sign Up</ButtonText>
          </Button>
          <Button className="flex-1">
            <ButtonText>Sign In </ButtonText>
          </Button>
        </HStack>
      </VStack>
    </FormControl>
  );
}
