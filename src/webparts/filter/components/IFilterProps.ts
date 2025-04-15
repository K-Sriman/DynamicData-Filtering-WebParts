import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFilterProps {
  ctx:WebPartContext
  onNameChange:(name:string|undefined)=>void;
  onGenderChanger:(gender:string|undefined)=> void;
  onEmailChange:(email:string|undefined)=> void;
}
