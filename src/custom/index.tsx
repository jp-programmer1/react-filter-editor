import React, { useCallback, useEffect, useState } from 'react'
import { Field, FilterEditor, Options } from '../interfaces/Interfaces';
import { useFilter } from '../hooks/useFilter';
import '../../lib/styles/stylesTC.css';
import { FieldComponent } from '../render-fields/RenderFields';

/**
 * @param options object Array [{label:"Person Name", value:"name", icon: "fas fa-user", fieldType?: "string", fieldComponent?:(data, onChange, onEditField) => FieldComponent}];
 * @param values object {person: "Juan", date: "12/12/2019"};
 * @param onChangeValues function  to return select value (data:values) => void;
 * @param setVisibleValue function options to return tag value (nameFilter, value) => return string;
 * @param getData function to query all data [{active: true, color: "red", edit: true, fieldType: "number", label: "Login Code", name: "loginCode", value: ""}];
 * @param configButtons object {add: {icon, text, addComponent}, remove: {icon, text, removeComponent}, filterActive: {icon, filterActiveComponent}, filterDisabled: {icon, filterDisabledComponent}}
 * @param className container className
 * @returns {JSX.Element}
 * @constructor
 */
const FilterEditor = ({ options = [], values = {}, onChangeValues, getData, setVisibleValue, configButtons, className }: FilterEditor) => {
  const [viewFilter, setViewFilter] = useState<Number>();
  const [fieldEditMode, setFieldEditMode] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);

  const { dataFields, optionsFilter,
          onAdd, onEdit,
          onRemove, onChange,
          onActivateFilter } = useFilter({ data: values, options, onChangeCallback: onChangeValues, setVisibleValue });

  useEffect(() => {
    getData && getData(dataFields)
  }, [getData, dataFields]);

  return (
    <div className={className}>
      <div className='filter-TC-editor-container'>
        {dataFields.length > 0 && dataFields.map((d: Field, key: any) => (
          <React.Fragment key={key}>
            <div className="filter-TC-editor-container-tags" onClick={() => !fieldEditMode && onEdit(key)}>
              <button type='button'
                className={`filter-TC-editor-btn filter-TC-editor-dropdown-container`}
                onMouseEnter={() => setViewFilter(key)}
                onMouseLeave={() => setViewFilter(-1)}
                style={{ ...d.styles, opacity: d.active ? 1 : 0.5 }}
              >
                {d.icon && <i className={`${d.icon} filter-TC-editor-tag-icon`}></i>}
                <span className='filter-TC-editor-tag'>{d.tag || d.value || d.label}</span>
                <div className='filter-TC-editor-action-active'>
                  {(key === viewFilter || d.edit) &&
                    <div onClick={() => onActivateFilter(key)} style={{ opacity: d.active ? 1 : 0.5 }}>
                      {d.active && configButtons &&
                        <>
                          {configButtons.filterActive.icon && !configButtons.filterActive.filterActiveComponent ? <i className={configButtons.filterActive.icon}></i>
                          : configButtons.filterActive.filterActiveComponent}
                        </>
                      }
                      {!d.active && configButtons && 
                        <>
                          {configButtons.filterDisabled.icon && !configButtons.filterDisabled.filterDisabledComponent ? <i className={configButtons.filterDisabled.icon}></i>
                          : configButtons.filterDisabled.filterDisabledComponent}
                        </>
                      }
                      {!configButtons &&
                        <div className={`filter-TC-editor-circle ${d.active ? 'circle-active' : ''}`} ></div>
                      }
                    </div>
                  }
                </div>
              </button>
              <div className={`filter-TC-editor-dropdown-menu filter-TC-${d.edit ? 'show' : 'hide'}`} 
                   onMouseEnter={() => setFieldEditMode(true)}
                   x-placement="bottom-start"
                   onMouseLeave={() => setFieldEditMode(false)}>
                <div className='filter-TC-editor-container-field'>
                  <div className="filter-TC-editor-field">
                    <FieldComponent onChange={(value: any) => onChange(value, key)} data={dataFields[key]} onEditField={setFieldEditMode} className="filter-TC-editor-input" />
                  </div>
                    <button type='button' className='filter-TC-editor-btn filter-TC-editor-btn-remove' onClick={() => {onRemove(key); setFieldEditMode(false);}}>
                      {configButtons &&
                        <React.Fragment>
                          {configButtons.remove.icon && !configButtons.remove.removeComponent && <><i className={configButtons.remove.icon}></i>{configButtons.remove.text}</>}
                          {configButtons.remove.removeComponent && configButtons.remove.removeComponent}
                        </React.Fragment>
                      }
                      {!configButtons && "Remove"}
                    </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
        {optionsFilter.length > 0 &&
          <div className="filter-TC-editor-container-options" onClick={() => setOpenOptions(!openOptions)}>
            <button className="filter-TC-editor-btn" type='button' data-bs-toggle="dropdown" aria-expanded="false">
              {configButtons &&
                <React.Fragment>
                  {configButtons.add.icon && !configButtons.add.addComponent && <><i className={configButtons.add.icon}></i> {configButtons.add.text}</>}
                  {configButtons.add.addComponent && configButtons.add.addComponent}
                </React.Fragment>
              }
              {!configButtons && "Add Filter"}
            </button>
            <ul className={`filter-TC-editor-options-dropdown-menu filter-TC-${openOptions ? 'show' : "hide"}`} >
              {optionsFilter.map((op: Options, key: any) => (
                <li onClick={() => onAdd(op.name)} key={key} className="filter-TC-editor-dropdown-item" data-rr-ui-dropdown-item>
                  <a>
                    {op.optionComponent && op.optionComponent}
                    {!op.optionComponent && op.icon && <><i className={`filter-TC-editor-option-icon ${op.icon}`}></i> {op.label}</>}
                    {!op.optionComponent && !op.icon && op.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
      </div>
    </div>
    
  )
}

export default FilterEditor;
