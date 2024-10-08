import { useState, useEffect } from 'react';
import '../styles/CropPrediction.scss';
import cropbgImage from '../assets/CropDiseaseImage.png';
import { useLanguage } from '../contexts/LanguageContext'; // Import the language context

const WhatCropToGrow = () => {
  const { languageStrings } = useLanguage(); // Access language strings

  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorous: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://kisaan-konnect.onrender.com/predict-crop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setPrediction(data.prediction);
      setIsLoading(false);
    } catch (err) {
      setError(languageStrings.wctg_error, err); // Error message from language strings
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="CropPred_page__prediction-container">
      <img src={cropbgImage} alt={languageStrings.wctg_image_alt} className="CropPred_page__bg-image" />
      <div className='CropPred_page__pc-h1'>{languageStrings.wctg_heading}</div>
      <div className="CropPred_page__description">
        {languageStrings.wctg_description}
      </div>
      <form onSubmit={handleSubmit} className="CropPred_page__crop-form">
        <div className="CropPred_page__input-row">
          <div className="CropPred_page__input-group">
            <label htmlFor="nitrogen">{languageStrings.wctg_nitrogen}</label>
            <input
              type="number"
              id="nitrogen"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleChange}
              required
            />
          </div>
          <div className="CropPred_page__input-group">
            <label htmlFor="phosphorous">{languageStrings.wctg_phosphorous}</label>
            <input
              type="number"
              id="phosphorous"
              name="phosphorous"
              value={formData.phosphorous}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="CropPred_page__input-row">
          <div className="CropPred_page__input-group">
            <label htmlFor="potassium">{languageStrings.wctg_potassium}</label>
            <input
              type="number"
              id="potassium"
              name="potassium"
              value={formData.potassium}
              onChange={handleChange}
              required
            />
          </div>
          <div className="CropPred_page__input-group">
            <label htmlFor="temperature">{languageStrings.wctg_temperature}</label>
            <input
              type="number"
              id="temperature"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="CropPred_page__input-row">
          <div className="CropPred_page__input-group">
            <label htmlFor="humidity">{languageStrings.wctg_humidity}</label>
            <input
              type="number"
              id="humidity"
              name="humidity"
              value={formData.humidity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="CropPred_page__input-group">
            <label htmlFor="ph">{languageStrings.wctg_ph}</label>
            <input
              type="number"
              step="0.1"
              id="ph"
              name="ph"
              value={formData.ph}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="CropPred_page__input-row">
          <div className="CropPred_page__input-group">
            <label htmlFor="rainfall">{languageStrings.wctg_rainfall}</label>
            <input
              type="number"
              id="rainfall"
              name="rainfall"
              value={formData.rainfall}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="CropPred_page__submit-btn">
          {isLoading ? languageStrings.wctg_predicting : languageStrings.wctg_predict}
        </button>
      </form>

      {error && <p className="CropPred_page__error-text">{error}</p>}
      {prediction && (
        <div className="CropPred_page__result-container">
          <h2>{languageStrings.wctg_result}</h2>
          <p className="CropPred_page__prediction-result">{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default WhatCropToGrow;