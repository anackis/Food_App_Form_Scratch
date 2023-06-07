import React, { useState } from 'react';
import { auth, updateDb } from '../../utils/firebase/firebase';

import './calculator.scss';

const Calculator = () => {
  const [inputs, setInputs] = useState({
    sex: 'female',
    ratio: '1.375',
    height: '',
    weight: '',
    age: '',
  });

  const [result, setResult] = useState('-');
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setError(null);
  };

  const handleSexChange = (selectedSex) => {
    setInputs((prevState) => ({
      ...prevState,
      sex: selectedSex,
    }));
    setResult('-');
  };

  const handleRatioChange = (selectedRatio) => {
    setInputs((prevState) => ({
      ...prevState,
      ratio: selectedRatio,
    }));
    setResult('-');
  };

  const calcTotal = () => {
    setError(null);
    const { sex, height, weight, age, ratio } = inputs;

    if (!sex || !height || !weight || !age || !ratio) {
      setResult('-');
      setError('You need to fill all inputs!');
      return;
    }

    if (isNaN(Number(height)) || isNaN(Number(weight)) || isNaN(Number(age))) {
      setResult('-');
      setError('Height, weight, and age must be numbers!');
      return;
    }

    if (sex === 'female') {
      setResult(Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio));
    } else {
      setResult(Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio));
    }
  };

  const saveKcal = async () => {
    if(result !== '-') {
      const uid = auth.currentUser.uid;
      await updateDb(uid, { kcal: result });
    } else {
      // setError('You need to calculate the kcal first!');
      console.log('You need to calculate the kcal first!');
    }
  };

  return (
    <section className="calculating">
      <h2 className="title">Calories calculator</h2>
      <div className="small-divider"></div>

      <div className="calculating__field">
        <div className="calculating__subtitle">Your gender</div>
        <div className="calculating__choose" id="gender">
          <div
            id="female"
            className={`calculating__choose-item ${
              inputs.sex === 'female' ? 'calculating__choose-item_active' : ''
            }`}
            onClick={() => handleSexChange('female')}
          >
            Woman
          </div>
          <div
            id="male"
            className={`calculating__choose-item ${
              inputs.sex === 'male' ? 'calculating__choose-item_active' : ''
            }`}
            onClick={() => handleSexChange('male')}
          >
            Man
          </div>
        </div>

        <div className="calculating__subtitle">Your parameters</div>
        <div className="calculating__choose calculating__choose_medium">
          <input
            type="text"
            id="height"
            placeholder="Enter height"
            className="calculating__choose-item"
            value={inputs.height}
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="weight"
            placeholder="Enter weight"
            className="calculating__choose-item"
            value={inputs.weight}
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="age"
            placeholder="Enter age"
            className="calculating__choose-item"
            value={inputs.age}
            onChange={handleInputChange}
          />
        </div>

        <div className="calculating__subtitle">Choose your physical activity</div>
        <div className="calculating__choose calculating__choose_big">
          <div
            data-ratio="1.2"
            id="low"
            className={`calculating__choose-item ${
              inputs.ratio === '1.2' ? 'calculating__choose-item_active' : ''
            }`}
            onClick={() => handleRatioChange('1.2')}
          >
            Low activity
          </div>
          <div
            data-ratio="1.375"
            id="small"
            className={`calculating__choose-item ${
              inputs.ratio === '1.375' ? 'calculating__choose-item_active' : ''
            }`}
            onClick={() => handleRatioChange('1.375')}
          >
            Small activity
          </div>
          <div
            data-ratio="1.55"
            id="medium"
            className={`calculating__choose-item ${
              inputs.ratio === '1.55' ? 'calculating__choose-item_active' : ''
            }`}
            onClick={() => handleRatioChange('1.55')}
          >
            Moderate activity
          </div>
          <div
            data-ratio="1.725"
            id="high"
            className={`calculating__choose-item ${
              inputs.ratio === '1.725' ? 'calculating__choose-item_active' : ''
            }`}
            onClick={() => handleRatioChange('1.725')}
          >
            High activity
          </div>
        </div>

        <button className="calculating__final-button" onClick={calcTotal}>
          Calculate
        </button>
        
        <div className="calculating__divider"></div>

        {error ? <span className='calculating__error'>{error}</span> : null}

        <div className="calculating__total">
          
          <div className="calculating__subtitle">Your daily calorie rate:</div>
          <div className="calculating__result"><span>{result} kcal</span></div>
          
          <button className="calculating__save" onClick={saveKcal}>Save your daily kcal</button>
        </div>
      </div>
    </section>
  );
};

export default Calculator;