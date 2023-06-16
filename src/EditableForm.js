import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import PopUp from './components/Modals';
import CreateIcon from '@mui/icons-material/Create';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';

const EditableForm = () => {
  const initialFormData = [
    { name: 'field1', value: 'Profile Summary', switchOn: true },
    { name: 'field2', value: 'Academic and Cocurricular Achievements', switchOn: true },
    { name: 'field3', value: 'Summer Internship Experience', switchOn: true },
    { name: 'field4', value: 'Work Experience', switchOn: true },
    { name: 'field5', value: 'Projects', switchOn: true },
    { name: 'field6', value: 'Certifications', switchOn: true },
    { name: 'field7', value: 'Leadership Positions', switchOn: true },
    { name: 'field8', value: 'Extracurricular', switchOn: true },
    { name: 'field9', value: 'Education', switchOn: true },
  ];

  const [formData, setFormData] = useState(initialFormData);
  const [editField, setEditField] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const dragItem = React.useRef(null);
  const dragOverItem = React.useRef(null);

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData((prevFormData) =>
      prevFormData.map((field) =>
        field.name === fieldName ? { ...field, value } : field
      )
    );
    setUnsavedChanges(true);
  };

  const handleSwitchChange = (e, fieldName) => {
    const { checked } = e.target;
    setFormData((prevFormData) =>
      prevFormData.map((field) =>
        field.name === fieldName ? { ...field, switchOn: checked } : field
      )
    );
    setUnsavedChanges(true);
  };

  const handleEditClick = (fieldName) => {
    setEditField(fieldName);
  };

  const handleSaveClick = () => {
    setEditField(null);
    setUnsavedChanges(false);
    // Perform any save operation with the updated form data
    // For example, send the data to an API or update the state in a parent component
  };

  const handleSort = () => {
    if (dragItem.current !== null) {
      let formElements = [...formData];
      const draggedItemContent = formElements.splice(dragItem.current, 1)[0];
      formElements.splice(dragOverItem.current, 0, draggedItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      setFormData(formElements);
    }
  };

  const handleButtonMouseDown = () => {
    setDragActive(true);
  };

  const handleButtonMouseUp = () => {
    setDragActive(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
  };

  return (
    <div className='outside' style={{ width: '80vw', marginLeft: '150px' }}>
      <form onSubmit={handleSubmit}>
        {formData.map((field, index) => (
          <div
            key={index}
            className='individual'
            style={{
              backgroundColor: field.switchOn ? 'white' : 'red',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: 700,
              borderBottom: '2px solid black',
              fontSize: 20,
              marginBottom: 30,
              cursor: dragActive ? 'grabbing' : 'default', // Update cursor style based on dragActive state
            }}
            draggable={dragActive} // Enable dragging only when dragActive is true
            onDragStart={(e) => {
              dragItem.current = index;
              if (!dragActive) {
                e.preventDefault();
              }
            }}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => {
              if (dragActive) {
                dragOverItem.current = index;
              }
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <button style={{ background: 'none', border: 'none' }}
                onMouseDown={handleButtonMouseDown}
                onMouseUp={handleButtonMouseUp}
              >
                <MenuIcon fontSize='small' />
              </button>
              <PopUp name={field.value} />
              <label>
                {editField === field.name ? (
                  <input
                    type='text'
                    name={field.name}
                    value={field.value}
                    onChange={(e) => handleInputChange(e, field.name)}
                    style={{fontSize:'20px'}}
                  />
                ) : (
                  <span>{field.value}</span>
                )}
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {editField === field.name ? (
                <button
                  type='button'
                  onClick={handleSaveClick}
                  disabled={!unsavedChanges}
                  style={{fontSize:'20px', border:'none',background:'none'}} >
                  Save
                </button>
              ) : (
                <button
                  type='button'
                  onClick={() => handleEditClick(field.name)}
                  style={{ background: 'none', border: 'none' }}
                >
                  <CreateIcon fontSize='small' />
                </button>
              )}
              <Switch
                checked={field.switchOn}
                onChange={(e) => handleSwitchChange(e, field.name)}
                color='primary'
              />
            </div>
          </div>
        ))}
        <Button style={{backgroundColor:'purple', color:'white', paddingLeft:'50px',paddingRight:'50px'}}>Save and Next</Button>
      </form>
    </div>
  );
};

export default EditableForm;
