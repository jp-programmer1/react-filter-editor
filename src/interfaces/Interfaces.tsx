
interface optionSelect {
  label: string;
  value: any;
}
export interface fieldType{
  text: Function;
  number: Function;
  select: Function;
  date: Function;
}
export interface Options {
  label?: string;
  name: string;
  icon?: string;
  fieldType?: fieldType
  fieldComponent?: JSX.Element;
  styles?: {};
  options?: Array<optionSelect>
  optionComponent?:JSX.Element
}

export interface Field extends Options{
  edit?:boolean;
  active?:boolean;
  value?: any;
  tag?: string
}

export interface UseFilter{
  data: any; 
  options: Array<Options>;
  onChangeCallback: (data:any) => void; 
  setVisibleValue: (nameFilter:string, value:any) => string;
}

export interface FilterEditor{
  options: Array<Options>;
  values: any;
  className?:string;
  onChangeValues: (data:any) => void; 
  getData: (data:any) => void;
  setVisibleValue: (nameFilter:string, value:any) => string;
  configButtons: {
    add: { text:string, icon?:string, addComponent?:JSX.Element },
    remove: { text:string, icon?:string, removeComponent?:JSX.Element },
    filterActive: {icon?:string, filterActiveComponent?:JSX.Element },
    filterDisabled: {icon?:string, filterDisabledComponent?:JSX.Element },
  }
}

export interface RenderFieldsProps{
  data:Field;
  onChange: (value:any) => void;
  onEditField?: (edit:boolean) => void;
  className?:string
  onEnter?: (e:any) => void; 
}
