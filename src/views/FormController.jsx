import React, { Component } from "react";
import Form1 from "../forms/form1/Form1";
import Form2 from "../forms/form2/Form2";
import Form3 from "../forms/form3/Form3";

const FormController = (props) => {
  const renderFormType = (id) => {
    console.log(id, 2);
    switch (id) {
      case 1:
        return <Form1 />;
      case 2:
        return <Form2 />;
      case 3:
        return <Form3 />;

      default:
        return "NOt Found!";
    }
  };
  return renderFormType(parseInt(props.match.params.id));
};
export default FormController;
 
