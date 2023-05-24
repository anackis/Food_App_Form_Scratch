import React, { useState, useRef } from 'react';

import Card from '../card/card';

import uploadImg from "../../assets/Img/recipe/photo.png";

import './recipe.scss';

const Recipe = () => {
  const [cardObject, setCardObject] = useState({});
  const imageInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    image: null,
    component: {
      componentName: '',
      componentKcalPerG: '',
      componentPricePerG: '',
      componentWeight: '',
    },
    components: [],
  });

  const updateCardObject = (updatedData) => {
    const { name, image, components } = updatedData;
  
    const totalPrice = calculateTotalPrice(components);
    const totalKcal = calculateTotalKcal(components);
    const totalWeight = calculateTotalWeight(components);
  
    const updatedCardObject = {
      name: name,
      image: formData.image,
      likes: cardObject.likes,
      dislikes: cardObject.dislikes,
      favorite: cardObject.favorite,
      creator: cardObject.creator,
      components: components,
      totalPrice,
      totalKcal,
      totalWeight,
    };
  
    setCardObject(updatedCardObject);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    updateCardObject({ ...formData, [name]: value });
  };

  const handleImgUploadChange = (event) => {
    const file = event.target.files[0];
    // const imageUrl = URL.createObjectURL(file);
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file, 
    }));

    updateCardObject({ ...formData, image: file });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, image, component, components } = formData;

    const totalPrice = calculateTotalPrice(components);
    const totalKcal = calculateTotalKcal(components);
    const totalWeight = calculateTotalWeight(components);

    const newCardObject = {
      name: name,
      image: formData.image,
      likes: 0,
      dislikes: 0,
      favorite: false,
      creator: getCurrentUserDisplayName(),
      components: components,
      totalPrice,
      totalKcal,
      totalWeight,
    };
    setCardObject(newCardObject);
    console.log(newCardObject);
  };

  const getCurrentUserDisplayName = () => {
    // Replace with your own logic
    return 'John Doe';
  };

  const addComponent = () => {
    const { component, components } = formData;

    const newComponent = {
      componentName: component.componentName,
      componentKcalPerG: component.componentKcalPerG,
      componentPricePerG: component.componentPricePerG,
      componentWeight: component.componentWeight,
    };

    setFormData((prevFormData) => ({
      ...prevFormData,
      component: {
        componentName: '',
        componentKcalPerG: '',
        componentPricePerG: '',
        componentWeight: '',
      },
      components: [...components, newComponent],
    }));

    updateCardObject({ ...formData, components: [...components, newComponent] });
  };

  const removeComponent = (index) => {
    setFormData((prevFormData) => {
      const updatedComponents = prevFormData.components.filter((_, i) => i !== index);
      return {
        ...prevFormData,
        components: updatedComponents,
      };
    });

    updateCardObject({ ...formData, components: formData.components.filter((_, i) => i !== index) });
  };

  const calculateTotalKcal = (components) => {
    return components.reduce((total, component) => {
      return total + Number(component.componentKcalPerG) * Number(component.componentWeight);
    }, 0);
  };

  const calculateTotalWeight = (components) => {
    return components.reduce((total, component) => {
      return total + Number(component.componentWeight);
    }, 0);
  };

  const calculateTotalPrice = (components) => {
    return components.reduce((total, component) => {
      return total + Number(component.componentPricePerG) * Number(component.componentWeight);
    }, 0);
  };

  return (
    <section className='recipe'>
      <div className="recipe__wrapper">
        <h1>Create Recipe Card</h1>
        <div className="recipe__divider"></div>
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="name">Name:</label> */}
          <input
            type="text"
            id="name"
            name="name"
            placeholder='Name'
            value={formData.name}
            onChange={handleChange}
            required
          />

          <br />

          <label htmlFor="image" className="recipe__fileupload">
            
            <img src={uploadImg} alt="uploadImg" />
            Upload Image
            <input
                type="file"
                id="image"
                className='recipe__img-input'
                name="image"
                // value={formData.image}
                ref={imageInputRef}
                onChange={handleImgUploadChange}
                accept="image/*"
                required
              />
          </label>
          
            
            
          
          

          {/* {formData.image && (
            <img src={URL.createObjectURL(formData.image)} alt="Preview" style={{ width: '200px' }} />
          )}
          {cardObject.image && (
            <img src={URL.createObjectURL(cardObject.image)} alt="Preview" style={{ width: '200px' }} />
          )} */}

          <h2>Components:</h2>
          {formData.components.map((component, index) => (
            <div key={index}>
              {/* <label htmlFor={`componentName${index}`}>Component Name:</label> */}
              <input
                type="text"
                id={`componentName${index}`}
                name={`componentName${index}`}
                placeholder='Component Name'
                value={component.componentName}
                onChange={(event) => {
                  const updatedComponents = [...formData.components];
                  updatedComponents[index].componentName = event.target.value;
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    components: updatedComponents,
                  }));
                  updateCardObject({ ...formData, components: updatedComponents });
                }}
                required
              />

              <br />

              {/* <label htmlFor={`componentKcalPerG${index}`}>Component Kcal Per Gram:</label> */}
              <input
                type="number"
                id={`componentKcalPerG${index}`}
                name={`componentKcalPerG${index}`}
                placeholder='Kcal/g'
                value={component.componentKcalPerG}
                onChange={(event) => {
                  const updatedComponents = [...formData.components];
                  updatedComponents[index].componentKcalPerG = event.target.value;
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    components: updatedComponents,
                  }));
                  updateCardObject({ ...formData, components: updatedComponents });
                }}
                required
              />

              <br />

              {/* <label htmlFor={`componentPricePerG${index}`}>Component Price Per Gram:</label> */}
              <input
                type="number"
                id={`componentPricePerG${index}`}
                name={`componentPricePerG${index}`}
                placeholder='Price/g'
                value={component.componentPricePerG}
                onChange={(event) => {
                  const updatedComponents = [...formData.components];
                  updatedComponents[index].componentPricePerG = event.target.value;
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    components: updatedComponents,
                  }));
                  updateCardObject({ ...formData, components: updatedComponents });
                }}
                required
              />

              <br />

              {/* <label htmlFor={`componentWeight${index}`}>Component Weight:</label> */}
              <input
                type="number"
                id={`componentWeight${index}`}
                name={`componentWeight${index}`}
                placeholder='Weigh in g'
                value={component.componentWeight}
                onChange={(event) => {
                  const updatedComponents = [...formData.components];
                  updatedComponents[index].componentWeight = event.target.value;
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    components: updatedComponents,
                  }));
                  updateCardObject({ ...formData, components: updatedComponents });
                }}
                required
              />

              <br />

              <button type="button" onClick={() => removeComponent(index)}>
                Remove Component
              </button>

              <br />
              <br />
              <br />
            </div>
          ))}

          <button type="button" onClick={addComponent}>
            Add Component
          </button>

          <br />
          <br />

          <button type="submit">Add Recipe Card</button>
        </form>
      </div>
      
      <Card cardObject={cardObject} formDataImg={formData.image}/>
    </section>
  );
};

export default Recipe;