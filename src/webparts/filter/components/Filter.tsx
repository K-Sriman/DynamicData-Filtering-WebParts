import * as React from 'react';
import type { IFilterProps } from './IFilterProps';
import { Dropdown, TextField } from '@fluentui/react';
import styles from './Filter.module.scss';

export default class Filter extends React.Component<IFilterProps> {
  
  public render(): React.ReactElement<IFilterProps> {
 
    const{
      onGenderChanger,
      onNameChange,
      onEmailChange
    }=this.props

    const GenderOptions = [
      { key: 'male', text: 'Male' },
      { key: 'female', text: 'Female' }
    ];


    return (
      <div>
        <h2>Filters</h2>
        <div className={styles.filter}>
        <TextField label='Search by Name ' onChange={(ev, newName) => onNameChange(newName || '')}/>
        <Dropdown
        className={styles.genderDropDown}
        label='Gender dropdown'
          options={GenderOptions}
          onChange={(e,option)=>onGenderChanger(option?.text)}
        />
        <TextField label='Search by Email' onChange={(ev, newEmail) => onEmailChange(newEmail||'')}/>
      </div>
      </div>
    );
  }
}
