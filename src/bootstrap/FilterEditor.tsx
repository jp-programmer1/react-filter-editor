import React, { useEffect, useRef, useState } from 'react'
import { FieldComponent } from './RenderFields';
import { Field, FilterEditor, Options } from '../interfaces/Interfaces';
import { useFilter } from '../hooks/useFilter';
import '../../lib/styles/stylesTB.css';

/**
 * 
 * @param options object Array [{label:"Person Name", value:"name", icon: "fas fa-user", fieldType?: "string", fieldComponent?:(data, onChange, onEditField) => FieldComponent}];
 * @param values object {person: "Juan", date: "12/12/2019"};
 * @param onChangeValues function  to return select value (data:values) => void;
 * @param setVisibleValue function options to return tag value (nameFilter, value) => return string;
 * @param getData function to query all data [{active: true, color: "red", edit: true, fieldType: "number", label: "Login Code", name: "loginCode", value: ""}];
 * @returns {JSX.Element}
 * @constructor
 */
const FilterEditor = ({ options = [], values = {}, onChangeValues, getData, setVisibleValue, configButtons }: FilterEditor) => {
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
    <React.Fragment>
      <div className='filter-TB-editor-container'>
        {dataFields.length > 0 && dataFields.map((d: Field, key: any) => (
          <React.Fragment key={key}>
            <div className="btn-group filter-TB-editor-container-tags" onClick={() => !fieldEditMode && onEdit(key)}>
              <button type='button'
                className={`filter-TB-editor-dropdown-container btn btn-sm btn-outline-secondary dropdown-toogle ${d.edit ? 'show' : ''}`}
                onMouseEnter={() => setViewFilter(key)}
                onMouseLeave={() => setViewFilter(-1)}
                style={{ ...d.styles, opacity: d.active ? 1 : 0.5 }}
              >
                <i className={d.icon || "fas fa-filter"}></i>
                <span className='filter-TB-editor-tag'>{d.tag || d.value || d.label}</span>
                <div className='filter-TB-editor-action-active'>
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
                        <div className={`filter-TB-editor-circle ${d.active ? 'circle-active' : ''}`} ></div>
                      }
                    </div>
                  }
                </div>
              </button>
              <div className={`dropdown-menu filter-TB-editor-dropdown-menu ${d.edit ? 'show' : ''}`} 
                   onMouseEnter={() => setFieldEditMode(true)}
                   x-placement="bottom-start"
                   onMouseLeave={() => setFieldEditMode(false)}>
                <div className='filter-TB-editor-container-field'>
                  <div className="filter-TB-editor-field">
                    <FieldComponent onChange={(value: any) => onChange(value, key)} data={dataFields[key]} onEditField={setFieldEditMode} />
                  </div>
                    <button type='button' className='btn btn-danger btn-sm' onClick={() => {onRemove(key); setFieldEditMode(false);}}>
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
          <div className="btn-group filter-TB-editor-container-options" onClick={() => setOpenOptions(!openOptions)}>
            <button className={`btn btn-sm btn-outline-secondary dropdown-toogle ${openOptions ? 'show' : ""}`} type='button' data-bs-toggle="dropdown" aria-expanded="false">
              {configButtons &&
                <React.Fragment>
                  {configButtons.add.icon && !configButtons.add.addComponent && <><i className={configButtons.add.icon}></i> {configButtons.add.text}</>}
                  {configButtons.add.addComponent && configButtons.add.addComponent}
                </React.Fragment>
              }
              {!configButtons && "Add Filter"}
            </button>
            <ul className={`filter-TB-editor-dropdown-menu dropdown-menu ${openOptions ? 'show' : ""}`} >
              {optionsFilter.map((op: Options, key: any) => (
                <li onClick={() => onAdd(op.name)} key={key} className="dropdown-item" data-rr-ui-dropdown-item>
                  <a>
                    {op.optionComponent && op.optionComponent}
                    {!op.optionComponent && op.icon && <><i className={op.icon}></i> {op.label}</>}
                    {!op.optionComponent && !op.icon && op.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
      </div>
    </React.Fragment>
    
  )
}

export default FilterEditor;