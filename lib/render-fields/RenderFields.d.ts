/// <reference types="react" />
import { RenderFieldsProps, InterfaceComponentCustom, InterfaceComponentOptions, InterfaceStatusFilter } from "../interfaces/Interfaces";
export declare const FieldComponent: ({ onChange, data, onEditField, className, onDisableEditMode }: RenderFieldsProps) => JSX.Element;
export declare const GetComponentCustom: ({ component, onAction }: InterfaceComponentCustom) => JSX.Element;
export declare const GetComponentOptions: ({ component, onAddFilter, options }: InterfaceComponentOptions) => JSX.Element;
export declare const StatusFilter: ({ configButtons, onAction, active }: InterfaceStatusFilter) => JSX.Element;
