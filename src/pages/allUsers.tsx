import { NextPage } from "next";
import { Person } from "@prisma/client";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { deletePerson, toggleVerifiedPayment, usePerson, createPerson } from "../api";

const AddTodoInput = () => {
    const [name, setName] = useState("");
    const [venmoId, setVenmoId] = useState("");

    return (
        <form
            onSubmit={async e => {
                e.preventDefault();
                createPerson(name, venmoId);
                setName("");
                setVenmoId("");
            }}
            className={styles.addTodo}
        >
    
        <input
            className={styles.input}
            placeholder="name"
            value={name}
            onChange={e => setName(e.target.value)}
        />
        <input
            className={styles.input}
            placeholder="venmo"
            value={venmoId}
            onChange={e => setVenmoId(e.target.value)}
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
        <li className={styles.row}>
            <label className={styles.col}><b>Name</b></label>
            <label className={styles.col}><b>ID</b></label>
            <label className={styles.col}><b>Venmo ID</b></label>
            <label className={styles.col}><b>Paid</b></label>
            <label className={styles.col}><b>Delete</b></label>
        </li>
        {people.map(p => (
          <PersonEntry person={p} />
        ))}
      </ul>
    );
  };

const PersonEntry: React.FC<{ person: Person }> = ({ person }) => (
    <li className={styles.row} key={person.id}>
        <label
            className={styles.col}
        >
            {person.name}
        </label>
        <label className={styles.col}>
            {person.id} 
        </label>
        <label className={styles.col}>
            {person.venmoId}
        </label>

        <div className={styles.col}>
            <input    
                type="checkbox" 
                className = {styles.col} 
                onChange={e => toggleVerifiedPayment(person.id, e.target.checked)} 
                checked={person.sentPayment}>
            </input>
        </div>
        <div className={styles.col}>
            <button className={styles.deleteButton} onClick={() => deletePerson(person.id)}>
                ✕
            </button>
        </div>
      
        
      
    </li>
  );



const AllUsers: NextPage = () => {
    return (
        <div className={styles.container}>
                <AddTodoInput />
                <TodoList />                
        </div>
    );
};

export default AllUsers;