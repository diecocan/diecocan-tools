import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { OWNERS_BASE_URL } from '../constants/constants';
import './OwnersTable.css';

const OwnersTable = () => {
    const [owners, setOwners] = useState([]);
    const [editRow, setEditRow] = useState(null);
    const [editData, setEditData] = useState({});
    const [filterText, setFilterText] = useState('');
    const [newOwner, setNewOwner] = useState({name: "", isActive: 'true'});

    useEffect(() => {
        axios.get(OWNERS_BASE_URL)
        .then(response => setOwners(response.data))
        .catch(error => console.error('Failed to fetch owners: ', error))
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${OWNERS_BASE_URL}/${id}`)
        .then(() => setOwners(owners.filter(owner => owner.id !== id)))
        .catch(error => console.error('Failed to delete owner: ', error));
    };

    const handleEdit = (owner) => {
       setEditRow(owner.id);
       setEditData({ ...editData, [owner.id]: { ...owner } });
    };

    const handleUpdate = (id) => {
        axios.put(`${OWNERS_BASE_URL}/${id}`, editData[id])
        .then(response => {
            setOwners(owners.map(owner => (owner.id === id ? response.data : owner)));
            setEditRow(null);
        })
        .catch(error => console.error("Failed to update owner: ", error))
    };

    const handleNewOwnerSubmit = (e) => {
        e.preventDefault();

        axios.post(OWNERS_BASE_URL, {
            name: newOwner.name,
            isActive: newOwner.isActive === 'true'
        })
        .then(response => {
            setOwners([...owners, response.data]);
            setNewOwner({name: '', isActive: 'true'})
        })
        .catch(error => console.error("Failed to add new owner: ", error));
    };

    const handleEditInputChange = (e, id) => {
        const { name, value } = e.target;

        setEditData({
            ...editData,
            [id]: { ...editData[id], [name]: value }
        });
    }

    const handleEditCheckboxChange = (e, id) => {
        const { checked } = e.target;

        setEditData({
            ...editData,
            [id]: {...editData[id], isActive: checked}
        });
    };

    const handleNewOwnerChange = (e) => {
        const { name, value } = e.target;
        setNewOwner({ ...newOwner, [name]: value});
    }

    const filteredOwners = owners.filter(owner => 
        owner.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className='Owners-card'>
            <div className='owners-toolbar'>
                <div className='search-field'>
                    <i className='fa fa-search search-field-icon' aria-hidden='true'></i>
                    <input
                        type="text"
                        className='search-field-input'
                        placeholder='Filter by name'
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                </div>
                <div className='toolbar-divider' role="separator" aria-orientation='vertical'>
                </div>
                <form className='owner-form' onSubmit={handleNewOwnerSubmit}>
                    <input 
                        type='text'
                        name='name'
                        className='text-input'
                        placeholder='New owner name'
                        value={newOwner.name}
                        onChange={handleNewOwnerChange}
                        required
                    />
                    <select
                        name='isActive'
                        className='select-input'
                        value={newOwner.isActive}
                        onChange={handleNewOwnerChange}
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                    <button type='submit' className='btn btn-primary'>
                        <i className='fas fa-plus'></i>
                        Add Owner
                    </button>
                </form>
            </div>

            <div className='table-wrapper'>
                <table className='owners-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Active</th>
                            <th className='col-actions'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredOwners.map(owner => (
                                <tr key={owner.id}>
                                    <td>
                                        {editRow === owner.id ? (
                                            <input 
                                                type='text'
                                                name='name'
                                                className='text-input'
                                                value={ editData[owner.id]?.name || "" }
                                                onChange={(e) => handleEditInputChange(e, owner.id)}
                                            />
                                        ) : (
                                            owner.name
                                        )}
                                    </td>
                                    <td>
                                        {editRow === owner.id ? (
                                            <input 
                                                type='checkbox'
                                                checked={editData[owner.id]?.isActive || false}
                                                onChange={(e) => handleEditCheckboxChange(e, owner.id)}
                                            />
                                        ) : (
                                            <span className={`badge ${owner.isActive ? 'badge-success' : 'badge-neutral'}`}>
                                                {owner.isActive ? "Active" : "Inactive"}
                                            </span>
                                        )}
                                    </td>
                                    <td className='col-actions'>
                                        <div className='row-actions'>
                                            {editRow === owner.id ? (
                                                <button className='icon-btn icon-btn-primary' aria-label='Save' onClick={() => handleUpdate(owner.id)}>
                                                    <i className='fas fa-save' aria-hidden='true'></i>
                                                </button>
                                            ) : (
                                                <button className='icon-btn' aria-label='Edit' onClick={() => handleEdit(owner)}>
                                                    <i className='fas fa-pencil-alt' aria-hidden='true'></i>
                                                </button>
                                            )}
                                            <button className='icon-btn icon-btn-danger' aria-label='Delete' onClick={() => handleDelete(owner.id)}>
                                                <i className='fas fa-trash' aria-hidden='true'></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OwnersTable;