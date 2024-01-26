import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { getLocations, isNameValid } from './mock-api/apis';

function App() {

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [locationIndex, setLocationIndex] = useState(0);
  const [locations, setLocations] = useState([]);
  const [data, setData] = useState([]);

  const onChangeName = (e) => {
    setName(e.target.value);
    const isValid = isNameValid(e.target.value);
    if (!isValid) {
      setNameError('This name is invalid');
    } else {
      setNameError('');
    }
  }

  const fetchLocation = async () => {
    setLocations(await getLocations());
  }
  useEffect(() => {
    fetchLocation();
  }, [])

  const onSelectLocation = (e) => {
    console.log(e.target.value);
    setLocationIndex(e.target.value);
  }

  const onClickAdd = () => {
    if (name === "") return;
    if (data.some((item) => item.name === name)) {
      setNameError('This name already taken');
      return;
    }
    setData([...data, { name: name, location: locationIndex }]);
  }

  const onClickClear = () => {
    setData([]);
    setNameError('');
  }

  return (
    <div className="max-w-lg mx-auto shadow p-6 my-auto">
      <div className='flex flex-col mb-5'>
        <div className='mb-2 flex flex-row gap-4 items-center justify-center'>
          <label for="username" className='block text-sm font-medium min-w-16'>Name</label>
          <input
            type="text"
            id="username"
            className='min-w-md shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='Please input name'
            value={name}
            onChange={onChangeName}
          />
        </div>
        <p className={`ml-20 text-red-600 ${nameError === '' ? 'hidden' : 'block'}`}>{nameError}</p>
      </div>

      <div className='flex flex-col'>
        <div className='mb-2 flex flex-row gap-4 items-center justify-center'>
          <label for="location" className='block text-sm font-medium min-w-16'>Location</label>
          <select
            id="location"
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            onChange={onSelectLocation}>
            {/* <option selected>Choose a country</option> */}
            {locations && locations.length > 0 && locations.map((location, key) => {
              return (
                <option value={key}>{location}</option>
              )
            })}
          </select>
        </div>
      </div>

      <div className='flex flex-row mt-20 gap-4 justify-end'>
        <button className='px-3 py-2 text-base font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300' onClick={onClickClear}>Clear</button>
        <button className='px-3 py-2 text-base font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300' onClick={onClickAdd}>Add</button>
      </div>

      <div className="relative overflow-y-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-blue-100">
          <thead className="text-xs text-black uppercase bg-gray-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr className={`${index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-400'} border-b border-gray-400 text-black`}>
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                    {item.name}
                  </th>
                  <td className="px-6 py-4">
                    {locations[item.location]}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;
