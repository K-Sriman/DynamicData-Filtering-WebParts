import * as React from 'react';
import { services } from '../Providers/GetUsers';
import type { IDataDisplayAreaProps } from './IDataDisplayAreaProps';
import styles from './DataDisplayArea.module.scss';

export interface Iuser {
  username: string;
  age: string;
  gender: string;
  email: string;
}

export interface IDataDisplayAreaState {
  allUser: Array<Iuser>;
}

export default class DataDisplayArea extends React.Component<IDataDisplayAreaProps, IDataDisplayAreaState> {
  constructor(props: IDataDisplayAreaProps | Readonly<IDataDisplayAreaProps>) {
    super(props);
    this.state = {
      allUser: []
    }; 
  }

  async componentDidMount(): Promise<void> {
    try { 
      const users = await new services().GetUsers()
      console.log(users)
      this.setState({ allUser: users });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  public render(): React.ReactElement<IDataDisplayAreaProps> {
    // const { ctx } = this.props;
    const { allUser } = this.state;   
    return (
      <div>
        <div>
          <h3>User List</h3>
          <div> 
            <div className={styles.dataDisplayArea}>
               <strong className={styles.column}>Name</strong>
               <strong className={styles.column}>Age </strong>
               <strong className={styles.column}>Gender</strong>
              <strong className={styles.column}>Email</strong>
            </div>
            {allUser.length > 0 ? (
              allUser.map((user) => (
                <div className={styles.dataDisplayArea}> 
               <div className={styles.column}> {user.username}</div>
               <div className={styles.column}>{user.age} </div>
               <div className={styles.column}> {user.gender}</div>
               <div className={styles.column}> {user.email}</div>
               </div>
              ))
            ) : (
              <p>No users available.</p>
            )}
           </div>
        </div>
      </div>
    );
  }
}
