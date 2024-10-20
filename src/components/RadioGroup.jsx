import React from "react";

function RadioGroup({ selectedOption, handleOptionChange }) {
    return (
        <div className="form-control flex flex-row">
            <label className="label cursor-pointer">
                <span className="label-text">ที่อยู่ปัจจุบัน</span>
                <input
                    type="radio"
                    name="radio"
                    className="radio"
                    value="option1"
                    checked={selectedOption === "option1"}
                    onChange={handleOptionChange}
                />
            </label>
            <label className="label cursor-pointer">
                <span className="label-text">ค้นหาพิกัด</span>
                <input
                    type="radio"
                    name="radio"
                    className="radio"
                    value="option2"
                    checked={selectedOption === "option2"}
                    onChange={handleOptionChange}
                />
            </label>
        </div>
    );
}

export default RadioGroup;
