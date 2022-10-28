import { NextPage } from "next";
import { Person } from "@prisma/client";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { deletePerson, toggleVerifiedPayment, usePerson, createPerson, toggleEmailSent} from "../api";

const AddTodoInput = () => {
    const [name, setName] = useState("");
    const [venmoId, setVenmoId] = useState("");
    const [email, setEmail] = useState("");

    return (
        <form
            onSubmit={async e => {
                e.preventDefault();
                createPerson(name, venmoId, email);
                setName("");
                setVenmoId("");
                setEmail("");
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
            placeholder="example@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
    let { data: people, error } = usePerson();
    const [paidUsersChecked, setPaidUsersChecked] = useState(false);


    
    if (error != null) return <div>Error loading todos...</div>;
    if (people == null) return <div>Loading...</div>;
  
    if (people.length === 0) {
      return <div className={styles.emptyState}>Try adding a todo ☝️️</div>;
    }

    if (paidUsersChecked) {
        people = people.filter(p => !p.sentPayment)
    }
  
    return (
        <div className={styles.todoListHolder}>
            <div>
                <input    
                    type="checkbox" 
                    onChange={e => {setPaidUsersChecked(e.target.checked)
                    }} > 
                </input>
                Filter out paid users
            </div>
        <ul className={styles.todoList}>
            <li className={styles.row}>
                <label className={styles.col}><b>Name</b></label>
                <label className={styles.col}><b>ID</b></label>
                <label className={styles.col}><b>Email</b></label>
                <label className={styles.col}><b>Venmo ID</b></label>
                <label className={styles.col}><b>Paid</b></label>
                <label className={styles.col}><b>Delete</b></label>
            </li>
            {people.map(p => (
            <PersonEntry person={p} />
            ))}
        </ul>
        </div>
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
            {person.email}
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
const PushEmailButton: React.FC = () => {

    const {data: people, error} = usePerson();

    return (
    <button onClick={() => {
        console.log(people.filter(p => p.sentPayment && !p.ticketEmailed));
        people.filter(p => p.sentPayment && !p.ticketEmailed).forEach(p => toggleEmailSent(p));
        
    }}>
        SEND OUT EMAIL
    </button>
    );
};



const AllUsers: NextPage = () => {
    return (
        <div className={styles.container}>
                <AddTodoInput />
                <PushEmailButton />
                <TodoList />                
        </div>
    );
};

export default AllUsers;