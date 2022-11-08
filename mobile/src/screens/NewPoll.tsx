import { useState } from "react";
import { Heading, Text, useToast, VStack } from "native-base";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Logo } from "../assets";
import { api } from "../services/api";

export function NewPoll() {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  async function handleCreatePoll() {
    if (!title.trim()) {
      return toast.show({
        title: "Informe um nome para o bolão",
        placement: "top",
        bgColor: "red.500",
      });
    }

    try {
      setIsLoading(true);

      await api.post("/polls", { title: title.toUpperCase() });

      toast.show({
        title: "Bolão criado com sucesso",
        placement: "top",
        bgColor: "green.500",
      });

      setTitle("");
    } catch (err) {
      console.log(err);

      toast.show({
        title: "Não foi possivel criar o bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }
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
        <Input
          mb={2}
          placeholder="Qual o nome do seu bolão?"
          onChangeText={setTitle}
          value={title}
        />
        <Button
          title="Criar meu bolão"
          onPress={handleCreatePoll}
          isLoading={isLoading}
        />
        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um {"\n"} código único que poderá
          usar para convidar {"\n"} outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
