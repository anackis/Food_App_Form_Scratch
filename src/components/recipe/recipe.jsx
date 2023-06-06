
import React, { useState, useRef, useEffect } from 'react';
import { addObjectToCollection } from '../../utils/firebase/firebase';
import imageCompression from 'browser-image-compression';

import Card from '../card/card';

import logo from "../../assets/Img/icons/logo.png";
import uploadImg from "../../assets/Img/recipe/photo.png";
import addButton from "../../assets/Img/recipe/add.png";
import removeButton from "../../assets/Img/recipe/remove.png";

import './recipe.scss';

const Recipe = ({userDataDB}) => {
  
  const [formData, setFormData] = useState({
    userName: userDataDB.displayName,
    userEmail: userDataDB.email,
    userImg: userDataDB.userImg,
    firebaseId: '',
    name: '',
    image: logo,
    component: {
      componentName: '',
      componentKcalPerG: '',
      componentPricePerG: '',
      componentWeight: '',
    },
    components: [],
  });
  const [cardObject, setCardObject] = useState(formData);
  const imageInputRef = useRef(null);

  

  const updateCardObject = (updatedData) => {
    const { name, components } = updatedData;
  
    const totalPrice = calculateTotalPrice(components);
    const totalKcal = calculateTotalKcal(components);
    const totalWeight = calculateTotalWeight(components);
  
    const updatedCardObject = {
      id: userDataDB.id,
      displayName: userDataDB.displayName,
      userEmail: userDataDB.email,
      userImg: userDataDB.userImg,
      firebaseId: '',
      name: name,
      image: formData.image,
      likes: cardObject.likes,
      likedList: [],
      dislikes: cardObject.dislikes,
      dislikedList: [],
      fovoriteList: [],
      favorite: cardObject.favorite,
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

  const handleImgUploadChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 0.001, // (max file size in MB)
        maxWidthOrHeight: 1920, // max width or height in pixels
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageDataUrl = e.target.result;
          setFormData((prevFormData) => ({
            ...prevFormData,
            image: imageDataUrl,
          }));
          updateCardObject({ ...formData, image: imageDataUrl });
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.log(error);
      }
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, components } = formData;

    const totalPrice = calculateTotalPrice(components);
    const totalKcal = calculateTotalKcal(components);
    const totalWeight = calculateTotalWeight(components);

    const date = new Date();

    const newCardObject = {
      id: userDataDB.id,
      userName: userDataDB.displayName,
      userEmail: userDataDB.email,
      userImg: userDataDB.userImg,
      name: name,
      firebaseId: '',
      image: formData.image,
      likes: 0,
      likedList: [],
      dislikes: 0,
      dislikedList: [],
      fovoriteList: [],
      favorite: false,
      components: components,
      totalPrice,
      totalKcal,
      totalWeight,
      createdAt: date,
    };
    setCardObject(newCardObject);
    addObjectToCollection("cards", newCardObject);
    console.log(newCardObject);
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
          
          <div className="recipe__wrapper_top">
            <input
              type="text"
              id="name"
              name="name"
              placeholder='Name'
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="image" className="recipe__fileupload">
              <img src={uploadImg} alt="uploadImg" />
              Upload Image
              <input
                  type="file"
                  id="image"
                  className='recipe__img-input'
                  name="image"
                  ref={imageInputRef}
                  onChange={handleImgUploadChange}
                  accept="image/*"
                />
            </label>
          </div>
          

          <h2>Components:</h2>
          <div className="recipe__components__wrapper">
          {formData.components.map((component, index) => (
            <div className="recipe__components__wrapper-item" key={index}>
              <div className="recipe__components__wrapper-item_top">
               
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

                <button className='recipe__components-button' type="button" onClick={() => removeComponent(index)}>
                  <img src={removeButton} alt="removeButton" />
                </button>
              </div>

              
              <div className="recipe__components__wrapper-item_bottom">
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
              </div>
            </div>
          ))}
          </div>

          <button className='recipe__components-button' type="button" onClick={addComponent}>
            <img src={addButton} alt="addButton" />
          </button>

          <br />
          <br />

          <button className='recipe__submit-button' type="submit">Add Recipe Card</button>
        </form>
      </div>
      
      <div className="recipe__wrapper_right">
        <div className="recipe__wrapper_right-top">
          <h2>Overview</h2>
          <div className="recipe__divider"></div>
        </div>
      
        <Card cardObject={cardObject} />
      </div>
      
    </section>
  );
};

export default Recipe;