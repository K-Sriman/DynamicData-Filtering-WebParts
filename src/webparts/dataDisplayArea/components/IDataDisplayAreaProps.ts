import { DynamicProperty } from "@microsoft/sp-component-base";


export interface IDataDisplayAreaProps {
    Name:DynamicProperty<string>,
    Gender:DynamicProperty<string>,
    Email:DynamicProperty<string>,
}
