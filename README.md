
  

#  React-Filter-Editor 🔎

[Demo](https://k9yuzr.csb.app/)
[Code](https://codesandbox.io/s/react-filter-editor-example-k9yuzr)

###  Documentation

  

[React Filter Editor Docs V1.3.3 ](https://storybook--hilarious-dieffenbachia-334eae.netlify.app/?path=/story/installation--page)

  

  

##  Getting Started 🚀

  

```
$ npm install react-filter-editor
```

  

##  Integration

  

```
import React, { useState } from 'react';
import FilterEditor from 'react-filter-editor';

 
const options = [{ name:"name", label:"Name", fieldType: "text" }];

const App = () => {
	const [values, setValues] = useState({name: ""});

	return (
		<FilterEditor options={options} values={values} onChangeValues={setValues}/>
	);
}
```

##  Import component for Bootstrap v5

  

```
import FilterEditor from 'react-filter-editor/lib/bootstrap';
```

##  Documentation V2.0

| attributes | type | description |
|--|--|--|
| values | object |
| options | Array object |
| onChangeValues | Function | function to return select value (data) => void; |
| getData | Function | function to query all data |
| setVisibleValue | Function Callback | function options to return tag value |
| configButtons | Object |
| className | String | parent ClassName |
| optionsComponent | JSX Element | render options in dropdown |

  

###  values

    {name: "", age: 30, pets: ["Firulais", "Toby", "Martita"]}

###  options

       [
         {
              label:"Person Name", 
              styles: {color: "red"},
              value:"name", 
              icon: "fas fa-user", 
              fieldType?: select || text || number || date, 
              fieldComponent?:({onChange, data, onEditField, onDisableEditMode}) => JSX.Element
          }
       ]

###  setVisibleValue
function callback

    ({label, name, value, fieldType}) => return string;

###  configButtons
  
icons work with [fontAwesome](https://fontawesome.com/icons)


    {
	    add: {
		    icon: string
		    text: string
	    }, 
	    remove: {
		    icon?: string, 
		    text?: string,
		    removeComponent?: ({onAction}) => return JXS.Element
	    }, 
	    filterActive: {
		    icon?: string
		    filterActiveComponent?: ({onAction}) => return JXS.Element
	    }, 
	    filterDisabled: {
		    icon?: string
		    filterDisabledComponent?: ({onAction}) => return JXS.Element
		}
    }

###  optionsComponent
render options in dropdown
the component brings the following properties: onAddFilter and options,
to the **onAddFilter** function you have to pass the name as an attribute

 
    const OptionsRender = ({onAddFilter, options}) => {
     return (....)
    }

  

##  Contributors 👽

  

###  Code Contributors

  

![jpprogrammer](https://avatars.githubusercontent.com/u/52465504?s=56&)

  

![andresceccoli](https://avatars.githubusercontent.com/u/7004266?s=56&)

  

###  Financial Contributors

  

<img  src="https://app.sitrack.io/static/media/sitrack_color.22c61360.svg"  alt="drawing"  style="width:200px;"/>

  

  

##  License

  

  

Licensed under MIT
