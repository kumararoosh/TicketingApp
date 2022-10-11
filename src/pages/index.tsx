import { NextPage } from "next";
import Head from "next/head";
import { useMemo, useState } from "react";
import { createPerson, deletePerson, usePerson } from "../api";
import styles from "../styles/Home.module.css";
import { Person } from "../types";

export const TodoList: React.FC = () => {
  const { data: people, error } = usePerson();

  if (error != null) return <div>Error loading todos...</div>;
  if (people == null) return <div>Loading...</div>;

  if (people.length === 0) {
    return <div className={styles.emptyState}>Try adding a todo ☝️️</div>;
  }

  return (
    <ul className={styles.todoList}>
      {people.map(p => (
        <PersonEntry person={p} />
      ))}
    </ul>
  );
};

const PersonEntry: React.FC<{ person: Person }> = ({ person }) => (
  <li className={styles.todo}>
    <label
      className={`${styles.label}`}
    >
      {person.name} {person.id} 
    </label>

    <button className={styles.deleteButton} onClick={() => deletePerson(person.id)}>
      ✕
    </button>
  </li>
);


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Railway NextJS Prisma</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>Todos</h1>
        <h2 className={styles.desc}>
          NextJS app connected to Postgres using Prisma and hosted on{" "}
          <a href="https://railway.app">Railway</a>
        </h2>
      </header>

      <main className={styles.main}>

        <TodoList />
      </main>
    </div>
  );
};

export default Home;
