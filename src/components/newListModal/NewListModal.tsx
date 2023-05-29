import React from 'react';
import styles from "./NewListModal.module.scss";

// Components
import Button from "../button/Button";
interface NewListPopupProps {
    onClose: () => void;
    onSubmit: (name: string) => void;
    heading: string;
    placeholder: string;
    isOpen: boolean;
}

const NewListModal: React.FC<NewListPopupProps> = ({ onClose, onSubmit, heading, isOpen , placeholder}) => {
    // State
    const [listName, setListName] = React.useState<string>('');

    // Handlers
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setListName(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(listName);
        setListName('');
        onClose();
    }

    return (
        <>
        {isOpen &&
        <div className={styles.container}>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.heading}>{heading}</h3>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input className={styles.input}
                           type="text"
                           name="listName"
                           value={listName}
                           placeholder={placeholder} onChange={handleChange}/>
                    <div className={styles.buttons}>
                        {/* eslint-disable-next-line react/style-prop-object */}
                        <Button name="Close" onClick={onClose} style="remove" />
                        <Button name="Submit" type="submit" />
                    </div>
                </form>
            </div>
        </div>
        }
        </>
    );
}

export default NewListModal;