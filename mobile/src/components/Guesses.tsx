import { useEffect, useState } from "react";
import { useToast, FlatList } from "native-base";

import { api } from "../services/api";

import { Loading } from "./Loading";
import { EmptyMyPoolList } from "./EmptyMyPoolList";
import { Game, GameProps } from "../components/Game";

interface Props {
  pollId: string;
  code: string;
}

export function Guesses({ pollId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState("");
  const [secondTeamPoints, setSecondTeamPoints] = useState("");

  const toast = useToast();

  async function fetchGames() {
    try {
      setIsLoading(true);

      const response = await api.get(`/polls/${pollId}/games`);
      setGames(response.data.games);
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possivel carregar os jogos",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: "Preencha os palpites",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post(`/polls/${pollId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      toast.show({
        title: "Palpite enviado com sucesso",
        placement: "top",
        bgColor: "green.500",
      });

      fetchGames();
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possivel enviar o palpite",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  useEffect(() => {
    fetchGames();
  }, [pollId]);

  if (isLoading) return <Loading />;

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={<EmptyMyPoolList code={code} />}
    />
  );
}
