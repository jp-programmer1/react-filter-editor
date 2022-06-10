import React from "react";
import { fieldType, RenderFieldsProps, InterfaceComponentCustom, InterfaceComponentOptions, InterfaceStatusFilter } from "../interfaces/Interfaces";

const SelectCustom = ({ data, onChange, className, onEnter }: RenderFieldsProps) => (
  //@ts-ignore
  <select name={data.name} id={data.name} className={className} value={data.value} onChange={(e) => onChange(e.target.value)} onKeyUp={onEnter}>
    {data.options && data.options.map(op => (
      //@ts-ignore
      <option value={op.value}>{op.label}</option>
    ))}
  </select>
);
const InputCustom = ({ data, onChange, className, onEnter }: RenderFieldsProps) => (
  <input autoComplete='off' className={className}
    //@ts-ignore
    type={data.fieldType} placeholder={data.label}
    name={data.name}
    value={data.value?.toString()}
    onChange={(e) => onChange(e.target.value)}
    onKeyUp={onEnter}
  />
);

const types: fieldType = {
  "select": SelectCustom,
  "text": InputCustom,
  "number": InputCustom,
  "date": InputCustom
}

export const FieldComponent = ({ onChange, data, onEditField, className, onDisableEditMode }: RenderFieldsProps) => {
  //@ts-ignore
  const Field = data.fieldType && types[data.fieldType];
  const Component: any = data.fieldComponent && data.fieldComponent;

  return (
    <React.Fragment>
      {Field && !Component &&
        <Field
          onChange={onChange}
          data={data}
          onEditField={onEditField}
          className={className}
          onEnter={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.key === "Enter") {
              onDisableEditMode && onDisableEditMode();
            }
          }}
        />
      }
      {Component && <Component onChange={onChange} data={data} onEditField={onEditField} onDisableEditMode={onDisableEditMode} />}
    </React.Fragment>

  );
}

export const GetComponentCustom = ({ component, onAction }: InterfaceComponentCustom) => {
  const GetComponentStatus = component;
  return (
    <GetComponentStatus onAction={onAction} />
  );
}

export const GetComponentOptions = ({ component, onAddFilter, options }: InterfaceComponentOptions) => {
  const GetComponentStatus = component;
  return (
    <GetComponentStatus onAddFilter={onAddFilter} options={options} />
  );
}

export const StatusFilter = ({ configButtons, onAction, active=false }:InterfaceStatusFilter) => {
  return (
    <React.Fragment>
      {/* show icons when no components exist */}
      {configButtons.filterActive.icon && !configButtons.filterActive.filterActiveComponent &&
        <div onClick={onAction} style={{ opacity: active ? 1 : 0.5 }}>
          {active && <i className={configButtons.filterActive.icon}></i>}
          {!active && <i className={configButtons.filterDisabled.icon}></i>}
        </div>
      }
      {/* show components when there are no icons */}
      {configButtons.filterActive.filterActiveComponent && !configButtons.filterActive.icon &&
        <div>
          {active && configButtons.filterActive.filterActiveComponent &&
            <GetComponentCustom component={configButtons.filterActive.filterActiveComponent} onAction={onAction} />
          }
          {!active && configButtons.filterDisabled.filterDisabledComponent &&
            <GetComponentCustom component={configButtons.filterDisabled.filterDisabledComponent} onAction={onAction} />
          }
        </div>
      }
    </React.Fragment>
  )
}