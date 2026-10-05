import { useGetPizzaOfTheDayQuery } from "./api/pizzaApi";
import type { Pizza } from "./APIResponsesTypes";

export const usePizzaOfTheDay = (): Pizza | null => {
  const { data } = useGetPizzaOfTheDayQuery();
  return data ?? null;
};