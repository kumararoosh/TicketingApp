import useSWR, { mutate } from "swr";
import { Person } from "./types";

const todoPath = "/api/todos";
const personPath = "/api/users";

export const usePerson = () => useSWR<Person[]>(personPath);


export const createPerson = async (name: string) => {
  mutate(
    personPath,
    todos => [{ name, id: "new-todo" }, ...todos],
    false,
  );
  await fetch(personPath, {
    method: "POST",
    body: JSON.stringify({ name }),
  });

  mutate(personPath);
};


export const deletePerson = async (id: string) => {
  mutate(personPath, people => people.filter(t => t.id !== id), false);
  await fetch(`${personPath}?personId=${id}`, { method: "DELETE" });
  mutate(personPath);
};