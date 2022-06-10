/// <reference types="react" />
interface optionSelect {
    label: string;
    value: any;
}
export interface fieldType {
    text: Function;
    number: Function;
    select: Function;
    date: Function;
}
export interface Options {
    label?: string;
    name: string;
    icon?: string;
    fieldType?: fieldType;
    fieldComponent?: JSX.Element;
    styles?: {};
    options?: Array<optionSelect>;
}
export interface Field extends Options {
    edit?: boolean;
    active?: boolean;
    value?: any;
    tag?: string;
}
export interface UseFilter {
    data: any;
    options: Array<Options>;
    onChangeCallback: (data: any) => void;
    setVisibleValue?: (data: Field) => string;
}
export interface FilterEditor {
    options: Array<Options>;
    values: any;
    className?: string;
    onChangeValues: (data: any) => void;
    getData: (data: any) => void;
    setVisibleValue?: (data: Field) => string;
    configButtons: InterfaceConfigButtons;
    optionsComponent?: React.ElementType<{
        onAddFilter: (name: string) => void;
        options: Array<Options>;
    }>;
}
interface InterfaceConfigButtons {
    add: {
        text: string;
        icon?: string;
    };
    remove: {
        text: string;
        icon?: string;
        removeComponent?: React.ElementType<{
            onAction: () => void;
        }>;
    };
    filterActive: {
        icon?: string;
        filterActiveComponent?: React.ElementType<{
            onAction: () => void;
        }>;
    };
    filterDisabled: {
        icon?: string;
        filterDisabledComponent?: React.ElementType<{
            onAction: () => void;
        }>;
    };
}
export interface RenderFieldsProps {
    data: Field;
    onChange: (value: any) => void;
    onEditField?: (edit: boolean) => void;
    className?: string;
    onDisableEditMode?: () => void;
    onEnter?: (e: any) => void;
}
export interface InterfaceComponentCustom {
    component: React.ElementType<{
        onAction: () => void;
    }>;
    onAction: () => void;
}
export interface InterfaceComponentOptions {
    options: Array<Options>;
    onAddFilter: (name: string) => void;
    component: React.ElementType<{
        onAddFilter: (name: string) => void;
        options: Array<Options>;
    }>;
}
export interface InterfaceStatusFilter {
    configButtons: InterfaceConfigButtons;
    onAction: () => void;
    active: any;
}
export {};
