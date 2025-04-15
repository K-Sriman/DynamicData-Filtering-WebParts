import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import Filter from './components/Filter';
import { IFilterProps } from './components/IFilterProps';

import {
	IDynamicDataPropertyDefinition,
	IDynamicDataCallables
} from "@microsoft/sp-dynamic-data";
 
export interface IFilterWebPartProps {
  ctx: WebPartContext;  
}


export default class FilterWebPart extends BaseClientSideWebPart<IFilterWebPartProps> implements IDynamicDataCallables {
  private _Name:string;
  private _gender:string;
  private _Email:string;

  protected async onInit(): Promise<void> {
    this.context.dynamicDataSourceManager.initializeSource(this);
  }
  public render(): void {
    const element: React.ReactElement<IFilterProps> = React.createElement(
      Filter,
      {
        ctx: this.context,
        onNameChange:this._handleNameChange,
        onGenderChanger:this._handleGenderChange,
        onEmailChange:this._onEmailChange
      }
    );
    ReactDom.render(element, this.domElement);
  }
  private _handleNameChange=(name:string):void=>{
    this._Name=name || ""; 
    this.context.dynamicDataSourceManager.notifyPropertyChanged("name");
  }
  private _onEmailChange=(email:string):void=>{
    this._Name=email || ""; 
    this.context.dynamicDataSourceManager.notifyPropertyChanged("gender");
  }
  private _handleGenderChange=(gender:string):void=>{
    this._gender=gender || ""; 
      this.context.dynamicDataSourceManager.notifyPropertyChanged("email");
  }
  
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return[
      {
        id:"name",
        title:"Name"
      },
      {
        id:"gender",
        title:"Gender"
      },
      {
        id:"email",
        title:"Email"
      }
    ]
  }

 public getPropertyValue(propertyId: string) {
    switch(propertyId){
      case "name":
        return this._Name;
      case "gender":
        return this._gender;
      case "email":
        return this._Email;
      } 
      throw new Error("bad property");
    
  }
  
  
}
