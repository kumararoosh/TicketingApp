import { ChangeEvent } from "react";
import useSWR, { mutate } from "swr";
import { Person } from "./types";

const todoPath = "/api/todos";
const personPath = "/api/users";

export const usePerson = () => useSWR<Person[]>(personPath);


export const createPerson = async (person: string, venmoId: string, email: string) => {

  mutate(
    personPath,
    people => [{ person, venmoId: venmoId, id: "new-todo", email: email}, ...people],
    false,
  );
  await fetch(personPath, {
    method: "POST",
    body: JSON.stringify({ name: person, venmoId: venmoId, email: email}),
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

export const toggleEmailSent = async (person: Person) => {
  mutate(
    personPath,
    people => people.map(
      p => p.id == person.id ? {...people, ticketEmailed: true} : p,
    ),
    false
  );

  let formData = new FormData();
  formData.append('name', person.name);
  formData.append('uuid', person.id);
  formData.append('email', person.email);

  await fetch(`http://127.0.0.1:5000/sendUserEmail`, {
    mode: 'cors',
    body: formData,
    method: "POST",
    headers: {
      'Access-Control-Allow-Origin':'*'
    }
  });

  await fetch(`${personPath}?personId=${person.id}`, {
    method: "PUT",
    body: JSON.stringify({ticketEmailed: true})
  });

  mutate(personPath);
}

export const deletePerson = async (id: string) => {
  mutate(personPath, people => people.filter(t => t.id !== id), false);
  await fetch(`${personPath}?personId=${id}`, { method: "DELETE" });
  mutate(personPath);
};