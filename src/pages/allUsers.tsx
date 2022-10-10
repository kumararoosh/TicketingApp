import { NextPage } from "next";
import { Person } from "@prisma/client";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { deletePerson, toggleVerifiedPayment, usePerson, createPerson } from "../api";


const AddTodoInput = () => {
    const [text, setText] = useState("");
  
    return (
      <form
        onSubmit={async e => {
          e.preventDefault();
          createPerson(text);
          setText("");
        }}
        className={styles.addTodo}
      >
        <input
          className={styles.input}
          placeholder="Buy some milk"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button className={styles.addButton}>Add</button>
      </form>
    );
  };

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
      <input    
        type="checkbox" 
        className = {styles.deleteButton} 
        onChange={e => toggleVerifiedPayment(person.id, e.target.checked)} 
        checked={person.sentPayment}>
      </input>
    </li>
  );



const AllUsers: NextPage = () => {
    return (
        <div>
            <AddTodoInput />
            <TodoList />
        </div>
    );
};

export default AllUsers;