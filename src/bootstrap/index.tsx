import React, { useEffect, useState } from 'react'
import { FieldComponent, GetComponentCustom, GetComponentOptions, StatusFilter } from '../render-fields/RenderFields';
import { Field, FilterEditor as InterfaceFilterEditor, Options } from '../interfaces/Interfaces';
import { useFilter } from '../hooks/useFilter';
import '../../lib/styles/stylesTB.css';

/**
 * @param options object Array [{label:"Person Name", styles, value:"name", icon: "fas fa-user", fieldType?: "string", fieldComponent?:({data, onChange, onEditField, onDisableEditMode}) => FieldComponent}];
 * @param values object {person: "Juan", date: "12/12/2019"};
 * @param onChangeValues function  to return select value (data:values) => void;
 * @param setVisibleValue function options to return tag value ({label, name, value, fieldType}) => return string;
 * @param getData function to query all data [{active: true, color: "red", edit: true, fieldType: "number", label: "Login Code", name: "loginCode", value: ""}];
 * @param configButtons object {add: {icon, text}, remove: {icon, text, removeComponent}, filterActive: {icon, filterActiveComponent}, filterDisabled: {icon, filterDisabledComponent}}
 * @param optionsComponent render options in dropdown
 * @param className container className
 * @returns {JSX.Element}
 * @constructor
 */
const FilterEditor = ({ options = [], values = {}, onChangeValues, getData, setVisibleValue, configButtons, className, optionsComponent }: InterfaceFilterEditor) => {
  const [viewFilter, setViewFilter] = useState<Number>();
  const [fieldEditMode, setFieldEditMode] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);

  const { dataFields, optionsFilter,
    onAdd, onEdit, getValue,
    onRemove, onChange,
    onActivateFilter } = useFilter({ data: values, options, onChangeCallback: onChangeValues, setVisibleValue });

  useEffect(() => {
    getData && getData(dataFields)
  }, [getData, dataFields]);

  return (
    <div className={className}>
      <div className='filter-TB-editor-container'>
        {dataFields.length > 0 && dataFields.map((d: Field, key: any) => (
          <React.Fragment key={key}>
            <div className="filter-TB-editor-container-tags dropdown" onClick={() => !fieldEditMode && onEdit(key)}>
              <button type='button'
                className={`filter-TB-editor-dropdown-container btn btn-sm btn-outline-secondary dropdown-toogle ${d.edit ? 'show' : ''}`}
                onMouseEnter={() => setViewFilter(key)}
                onMouseLeave={() => setViewFilter(-1)}
                style={{ ...d.styles, opacity: d.active ? 1 : 0.5 }}
              >
                {d.icon && <i className={`${d.icon} filter-TB-editor-tag-icon`}></i>}
                <div className='filter-TC-editor-tag'>
                  {d.tag || getValue(d.value) || d.label}
                </div>
                <div className='filter-TB-editor-action-active'>
                  {(key === viewFilter || d.edit) &&
                    <React.Fragment>
                      {configButtons && configButtons.filterActive && configButtons.filterDisabled &&
                        <StatusFilter onAction={() => onActivateFilter(key)} configButtons={configButtons} active={d.active}/>
                      }
                      {!configButtons || (!configButtons.filterActive && !configButtons.filterDisabled) &&
                        <div className={`filter-TB-editor-circle ${d.active ? 'circle-active' : ''}`} ></div>
                      }
                    </React.Fragment>
                  }
                </div>
              </button>
              <div className={`dropdown-menu filter-TB-editor-dropdown-menu ${d.edit ? 'show' : ''}`}
                onMouseEnter={() => setFieldEditMode(true)}
                x-placement="bottom-start"
                onMouseLeave={() => setFieldEditMode(false)}>
                <div className='filter-TB-editor-container-field'>
                  <div className="filter-TB-editor-field">
                    <FieldComponent onChange={(value: any) => onChange(value, key)} data={dataFields[key]}
                      onEditField={setFieldEditMode}
                      className="form-control"
                      onDisableEditMode={() => {
                        setFieldEditMode(false);
                        onEdit(key);
                      }}
                    />
                  </div>
                  {configButtons && configButtons.remove &&
                    <React.Fragment>
                      {configButtons.remove.icon && !configButtons.remove.removeComponent &&
                        <button type='button' className='btn btn-danger btn-sm' onClick={() => { onRemove(key); setFieldEditMode(false); }}>
                          {configButtons.remove && configButtons.remove.icon && !configButtons.remove.removeComponent &&
                            <><i className={configButtons.remove.icon}></i>{configButtons.remove.text}</>
                          }
                        </button>
                      }
                      {configButtons.remove.removeComponent && !configButtons.remove.icon &&
                        <GetComponentCustom component={configButtons.remove.removeComponent} onAction={() => { onRemove(key); setFieldEditMode(false); }} />
                      }
                    </React.Fragment>
                  }
                  {(!configButtons || !configButtons.remove) &&
                    <button type='button' className='btn btn-danger btn-sm' onClick={() => { onRemove(key); setFieldEditMode(false); }}>
                      Remove
                    </button>
                  }
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
        {optionsFilter.length > 0 &&
          <div className="filter-TB-editor-container-options dropdown" onClick={() => setOpenOptions(!openOptions)}>
            <button className={`btn btn-sm btn-outline-secondary dropdown-toogle ${openOptions ? 'show' : ""}`} type='button' data-bs-toggle="dropdown" aria-expanded="false">
              {configButtons && configButtons.add && configButtons.add.icon && <><i className={configButtons.add.icon}></i> {configButtons.add.text}</>}
              {(!configButtons || !configButtons.add) && "Add Filter"}
            </button>

            {optionsComponent && 
              <div className={`filter-TB-editor-dropdown-menu dropdown-menu ${openOptions ? 'show' : ""}`}>
                <GetComponentOptions component={optionsComponent} options={optionsFilter} onAddFilter={onAdd} />
              </div>
            }
            {!optionsComponent && 
              <ul className={`filter-TB-editor-dropdown-menu dropdown-menu ${openOptions ? 'show' : ""}`} >
                {optionsFilter.map((op: Options, key: any) => (
                  <li onClick={() => onAdd(op.name)} key={key} className="dropdown-item" data-rr-ui-dropdown-item>
                    <a><i className={`filter-TB-editor-option-icon ${op.icon}`}></i> {op.label}</a>
                  </li>
                ))}
              </ul>
            }
          </div>
        }
      </div>
    </div>

  )
}

export default FilterEditor;
