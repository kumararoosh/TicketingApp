import { ChangeEvent } from "react";
import useSWR, { mutate } from "swr";
import { Person } from "./types";

const todoPath = "/api/todos";
const personPath = "/api/users";

export const usePerson = () => useSWR<Person[]>(personPath);


export const createPerson = async (person: string, venmoId: string) => {

  mutate(
    personPath,
    people => [{ person, venmoId: venmoId, id: "new-todo" }, ...people],
    false,
  );
  await fetch(personPath, {
    method: "POST",
    body: JSON.stringify({ name: person, venmoId: venmoId }),
  });

  mutate(personPath);
};

export const toggleVerifiedPayment = async (id: string, checkbox: boolean) => {
  const value: boolean = checkbox;
  mutate(
    personPath,
    people => people.map(
      p => p.id == id ? {...people, sentPayment: checkbox} : p,
    ),
    false
  );

  await fetch(`${personPath}?personId=${id}`, {
    method: "PUT",
    body: JSON.stringify({sentPayment: checkbox})
  });

  mutate(personPath);

}

export const deletePerson = async (id: string) => {
  mutate(personPath, people => people.filter(t => t.id !== id), false);
  await fetch(`${personPath}?personId=${id}`, { method: "DELETE" });
  mutate(personPath);
};