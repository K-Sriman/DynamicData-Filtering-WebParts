import * as React from 'react';
import * as ReactDom from 'react-dom'; 
import {
  DynamicDataSharedDepth,
  type IPropertyPaneConfiguration,
  PropertyPaneDynamicField,
  PropertyPaneDynamicFieldSet,
} from '@microsoft/sp-property-pane'; 
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'DataDisplayAreaWebPartStrings';
import DataDisplayArea from './components/DataDisplayArea';
import { IDataDisplayAreaProps } from './components/IDataDisplayAreaProps';
import { DynamicProperty } from '@microsoft/sp-component-base';
 
export interface IDataDisplayAreaWebPartProps {
  Name:DynamicProperty<string>,
  Gender:DynamicProperty<string>,
  Email:DynamicProperty<string>,
}
export default class DataDisplayAreaWebPart extends BaseClientSideWebPart<IDataDisplayAreaProps>  {

  public render(): void {
    const element: React.ReactElement<IDataDisplayAreaWebPartProps> = React.createElement(
      DataDisplayArea,
      {
        Email:this.properties.Email,
        Name: this.properties.Name,
        Gender:this.properties.Gender
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
  
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupName: "Dynamic Filters",
              groupFields: [
                PropertyPaneDynamicFieldSet({
                  label: "Connect Filters",
                  fields: [
                    PropertyPaneDynamicField('Name', {
                      label: "Name"
                    }),
                    PropertyPaneDynamicField('Gender', {
                      label: "Gender"
                    }),
                    PropertyPaneDynamicField('Email', {
                      label: "Email"
                    })
                  ],
                  sharedConfiguration: {
                    depth: DynamicDataSharedDepth.Source
                  }
                })
              ]
            }
          ]
        }
      ]
    };
  }
   
}
