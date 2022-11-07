import { Heading, Text, VStack } from "native-base";
import { Logo } from "../assets";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function NewPoll() {
  return (
    <VStack flex={1} bgColor="black">
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie um novo bolão da copa e {"\n"} compartilhe com seus amigos!
        </Heading>
        <Input mb={2} placeholder="Qual o nome do seu bolão?" />
        <Button title="Criar meu bolão" />
        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um {"\n"} código único que poderá
          usar para convidar {"\n"} outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
