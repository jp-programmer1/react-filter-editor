import { Field, Options, UseFilter } from '../interfaces/Interfaces';
/**
 * @param values data
 * @param options options
 * @param onChangeCallback
 * @param setVisibleValue
 * @returns {onAdd, onEdit, onRemove, onChange, dataFields, optionsFilter, onActivateFilter}
 */
export declare const useFilter: ({ data, options, onChangeCallback, setVisibleValue }: UseFilter) => {
    onAdd: (key: any) => void;
    onEdit: (key: any) => void;
    onRemove: (key: any) => void;
    onChange: (value: any, key: any) => void;
    dataFields: Field[];
    optionsFilter: Options[];
    onActivateFilter: (index: any) => void;
};
