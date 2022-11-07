import { Center, Text, Icon } from "native-base";
import { Fontisto } from "@expo/vector-icons";

import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export function SignIn() {
  const { signIn, user } = useAuth();

  return (
    // <Center flex={1} bgColor="gray.900">
    <Center flex={1} bgColor="black" p={7}>
      <Logo width={212} height={40} />
      <Button
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        title="Entrar com o Google"
        type="SECONDARY"
        onPress={signIn}
        mt={12}
      />
      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além {"\n"}
        do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  );
}