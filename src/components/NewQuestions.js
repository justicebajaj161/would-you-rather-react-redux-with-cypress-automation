import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleSaveQuestion } from './../actions/questions';

const NewQuestion = ({ handleSaveQuestion }) => {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'optionOneText') {
      setOptionOneText(e.target.value);
    } else if (e.target.name === 'optionTwoText') {
      setOptionTwoText(e.target.value);
    }
  }

  const handleSubmit = () => {
    handleSaveQuestion(optionOneText, optionTwoText, navigate);
    setOptionOneText('');
    setOptionTwoText('');
  }

  const isQuestionInValid = () => {
    return optionOneText === '' || optionTwoText === '';
  }

  return (
    <div className="columns is-centered new-question">
      <div className="column is-6">
        <div className="card">
          <header className="card-header has-background-primary">
            <p className="card-header-title has-text-light">Create New Question</p>
          </header>
          <div className="card-content">
            <div className="form">
              <div className="field">
                <label className="label">Would you rather?</label>
                <div className="control">
                  <input
                    className="input"
                    value={optionOneText}
                    name="optionOneText"
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter first option"
                  />
                </div>
                <div> OR </div>
                <div className="control">
                  <input
                    className="input"
                    value={optionTwoText}
                    name="optionTwoText"
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter second option"
                  />
                </div>
                <div className="control">
                  <button
                    onClick={handleSubmit}
                    disabled={isQuestionInValid()}
                    className="button is-dark"
                    type="submit"
                  >
                    <span><i className="fa fa-thumbs-up"></i> Submit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { handleSaveQuestion })(NewQuestion);
