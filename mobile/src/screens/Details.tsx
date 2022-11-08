import { useEffect, useState } from "react";
import { Share } from "react-native";
import { HStack, useToast, VStack } from "native-base";
import { useRoute } from "@react-navigation/native";

import { api } from "../services/api";

import { Header } from "../components/Header";
import { Option } from "../components/Option";
import { Guesses } from "../components/Guesses";
import { Loading } from "../components/Loading";
import { PoolHeader } from "../components/PoolHeader";
import { PoolCardProps } from "../components/PoolCard";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";

interface RouteParams {
  id: string;
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<"guesses" | "ranking">(
    "guesses"
  );
  const [pollDetails, setPollDetails] = useState<PoolCardProps>(
    {} as PoolCardProps
  );

  const route = useRoute();
  const toast = useToast();
  const { id } = route.params as RouteParams;

  async function fetchPoolDetails() {
    try {
      setIsLoading(true);

      const response = await api.get(`/polls/${id}`);
      setPollDetails(response.data.pool);
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possivel carregar os detalhes do bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: pollDetails.code,
    });
  }

  useEffect(() => {
    fetchPoolDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="black">
      <Header
        title="Detalhes do bolão"
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {pollDetails._count?.participants > 0 ? (
        <VStack flex={1} px={5}>
          <PoolHeader data={pollDetails} />
          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus Palpites"
              isSelected={selectedOption === "guesses"}
              onPress={() => setSelectedOption("guesses")}
            />
            <Option
              title="Ranking do grupo"
              isSelected={selectedOption === "ranking"}
              onPress={() => setSelectedOption("ranking")}
            />
          </HStack>
          <Guesses pollId={pollDetails.id} code={pollDetails.code} />
        </VStack>
      ) : (
        <EmptyMyPoolList code={pollDetails.code} />
      )}
    </VStack>
  );
}
