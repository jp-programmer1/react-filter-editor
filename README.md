# React-Filter-Editor 🔎

## Installation
```
$ npm install react-filter-editor
$ yarn add react-filter-editor
```
## Integration
```
  import React, { useState } from 'react';
  import { FilterEditor } from 'react-filter-editor';
  
  const  options  = [{ name:"name", label:"Name", fieldType: "text" }];
  
  const App = () => {
	const [values, setValues] = useState({name: ""});
    return (
	    <FilterEditor options={options} values={values} onChangeValues={setValues}/>
    );
  }
  ```
## Contributors 👽
### Code Contributors
![jpprogrammer](https://avatars.githubusercontent.com/u/52465504?s=56&)
![andresceccoli](https://avatars.githubusercontent.com/u/7004266?s=56&)
### Financial Contributors
![sitrack](https://lh3.googleusercontent.com/fd5MZKDqjzzKhtMW259JStq7AxGXVM0m6V_gtpNWjtGnwcBo4hMzcYrx6zljnW2RAHEEQFA=s170)
## License

Licensed under MIT
