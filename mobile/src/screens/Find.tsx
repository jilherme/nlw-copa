import { useState } from "react";
import { Heading, useToast, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from "../services/api";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const { navigate } = useNavigation();

  const toast = useToast();

  async function handleJoinPoll() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: "Informe o código do bolão",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post("/polls/join", { code });

      toast.show({
        title: "Bolão encontrado com sucesso",
        placement: "top",
        bgColor: "green.500",
      });

      navigate("polls");
    } catch (error) {
      console.log(error);

      if (error.response?.data?.message === "Poll not found.") {
        return toast.show({
          title: "Bolão não encontrado",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (error.response?.data?.message === "Poll already joined.") {
        return toast.show({
          title: "Você já está participando deste bolão",
          placement: "top",
          bgColor: "red.500",
        });
      }

      toast.show({
        title: "Não foi possivel entrar no bolão",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }
  return (
    <VStack flex={1} bgColor="black">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de {"\n"} seu código único
        </Heading>
        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
        />
        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleJoinPoll}
        />
      </VStack>
    </VStack>
  );
}
