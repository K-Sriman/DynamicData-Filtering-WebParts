import * as React from 'react';
import { services } from '../Providers/GetUsers';
import { IDataDisplayAreaProps } from './IDataDisplayAreaProps';
import styles from './DataDisplayArea.module.scss';

export interface Iuser {
  username: string;
  age: string;
  gender: string;
  email: string;
}

export interface IDataDisplayAreaState {
  allUser: Iuser[];
  filteredUsers: Iuser[];
}

export default class DataDisplayArea extends React.Component<IDataDisplayAreaProps, IDataDisplayAreaState> {
  constructor(props: IDataDisplayAreaProps) {
    super(props);
    this.state = {
      allUser: [],
      filteredUsers: []
    };
  }

  async componentDidMount(): Promise<void> {
    try {
      const users = await new services().GetUsers();
      this.setState({ allUser: users, filteredUsers: users });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }


  public render(): React.ReactElement<IDataDisplayAreaProps> {
    let { filteredUsers } = this.state;
    const { Name, Email, Gender } = this.props;
    const currentName = Name?.tryGetValue();
    const currentEmail = Email?.tryGetValue();
    const currentGender = Gender?.tryGetValue();
  
 
       filteredUsers = this.state.allUser.filter((user) => {
      return (
        (!currentName || user.username.toLowerCase().includes(currentName.toLowerCase())) &&
        (!currentEmail || user.email.toLowerCase().includes(currentEmail.toLowerCase())) &&
        (!currentGender || user.gender.toLowerCase() === currentGender.toLowerCase())
      );
    });
    return (
      <div>
        <h3>User List</h3>
        <div>
          <div className={styles.dataDisplayArea}>
            <strong className={styles.column}>Name</strong>
            <strong className={styles.column}>Age</strong>
            <strong className={styles.column}>Gender</strong>
            <strong className={styles.column}>Email</strong>
          </div>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div className={styles.dataDisplayArea} key={index}>
                <div className={styles.column}>{user.username}</div>
                <div className={styles.column}>{user.age}</div>
                <div className={styles.column}>{user.gender}</div>
                <div className={styles.column}>{user.email}</div>
              </div>
            ))
          ) : (
            <p>No users available.</p>
          )}
        </div>
      </div>
    );
  }
}